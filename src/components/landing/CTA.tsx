import { Zap, Brain, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CTA.css';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Comienza a Optimizar tu Aprendizaje Hoy</h2>
        <p className="cta-description">
          Únete a la comunidad de estudiantes de la FICCT que están transformando su forma de aprender programación
        </p>

        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon blue">
              <Zap />
            </div>
            <h3 className="benefit-title">Acceso Inmediato</h3>
            <p className="benefit-text">Regístrate con tu correo institucional y accede al catálogo completo en segundos</p>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon green">
              <Brain />
            </div>
            <h3 className="benefit-title">Recomendaciones Precisas</h3>
            <p className="benefit-text">Algoritmos de ML que aprenden de tus preferencias para sugerirte el contenido ideal</p>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon cyan">
              <TrendingUp />
            </div>
            <h3 className="benefit-title">Seguimiento de Progreso</h3>
            <p className="benefit-text">Visualiza tu evolución y establece metas personalizadas de aprendizaje</p>
          </div>
        </div>

        <div className="cta-actions">
          <button className="btn-cta-primary" onClick={() => navigate('/login')}>Crear Cuenta Gratis</button>
          <button className="btn-cta-secondary">Explorar Catálogo</button>
        </div>

        <p className="cta-note">
          Solo para estudiantes de la FICCT con correo institucional @uagrm.edu.bo
        </p>
      </div>
    </section>
  );
};

export default CTA;
