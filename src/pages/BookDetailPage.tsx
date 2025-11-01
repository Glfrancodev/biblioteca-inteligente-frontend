import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from '../services/authService';
import { booksService } from '../services/readingService';
import type { LibroCatalogo } from '../services/readingService';
import { Book, ArrowLeft, LogOut, Settings, Globe } from 'lucide-react';
import './BookDetailPage.css';

const BookDetailPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<LibroCatalogo | null>(null);
  const [authorBooks, setAuthorBooks] = useState<LibroCatalogo[]>([]);
  const [loadingAuthorBooks, setLoadingAuthorBooks] = useState(false);

  useEffect(() => {
    // Verificar autenticación
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const initializePage = async () => {
      try {
        setLoading(true);
        const user = await authService.getCurrentUser();
        setUserName(user.nombre);

        if (bookId) {
          const bookDetails = await booksService.getBookDetails(parseInt(bookId));
          if (bookDetails) {
            setBook(bookDetails);
            
            // Cargar libros del autor si hay autores
            if (bookDetails.autores && bookDetails.autores.length > 0) {
              setLoadingAuthorBooks(true);
              const firstAuthorId = bookDetails.autores[0].idAutor;
              const books = await booksService.getBooksByAuthor(firstAuthorId, 10);
              // Filtrar el libro actual
              setAuthorBooks(books.filter(b => b.idLibro !== bookDetails.idLibro));
              setLoadingAuthorBooks(false);
            }
          } else {
            navigate('/home');
          }
        }
      } catch (error) {
        console.error('Error al cargar detalles del libro:', error);
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    initializePage();
  }, [bookId, navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const handleBookClick = (id: number) => {
    navigate(`/book/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="book-detail-page">
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
            <button className="header-icon-btn" title="Configuración">
              <Settings size={20} />
            </button>
            <button className="header-icon-btn logout-btn" onClick={handleLogout} title="Cerrar Sesión">
              <LogOut size={20} />
            </button>
          </div>
        </header>
        <main className="detail-main">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando detalles del libro...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="book-detail-page">
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
          <button className="header-icon-btn" title="Configuración">
            <Settings size={20} />
          </button>
          <button className="header-icon-btn logout-btn" onClick={handleLogout} title="Cerrar Sesión">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="detail-main">
        <button className="back-button" onClick={() => navigate('/home')}>
          <ArrowLeft size={20} />
          Volver al catálogo
        </button>

        {/* Información del libro */}
        <div className="book-detail-container">
          <div className="book-detail-cover">
            {book.urlPortada ? (
              <img src={book.urlPortada} alt={book.titulo} />
            ) : (
              <div className="book-detail-placeholder">
                <Book size={64} />
              </div>
            )}
          </div>

          <div className="book-detail-info">
            <h1 className="book-detail-title">{book.titulo}</h1>
            
            {book.autores && book.autores.length > 0 && (
              <p className="book-detail-authors">
                {book.autores.map(a => a.nombre).join(', ')}
              </p>
            )}

            <div className="book-detail-meta">
              {book.editorial && (
                <div className="meta-item">
                  <span className="meta-label">Editorial:</span>
                  <span className="meta-value">{book.editorial.nombre}</span>
                </div>
              )}
              {book.totalPaginas && (
                <div className="meta-item">
                  <span className="meta-label">Páginas:</span>
                  <span className="meta-value">{book.totalPaginas}</span>
                </div>
              )}
            </div>

            {book.sinopsis && book.sinopsis !== 'Sinopsis no disponible' && (
              <div className="book-detail-synopsis">
                <h2 className="synopsis-title">Acerca de este libro</h2>
                <p className="synopsis-text">{book.sinopsis}</p>
              </div>
            )}

            <div className="book-detail-actions">
              <button 
                className="btn-primary"
                onClick={() => navigate(`/reader/${book.idLibro}`)}
              >
                Leer
              </button>
            </div>
          </div>
        </div>

        {/* Más del autor */}
        {book.autores && book.autores.length > 0 && (
          <section className="author-books-section">
            <h2 className="section-title">
              Más de {book.autores[0].nombre}
            </h2>
            
            {loadingAuthorBooks ? (
              <div className="author-books-loading">
                <div className="spinner"></div>
              </div>
            ) : authorBooks.length > 0 ? (
              <div className="author-books-grid">
                {authorBooks.map((authorBook) => (
                  <div
                    key={authorBook.idLibro}
                    className="author-book-card"
                    onClick={() => handleBookClick(authorBook.idLibro)}
                  >
                    <div className="author-book-cover">
                      {authorBook.urlPortada ? (
                        <img src={authorBook.urlPortada} alt={authorBook.titulo} />
                      ) : (
                        <div className="author-book-placeholder">
                          <Book size={32} />
                        </div>
                      )}
                    </div>
                    <div className="author-book-info">
                      <h3 className="author-book-title">{authorBook.titulo}</h3>
                      {authorBook.totalPaginas && (
                        <p className="author-book-pages">{authorBook.totalPaginas} páginas</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-author-books">No hay más libros de este autor disponibles</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default BookDetailPage;
