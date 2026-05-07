import type { ReportType, FileStatus, ReportStatus, ActivityType, ErrorType } from '../types';

// App Configuration
export const APP_CONFIG = {
  name: 'AgroLaudo IA',
  version: '1.0.0',
  description: 'Geração inteligente de laudos ambientais para revisão técnica',
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

// File Configuration
export const FILE_CONFIG = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  supportedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.google-earth.kml+xml',
    'application/zip',
  ],
  chunkSize: 1024 * 1024, // 1MB chunks for upload
} as const;

// Report Types
export const REPORT_TYPES: Record<ReportType, string> = {
  PRAD: 'PRAD - Plano de Recuperação de Áreas Degradadas',
  Monitoramento: 'Relatório de Monitoramento Ambiental',
  'Laudo Vegetação': 'Laudo de Vegetação',
  TCRA: 'TCRA - Termo de Compromisso de Recuperação Ambiental',
  Outros: 'Outros Tipos de Relatório',
} as const;

// File Status Labels
export const FILE_STATUS_LABELS: Record<FileStatus, string> = {
  processing: 'Processando...',
  completed: 'Concluído',
  error: 'Erro',
  uploading: 'Enviando...',
} as const;

// Report Status Labels
export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  draft: '📝 Rascunho',
  generating: '⏳ Gerando...',
  completed: '✅ Concluído',
  error: '❌ Erro',
} as const;

// Activity Types
export const ACTIVITY_TYPES: Record<ActivityType, { label: string; icon: string }> = {
  report_completed: { label: 'Relatório Concluído', icon: '📄' },
  file_uploaded: { label: 'Arquivo Enviado', icon: '📁' },
  report_started: { label: 'Relatório Iniciado', icon: '📊' },
  error_occurred: { label: 'Erro Ocorreu', icon: '⚠️' },
  user_login: { label: 'Login do Usuário', icon: '👤' },
} as const;

// Error Types
export const ERROR_TYPES: Record<ErrorType, { label: string; severity: 'low' | 'medium' | 'high' }> = {
  NETWORK_ERROR: { label: 'Erro de Conexão', severity: 'high' },
  VALIDATION_ERROR: { label: 'Erro de Validação', severity: 'medium' },
  FILE_UPLOAD_ERROR: { label: 'Erro no Upload', severity: 'medium' },
  REPORT_GENERATION_ERROR: { label: 'Erro na Geração', severity: 'high' },
  UNKNOWN_ERROR: { label: 'Erro Desconhecido', severity: 'medium' },
} as const;

// Chart Colors
export const CHART_COLORS = {
  primary: '#10b981',
  secondary: '#3b82f6',
  tertiary: '#f59e0b',
  danger: '#ef4444',
  purple: '#8b5cf6',
  gray: '#64748b',
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  light: {
    bgPrimary: '#ffffff',
    bgSecondary: '#f8fafc',
    bgTertiary: '#f1f5f9',
    surface: '#ffffff',
    surfaceHover: '#f8fafc',
    border: '#e2e8f0',
    borderLight: '#f1f5f9',
    textPrimary: '#1e293b',
    textSecondary: '#64748b',
    textTertiary: '#94a3b8',
    accent: '#10b981',
    accentHover: '#059669',
    accentLight: '#d1fae5',
  },
  dark: {
    bgPrimary: '#0f172a',
    bgSecondary: '#1e293b',
    bgTertiary: '#334155',
    surface: '#1e293b',
    surfaceHover: '#334155',
    border: '#334155',
    borderLight: '#475569',
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    accent: '#10b981',
    accentHover: '#059669',
    accentLight: '#064e3b',
  },
} as const;

// Animation Durations
export const ANIMATIONS = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
} as const;

// Breakpoints
export const BREAKPOINTS = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  token: 'auth_token',
  user: 'user_data',
  preferences: 'user_preferences',
  theme: 'theme_mode',
  sidebar: 'sidebar_state',
} as const;

// Routes
export const ROUTES = {
  dashboard: '/',
  upload: '/upload',
  reports: '/reports',
  analytics: '/analytics',
  settings: '/settings',
} as const;

// Menu Items
export const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'upload', label: 'Upload de PDF', icon: '📁' },
  { id: 'reports', label: 'Relatórios', icon: '📄' },
  { id: 'analytics', label: 'Análises', icon: '📈' }
] as const;

// Validation Rules
export const VALIDATION = {
  reportTitle: {
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s\-_]+$/,
  },
  clientName: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s\-_\.]+$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  fileSize: {
    min: 1,
    max: FILE_CONFIG.maxFileSize,
  },
} as const;

// Mock Data
export const MOCK_DATA = {
  dashboardStats: {
    totalReports: 132,
    processedFiles: 1247,
    averageGenerationTime: 2.3,
    successRate: 98.5,
    monthlyGrowth: 12,
  },
  chartData: {
    labels: ['PRAD', 'Monitoramento', 'Laudo Vegetação', 'TCRA', 'Outros'],
    datasets: [{
      label: 'Relatórios Gerados',
      data: [45, 32, 28, 15, 12],
      backgroundColor: [
        CHART_COLORS.primary,
        CHART_COLORS.secondary,
        CHART_COLORS.tertiary,
        CHART_COLORS.danger,
        CHART_COLORS.purple,
      ],
    }],
  },
  reports: [
    {
      id: '1',
      title: 'Relatório de Monitoramento',
      client: 'Fazenda Verde',
      type: 'Monitoramento',
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      date: new Date().toISOString(),
      description: 'Monitoramento ambiental completo'
    },
    {
      id: '2',
      title: 'Análise de Solo',
      client: 'AgroTech',
      type: 'Laudo Vegetação',
      status: 'generating',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      date: new Date().toISOString(),
      description: 'Análise detalhada do solo',
      progress: 65
    }
  ],
  files: [
    {
      id: '1',
      name: 'documento.pdf',
      size: 1024000,
      type: 'application/pdf',
      status: 'completed',
      uploadDate: new Date().toISOString()
    },
    {
      id: '2',
      name: 'imagem.jpg',
      size: 512000,
      type: 'image/jpeg',
      status: 'completed',
      uploadDate: new Date().toISOString()
    }
  ]
} as const;

// Utility Functions
export const UTILS = {
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  formatDate: (date: string): string => {
    return new Date(date).toLocaleDateString('pt-BR');
  },
  formatTime: (date: string): string => {
    return new Date(date).toLocaleTimeString('pt-BR');
  },
  formatDateTime: (date: string): string => {
    return new Date(date).toLocaleString('pt-BR');
  },
  generateId: (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  },
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
} as const;
