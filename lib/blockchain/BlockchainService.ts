import { Transaction, Script, PrivateKey, PublicKey, Hash, OpCode } from '@bsv/sdk';
import CryptoJS from 'crypto-js';

export interface EmailMetadata {
  id: string;
  from: string;
  to: string[];
  subject: string;
  timestamp: number;
  encrypted: boolean;
  hash: string;
  txId?: string;
  blockHeight?: number;
}

export interface BlockchainEmail {
  metadata: EmailMetadata;
  encryptedContent: string;
  attachmentHashes?: string[];
}

export class BlockchainService {
  private network: 'mainnet' | 'testnet';
  private nodeUrl: string;

  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = network;
    this.nodeUrl = network === 'mainnet' 
      ? 'https://api.whatsonchain.com/v1/bsv/main'
      : 'https://api.whatsonchain.com/v1/bsv/test';
  }

  /**
   * Store email on blockchain
   */
  async storeEmail(
    email: BlockchainEmail,
    privateKey: PrivateKey
  ): Promise<{ txId: string; fee: number }> {
    try {
      // Create email hash for verification
      const emailHash = this.hashEmail(email);
      email.metadata.hash = emailHash;

      // Prepare data for blockchain storage
      const dataToStore = this.prepareEmailData(email);

      // Create transaction with OP_RETURN
      const tx = await this.createEmailTransaction(dataToStore, privateKey);

      // Broadcast transaction
      const txId = await this.broadcastTransaction(tx);

      return {
        txId,
        fee: tx.getFee()
      };
    } catch (error) {
      console.error('Failed to store email on blockchain:', error);
      throw error;
    }
  }

  /**
   * Retrieve email from blockchain
   */
  async retrieveEmail(txId: string): Promise<BlockchainEmail | null> {
    try {
      // Fetch transaction from blockchain
      const txData = await this.getTransaction(txId);
      if (!txData) return null;

      // Extract email data from OP_RETURN
      const emailData = this.extractEmailData(txData);
      if (!emailData) return null;

      // Parse and return email
      return JSON.parse(emailData) as BlockchainEmail;
    } catch (error) {
      console.error('Failed to retrieve email from blockchain:', error);
      return null;
    }
  }

  /**
   * Encrypt email content
   */
  encryptEmail(content: string, recipientPublicKey: string, senderPrivateKey: string): string {
    // Generate shared secret using ECDH
    const sharedSecret = this.generateSharedSecret(recipientPublicKey, senderPrivateKey);
    
    // Encrypt content with AES using shared secret
    const encrypted = CryptoJS.AES.encrypt(content, sharedSecret).toString();
    
    return encrypted;
  }

  /**
   * Decrypt email content
   */
  decryptEmail(encryptedContent: string, senderPublicKey: string, recipientPrivateKey: string): string {
    // Generate shared secret using ECDH
    const sharedSecret = this.generateSharedSecret(senderPublicKey, recipientPrivateKey);
    
    // Decrypt content with AES using shared secret
    const decrypted = CryptoJS.AES.decrypt(encryptedContent, sharedSecret);
    
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  /**
   * Search emails by address
   */
  async searchEmailsByAddress(address: string): Promise<EmailMetadata[]> {
    try {
      // Get all transactions for address
      const response = await fetch(`${this.nodeUrl}/address/${address}/history`);
      const transactions = await response.json();

      const emails: EmailMetadata[] = [];

      // Process each transaction
      for (const tx of transactions) {
        const emailData = await this.retrieveEmail(tx.tx_hash);
        if (emailData) {
          emails.push(emailData.metadata);
        }
      }

      return emails;
    } catch (error) {
      console.error('Failed to search emails:', error);
      return [];
    }
  }

  /**
   * Verify email integrity
   */
  verifyEmail(email: BlockchainEmail): boolean {
    const currentHash = this.hashEmail(email);
    return currentHash === email.metadata.hash;
  }

  /**
   * Private helper methods
   */
  private hashEmail(email: BlockchainEmail): string {
    const dataToHash = JSON.stringify({
      from: email.metadata.from,
      to: email.metadata.to,
      subject: email.metadata.subject,
      content: email.encryptedContent,
      timestamp: email.metadata.timestamp
    });

    return CryptoJS.SHA256(dataToHash).toString();
  }

  private prepareEmailData(email: BlockchainEmail): Buffer {
    // Convert email to JSON and compress
    const jsonStr = JSON.stringify(email);
    
    // For large emails, we store hash on-chain and content on IPFS
    if (jsonStr.length > 80000) {
      // Store on IPFS and return hash reference
      // This would integrate with IPFS in production
      const ipfsHash = this.storeOnIPFS(jsonStr);
      return Buffer.from(JSON.stringify({
        type: 'email_ref',
        ipfs: ipfsHash,
        hash: email.metadata.hash
      }));
    }

    return Buffer.from(jsonStr);
  }

  private async createEmailTransaction(
    data: Buffer,
    privateKey: PrivateKey
  ): Promise<Transaction> {
    const tx = new Transaction();

    // Add OP_RETURN output with email data
    const script = new Script()
      .writeOpCode(OpCode.OP_RETURN)
      .writeBuffer(Buffer.from('BMAIL')) // Protocol identifier
      .writeBuffer(data);

    tx.addOutput({
      script,
      satoshis: 0
    });

    // Add funding input (simplified - would need UTXO management)
    // This is a placeholder - real implementation needs proper UTXO handling
    tx.addInput({
      prevTxId: 'placeholder',
      outputIndex: 0,
      script: Script.fromAddress(privateKey.toAddress())
    });

    // Sign transaction
    tx.sign(privateKey);

    return tx;
  }

  private async broadcastTransaction(tx: Transaction): Promise<string> {
    const hexTx = tx.toHex();

    const response = await fetch(`${this.nodeUrl}/tx/raw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txhex: hexTx })
    });

    if (!response.ok) {
      throw new Error('Failed to broadcast transaction');
    }

    const result = await response.json();
    return result.txid;
  }

  private async getTransaction(txId: string): Promise<any> {
    const response = await fetch(`${this.nodeUrl}/tx/${txId}`);
    
    if (!response.ok) {
      return null;
    }

    return response.json();
  }

  private extractEmailData(txData: any): string | null {
    // Find OP_RETURN output
    for (const output of txData.vout) {
      if (output.scriptPubKey?.asm?.startsWith('OP_RETURN')) {
        // Extract data after OP_RETURN and protocol identifier
        const hex = output.scriptPubKey.hex;
        const data = hex.substring(12); // Skip OP_RETURN and BMAIL prefix
        return Buffer.from(data, 'hex').toString('utf8');
      }
    }

    return null;
  }

  private generateSharedSecret(publicKeyStr: string, privateKeyStr: string): string {
    // Simplified ECDH - in production use proper ECDH implementation
    // This is a placeholder for the shared secret generation
    return CryptoJS.SHA256(publicKeyStr + privateKeyStr).toString();
  }

  private storeOnIPFS(data: string): string {
    // Placeholder for IPFS integration
    // In production, this would upload to IPFS and return the hash
    return CryptoJS.SHA256(data).toString();
  }

  /**
   * Calculate transaction fee
   */
  calculateFee(dataSize: number): number {
    // BSV fee calculation (1 sat/byte typical)
    const baseTxSize = 200; // Base transaction size
    const totalSize = baseTxSize + dataSize;
    return totalSize; // 1 sat per byte
  }

  /**
   * Batch store multiple emails
   */
  async batchStoreEmails(
    emails: BlockchainEmail[],
    privateKey: PrivateKey
  ): Promise<{ txId: string; fee: number }[]> {
    const results = [];

    for (const email of emails) {
      const result = await this.storeEmail(email, privateKey);
      results.push(result);
    }

    return results;
  }
}

export default BlockchainService;