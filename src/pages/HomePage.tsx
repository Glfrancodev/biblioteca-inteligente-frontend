import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { preferencesService } from '../services/preferencesService';
import { Book } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si está autenticado
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Obtener información del usuario y verificar preferencias
    const initializeUser = async () => {
      try {
        setLoading(true);
        const [user, preferences] = await Promise.all([
          authService.getCurrentUser(),
          preferencesService.getMyPreferences(),
        ]);

        setUserName(user.nombre);

        // Si no tiene preferencias, redirigir al onboarding
        if (!preferences) {
          navigate('/onboarding');
        }
      } catch (error) {
        console.error('Error al inicializar usuario:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="home-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

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
