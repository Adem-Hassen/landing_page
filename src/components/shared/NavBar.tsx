import { useState } from 'react';
import '../../styles/Navbar.css';
import Button from './Button';



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
            href="#" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            E-com Academy
          </a>
        </div>
        
        {/* Mobile menu button */}
    
        
        {/* Desktop navigation */}

        
        {/* Desktop login button */}
        <div className="login-section">
          <Button 
            variant="outline"   
            className="btn-glow" 
            size="lg" 
            onClick={() => window.location.href = "#join-us"}
          >
            Join Us 
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
  
    </header>
  );
}
