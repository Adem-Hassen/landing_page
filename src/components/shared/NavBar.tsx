import '../../styles/Navbar.css';
import Button from './Button';

export default function Navbar() {
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

        <div className="login-section">
          <Button 
            variant="outline"   
            className="btn-glow" 
            size="lg" 
            onClick={() => window.location.href = "#join-us"}
          >
            إنضم معانا توّا 
          </Button>
        </div>
      </nav>
    </header>
  );
}
