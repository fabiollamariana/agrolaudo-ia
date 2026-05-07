import React, { Suspense, lazy, useEffect } from 'react';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ToastContainer } from './components/common/Toast';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { useAppState } from './hooks/useAppState';
import { useToast } from './hooks/useToast';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { fileService } from './services/fileService';
import { reportService } from './services/reportService';
import './App.css';

// Lazy loaded components for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Upload = lazy(() => import('./pages/Upload'));
const Reports = lazy(() => import('./pages/Reports'));
const Analytics = lazy(() => import('./pages/Analytics'));

const App: React.FC = () => {
  const {
    uiState,
    setActiveView,
    toggleSidebar,
    setLoading,
    setError,
    clearError,
    uploadedFiles,
    addUploadedFile,
    removeUploadedFile,
    addReport,
  } = useAppState();

  const { toasts, success, error, warning, info } = useToast();

  // Initialize data on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        
        // Load initial data
        const [filesData, reportsData] = await Promise.all([
          fileService.getFiles(),
          reportService.getReports(),
        ]);

        filesData.forEach(file => addUploadedFile(file));
        reportsData.forEach(report => addReport(report));
        
        // Remove repetitive toast - only show on first load
        if (!sessionStorage.getItem('app-initialized')) {
          success('Aplicação carregada com sucesso!');
          sessionStorage.setItem('app-initialized', 'true');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar dados';
        setError(errorMessage);
        error('Falha ao carregar dados iniciais');
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []); // Remove dependencies to prevent re-render loop

  const handleFileUpload = async (files: FileList) => {
    try {
      setLoading(true);
      clearError();
      
      const validatedFiles = Array.from(files).filter(file => 
        fileService.validateFile(file).valid
      );

      if (validatedFiles.length === 0) {
        warning('Nenhum arquivo válido para upload');
        return;
      }

      const uploadPromises = validatedFiles.map(file => fileService.uploadFile(file));
      const uploadedFiles = await Promise.all(uploadPromises);
      
      uploadedFiles.forEach(file => addUploadedFile(file));
      success(`${uploadedFiles.length} arquivo(s) enviado(s) com sucesso!`);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro no upload';
      setError(errorMessage);
      error('Falha ao enviar arquivos');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      clearError();
      
      const newReport = await reportService.generateReport({
        introduction: 'Relatório gerado automaticamente',
        objectives: 'Análise ambiental completa',
        methodology: 'Visita técnica e análise documental',
        areaCharacterization: 'Caracterização detalhada da área',
        environmentalDiagnosis: 'Diagnóstico ambiental preliminar',
        technicalRecommendations: 'Recomendações técnicas básicas',
        finalConsiderations: 'Considerações finais',
        attachments: ['Anexos do relatório'],
      });
      
      addReport(newReport);
      success('Relatório iniciado com sucesso!');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao gerar relatório';
      setError(errorMessage);
      error('Falha ao gerar relatório');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = () => {
    info('Você tem 3 novas notificações');
  };

  const handleProfileClick = () => {
    info('Perfil do usuário');
  };

  
  const renderCurrentView = () => {
    const { activeView } = uiState;
    
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return (
          <Upload
            files={uploadedFiles}
            onFileUpload={handleFileUpload}
            onFileRemove={removeUploadedFile}
          />
        );
      case 'reports':
        return (
          <Reports
            onGenerateReport={handleGenerateReport}
          />
        );
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`app ${uiState.darkMode ? 'dark' : ''}`}>
      <ErrorBoundary
        onError={(error, errorInfo) => {
          console.error('Global error caught:', error, errorInfo);
          // Here you could send to error tracking service
        }}
      >
        {/* Sidebar */}
        <Sidebar
          isOpen={uiState.sidebarOpen}
          activeView={uiState.activeView}
          onViewChange={setActiveView}
          onToggle={toggleSidebar}
        />

        {/* Main Content */}
        <main className="main-content">
          <Header
            activeView={uiState.activeView}
            userName="João Silva"
            darkMode={uiState.darkMode}
            onNotificationClick={handleNotificationClick}
            onProfileClick={handleProfileClick}
          />

          <div className="content-area">
            {uiState.loading && (
              <div className="loading-overlay">
                <LoadingSpinner size="lg" />
                <p>Carregando...</p>
              </div>
            )}
            
            {uiState.error && (
              <div className="error-message">
                <span>⚠️ {uiState.error}</span>
                <button onClick={clearError}>✕</button>
              </div>
            )}

            <Suspense
              fallback={
                <div className="loading-overlay">
                  <LoadingSpinner size="md" />
                  <p>Carregando componente...</p>
                </div>
              }
            >
              {renderCurrentView()}
            </Suspense>
          </div>
        </main>

        {/* Toast Container */}
        <ToastContainer toasts={toasts} onClose={() => {
          // Toast removal is handled internally by useToast hook
        }} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
