import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { authService } from '../services/authService';
import { booksService, readingService } from '../services/readingService';
import type { LibroCatalogo } from '../services/readingService';
import { Book, ArrowLeft, ChevronLeft, ChevronRight, LogOut, Settings, Globe } from 'lucide-react';
import './BookReaderPage.css';

// Configurar worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const BookReaderPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<LibroCatalogo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lecturaId, setLecturaId] = useState<number | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfError, setPdfError] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const hasCreatedReading = useRef(false);

  const totalPages = numPages || book?.totalPaginas || 100;

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
            
            // Cargar PDF directamente desde S3 si está disponible
            if (bookDetails.urlLibro) {
              try {
                console.log('URL del PDF:', bookDetails.urlLibro);
                console.log('Total de páginas (backend):', bookDetails.totalPaginas);
                
                // Guardar la URL para usar con react-pdf
                setPdfUrl(bookDetails.urlLibro);
                
              } catch (error) {
                console.error('Error preparando PDF:', error);
                setPdfError(true);
              }
            } else {
              console.log('No hay URL de PDF disponible para este libro');
              setPdfError(true);
            }

            // Verificar si ya existe una lectura para este libro
            if (!hasCreatedReading.current) {
              const existingReading = await readingService.getReadingByBook(parseInt(bookId));
              
              if (existingReading) {
                // Si ya existe, usar esa lectura y continuar desde donde se quedó
                setLecturaId(existingReading.idLectura);
                setCurrentPage(existingReading.paginaLeidas || 1);
                hasCreatedReading.current = true;
              } else {
                // Si no existe, crear una nueva lectura
                const reading = await readingService.createReading(parseInt(bookId));
                if (reading) {
                  setLecturaId(reading.idLectura);
                  setCurrentPage(1);
                  hasCreatedReading.current = true;
                }
              }
            }
          } else {
            navigate('/home');
          }
        }
      } catch (error) {
        console.error('Error al cargar el lector:', error);
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    initializePage();
  }, [bookId, navigate]);

  // Actualizar lectura antes de salir
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (lecturaId && currentPage > 1) {
        const estado = currentPage >= totalPages ? 'completado' : 'en_progreso';
        await readingService.updateReading(lecturaId, currentPage, estado);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Actualizar al desmontar el componente
      if (lecturaId && currentPage > 1) {
        const estado = currentPage >= totalPages ? 'completado' : 'en_progreso';
        readingService.updateReading(lecturaId, currentPage, estado);
      }
    };
  }, [lecturaId, currentPage, totalPages]);

  // Función para manejar cuando el PDF se carga exitosamente
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log(`PDF cargado exitosamente. Páginas detectadas: ${numPages}`);
    console.log(`Páginas en el backend: ${book?.totalPaginas}`);
    
    // Usar el número de páginas detectado del PDF real
    setNumPages(numPages);
    
    // Comparar con el backend (opcional, para debug)
    if (book?.totalPaginas && book.totalPaginas !== numPages) {
      console.warn(`Discrepancia de páginas: Backend=${book.totalPaginas}, PDF real=${numPages}`);
    }
  };

  // Función para manejar errores de carga del PDF
  const onDocumentLoadError = (error: Error) => {
    console.error('Error cargando PDF:', error);
    setPdfError(true);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const handleBack = async () => {
    if (lecturaId && currentPage > 1) {
      const estado = currentPage >= totalPages ? 'completado' : 'en_progreso';
      await readingService.updateReading(lecturaId, currentPage, estado);
    }
    navigate(-1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="reader-page">
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
        <main className="reader-main">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando libro...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="reader-page">
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

      {/* Reader Controls */}
      <div className="reader-controls">
        <button className="back-button-reader" onClick={handleBack}>
          <ArrowLeft size={20} />
          Volver
        </button>

        <div className="book-info-reader">
          <h2 className="book-title-reader">{book.titulo}</h2>
          {book.autores && book.autores.length > 0 && (
            <p className="book-author-reader">{book.autores[0].nombre}</p>
          )}
        </div>

        <div className="page-controls">
          <button
            className="page-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="page-info">
            <input
              type="number"
              className="page-input"
              value={currentPage}
              onChange={handlePageInput}
              min="1"
              max={totalPages}
            />
            <span className="page-separator">/</span>
            <span className="total-pages">{totalPages}</span>
          </div>

          <button
            className="page-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Reader Content */}
      <main className="reader-main">
        <div className="reader-container">
          {pdfUrl ? (
            pdfError ? (
              <div className="pdf-error">
                <h3>⚠️ Error al cargar PDF</h3>
                <p>No se pudo cargar el archivo PDF. Por favor, intenta de nuevo más tarde.</p>
                <p><small>URL: {pdfUrl}</small></p>
                <button onClick={() => window.location.reload()} className="retry-button">
                  Reintentar
                </button>
              </div>
            ) : (
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="pdf-loading">
                    <div className="spinner"></div>
                    <p>Procesando PDF...</p>
                  </div>
                }
                className="pdf-document"
              >
                <Page
                  pageNumber={currentPage}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  scale={1.5}
                  className="pdf-page"
                  loading={
                    <div className="pdf-loading">
                      <div className="spinner"></div>
                      <p>Cargando página {currentPage}...</p>
                    </div>
                  }
                />
              </Document>
            )
          ) : (
            <div className="simulated-page">
              <div className="page-number-display">Página {currentPage}</div>
              <div className="page-content">
                <h3>{book.titulo}</h3>
                {book.autores && book.autores.length > 0 && (
                  <p className="page-author">Por {book.autores.map(a => a.nombre).join(', ')}</p>
                )}
                <div className="page-text">
                  <p>Esta es una simulación de la página {currentPage} del libro.</p>
                  <p>
                    El contenido completo del libro no está disponible en formato digital,
                    pero puedes continuar navegando por las {totalPages} páginas para
                    registrar tu progreso de lectura.
                  </p>
                  {book.sinopsis && book.sinopsis !== 'Sinopsis no disponible' && (
                    <div className="page-synopsis">
                      <h4>Resumen del libro:</h4>
                      <p>{book.sinopsis}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BookReaderPage;
