import { Book, Users, TrendingUp } from 'lucide-react';
import './Stats.css';

const Stats = () => {
  return (
    <section className="stats">
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Book className="stat-icon" />
          </div>
          <h3 className="stat-number">500+</h3>
          <p className="stat-label">Libros de Programación</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <Users className="stat-icon" />
          </div>
          <h3 className="stat-number">1,200+</h3>
          <p className="stat-label">Estudiantes Activos</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon-wrapper orange">
            <TrendingUp className="stat-icon" />
          </div>
          <h3 className="stat-number">95%</h3>
          <p className="stat-label">Precisión en Recomendaciones</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
