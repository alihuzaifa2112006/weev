import React from 'react';
import { ChevronDown } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="weev-footer">
      <div className="weev-footer-container">
        
        {/* Left Side */}
        <div className="footer-left">
          <div className="footer-logo">
            <img src="/icon.png" alt="WEEV" className="footer-logo-img" />
          </div>
          <span className="footer-copyright">@2026 Weev, Inc.</span>
          <span className="footer-divider">|</span>
          <a href="#" className="footer-link">Privacy Policy</a>
          <span className="footer-divider">|</span>
          <a href="#" className="footer-link">Terms of Use</a>
        </div>

        {/* Right Side */}
        <div className="footer-right">
          <div className="currency-selector">
            <span>EUR €</span>
            <ChevronDown size={14} />
          </div>
          <span className="footer-divider">|</span>
          <a href="#" className="footer-link">Contact us</a>
        </div>

      </div>
    </footer>
  );
}
