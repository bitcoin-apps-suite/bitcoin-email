# bMail Client Architecture

> Companion to `ARCHITECTURE_API_LAYERS.md`. Defines the user-facing client(s)
> for bMail and how they relate to the server, wallet, and protocol layers.

## TL;DR

**Three client surfaces, one engine:**

```
┌──────────────────────────────┬──────────────────────────────┬───────────────────────┐
│  Electron desktop client     │  Web client (Next.js)        │  bitcoin-wallet module│
│  (bMail.app)                 │  bitcoin-email.vercel.app    │  (embedded inbox view)│
│                              │                              │                       │
│  Primary product. Owns       │  Marketing + light webmail   │  Where mail ordinals  │
│  storage, decrypts locally,  │  + Layer 2 REST API host +   │  natively live. Read- │
│  speaks Layer 1 to chain.    │  Layer 3 OAuth bridge.       │  only mail panel +    │
│                              │                              │  compose handoff.     │
└──────────────────────────────┴──────────────────────────────┴───────────────────────┘
```

All three share `packages/bmail-core` — the message-as-ordinal logic, MIME
encoding, encryption primitives, recipient resolution.

## Why Electron (and why bCorp Mint as the template)

**Reference project**: `/Volumes/2026/Projects/bCorp Mint` — Electron 30 +
electron-vite + React 18 + TypeScript + `@bsv/sdk` + `js-1sat-ord`.

The Mint's privacy principle ("never save any data from the user, about the
user, or about the minted objects — the chain is the only record") translates
1:1 to bMail. Mail is the user's, lives in their wallet as ordinals, and
the desktop app is just a viewer/composer that touches chain on demand.

**Why a desktop app, not just web:**
- Local key storage (HandCash OAuth ephemeral or BAP keystore at rest)
- Local decryption — message ciphertext is on-chain, plaintext never
  leaves the device
- Local search index — no server-side mailbox search means no server-side
  metadata leak
- Background SPV / GorillaPool subscription for live delivery without
  needing a push provider
- Native notifications without browser permission dance
- Attachment handling (large file inscriptions) without browser memory caps

**Why also web:**
- Adoption ramp — try-before-installing
- Recovery / "I need to read mail on a borrowed machine"
- The Layer 2 REST API has to live somewhere with a public URL anyway

**Why also a bitcoin-wallet module:**
- The wallet is the master app per
  `memory/project_bitcoin_wallet_architecture.md`. Mail ordinals live there
  alongside doc ordinals, share certs, BSV balance.
- Read panel + compose handoff to the desktop bMail client (or a wallet-
  embedded mini-composer for one-liners).

## File layout (Electron client — `bitcoin-email/desktop/`)

Mirrors bCorp Mint conventions:

```
desktop/
├─ electron.vite.config.ts
├─ package.json                # main: out/main/index.js
├─ src/
│  ├─ main/                    # Electron main process
│  │  ├─ index.ts              # window, IPC handlers, protocol
│  │  ├─ bsv.ts                # 1Sat ordinal mint + parse (delegates to bmail-core)
│  │  ├─ handcash.ts           # HandCash OAuth (ephemeral)
│  │  ├─ bap.ts                # BAP identity, key derivation
│  │  ├─ keystore.ts           # OS keychain integration (macOS Keychain, etc.)
│  │  ├─ subscriber.ts         # GorillaPool / JungleBus subscription for incoming mail
│  │  ├─ search.ts             # local SQLite FTS5 index
│  │  └─ relay.ts              # outbound mail broadcast
│  ├─ preload/
│  │  └─ index.ts              # contextBridge (window.bmail)
│  ├─ renderer/
│  │  ├─ App.tsx               # Root, routing
│  │  ├─ pages/
│  │  │  ├─ Inbox.tsx
│  │  │  ├─ Compose.tsx
│  │  │  ├─ Thread.tsx
│  │  │  ├─ Settings.tsx
│  │  │  └─ Identity.tsx       # BAP / HandCash management
│  │  ├─ components/
│  │  │  ├─ MessageList.tsx
│  │  │  ├─ MessageView.tsx
│  │  │  ├─ ComposeEditor.tsx  # rich text → MIME
│  │  │  ├─ RecipientPicker.tsx# HandCash handle | BAP | email autocomplete
│  │  │  ├─ AttachmentPanel.tsx
│  │  │  └─ ChainBadge.tsx     # shows on-chain proof per message
│  │  ├─ hooks/
│  │  │  ├─ useInbox.ts
│  │  │  ├─ useCompose.ts
│  │  │  └─ useIdentity.ts
│  │  └─ lib/
│  │     ├─ format-mime.ts
│  │     └─ render-html.ts     # safe HTML rendering with DOMPurify
│  └─ shared/                  # types shared main↔renderer (matches Mint pattern)
│     └─ types.ts
└─ resources/
   └─ icon.icns
```

