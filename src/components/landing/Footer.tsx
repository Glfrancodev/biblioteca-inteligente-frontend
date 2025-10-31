import { Book } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo-wrapper">
            <div className="footer-logo">
              <Book className="footer-logo-icon" />
            </div>
            <div className="footer-brand-text">
              <h3 className="footer-brand-name">BiblioTech FICCT</h3>
              <p className="footer-brand-subtitle">Universidad Autónoma Gabriel René Moreno</p>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <p>© {currentYear} FICCT - UAGRM. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
