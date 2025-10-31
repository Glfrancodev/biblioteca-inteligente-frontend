import { Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="logo-container">
            <Book className="logo-icon" />
          </div>
          <div className="brand-text">
            <h1 className="brand-name">BiblioTech</h1>
            <p className="brand-subtitle">FICCT - UAGRM</p>
          </div>
        </div>
        
        <div className="navbar-links">
          <a href="#" className="nav-link">Acerca de</a>
          <a href="#caracteristicas" className="nav-link">Características</a>
          <a href="#como-funciona" className="nav-link">Cómo Funciona</a>
        </div>
        
        <div className="navbar-actions">
          <button className="btn-login" onClick={() => navigate('/login')}>Iniciar Sesión</button>
          <button className="btn-register" onClick={() => navigate('/register')}>Registrarse</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
