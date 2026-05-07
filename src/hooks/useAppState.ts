import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { ViewType, UIState, UploadedFile, Report } from '../types';

const initialState: UIState = {
  darkMode: false,
  sidebarOpen: true,
  activeView: 'dashboard',
  loading: false,
  error: undefined,
};

export const useAppState = () => {
  const [uiState, setUiState] = useLocalStorage<UIState>('app-ui-state', initialState);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  // UI State Management
  const setActiveView = useCallback((view: ViewType) => {
    setUiState(prev => ({ ...prev, activeView: view }));
  }, [setUiState]);

  const toggleSidebar = useCallback(() => {
    setUiState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  }, [setUiState]);

  const setLoading = useCallback((loading: boolean) => {
    setUiState(prev => ({ ...prev, loading }));
  }, [setUiState]);

  const setError = useCallback((error: string | undefined) => {
    setUiState(prev => ({ ...prev, error }));
  }, [setUiState]);

  const clearError = useCallback(() => {
    setUiState(prev => ({ ...prev, error: undefined }));
  }, [setUiState]);

  // File Management
  const addUploadedFile = useCallback((file: UploadedFile) => {
    setUploadedFiles(prev => [file, ...prev]);
  }, []);

  const updateUploadedFile = useCallback((id: string, updates: Partial<UploadedFile>) => {
    setUploadedFiles(prev => 
      prev.map(file => 
        file.id === id ? { ...file, ...updates } : file
      )
    );
  }, []);

  const removeUploadedFile = useCallback((id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  }, []);

  // Report Management
  const addReport = useCallback((report: Report) => {
    setReports(prev => [report, ...prev]);
  }, []);

  const updateReport = useCallback((id: string, updates: Partial<Report>) => {
    setReports(prev => 
      prev.map(report => 
        report.id === id ? { ...report, ...updates } : report
      )
    );
  }, []);

  const removeReport = useCallback((id: string) => {
    setReports(prev => prev.filter(report => report.id !== id));
  }, []);

  // Reset state
  const resetState = useCallback(() => {
    setUiState(initialState);
    setUploadedFiles([]);
    setReports([]);
  }, [setUiState]);

  return {
    // UI State
    uiState,
    setActiveView,
    toggleSidebar,
    setLoading,
    setError,
    clearError,
    
    // File Management
    uploadedFiles,
    addUploadedFile,
    updateUploadedFile,
    removeUploadedFile,
    
    // Report Management
    reports,
    addReport,
    updateReport,
    removeReport,
    
    // Utilities
    resetState,
  };
};
