import { Brain, Search, BookOpen, BarChart3, Target, Zap, TrendingUp } from 'lucide-react';
import './Features.css';

const Features = () => {
  return (
    <section id="caracteristicas" className="features">
      <div className="features-container">
        <div className="features-header">
          <div className="badge-tech">
            <Zap className="badge-icon-small" />
            Tecnología de Vanguardia
          </div>
          <h2 className="section-title">
            Características que Transforman tu <span className="text-highlight">Aprendizaje</span>
          </h2>
          <p className="section-description">
            Una plataforma completa diseñada para potenciar tu experiencia académica con tecnología inteligente
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card large">
            <div className="feature-icon-wrapper blue">
              <Brain className="feature-icon" />
            </div>
            <h3 className="feature-title">Recomendaciones Inteligentes con Machine Learning</h3>
            <p className="feature-description">
              Nuestros algoritmos avanzados de ML analizan tus preferencias declaradas, historial de lectura y patrones de comportamiento para sugerirte los libros más relevantes.
            </p>
            <div className="feature-tags">
              <span className="tag">Filtrado Colaborativo</span>
              <span className="tag">Análisis de Contenido</span>
              <span className="tag">Sistema Híbrido</span>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper cyan">
              <Search className="feature-icon" />
            </div>
            <h3 className="feature-title">Búsqueda Avanzada</h3>
            <p className="feature-description">
              Encuentra exactamente lo que necesitas con filtros por lenguaje, nivel, tema y más.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper green">
              <BarChart3 className="feature-icon" />
            </div>
            <h3 className="feature-title">Análisis de Patrones</h3>
            <p className="feature-description">
              Visualiza tu historial y descubre tendencias en tus intereses de aprendizaje.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper orange">
              <BookOpen className="feature-icon" />
            </div>
            <h3 className="feature-title">Catálogo Especializado en Programación</h3>
            <p className="feature-description">
              Acceso a más de 500 libros especializados en múltiples lenguajes y tecnologías.
            </p>
            <div className="language-tags">
              <span className="lang-tag python">Python</span>
              <span className="lang-tag java">Java</span>
              <span className="lang-tag javascript">JavaScript</span>
              <span className="lang-tag cpp">C++</span>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper teal">
              <Target className="feature-icon" />
            </div>
            <h3 className="feature-title">Perfil Personalizado</h3>
            <p className="feature-description">
              Declara tus intereses y nivel para recibir recomendaciones más precisas.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper green-alt">
              <TrendingUp className="feature-icon" />
            </div>
            <h3 className="feature-title">Seguimiento de Progreso</h3>
            <p className="feature-description">
              Registra tu avance y establece metas de aprendizaje personalizadas.
            </p>
          </div>

          <div className="feature-card highlight">
            <div className="feature-icon-wrapper blue-alt">
              <Zap className="feature-icon" />
            </div>
            <h3 className="feature-title">Precisión del 95%</h3>
            <p className="feature-description">
              Nuestro sistema de recomendaciones alcanza una precisión del 95% gracias al análisis continuo.
            </p>
            <a href="#" className="feature-link">
              Verificado por estudiantes →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