## File layout (Next.js server — already exists at `bitcoin-email/app/`)

```
app/
├─ api/
│  ├─ v1/                                    # Gmail-compatible REST veneer
│  │  └─ users/[userId]/
│  │     ├─ messages/
│  │     │  ├─ route.ts                      # list, send
│  │     │  ├─ [id]/route.ts                 # get, modify, trash, untrash
│  │     │  └─ [id]/attachments/[aid]/route.ts
│  │     ├─ threads/
│  │     ├─ labels/
│  │     ├─ drafts/
│  │     └─ history/
│  ├─ native/                                # Layer 1 JSON-RPC
│  │  ├─ sendMessage/route.ts
│  │  ├─ listMessages/route.ts
│  │  ├─ getMessage/route.ts
│  │  └─ stream/route.ts                     # WebSocket (Edge runtime)
│  ├─ oauth/
│  │  └─ v2/
│  │     ├─ authorize/route.ts               # consent screen
│  │     └─ token/route.ts                   # token exchange (JWT issued)
│  ├─ $discovery/
│  │  └─ rest/route.ts                       # serves the Google Discovery doc
│  └─ email/                                 # existing routes (legacy / SMTP bridge)
│     ├─ send/route.ts
│     └─ receive/route.ts
└─ (web client pages — webmail UI mirrors desktop renderer)
```

## Shared core (`packages/bmail-core/`)

Used by desktop main process AND server API routes AND wallet module:

```
packages/bmail-core/src/
├─ message/
│  ├─ encode.ts        # MIME tree → manifest.json + parts
│  ├─ decode.ts        # manifest + parts → MIME tree
│  ├─ encrypt.ts       # ECDH per-recipient key wrap
│  └─ decrypt.ts
├─ ordinal/
│  ├─ mint.ts          # build 1Sat ordinal tx (manifest + N inscriptions)
│  ├─ parse.ts         # outpoint → message
│  └─ relay.ts         # broadcast to junglebus/arc
├─ identity/
│  ├─ resolve.ts       # handle | BAP | email → recipient public key + address
│  └─ verify.ts        # signature verification
├─ thread/
│  ├─ build.ts         # walk References: + parent_txid links
│  └─ types.ts
└─ index.ts
```

This is the only place that knows the Layer 1 protocol details. Layer 2 (REST
veneer) and the desktop UI are translation surfaces over `bmail-core`.

## State / storage model

### Desktop client

- **Encrypted local cache**: SQLite at `userData/cache.db` storing decrypted
  message metadata + index for instant search. **Not authoritative**; can be
  wiped and rebuilt by re-fetching ordinals.
- **Keychain**: BAP private key (or HandCash refresh token) in OS keychain
  (macOS Keychain, Windows Credential Locker, libsecret on Linux).
- **No telemetry, no analytics**, per the Mint privacy principle.

### Server (Next.js)

- **Stateless** for native protocol — every request resolves through the
  chain.
- **Optional Postgres** for: OAuth client registrations, rate-limit
  counters, webhook delivery state, paid-spam-tier accounting. Never
  message content.
- **Edge cache** for read-only ordinal lookups (Vercel KV / Upstash).

### Bitcoin-wallet module

- Reuses the wallet's existing GorillaPool subscription + ordinal store.
- Mail ordinals appear in the same vault structure as doc ordinals.
- Mail-specific UI is just a filter over the ordinal list with a different
  rendering view.

## Recipient resolution

Compose flow accepts:

| Input | Resolution path |
|---|---|
| `richard$1` | HandCash → Paymail → BSV address + ECDH pubkey |
| `bap://1Bap…xyz` | BAP root key → derived encryption key |
| `richard@bopen.io` | Optional SMTP bridge OR error if unsupported |
| `1ABCxyz…` (raw BSV addr) | direct send, no encryption (warn user) |

`bmail-core/identity/resolve.ts` is the single point handling all four.

## Send flow (happy path)

1. User composes message in Electron renderer (rich text + attachments).
2. Renderer asks main process: `bmail.compose.send(draft)`.
3. Main process:
   a. `bmail-core/message/encode.ts` → manifest + MIME parts.
   b. `identity/resolve.ts` → recipient pubkey + address.
   c. `message/encrypt.ts` → per-part ciphertext + wrapped key.
   d. `ordinal/mint.ts` → builds tx with manifest + N inscriptions, signed
      with sender's BAP-derived key.
   e. `ordinal/relay.ts` → broadcast via JungleBus/ARC.
   f. Returns `{txid, outpoint}` to renderer.
4. Renderer adds message to local cache as "Sent" with on-chain badge.
5. Recipient's wallet/desktop client picks up the ordinal via subscription.

## Receive flow

1. `subscriber.ts` (main process) subscribes to recipient address via
   GorillaPool / JungleBus.
