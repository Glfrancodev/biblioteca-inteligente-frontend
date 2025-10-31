import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Book } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Verificar si está autenticado
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Obtener información del usuario
    authService.getCurrentUser()
      .then(user => {
        setUserName(user.nombre);
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-header">
          <div className="home-logo">
            <Book />
            <h1>BiblioTech</h1>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>

        <div className="home-content">
          <div className="welcome-card">
            <h2>¡Bienvenido{userName ? `, ${userName}` : ''}! 🎉</h2>
            <p>Has iniciado sesión exitosamente.</p>
            <p className="coming-soon">Esta página está en construcción. Próximamente verás aquí:</p>
            <ul className="features-list">
              <li>📚 Tu biblioteca personal</li>
              <li>🎯 Recomendaciones personalizadas</li>
              <li>📊 Estadísticas de lectura</li>
              <li>⭐ Libros favoritos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
