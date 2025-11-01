import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { preferencesService } from '../services/preferencesService';
import { ArrowLeft, Save, Settings, LogOut, Globe, Check } from 'lucide-react';
import './SettingsPage.css';

interface Level {
  idNivel: number;
  nombre: string;
}

interface Language {
  idLenguaje: number;
  nombre: string;
}

interface Category {
  idCategoria: number;
  nombre: string;
}

interface UserPreferences {
  nivel_id?: number;
  lenguajes_ids: number[];
  categorias_ids: number[];
}

const SettingsPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Datos de opciones
  const [levels, setLevels] = useState<Level[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Preferencias del usuario
  const [preferences, setPreferences] = useState<UserPreferences>({
    lenguajes_ids: [],
    categorias_ids: []
  });

  useEffect(() => {
    // Verificar autenticación
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const initializePage = async () => {
      try {
        setLoading(true);
        
        // Cargar datos del usuario
        const user = await authService.getCurrentUser();
        setUserName(user.nombre);

        // Cargar opciones disponibles y preferencias actuales
        const [levelsData, languagesData, categoriesData, userPrefs] = await Promise.all([
          preferencesService.getNiveles(),
          preferencesService.getLenguajes(),
          preferencesService.getCategorias(),
          preferencesService.getMyPreferences()
        ]);

        setLevels(levelsData);
        setLanguages(languagesData);
        setCategories(categoriesData);
        
        if (userPrefs) {
          setPreferences({
            nivel_id: userPrefs.nivel?.idNivel,
            lenguajes_ids: userPrefs.lenguajes?.map((l: any) => l.idLenguaje) || [],
            categorias_ids: userPrefs.categorias?.map((c: any) => c.idCategoria) || []
          });
        }
      } catch (error) {
        console.error('Error al inicializar página de configuración:', error);
      } finally {
        setLoading(false);
      }
    };

    initializePage();
  }, [navigate]);

  const handleLevelChange = (levelId: number) => {
    setPreferences(prev => ({
      ...prev,
      nivel_id: levelId
    }));
  };

  const handleLanguageToggle = (languageId: number) => {
    setPreferences(prev => ({
      ...prev,
      lenguajes_ids: prev.lenguajes_ids.includes(languageId)
        ? prev.lenguajes_ids.filter(id => id !== languageId)
        : [...prev.lenguajes_ids, languageId]
    }));
  };

  const handleCategoryToggle = (categoryId: number) => {
    setPreferences(prev => ({
      ...prev,
      categorias_ids: prev.categorias_ids.includes(categoryId)
        ? prev.categorias_ids.filter(id => id !== categoryId)
        : [...prev.categorias_ids, categoryId]
    }));
  };

  const handleSavePreferences = async () => {
    try {
      setSaving(true);
      await preferencesService.updatePreferences(preferences);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error al guardar preferencias:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="settings-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      {/* Header */}
      <header className="settings-header">
        <div className="header-left">
          <button onClick={handleBack} className="back-btn">
            <ArrowLeft size={20} />
          </button>
          <div className="header-info">
            <h1>Configuración</h1>
            <p>Personaliza tu experiencia de lectura</p>
          </div>
        </div>
        <div className="header-right">
          <span className="user-name">{userName}</span>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="settings-main">
        <div className="settings-container">
          
          {/* Nivel */}
          <section className="settings-section">
            <h2 className="section-title">
              <Settings size={20} />
              Nivel
            </h2>
            <p className="section-description">
              Selecciona tu nivel de experiencia
            </p>
            <div className="level-options">
              {levels.map(level => (
                <label key={level.idNivel} className="level-option">
                  <input
                    type="radio"
                    name="level"
                    value={level.idNivel}
                    checked={preferences.nivel_id === level.idNivel}
                    onChange={() => handleLevelChange(level.idNivel)}
                  />
                  <span className="level-label">{level.nombre}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Lenguajes de Programación */}
          <section className="settings-section">
            <h2 className="section-title">
              <Globe size={20} />
              Lenguajes de Programación
            </h2>
            <p className="section-description">
              Selecciona los lenguajes que te interesan
            </p>
            <div className="options-grid">
              {languages.map(language => (
                <label key={language.idLenguaje} className="option-card">
                  <input
                    type="checkbox"
                    checked={preferences.lenguajes_ids.includes(language.idLenguaje)}
                    onChange={() => handleLanguageToggle(language.idLenguaje)}
                  />
                  <span className="option-label">{language.nombre}</span>
                  {preferences.lenguajes_ids.includes(language.idLenguaje) && (
                    <Check size={16} className="check-icon" />
                  )}
                </label>
              ))}
            </div>
          </section>

          {/* Categorías */}
          <section className="settings-section">
            <h2 className="section-title">
              <Settings size={20} />
              Categorías de Interés
            </h2>
            <p className="section-description">
              Selecciona las categorías que más te interesan
            </p>
            <div className="options-grid">
              {categories.map(category => (
                <label key={category.idCategoria} className="option-card">
                  <input
                    type="checkbox"
                    checked={preferences.categorias_ids.includes(category.idCategoria)}
                    onChange={() => handleCategoryToggle(category.idCategoria)}
                  />
                  <span className="option-label">{category.nombre}</span>
                  {preferences.categorias_ids.includes(category.idCategoria) && (
                    <Check size={16} className="check-icon" />
                  )}
                </label>
              ))}
            </div>
          </section>

          {/* Save Button */}
          <div className="save-section">
            <button 
              onClick={handleSavePreferences}
              disabled={saving}
              className={`save-btn ${saved ? 'saved' : ''}`}
            >
              {saving ? (
                <>
                  <div className="spinner small"></div>
                  Guardando...
                </>
              ) : saved ? (
                <>
                  <Check size={20} />
                  Guardado
                </>
              ) : (
                <>
                  <Save size={20} />
                  Guardar Preferencias
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;