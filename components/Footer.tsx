import React from 'react';
import Link from 'next/link';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">THE BITCOIN CORPORATION LTD</h3>
          <p className="footer-company-info">
            UK Company No. 16735102<br />
            Registered in England and Wales<br />
            Making Bitcoin Work Again™
          </p>
          <p className="footer-ceo">
            Richard Boase, CEO<br/>
            <span style={{fontSize: '12px', opacity: 0.8}}>Spamsom Mo, CSO</span>
          </p>
        </div>

        <div className="footer-section">
          <h4>Products</h4>
          <ul className="footer-links">
            <li><Link href="/">Bitcoin Email</Link></li>
            <li><Link href="/bitcoin-drive">Bitcoin Drive</Link></li>
            <li><Link href="/bitcoin-spreadsheets">Bitcoin Spreadsheets</Link></li>
            <li><Link href="/token">$BMAIL Token</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Community</h4>
          <ul className="footer-links">
            <li><Link href="/spam">SPAM Newsletter</Link></li>
            <li><Link href="/contributions">Contribute</Link></li>
            <li><Link href="/contracts">Contracts</Link></li>
            <li><Link href="/jobs">Jobs</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul className="footer-links">
            <li><a href="https://github.com/bitcoin-apps-suite/bitcoin-email" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://x.com/bitcoin_email" target="_blank" rel="noopener noreferrer">Twitter/X</a></li>
            <li><Link href="/whitepaper">Whitepaper</Link></li>
            <li><a href="https://docs.google.com/spreadsheets/d/19-03yFsEtoKE3_gDt7ub-b2Ed729IEIlroG6GPjPn98" target="_blank" rel="noopener noreferrer">Campaign Tracker</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            © 2025 THE BITCOIN CORPORATION LTD (16735102). All rights reserved.
          </p>
          <p className="footer-tagline">
            BTC has been terminated for cause. BSV is the approved implementation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;