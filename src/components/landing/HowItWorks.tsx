import { Users, Search, Brain } from 'lucide-react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="how-it-works">
      <div className="how-it-works-container">
        <div className="how-header">
          <div className="badge-simple">
            <span className="badge-dot"></span>
            Proceso Simple y Efectivo
          </div>
          <h2 className="section-title-dark">Cómo Funciona</h2>
          <p className="section-subtitle">
            Tres pasos simples para comenzar a recibir recomendaciones inteligentes personalizadas
          </p>
        </div>

        <div className="steps-container">
          <div className="step-line"></div>
          
          <div className="step">
            <div className="step-number-wrapper">
              <div className="step-number blue">01</div>
            </div>
            <div className="step-content">
              <div className="step-icon-box blue">
                <Users className="step-icon" />
              </div>
              <h3 className="step-title">Crea tu Perfil</h3>
              <p className="step-description">
                Regístrate con tu correo institucional @uagrm.edu.bo y completa tu perfil indicando tus intereses, nivel de experiencia y lenguajes de programación favoritos.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number-wrapper">
              <div className="step-number green">02</div>
            </div>
            <div className="step-content">
              <div className="step-icon-box green">
                <Search className="step-icon" />
              </div>
              <h3 className="step-title">Explora el Catálogo</h3>
              <p className="step-description">
                Navega por más de 500 libros especializados en programación. Usa filtros avanzados por lenguaje, nivel de dificultad y tema para encontrar exactamente lo que necesitas.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number-wrapper">
              <div className="step-number cyan">03</div>
            </div>
            <div className="step-content">
              <div className="step-icon-box cyan">
                <Brain className="step-icon" />
              </div>
              <h3 className="step-title">Recibe Recomendaciones</h3>
              <p className="step-description">
                Nuestro sistema de Machine Learning analiza tus lecturas, preferencias y patrones de comportamiento para sugerirte los libros perfectos que acelerarán tu aprendizaje.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
