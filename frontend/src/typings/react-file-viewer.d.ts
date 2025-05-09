declare module 'react-file-viewer' {
  import React from 'react';

  interface FileViewerProps {
    fileType: string;
    filePath: string;
    errorComponent?: React.ComponentType;
    onError?: (error: Error) => void;
  }

  const FileViewer: React.FC<FileViewerProps>;
  export default FileViewer;
}