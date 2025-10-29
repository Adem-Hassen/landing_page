import { useState } from 'react';
import './Navbar.css';
import Button from './Button.tsx';

const navigation = [
  { name: 'Section 1', href: '#section1' },
  { name: 'Section 2 ', href: '#section2' },
  { name: 'Section 3', href: '#section3' },
  { name: 'Section 4', href: '#section4' },
  { name: 'Section 5', href: '#section5' },
  { name: 'Section 6', href: '#section6' },
  { name: 'Section 7', href: '#section7' },
  { name: 'Section 8', href: '#section8' },
    { name: 'Section 9', href: '#section9' },

      { name: 'Section 10', href: '#section10' },

];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll function
  const handleSmoothScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setMobileMenuOpen(false); // Close mobile menu after click
  };

  // Handle regular anchor clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    handleSmoothScroll(href);
  };

  return (
    <header className="navbar">
      <nav className="nav-container">
        <div className="logo">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            E-com Academy
          </a>
        </div>
        
        {/* Mobile menu button */}
        <div className="mobile-menu-button">
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
        
        {/* Desktop navigation */}
        <div className="desktop-nav">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.name}
            </a>
          ))}
        </div>
        
        {/* Desktop login button */}
        <div className="login-section">
          <Button 
            variant="outline"   
            className="btn-glow" 
            size="lg" 
            onClick={() => handleSmoothScroll('#pricing')}
          >
            Buy Now 
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="mobile-menu-panel">
          <div className="mobile-menu-header">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              E-com Academy
            </a>
            <button
              type="button"
              className="close-button"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <div className="close-icon">×</div>
            </button>
          </div>
          <div className="mobile-nav-items">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#pricing"
              className="mobile-login-link"
              onClick={(e) => handleNavClick(e, '#pricing')}
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}