import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Book, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { authService } from '../services/authService';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Verificar si viene un mensaje de éxito desde el registro
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Limpiar el state para que no se muestre de nuevo si recarga
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      
      if (response.success) {
        // Guardar token en localStorage
        authService.saveAuthData(response.data.access_token, response.data.expires_in);
        
        // Redirigir a home
        navigate('/home');
      }
    } catch (err: any) {
      console.error('Error de login:', err);
      const errorMessage = err.response?.data?.error?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left side - Form */}
        <div className="login-form-section">
          <div className="login-form-content">
            <div className="login-header">
              <div className="login-logo">
                <div className="login-logo-icon">
                  <Book />
                </div>
                <div className="login-logo-text">
                  <h2>BiblioTech</h2>
                  <p>FICCT - UAGRM</p>
                </div>
              </div>

              <h1 className="login-title">Bienvenido de nuevo</h1>
              <p className="login-subtitle">Ingresa tus credenciales para acceder a tu cuenta</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form" noValidate>
              {successMessage && (
                <div className="success-message">
                  <CheckCircle size={18} />
                  <span>{successMessage}</span>
                </div>
              )}

              {error && (
                <div className="error-message">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="tu.correo@uagrm.edu.bo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-group-header">
                  <label htmlFor="password">Contraseña</label>
                  <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>¿Olvidaste tu contraseña?</a>
                </div>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">Mantener sesión iniciada</label>
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                {!loading && <span className="button-arrow">→</span>}
              </button>

              <p className="register-link">
                ¿No tienes una cuenta? <Link to="/register">Regístrate gratis</Link>
              </p>

              <p className="terms-text">
                Al continuar, aceptas nuestros <a href="#" onClick={(e) => e.preventDefault()}>Términos de Servicio</a> y{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>Política de Privacidad</a>
              </p>
            </form>
          </div>
        </div>

        {/* Right side - Info */}
        <div className="login-info-section">
          <div className="login-info-content">
            <div className="info-badge">
              <Book className="info-badge-icon" />
              <span>Recomendaciones Inteligentes</span>
            </div>

            <h2 className="info-title">
              Tu biblioteca académica potenciada con Machine Learning
            </h2>

            <p className="info-description">
              Descubre libros personalizados según tus intereses, historial de lectura y preferencias académicas. Sistema inteligente diseñado para estudiantes de la FICCT.
            </p>

            <div className="info-features">
              <div className="info-feature">
                <div className="feature-number">1</div>
                <div className="feature-content">
                  <h3>Recomendaciones Personalizadas</h3>
                  <p>Algoritmos ML que aprenden de tus patrones de lectura</p>
                </div>
              </div>

              <div className="info-feature">
                <div className="feature-number">2</div>
                <div className="feature-content">
                  <h3>Catálogo Especializado</h3>
                  <p>Libros de programación y tecnología actualizados</p>
                </div>
              </div>

              <div className="info-feature">
                <div className="feature-number">3</div>
                <div className="feature-content">
                  <h3>Análisis de Progreso</h3>
                  <p>Visualiza tu evolución y estadísticas de lectura</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
