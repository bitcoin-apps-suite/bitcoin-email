# bMail — Protocol & API Layer Architecture

> Working sketch, not committed strategy. Goal: build bMail so existing Gmail-API
> apps run on it with a one-line URL swap, while the underlying protocol stays
> native to BSV / HandCash / BAP.

## The three layers

```
┌─────────────────────────────────────────────────────────────────┐
│ Layer 3 — Drop-in shim                                          │
│   @bopen/bmail-googleapis-shim  (npm package)                   │
│   Patches `googleapis` Gmail client to point at bmail.dev/v1    │
│   Devs change one import; everything else just works.           │
├─────────────────────────────────────────────────────────────────┤
│ Layer 2 — Gmail-compatible REST veneer                          │
│   /api/v1/users/{userId}/messages                               │
│   /api/v1/users/{userId}/threads                                │
│   /api/v1/users/{userId}/labels                                 │
│   /api/v1/users/{userId}/drafts                                 │
│   Mirrors Gmail API resource shapes (Message, Thread, Label).   │
│   Translation veneer — NOT the source of truth.                 │
├─────────────────────────────────────────────────────────────────┤
│ Layer 1 — Native bMail protocol                                 │
│   Source of truth. BSV / HandCash / BAP / 1Sat ordinal aware.   │
│   /api/native/{verb}  — JSON-RPC style                          │
│   Each message = a 1Sat ordinal (manifest + N parts pattern).   │
│   Identity = BAP. Routing = HandCash handle or ordinal address. │
│   Storage = on-chain inscriptions + IPFS/B-protocol mirrors.    │
└─────────────────────────────────────────────────────────────────┘
```

**Why three layers:** Layer 1 is what makes bMail bMail (not a Gmail clone).
Layer 2 buys distribution by speaking Gmail's dialect. Layer 3 reduces adoption
friction to zero — a dev replaces `require('googleapis')` with
`require('@bopen/bmail-googleapis-shim')` and ships.

## Layer 1 — Native bMail protocol

Source of truth. Every email is a 1Sat ordinal:

```
Message ordinal
├─ manifest.json          (envelope, headers, MIME tree, recipients)
├─ body.html / body.txt   (rendered MIME parts)
├─ attachments/{n}        (inline file inscriptions)
└─ signatures/{n}         (BAP attestations, optional)
```

- **Identity:** sender = BAP root key; recipient = BAP root or HandCash handle.
- **Addressing:** `richard$1` (HandCash) or `bap://abc123…` (BAP) or
  `email://user@domain` (Layer 2 / SMTP bridge).
- **Delivery:** ordinal sent to recipient address; their wallet picks it up
  via SPV / GorillaPool subscription.
- **Encryption:** ECDH between sender and recipient pubkeys; cipher in body
  inscription, key derivation per-message.
- **Threading:** `References:` header from RFC-5322, plus optional `parent_txid`
  in manifest pointing to prior message ordinal.
- **Read receipts / status:** subsequent ordinals from recipient signed and
  spending the original (provable on-chain).

Native API is a thin JSON-RPC over HTTPS plus a websocket for live deliveries:

```
POST /api/native/sendMessage
POST /api/native/listMessages
POST /api/native/getMessage
POST /api/native/markRead
WS   /api/native/stream
```

## Layer 2 — Gmail-compatible REST veneer

Goal: enough Gmail API surface that 80% of real apps work unchanged.

### Endpoints to ship first (80/20 cut)

| Gmail endpoint | Native call | Priority |
|---|---|---|
| `users.messages.send` | `sendMessage` | P0 |
| `users.messages.list` | `listMessages` | P0 |
| `users.messages.get` | `getMessage` | P0 |
| `users.messages.modify` (labels) | `applyLabels` | P0 |
| `users.threads.list` | `listThreads` | P0 |
| `users.threads.get` | `getThread` | P0 |
| `users.labels.*` | `manageLabels` | P0 |
| `users.drafts.*` | `manageDrafts` | P1 |
| `users.history.list` | `historySince` | P1 |
| `users.watch` (Pub/Sub push) | websocket bridge | P2 |
| `users.settings.*` | `userSettings` | P2 |
| `users.messages.attachments.get` | `getAttachment` | P0 |

### What we explicitly DON'T mimic

- **Pub/Sub push notifications** (Google Cloud-specific) — provide our own
  webhook + websocket model and document the migration path.
- **Cloud KMS S/MIME envelope encryption** — bMail uses BSV-native ECDH.
- **Google Workspace admin SDK** — out of scope.
- **Vacation responder / forwarding settings** at v1 — defer.

### Resource shape parity

Gmail's `Message` resource:

```json
{
  "id": "string",
  "threadId": "string",
  "labelIds": ["string"],
  "snippet": "string",
  "historyId": "string",
  "internalDate": "string",
  "payload": { /* MIME tree */ },
  "sizeEstimate": 12345,
  "raw": "base64url-encoded RFC-2822"
}
```

bMail returns this shape exactly, but:
- `id` = ordinal `outpoint` (`txid_vout`)
- `threadId` = root message txid
- `historyId` = block height + tx index (monotonic)
- `internalDate` = block timestamp
- Adds non-conflicting `bmail` extension field with native fields:
  ```json
  "bmail": {
    "ordinalOutpoint": "abc..._0",
    "senderBap": "1Bap...",
    "senderHandle": "richard$1",
    "manifestTxid": "abc...",
    "encryptionVersion": 2
  }
  ```

Apps using stock Gmail clients ignore `bmail`; bMail-aware apps can use it.

