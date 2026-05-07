import React, { useRef } from 'react';
import { FILE_CONFIG } from '../constants';
import { UTILS } from '../constants';
import type { UploadedFile } from '../types';
import './Upload.css';

interface UploadProps {
  files: UploadedFile[];
  onFileUpload: (files: FileList) => Promise<void>;
  onFileRemove: (id: string) => void;
}

const Upload: React.FC<UploadProps> = ({
  files,
  onFileUpload,
  onFileRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      onFileUpload(selectedFiles);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      onFileUpload(droppedFiles);
    }
  };

  const formatFileSize = (bytes: number): string => {
    return UTILS.formatFileSize(bytes);
  };

  const getStatusColor = (status: UploadedFile['status']): string => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'processing': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusText = (status: UploadedFile['status']): string => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'processing': return 'Processando...';
      case 'error': return 'Erro';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="upload-section">
      <div className="upload-area">
        <input
          ref={fileInputRef}
          type="file"
          id="fileUpload"
          multiple
          accept={FILE_CONFIG.supportedTypes.join(',')}
          onChange={handleFileSelect}
          className="file-input"
        />
        <label 
          htmlFor="fileUpload" 
          className="upload-label"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="upload-icon">📁</div>
          <h3>Arraste e solte arquivos aqui</h3>
          <p>ou clique para selecionar</p>
          <span className="upload-hint">
            Formatos aceitos: PDF, DOC, DOCX, JPG, PNG, Excel, KML
          </span>
          <span className="upload-hint">
            Tamanho máximo: {formatFileSize(FILE_CONFIG.maxFileSize)}
          </span>
        </label>
      </div>
      
      {files.length > 0 && (
        <div className="files-grid">
          <h3 className="files-title">Arquivos Carregados ({files.length})</h3>
          {files.map(file => (
            <div key={file.id} className="file-card">
              <div className="file-icon">
                {file.type.startsWith('image/') ? '🖼️' : 
                 file.type === 'application/pdf' ? '📄' : 
                 file.type.includes('zip') ? '🗜️' : '📁'}
              </div>
              <div className="file-info">
                <h4 title={file.name}>{file.name}</h4>
                <p>{formatFileSize(file.size)}</p>
                <div className="file-status">
                  <span 
                    className="status-indicator"
                    style={{ backgroundColor: getStatusColor(file.status) }}
                  />
                  <span className="status-text">{getStatusText(file.status)}</span>
                </div>
                {file.metadata && (
                  <div className="file-metadata">
                    {file.metadata.pages && (
                      <span>{file.metadata.pages} páginas</span>
                    )}
                    {file.metadata.dimensions && (
                      <span>{file.metadata.dimensions.width}×{file.metadata.dimensions.height}</span>
                    )}
                  </div>
                )}
              </div>
              <div className="file-actions">
                {file.status === 'completed' && file.url && (
                  <button 
                    className="btn-icon" 
                    onClick={() => window.open(file.url, '_blank')}
                    title="Visualizar"
                  >
                    👁️
                  </button>
                )}
                <button 
                  className="btn-icon" 
                  onClick={() => onFileRemove(file.id)}
                  title="Remover"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Upload;
