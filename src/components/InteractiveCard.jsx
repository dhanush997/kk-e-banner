import React from 'react'
import { Twitter, Instagram, Github } from 'lucide-react'

export default function InteractiveCard() {
  return (
    <div className="glass-card">
      {/* Dynamic Image Logo with typographic HTML Fallback */}
      <div className="logo-img-container">
        <img 
          src="/kk_brand_logo.png" 
          alt="KK Logo" 
          className="brand-logo-img"
          onError={(e) => {
            // Hide image and show text-based logo if the asset fails to load
            e.target.style.display = 'none';
            const fallbackNode = e.target.nextSibling;
            if (fallbackNode) fallbackNode.style.display = 'inline-flex';
          }}
        />
        <span className="logo-text-hm" style={{ display: 'none' }}>
          K<span>K</span>
        </span>
      </div>
      
      {/* Brand Subtitle */}
      <div className="brand-subtitle">Official Online Store</div>

      {/* Modern Status Badge */}
      <div className="status-badge">
        <span className="status-dot"></span>
        Website Maintenance
      </div>

      {/* Editorial Title & Description */}
      <h1 className="main-title">Website Under Maintenance</h1>
      <p className="description">
        We are currently conducting scheduled technical upgrades and database optimization on our platform. Our online flagship boutique will return shortly with improved performance.
      </p>

      {/* Minimal Footer */}
      <div className="footer-links">
        <a href="#twitter" aria-label="Twitter link" className="social-icon-btn">
          <Twitter size={18} />
        </a>
        <a href="#instagram" aria-label="Instagram link" className="social-icon-btn">
          <Instagram size={18} />
        </a>
        <a href="#github" aria-label="Github link" className="social-icon-btn">
          <Github size={18} />
        </a>
      </div>
    </div>
  )
}
