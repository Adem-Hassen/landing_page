import '../../styles/Footer.css';
import { FaPhone } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import { RiContractFill } from "react-icons/ri";

export default function Footer() {
  return (
<footer className="footer-section">
  <div className="footer-container">
    {/* Copyright Text */}
    <div className="footer-copyright">
      <p>© 2025 Ecom Academy by Mohamed Aziz Eltaief</p>
    </div>
    
    {/* Links with Icons */}
    <div className="footer-links">
      <a href="#" className="footer-link">
        <span className="footer-icon"><RiContractFill  size={"1.5em"} /></span>
        الشروط
      </a>
      <a href="#" className="footer-link">
        <span className="footer-icon"><FaShield  size={"1.5em"} />
</span>
        الخصوصية
      </a>
      <a href="#section9" className="footer-link">
        <span className="footer-icon"><FaPhone size={"1.5em"} /></span>
        التواصل
      </a>
      <a href="https://www.instagram.com/aziz_eltaief_" className="footer-link">
        <span className="footer-icon"><FaInstagram size={"1.5em"} />
</span>
        Instagram
      </a>
    </div>
  </div>
</footer>
  );
}
