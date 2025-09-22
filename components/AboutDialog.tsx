'use client';

import React, { useEffect } from 'react';
import './AboutDialog.css';

interface AboutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutDialog: React.FC<AboutDialogProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="about-dialog-overlay" onClick={onClose}>
      <div className="about-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="about-header">
          <div className="about-logo">
            <span className="bitcoin-symbol">₿</span>
          </div>
          <h2>Bitcoin Email</h2>
          <p className="version">Version 0.1.0</p>
        </div>
        
        <div className="about-content">
          <div className="company-info">
            <h3>THE BITCOIN CORPORATION LTD</h3>
            <p>UK Company No. 16735102</p>
          </div>
          
          <div className="about-section">
            <h4>About</h4>
            <p>The world's first blockchain-powered email client. Send encrypted emails, manage mailing lists, and tokenize your email newsletters - all powered by Bitcoin.</p>
          </div>
          
          <div className="about-section">
            <h4>License</h4>
            <p>Open BSV License 4.0</p>
            <p className="copyright">Copyright © 2025 THE BITCOIN CORPORATION LTD</p>
            <p className="copyright">All rights reserved</p>
          </div>
          
          <div className="about-section">
            <h4>Contact</h4>
            <p>Email: <a href="mailto:ceo@thebitcoincorporation.com">ceo@thebitcoincorporation.com</a></p>
            <p>Website: <a href="https://bitcoin-email.vercel.app" target="_blank" rel="noopener noreferrer">bitcoin-email.vercel.app</a></p>
            <p>GitHub: <a href="https://github.com/bitcoin-apps-suite/bitcoin-email" target="_blank" rel="noopener noreferrer">github.com/bitcoin-apps-suite/bitcoin-email</a></p>
          </div>
          
          <div className="about-section legal">
            <h4>Legal Notice</h4>
            <p>This software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement.</p>
            <p>In no event shall THE BITCOIN CORPORATION LTD or contributors be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.</p>
          </div>
        </div>
        
        <div className="about-footer">
          <button className="about-close-btn" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default AboutDialog;