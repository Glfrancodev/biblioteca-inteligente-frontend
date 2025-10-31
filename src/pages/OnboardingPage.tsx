import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { preferencesService } from '../services/preferencesService';
import { authService } from '../services/authService';
import { Sparkles, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import type { Nivel, Lenguaje, Categoria } from '../types/preferences';
import './OnboardingPage.css';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Datos del backend
  const [niveles, setNiveles] = useState<Nivel[]>([]);
  const [lenguajes, setLenguajes] = useState<Lenguaje[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Selecciones del usuario
  const [selectedNivel, setSelectedNivel] = useState<number | null>(null);
  const [selectedLenguajes, setSelectedLenguajes] = useState<number[]>([]);
  const [selectedCategorias, setSelectedCategorias] = useState<number[]>([]);

  useEffect(() => {
    // Verificar autenticación
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Cargar datos del backend
    const loadData = async () => {
      try {
        setLoading(true);
        const [nivelesData, lenguajesData, categoriasData, preferences] = await Promise.all([
          preferencesService.getNiveles(),
          preferencesService.getLenguajes(),
          preferencesService.getCategorias(),
          preferencesService.getMyPreferences(),
        ]);

        setNiveles(nivelesData);
        setLenguajes(lenguajesData);
        setCategorias(categoriasData);

        // Si ya tiene preferencias, redirigir al home
        if (preferences) {
          navigate('/home');
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        // Si hay error de autenticación, redirigir al login
        if ((error as any)?.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const handleNivelSelect = (nivelId: number) => {
    setSelectedNivel(nivelId);
  };

  const handleLenguajeToggle = (lenguajeId: number) => {
    setSelectedLenguajes(prev => {
      if (prev.includes(lenguajeId)) {
        return prev.filter(id => id !== lenguajeId);
      }
      return [...prev, lenguajeId];
    });
  };

  const handleCategoriaToggle = (categoriaId: number) => {
    setSelectedCategorias(prev => {
      if (prev.includes(categoriaId)) {
        return prev.filter(id => id !== categoriaId);
      }
      return [...prev, categoriaId];
    });
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedNivel === null) {
      alert('Por favor, selecciona tu nivel de experiencia');
      return;
    }
    if (currentStep === 2 && selectedLenguajes.length === 0) {
      alert('Por favor, selecciona al menos un lenguaje');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleComplete = async () => {
    if (selectedCategorias.length === 0) {
      alert('Por favor, selecciona al menos un tema de interés');
      return;
    }

    try {
      setSubmitting(true);
      await preferencesService.createPreferences({
        nivel_id: selectedNivel,
        lenguajes_ids: selectedLenguajes,
        categorias_ids: selectedCategorias,
      });
      navigate('/home');
    } catch (error) {
      console.error('Error al guardar preferencias:', error);
      alert('Hubo un error al guardar tus preferencias. Por favor, intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="onboarding-page">
        <div className="onboarding-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        <div className="onboarding-header">
          <div className="onboarding-icon">
            <Sparkles size={24} />
          </div>
          <div className="onboarding-header-text">
            <h1>Personaliza tu Experiencia</h1>
            <p className="step-indicator">Paso {currentStep} de 3</p>
          </div>
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>

        {currentStep === 1 && (
          <div className="step-content">
            <h2>¿Cuál es tu nivel de experiencia?</h2>
            <p className="step-description">Esto nos ayudará a recomendarte libros adecuados para ti</p>
            
            <div className="options-grid">
              {niveles.map(nivel => (
                <div
                  key={nivel.idNivel}
                  className={`option-card ${selectedNivel === nivel.idNivel ? 'selected' : ''}`}
                  onClick={() => handleNivelSelect(nivel.idNivel)}
                >
                  <div className="option-radio">
                    {selectedNivel === nivel.idNivel && <Check size={14} />}
                  </div>
                  <div className="option-content">
                    <h3>{nivel.nombre}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="step-actions">
              <button 
                className="btn-primary" 
                onClick={handleNext}
                disabled={selectedNivel === null}
              >
                Continuar <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-content">
            <h2>¿Qué lenguajes te interesan?</h2>
            <p className="step-description">Selecciona todos los que quieras (mínimo 1)</p>
            
            <div className="options-grid multi-select">
              {lenguajes.map(lenguaje => (
                <div
                  key={lenguaje.idLenguaje}
                  className={`option-card ${selectedLenguajes.includes(lenguaje.idLenguaje) ? 'selected' : ''}`}
                  onClick={() => handleLenguajeToggle(lenguaje.idLenguaje)}
                >
                  <div className="option-checkbox">
                    {selectedLenguajes.includes(lenguaje.idLenguaje) && <Check size={14} />}
                  </div>
                  <div className="option-content">
                    <h3>{lenguaje.nombre}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleBack}>
                <ChevronLeft size={18} /> Atrás
              </button>
              <button 
                className="btn-primary" 
                onClick={handleNext}
                disabled={selectedLenguajes.length === 0}
              >
                Continuar <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-content">
            <h2>¿Qué temas te interesan?</h2>
            <p className="step-description">Selecciona todos los que quieras (mínimo 1)</p>
            
            <div className="options-grid multi-select">
              {categorias.map(categoria => (
                <div
                  key={categoria.idCategoria}
                  className={`option-card ${selectedCategorias.includes(categoria.idCategoria) ? 'selected' : ''}`}
                  onClick={() => handleCategoriaToggle(categoria.idCategoria)}
                >
                  <div className="option-checkbox">
                    {selectedCategorias.includes(categoria.idCategoria) && <Check size={14} />}
                  </div>
                  <div className="option-content">
                    <h3>{categoria.nombre}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleBack}>
                <ChevronLeft size={18} /> Atrás
              </button>
              <button 
                className="btn-primary" 
                onClick={handleComplete}
                disabled={selectedCategorias.length === 0 || submitting}
              >
                {submitting ? 'Guardando...' : 'Completar'} <Check size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
