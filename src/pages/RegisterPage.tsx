import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Book, User, Mail, Phone, Lock, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { authService } from '../services/authService';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    registro: '',
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Limpiar error al escribir
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError('');

    // Validaciones
    if (!formData.registro || !formData.nombre || !formData.email || 
        !formData.telefono || !formData.password || !formData.confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!formData.email.endsWith('@uagrm.edu.bo')) {
      setError('Solo se permiten correos institucionales de la UAGRM');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setIsLoading(true);

    try {
      // Preparar datos para el backend (sin confirmPassword)
      const { confirmPassword, ...registerData } = formData;
      
      await authService.register(registerData);
      
      // Redirigir al login con mensaje de éxito
      navigate('/login', { 
        state: { 
          message: 'Cuenta creada exitosamente. Por favor inicia sesión.' 
        } 
      });
    } catch (err: any) {
      console.error('Error de registro:', err);
      
      // Manejar errores específicos del backend
      if (err.response?.data?.error?.code === 'USER_003') {
        setError('Este correo electrónico ya está registrado');
      } else if (err.response?.data?.error?.code === 'USER_004') {
        setError('Este número de registro ya está en uso');
      } else {
        setError(err.response?.data?.error?.message || 'Error al crear la cuenta. Intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left Side - Info */}
        <div className="register-info-section">
          <div className="register-info-content">
            <div className="info-badge">
              <Sparkles className="info-badge-icon" />
              Únete a BiblioTech
            </div>
            
            <h1 className="info-title">
              Comienza tu viaje de aprendizaje personalizado
            </h1>
            
            <p className="info-description">
              Accede a una biblioteca inteligente diseñada específicamente para estudiantes de Ingeniería en Sistemas de la UAGRM.
            </p>

            <div className="info-stats">
              <div className="info-stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">Libros de Programación</div>
              </div>
              
              <div className="info-stat-card">
                <div className="stat-number">1,200+</div>
                <div className="stat-label">Estudiantes Activos</div>
              </div>
              
              <div className="info-stat-card">
                <div className="stat-number">98%</div>
                <div className="stat-label">Satisfacción</div>
              </div>
              
              <div className="info-stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Acceso Digital</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="register-form-section">
          <div className="register-form-content">
            <div className="register-header">
              <div className="register-logo">
                <div className="register-logo-icon">
                  <Book />
                </div>
                <div className="register-logo-text">
                  <h2>BiblioTech</h2>
                  <p>FICCT - UAGRM</p>
                </div>
              </div>

              <h1 className="register-title">Crea tu cuenta</h1>
              <p className="register-subtitle">
                Únete a la comunidad académica de la FICCT
              </p>
            </div>

            <form className="register-form" onSubmit={handleSubmit} noValidate>
              {error && (
                <div className="error-message">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Juan Pérez García"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Institucional</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu.correo@uagrm.edu.bo"
                    disabled={isLoading}
                  />
                </div>
                <p className="input-hint">Solo correos institucionales de la UAGRM</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="registro">Registro</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={20} />
                    <input
                      type="text"
                      id="registro"
                      name="registro"
                      value={formData.registro}
                      onChange={handleChange}
                      placeholder="220001234"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <div className="input-wrapper">
                    <Phone className="input-icon" size={20} />
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="77123456"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 8 caracteres"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  disabled={isLoading}
                />
                <label htmlFor="acceptTerms">
                  Acepto los{' '}
                  <a href="#" className="terms-link">Términos de Servicio</a>
                  {' '}y la{' '}
                  <a href="#" className="terms-link">Política de Privacidad</a>
                  {' '}de BiblioTech
                </label>
              </div>

              <button 
                type="submit" 
                className="register-button"
                disabled={isLoading}
              >
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                <ArrowRight className="button-arrow" size={20} />
              </button>

              <p className="login-link">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login">Inicia sesión</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
