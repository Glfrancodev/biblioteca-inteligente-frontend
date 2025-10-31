import { Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-badge">
          <Sparkles className="badge-icon" />
          <span>Recomendaciones Inteligentes con Machine Learning</span>
        </div>
        
        <h1 className="hero-title">
          Biblioteca <span className="title-highlight">Inteligente</span>
          <br />
          para Estudiantes de Programación
        </h1>
        
        <p className="hero-description">
          Accede al catálogo completo de libros de programación de la FICCT.
          <br />
          Recibe recomendaciones personalizadas basadas en tus intereses y patrones de lectura.
        </p>
        
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate('/login')}>
            <Zap className="btn-icon" />
            Comenzar Ahora
          </button>
          <button className="btn-secondary">Explorar Catálogo</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
