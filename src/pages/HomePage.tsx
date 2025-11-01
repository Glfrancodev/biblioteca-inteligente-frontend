import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { preferencesService } from '../services/preferencesService';
import { readingService, booksService } from '../services/readingService';
import type { ReadingStats, Lectura, LibroCatalogo } from '../services/readingService';
import { Book, Globe, Settings, LogOut, BookOpen, BookMarked, FileText, ChevronLeft, ChevronRight, Construction } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  // Estadísticas del backend
  const [stats, setStats] = useState<ReadingStats>({
    librosTerminados: 0,
    leyendoAhora: 0,
    paginasLeidas: 0,
  });

  // Libros en progreso
  const [booksInProgress, setBooksInProgress] = useState<Lectura[]>([]);
  const [carouselPage, setCarouselPage] = useState(0);
  const booksPerPage = 5;

  // Catálogo de libros
  const [catalog, setCatalog] = useState<LibroCatalogo[]>([]);
  const [catalogPage, setCatalogPage] = useState(1);
  const [totalCatalogPages, setTotalCatalogPages] = useState(0);
  const catalogLimit = 20; // 5 filas x 4 columnas

  // Recomendaciones
  const [recommendations, setRecommendations] = useState<LibroCatalogo[]>([]);
  const [recommendationsLoaded, setRecommendationsLoaded] = useState(false);
  const [recommendationsCarouselPage, setRecommendationsCarouselPage] = useState(0);
  const recommendationsLimit = 5; // Solo pedir 5 recomendaciones máximo
  const recommendationsPerPage = 3; // Mostrar 3 recomendaciones por página

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

  // Cargar estadísticas
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoadingStats(true);
        const readingStats = await readingService.getStats();
        setStats(readingStats);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    if (!loading && authService.isAuthenticated()) {
      loadStats();
    }
  }, [loading]);

  // Cargar libros en progreso
  useEffect(() => {
    const loadBooksInProgress = async () => {
      try {
        setLoadingBooks(true);
        const books = await readingService.getBooksInProgress();
        setBooksInProgress(books);
      } catch (error) {
        console.error('Error al cargar libros en progreso:', error);
      } finally {
        setLoadingBooks(false);
      }
    };

    if (!loading && authService.isAuthenticated()) {
      loadBooksInProgress();
    }
  }, [loading]);

  // Cargar catálogo de libros
  useEffect(() => {
    const loadCatalog = async () => {
      if (!authService.isAuthenticated()) return;
      
      try {
        setLoadingCatalog(true);
        const response = await booksService.getBooks(catalogPage, catalogLimit);
        console.log('Catálogo cargado:', {
          libros: response.data.length,
          totalLibros: response.count,
          paginaActual: response.page,
          totalPaginas: response.totalPages
        });
        setCatalog(response.data);
        setTotalCatalogPages(response.totalPages);
      } catch (error) {
        console.error('Error al cargar catálogo:', error);
      } finally {
        setLoadingCatalog(false);
      }
    };

    if (!loading) {
      loadCatalog();
    }
  }, [loading, catalogPage, catalogLimit]);

  // Función para cargar recomendaciones manualmente
  const handleViewRecommendations = async () => {
    if (!authService.isAuthenticated()) return;
    
    try {
      setLoadingRecommendations(true);
      const recommendedBooks = await booksService.getRecommendations(recommendationsLimit);
      console.log('Recomendaciones cargadas:', {
        libros: recommendedBooks.length
      });
      setRecommendations(recommendedBooks);
      setRecommendationsLoaded(true);
    } catch (error) {
      console.error('Error al cargar recomendaciones:', error);
      setRecommendations([]); // Fallback a array vacío
      setRecommendationsLoaded(true); // Marcar como cargado aunque haya error
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const totalPages = Math.ceil(booksInProgress.length / booksPerPage);
  const currentBooks = booksInProgress.slice(
    carouselPage * booksPerPage,
    (carouselPage + 1) * booksPerPage
  );

  const handlePrevPage = () => {
    setCarouselPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setCarouselPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Funciones del carrusel de recomendaciones
  const totalRecommendationsPages = Math.ceil(recommendations.length / recommendationsPerPage);

  const handleRecommendationsPrevPage = () => {
    setRecommendationsCarouselPage((prev) => (prev > 0 ? prev - 1 : totalRecommendationsPages - 1));
  };

  const handleRecommendationsNextPage = () => {
    setRecommendationsCarouselPage((prev) => (prev < totalRecommendationsPages - 1 ? prev + 1 : 0));
  };

  const handleCatalogPageChange = (newPage: number) => {
    setCatalogPage(newPage);
    // Scroll al inicio del catálogo cuando cambia la página
    const catalogSection = document.querySelector('.catalog-section');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="header-logo">
            <Book size={28} />
          </div>
          <h1 className="header-title">Mi Biblioteca</h1>
          <p className="header-subtitle">{userName} - Estudiante FICCT</p>
        </div>
        
        <div className="header-right">
          <button className="header-icon-btn" title="Recomendaciones">
            <Globe size={20} />
          </button>
          <button className="header-icon-btn" onClick={() => navigate('/settings')} title="Configuración">
            <Settings size={20} />
          </button>
          <button className="header-icon-btn logout-btn" onClick={handleLogout} title="Cerrar Sesión">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Estadísticas */}
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-icon stat-icon-blue">
              <BookMarked size={24} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {loadingStats ? '...' : stats.librosTerminados}
              </h3>
              <p className="stat-label">Libros Leídos</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-green">
              <BookOpen size={24} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {loadingStats ? '...' : stats.leyendoAhora}
              </h3>
              <p className="stat-label">Leyendo Ahora</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-purple">
              <FileText size={24} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">
                {loadingStats ? '...' : stats.paginasLeidas.toLocaleString()}
              </h3>
              <p className="stat-label">Páginas Leídas</p>
            </div>
          </div>
        </section>

        {/* Libros en Progreso */}
        <section className="books-section">
          <h2 className="section-title">Libros en Progreso</h2>
          
          {loadingBooks ? (
            <div className="books-loading">
              <div className="spinner"></div>
              <p>Cargando libros...</p>
            </div>
          ) : booksInProgress.length === 0 ? (
            <div className="books-empty">
              <BookOpen size={48} strokeWidth={1.5} />
              <p className="empty-message">Empieza con la lectura para tener a mano tus libros</p>
            </div>
          ) : (
            <div className="books-carousel">
              {totalPages > 1 && (
                <button 
                  className="carousel-btn carousel-btn-prev" 
                  onClick={handlePrevPage}
                  aria-label="Página anterior"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <div className="carousel-content">
                <div className="books-grid">
                  {currentBooks.map((lectura) => (
                    <div 
                      key={lectura.idLectura} 
                      className="book-card"
                      onClick={() => navigate(`/book/${lectura.idLibro}`)}
                    >
                      <div className="book-cover">
                        {lectura.urlPortada ? (
                          <img 
                            src={lectura.urlPortada} 
                            alt={lectura.libro_titulo}
                          />
                        ) : (
                          <div className="book-cover-placeholder">
                            <Book size={48} />
                          </div>
                        )}
                      </div>
                      <div className="book-info">
                        <h3 className="book-title">{lectura.libro_titulo}</h3>
                        <div className="book-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill"
                              style={{ 
                                width: `${lectura.progreso_porcentaje}%` 
                              }}
                            />
                          </div>
                          <p className="progress-text">
                            {lectura.paginaLeidas} / {lectura.libro_total_paginas} páginas ({lectura.progreso_porcentaje.toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {totalPages > 1 && (
                <>
                  <button 
                    className="carousel-btn carousel-btn-next" 
                    onClick={handleNextPage}
                    aria-label="Página siguiente"
                  >
                    <ChevronRight size={24} />
                  </button>

                  <div className="carousel-dots">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        className={`carousel-dot ${index === carouselPage ? 'active' : ''}`}
                        onClick={() => setCarouselPage(index)}
                        aria-label={`Ir a la página ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        {/* Recomendaciones */}
        <section className="recommendations-section">
          <h2 className="section-title">Recomendaciones para ti</h2>
          
          {!recommendationsLoaded ? (
            <div className="recommendations-prompt">
              <div className="coming-soon">
                <BookMarked size={48} strokeWidth={1.5} />
                <p className="coming-soon-text">Descubre libros recomendados para ti</p>
                <button 
                  className="view-recommendations-btn"
                  onClick={handleViewRecommendations}
                  disabled={loadingRecommendations}
                >
                  {loadingRecommendations ? 'Cargando...' : 'Ver Recomendaciones'}
                </button>
              </div>
            </div>
          ) : loadingRecommendations ? (
            <div className="catalog-loading">
              <div className="spinner"></div>
              <p>Cargando recomendaciones...</p>
            </div>
          ) : recommendations.length > 0 ? (
            <div className="recommendations-carousel">
              <button 
                className="carousel-btn carousel-btn-prev recommendations-prev" 
                onClick={handleRecommendationsPrevPage}
                aria-label="Recomendaciones anteriores"
                disabled={totalRecommendationsPages <= 1}
              >
                <ChevronLeft size={24} />
              </button>

              <div className="recommendations-carousel-container">
                <div 
                  className="recommendations-carousel-track"
                  style={{
                    transform: `translateX(-${recommendationsCarouselPage * 100}%)`,
                    transition: 'transform 0.3s ease-in-out'
                  }}
                >
                  {Array.from({ length: totalRecommendationsPages }).map((_, pageIndex) => (
                    <div key={pageIndex} className="recommendations-carousel-page">
                      {recommendations
                        .slice(pageIndex * recommendationsPerPage, (pageIndex + 1) * recommendationsPerPage)
                        .map((book) => (
                          <div
                            key={book.idLibro}
                            className="recommendation-card"
                            onClick={() => navigate(`/book/${book.idLibro}`)}
                          >
                            <div className="recommendation-cover">
                              {book.urlPortada && (
                                <img 
                                  src={book.urlPortada} 
                                  alt={book.titulo}
                                />
                              )}
                            </div>
                            <div className="recommendation-info">
                              <h3 className="recommendation-title" title={book.titulo}>
                                {book.titulo}
                              </h3>
                              <p className="recommendation-authors">
                                {book.autores?.map(author => author.nombre).join(', ') || 'Autor desconocido'}
                              </p>
                              <div className="recommendation-meta">
                                <span className="recommendation-pages">{book.totalPaginas} páginas</span>
                                {book.categorias && book.categorias.length > 0 && (
                                  <span className="recommendation-category">{book.categorias[0].nombre}</span>
                                )}
                                {book.lenguajes && book.lenguajes.length > 0 && (
                                  <span className="recommendation-language">{book.lenguajes[0].nombre}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              <button 
                className="carousel-btn carousel-btn-next recommendations-next" 
                onClick={handleRecommendationsNextPage}
                aria-label="Próximas recomendaciones"
                disabled={totalRecommendationsPages <= 1}
              >
                <ChevronRight size={24} />
              </button>

              {totalRecommendationsPages > 1 && (
                <div className="recommendations-carousel-dots">
                  {Array.from({ length: totalRecommendationsPages }).map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-dot ${index === recommendationsCarouselPage ? 'active' : ''}`}
                      onClick={() => setRecommendationsCarouselPage(index)}
                      aria-label={`Ir a recomendaciones página ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="coming-soon">
              <Construction size={48} strokeWidth={1.5} />
              <p className="coming-soon-text">No hay recomendaciones disponibles</p>
              <button 
                className="view-recommendations-btn"
                onClick={handleViewRecommendations}
              >
                Intentar de nuevo
              </button>
            </div>
          )}
        </section>

        {/* Catálogo de Libros */}
        <section className="catalog-section">
          <h2 className="section-title">Catálogo de Libros</h2>
          
          {loadingCatalog ? (
            <div className="catalog-loading">
              <div className="spinner"></div>
              <p>Cargando catálogo...</p>
            </div>
          ) : catalog.length === 0 ? (
            <div className="catalog-empty">
              <Book size={48} strokeWidth={1.5} />
              <p className="empty-message">No hay libros disponibles en el catálogo</p>
            </div>
          ) : (
            <>
              <div className="catalog-grid">
                {catalog.map((libro) => (
                  <div 
                    key={libro.idLibro} 
                    className="catalog-card"
                    onClick={() => navigate(`/book/${libro.idLibro}`)}
                  >
                    <div className="catalog-cover">
                      {libro.urlPortada ? (
                        <img src={libro.urlPortada} alt={libro.titulo} />
                      ) : (
                        <div className="catalog-cover-placeholder">
                          <Book size={32} />
                        </div>
                      )}
                    </div>
                    <div className="catalog-info">
                      <h3 className="catalog-title">{libro.titulo}</h3>
                      <p className="catalog-author">
                        {libro.autores && libro.autores.length > 0
                          ? libro.autores.map(a => a.nombre).join(', ')
                          : 'Autor desconocido'}
                      </p>
                      {libro.totalPaginas && (
                        <p className="catalog-pages">{libro.totalPaginas} páginas</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Paginación */}
              {(totalCatalogPages > 1 || catalog.length >= catalogLimit) && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => handleCatalogPageChange(Math.max(1, catalogPage - 1))}
                    disabled={catalogPage === 1}
                  >
                    <ChevronLeft size={20} />
                    Anterior
                  </button>

                  <div className="pagination-numbers">
                    {Array.from({ length: totalCatalogPages }, (_, i) => i + 1).map((page) => {
                      // Mostrar solo algunas páginas alrededor de la actual
                      if (
                        page === 1 ||
                        page === totalCatalogPages ||
                        (page >= catalogPage - 1 && page <= catalogPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            className={`pagination-number ${page === catalogPage ? 'active' : ''}`}
                            onClick={() => handleCatalogPageChange(page)}
                          >
                            {page}
                          </button>
                        );
                      } else if (page === catalogPage - 2 || page === catalogPage + 2) {
                        return <span key={page} className="pagination-ellipsis">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    className="pagination-btn"
                    onClick={() => handleCatalogPageChange(Math.min(totalCatalogPages, catalogPage + 1))}
                    disabled={catalogPage === totalCatalogPages}
                  >
                    Siguiente
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