2. New ordinal at recipient address → fetch manifest → fetch parts.
3. `decrypt.ts` unwraps key with recipient private key, decrypts parts.
4. `decode.ts` reassembles MIME tree.
5. Insert into local SQLite cache → emit IPC event → renderer updates inbox.
6. Native OS notification fires.

## OAuth / auth flow (for third-party apps using Layer 2)

1. Third-party app sends user to `https://bmail.dev/oauth/v2/authorize?…`
2. Consent screen (Next.js) — user signs in via HandCash or BAP.
3. User approves scopes (`bmail.send`, `bmail.readonly`, etc.).
4. Redirect back with auth code.
5. App exchanges code at `/oauth/v2/token` → JWT access token.
6. JWT carries: `sub` (BAP root), `bmail_handle`, `scope`, `exp`.
7. App calls `/api/v1/users/me/messages.send` with `Authorization: Bearer …`.
8. Layer 2 route validates JWT → translates to native call → mints ordinal
   on user's behalf using **delegated signing** key derived per-app.

**Critical**: Layer 2 server NEVER holds the user's root BAP key. It holds
a per-app delegated key the user authorised at consent time, scoped and
revocable. This mirrors how Google OAuth doesn't expose your password.

## Companion website (already exists)

The Next.js app at `bitcoin-email.vercel.app` does triple duty:

1. **Marketing site** — landing pages, docs, pricing.
2. **Webmail client** — same UX as desktop but in browser, fewer features
   (no background subscription, no local index, ephemeral session).
3. **API host** — Layer 2 REST + Layer 3 OAuth + Discovery doc.

Same Next.js app, just route segments. Already deployed.

## Distribution

| Surface | Channel |
|---|---|
| Desktop macOS | DMG via electron-builder (matches bCorp Mint) |
| Desktop Windows | NSIS installer |
| Desktop Linux | AppImage + deb |
| Web | Vercel (already live) |
| Wallet module | Bundled into bitcoin-wallet builds |
| Chrome extension | Future — would let bMail intercept `mailto:` links |

## Build order (proposed, paired with API layers)

| Step | Layer | Output |
|---|---|---|
| 1 | Core | `packages/bmail-core` skeleton + `message/encode|decode` + tests |
| 2 | Core | `ordinal/mint` + `parse` on testnet, no encryption yet |
| 3 | Core | `encrypt|decrypt` ECDH wrappers with vector tests |
| 4 | Server | Layer 1 native API at `/api/native/*` (calls bmail-core) |
| 5 | Server | Layer 2 P0 endpoints + Discovery doc |
| 6 | Desktop | Electron skeleton (electron-vite scaffold mirroring Mint) |
| 7 | Desktop | Inbox + Compose + Send happy path against testnet |
| 8 | Desktop | Receive + decrypt + local cache + search |
| 9 | Server | OAuth bridge + JWT delegated signing |
| 10 | Shim | `@bopen/bmail-googleapis-shim` npm |
| 11 | Wallet | bitcoin-wallet mail module (read-only first) |

## Open client questions

- **Composer**: rich text editor of choice. Tiptap (Mint uses React, fits
  fine) or Lexical (Meta-backed, modern). Avoid CKEditor/Quill unless
  there's a strong reason.
- **HTML rendering safety**: DOMPurify + sandboxed iframe (Gmail's approach).
- **Attachments size cap**: ordinals on BSV scale, but UX-wise we should
  cap inline attachments (~5MB) and use B-protocol references for larger.
- **Migration story**: import .mbox, IMAP one-shot pull from a Gmail account,
  or "forward bridge" where user sets up a Gmail filter that forwards into
  bMail's SMTP bridge.
- **Branding**: "bMail" or "Bitcoin Email" or "bitcoin-email"? `package.json`
  says `bitcoin-email`, README says "Bitcoin Email", but bMail rolls off
  the tongue and aligns with `$bMail` token convention. Pick one and lock it.

## Cross-project alignment

- **bitcoin-wallet** master-app architecture: mail ordinals = doc ordinals
  with a different manifest schema. Wallet IS the inbox; desktop client is
  the power-user surface.
- **bit-sign**: a sealed document ordinal can be attached to a bMail message
  as an inscription reference — sending a signed contract by mail becomes
  one click.
- **$401 / $402 / $403**: identity = sender BAP; the mail ordinal itself
  is $402 (transferable, payable); a mail containing a securities-class
  ordinal triggers $403 access gating.
- **bCorp Mint**: shares the privacy principle, the Electron stack, the
  HandCash OAuth pattern, and the on-chain-as-source-of-truth model.

---

*Status: sketch. Next action: scaffold `desktop/` with electron-vite mirroring
bCorp Mint's structure, and create `packages/bmail-core` with stub interfaces.*