## Layer 3 — Drop-in `googleapis` shim

```ts
// @bopen/bmail-googleapis-shim
import { google } from 'googleapis';

const bmail = google.options({
  // Override only the discovery URL & root for gmail
  rootUrl: 'https://bmail.dev/',
  discoveryUrl: 'https://bmail.dev/$discovery/rest?version=v1',
});

export default bmail;
export { google };
```

Developer change is one line:

```diff
- import { google } from 'googleapis';
+ import { google } from '@bopen/bmail-googleapis-shim';

  const gmail = google.gmail({ version: 'v1', auth });
  await gmail.users.messages.send({ userId: 'me', requestBody: {...} });
```

For this to work we must publish a Google Discovery Document at
`/$discovery/rest?version=v1` describing every endpoint we expose. The
discovery doc is what `googleapis` introspects to build its typed client.

## Auth bridge

Gmail uses Google OAuth 2.0 with scopes like `https://www.googleapis.com/auth/gmail.send`.

bMail can:

1. **Mint compatible OAuth tokens** at `/api/oauth/v2/token` with
   bMail-defined scopes that mirror Gmail's URN structure:
   `https://bmail.dev/auth/mail.send`, `…/mail.readonly`, `…/mail.modify`,
   `…/mail.labels`, `…/mail.metadata`.
2. **Bridge to BAP/HandCash:** OAuth is the surface; underneath, the access
   token references a BAP-derived key the user authorised. Token is a JWT with
   claims: `sub` = BAP root, `bmail_handle`, `scope`, `exp`.
3. **Optional**: accept a real Google ID token at the OAuth endpoint and
   establish a bMail identity for the Google email — pure migration play.

## Discovery document strategy

Generate a Google-compatible discovery doc from a single source of truth:

1. Define endpoints in OpenAPI 3.1 (`docs/openapi/bmail-v1.yaml`).
2. Build script transforms OpenAPI → Google Discovery format
   (script: `pnpm gen:discovery`).
3. Serve at `/$discovery/rest?version=v1`.
4. Same OpenAPI spec generates: TS client types, Postman collection,
   developer docs.

## Scope mapping

| Gmail scope | bMail equivalent |
|---|---|
| `gmail.readonly` | `bmail.readonly` |
| `gmail.send` | `bmail.send` |
| `gmail.modify` | `bmail.modify` |
| `gmail.labels` | `bmail.labels` |
| `gmail.compose` | `bmail.compose` |
| `gmail.metadata` | `bmail.metadata` |
| `gmail.settings.basic` | `bmail.settings` |

In the shim package we provide a `mapScopes()` helper so devs can pass either
the Gmail URI or the bMail URI and we accept both.

## What this unlocks

- Any app already coded against Gmail (Zapier integrations, agent frameworks
  with Gmail nodes, internal tools, AI assistants) becomes a bMail client by
  pointing at our endpoint.
- We can publish a Google-Workspace-Marketplace-style listing of "drop-in
  alternative providers" in our own dev console.
- Native Layer 1 stays free to evolve — ordinal-encoded mail, micropayments
  per message, on-chain read receipts, tokenised threads as 1Sat ordinals
  (per the bitcoin-wallet master-app architecture).
- bit-sign documents flow naturally: a sealed doc ordinal can be wrapped as
  an attachment in a bMail message ordinal, sent via the same protocol.

## Build order (proposed)

1. **OpenAPI spec for v1** — endpoints, schemas, scopes. Single source of truth.
2. **Layer 1 minimum** — `sendMessage` / `listMessages` / `getMessage` over
   1Sat ordinals on testnet. Wallet-side encryption.
3. **Layer 2 P0 endpoints** — Gmail-shaped REST routes that translate to
   Layer 1. Behind feature flag.
4. **Discovery doc generator** — OpenAPI → Google Discovery transform.
5. **OAuth bridge** — `/oauth/v2/token` issuing JWTs against BAP/HandCash.
6. **Layer 3 shim** — `@bopen/bmail-googleapis-shim` npm package +
   integration test against a real `googleapis`-using script.
7. **Reference app** — port one open-source Gmail-using app to bMail with the
   shim as proof-of-concept (e.g. an existing AI agent template).

## Risks & open questions

- **Trademark** — never market as "Gmail-compatible" without legal review;
  use "Google Mail API-compatible interface" or "drop-in alternative".
- **Surface bloat** — Gmail API is huge. Discipline required to stay at the
  80/20 line.
- **Auth UX** — Google OAuth consent screen has years of UX polish; ours
  needs to feel professional from day one (delegate to bit-sign-style auth).
- **History API** — `historyId` semantics in Gmail are subtle (incremental
  sync). Our block-height-based version needs careful spec.
- **Spam / abuse** — Gmail's filters are part of why developers use it.
  Without them, our endpoint becomes a spam vector. Need rate limits,
  proof-of-payment per message, BAP-trust-level gates.

## Cross-project alignment

- **bitcoin-wallet** is the master app per
  `memory/project_bitcoin_wallet_architecture.md`. bMail messages, like
  bit-sign documents, are 1Sat ordinals minted in the user's wallet. The
  wallet IS the inbox.
- **$401** = identity (sender / recipient BAP).
- **$402** = the message ordinal itself; can carry payment / be paywalled.
- **$403** = if the message contains a securities-class document
  (share certificate ordinal), gating applies.

---

*Status: sketch. Next action: convert this to an OpenAPI spec and prototype
Layer 1 sendMessage on testnet.*
