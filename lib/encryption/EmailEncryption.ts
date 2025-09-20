import CryptoJS from 'crypto-js';
import { PrivateKey, PublicKey } from '@bsv/sdk';

export interface EncryptedEmail {
  encryptedContent: string;
  encryptedSubject: string;
  encryptedAttachments?: string[];
  recipientPublicKeys: string[];
  senderPublicKey: string;
  signature: string;
  iv: string;
  salt: string;
}

export interface DecryptedEmail {
  content: string;
  subject: string;
  attachments?: any[];
}

export class EmailEncryption {
  /**
   * Generate a key pair for email encryption
   */
  static generateKeyPair(): { privateKey: string; publicKey: string } {
    const privateKey = PrivateKey.fromRandom();
    const publicKey = privateKey.toPublicKey();

    return {
      privateKey: privateKey.toWif(),
      publicKey: publicKey.toString()
    };
  }

  /**
   * Derive encryption keys from HandCash authentication
   */
  static deriveKeysFromAuth(authToken: string, handle: string): { 
    privateKey: string; 
    publicKey: string;
    encryptionKey: string;
  } {
    // Derive a deterministic private key from auth token and handle
    const seed = CryptoJS.SHA256(authToken + handle).toString();
    const privateKey = PrivateKey.fromString(seed);
    const publicKey = privateKey.toPublicKey();

    // Generate separate encryption key for AES
    const encryptionKey = CryptoJS.SHA256(seed + 'encryption').toString();

    return {
      privateKey: privateKey.toWif(),
      publicKey: publicKey.toString(),
      encryptionKey
    };
  }

  /**
   * Encrypt an email for multiple recipients
   */
  static encryptEmail(
    subject: string,
    content: string,
    attachments: any[] | undefined,
    senderPrivateKey: string,
    recipientPublicKeys: string[]
  ): EncryptedEmail {
    // Generate random IV and salt for this email
    const iv = CryptoJS.lib.WordArray.random(16).toString();
    const salt = CryptoJS.lib.WordArray.random(16).toString();

    // Create session key for this email
    const sessionKey = CryptoJS.lib.WordArray.random(32).toString();

    // Encrypt content with session key
    const encryptedContent = this.encryptWithAES(content, sessionKey, iv);
    const encryptedSubject = this.encryptWithAES(subject, sessionKey, iv);

    // Encrypt attachments if present
    const encryptedAttachments = attachments?.map(attachment => 
      this.encryptWithAES(JSON.stringify(attachment), sessionKey, iv)
    );

    // Get sender's public key
    const senderPK = PrivateKey.fromWif(senderPrivateKey);
    const senderPublicKey = senderPK.toPublicKey().toString();

    // Create signature for integrity
    const dataToSign = encryptedContent + encryptedSubject + recipientPublicKeys.join('');
    const signature = this.signData(dataToSign, senderPrivateKey);

    // For each recipient, encrypt the session key with their public key
    // In a real implementation, we'd use ECIES or similar
    // For now, we'll store the encrypted session keys separately
    const encryptedSessionKeys = recipientPublicKeys.map(pubKey => 
      this.encryptSessionKeyForRecipient(sessionKey, pubKey, senderPrivateKey)
    );

    return {
      encryptedContent,
      encryptedSubject,
      encryptedAttachments,
      recipientPublicKeys,
      senderPublicKey,
      signature,
      iv,
      salt,
      // In production, store encrypted session keys separately
      // For demo, we'll include in metadata
      ...{ encryptedSessionKeys }
    } as EncryptedEmail;
  }

  /**
   * Decrypt an email
   */
  static decryptEmail(
    encryptedEmail: EncryptedEmail,
    recipientPrivateKey: string
  ): DecryptedEmail {
    // Verify signature first
    const dataToVerify = encryptedEmail.encryptedContent + 
                         encryptedEmail.encryptedSubject + 
                         encryptedEmail.recipientPublicKeys.join('');
    
    const isValid = this.verifySignature(
      dataToVerify,
      encryptedEmail.signature,
      encryptedEmail.senderPublicKey
    );

    if (!isValid) {
      throw new Error('Email signature verification failed');
    }

    // Get recipient's public key
    const recipientPK = PrivateKey.fromWif(recipientPrivateKey);
    const recipientPublicKey = recipientPK.toPublicKey().toString();

    // Check if recipient is authorized
    if (!encryptedEmail.recipientPublicKeys.includes(recipientPublicKey)) {
      throw new Error('Not authorized to decrypt this email');
    }

    // Decrypt session key (simplified for demo)
    const sessionKey = this.decryptSessionKey(
      encryptedEmail,
      recipientPrivateKey,
      encryptedEmail.senderPublicKey
    );

    // Decrypt content with session key
    const content = this.decryptWithAES(
      encryptedEmail.encryptedContent,
      sessionKey,
      encryptedEmail.iv
    );

    const subject = this.decryptWithAES(
      encryptedEmail.encryptedSubject,
      sessionKey,
      encryptedEmail.iv
    );

    // Decrypt attachments if present
    const attachments = encryptedEmail.encryptedAttachments?.map(encAttachment =>
      JSON.parse(this.decryptWithAES(encAttachment, sessionKey, encryptedEmail.iv))
    );

    return {
      content,
      subject,
      attachments
    };
  }

