declare module 'react-pdf' {
  export interface DocumentProps {
    file: string | ArrayBuffer | Uint8Array | { url?: string; data?: ArrayBuffer | Uint8Array };
    onLoadSuccess?: (pdf: { numPages: number }) => void;
    onLoadError?: (error: Error) => void;
    loading?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
    options?: {
      cMapUrl?: string;
      cMapPacked?: boolean;
      standardFontDataUrl?: string;
      withCredentials?: boolean;
      verbosity?: number;
    };
  }

  export interface PageProps {
    pageNumber: number;
    renderTextLayer?: boolean;
    renderAnnotationLayer?: boolean;
    className?: string;
    loading?: React.ReactNode;
    width?: number;
    height?: number;
    scale?: number;
  }

  export const Document: React.FC<DocumentProps>;
  export const Page: React.FC<PageProps>;

  export namespace pdfjs {
    export const version: string;
    export const GlobalWorkerOptions: {
      workerSrc: string;
    };
  }
}