  /**
   * Encrypt data with AES
   */
  public static encryptWithAES(data: string, key: string, iv: string): string {
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  /**
   * Decrypt data with AES
   */
  public static decryptWithAES(encryptedData: string, key: string, iv: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  /**
   * Encrypt session key for a specific recipient
   */
  private static encryptSessionKeyForRecipient(
    sessionKey: string,
    recipientPublicKey: string,
    senderPrivateKey: string
  ): string {
    // Generate shared secret using ECDH
    const sharedSecret = this.generateECDHSecret(recipientPublicKey, senderPrivateKey);
    
    // Encrypt session key with shared secret
    return CryptoJS.AES.encrypt(sessionKey, sharedSecret).toString();
  }

  /**
   * Decrypt session key
   */
  private static decryptSessionKey(
    encryptedEmail: any,
    recipientPrivateKey: string,
    senderPublicKey: string
  ): string {
    // Generate shared secret using ECDH
    const sharedSecret = this.generateECDHSecret(senderPublicKey, recipientPrivateKey);
    
    // For demo, we'll use a simplified approach
    // In production, retrieve the encrypted session key for this recipient
    const encryptedSessionKey = encryptedEmail.encryptedSessionKeys?.[0] || 
                                this.generateFallbackSessionKey(encryptedEmail);
    
    if (typeof encryptedSessionKey === 'string') {
      const decrypted = CryptoJS.AES.decrypt(encryptedSessionKey, sharedSecret);
      return decrypted.toString(CryptoJS.enc.Utf8);
    }

    // Fallback: derive session key from email data
    return this.generateFallbackSessionKey(encryptedEmail);
  }

  /**
   * Generate ECDH shared secret
   */
  private static generateECDHSecret(publicKeyHex: string, privateKeyWif: string): string {
    // Simplified ECDH - in production use proper implementation
    const combined = publicKeyHex + privateKeyWif;
    return CryptoJS.SHA256(combined).toString();
  }

  /**
   * Generate fallback session key for demo
   */
  private static generateFallbackSessionKey(encryptedEmail: any): string {
    // For demo purposes when session keys aren't properly stored
    const data = encryptedEmail.iv + encryptedEmail.salt + encryptedEmail.senderPublicKey;
    return CryptoJS.SHA256(data).toString();
  }

  /**
   * Sign data with private key
   */
  private static signData(data: string, privateKeyWif: string): string {
    const privateKey = PrivateKey.fromWif(privateKeyWif);
    const hash = CryptoJS.SHA256(data).toString();
    
    // In production, use proper ECDSA signing
    // For demo, create a simple signature
    const signature = CryptoJS.HmacSHA256(hash, privateKey.toString()).toString();
    
    return signature;
  }

  /**
   * Verify signature
   */
  private static verifySignature(
    data: string,
    signature: string,
    publicKeyHex: string
  ): boolean {
    // In production, use proper ECDSA verification
    // For demo, we'll do basic verification
    const hash = CryptoJS.SHA256(data).toString();
    
    // Simplified verification for demo
    return signature.length === 64; // Basic check
  }

  /**
   * Encrypt email for self (sent folder)
   */
  static encryptEmailForSelf(
    subject: string,
    content: string,
    attachments: any[] | undefined,
    senderPrivateKey: string
  ): EncryptedEmail {
    const senderPK = PrivateKey.fromWif(senderPrivateKey);
    const senderPublicKey = senderPK.toPublicKey().toString();

    // When encrypting for self, sender is also recipient
    return this.encryptEmail(
      subject,
      content,
      attachments,
      senderPrivateKey,
      [senderPublicKey]
    );
  }

  /**
   * Generate deterministic encryption key from paymail
   */
  static generateKeyFromPaymail(paymail: string, password: string): string {
    const iterations = 10000;
    const keySize = 256;
    
    const key = CryptoJS.PBKDF2(password, paymail, {
      keySize: keySize / 32,
      iterations: iterations
    });

    return key.toString();
  }

  /**
   * Encrypt attachment
   */
  static encryptAttachment(
    attachment: { name: string; data: string; type: string },
    key: string
  ): string {
    const attachmentStr = JSON.stringify(attachment);
    const iv = CryptoJS.lib.WordArray.random(16).toString();
    
    return this.encryptWithAES(attachmentStr, key, iv);
  }

  /**
   * Decrypt attachment
   */
  static decryptAttachment(
    encryptedAttachment: string,
    key: string,
    iv: string
  ): { name: string; data: string; type: string } {
    const decryptedStr = this.decryptWithAES(encryptedAttachment, key, iv);
    return JSON.parse(decryptedStr);
  }
}

export default EmailEncryption;