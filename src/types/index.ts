// Core Types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// File Management
export interface UploadedFile extends BaseEntity {
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  status: FileStatus;
  url?: string;
  metadata?: FileMetadata;
}

export type FileStatus = 'processing' | 'completed' | 'error' | 'uploading';

export interface FileMetadata {
  dimensions?: { width: number; height: number };
  pages?: number;
  checksum?: string;
  originalName?: string;
}

// Report Management
export interface Report extends BaseEntity {
  title: string;
  client: string;
  type: ReportType;
  date: string;
  status: ReportStatus;
  progress?: number;
  content?: ReportContent;
  files?: string[];
  metadata?: ReportMetadata;
}

export type ReportType = 
  | 'PRAD' 
  | 'Monitoramento' 
  | 'Laudo Vegetação' 
  | 'TCRA'
  | 'Outros';

export type ReportStatus = 'draft' | 'generating' | 'completed' | 'error';

export interface ReportContent {
  introduction?: string;
  objectives?: string;
  methodology?: string;
  areaCharacterization?: string;
  environmentalDiagnosis?: string;
  technicalRecommendations?: string;
  finalConsiderations?: string;
  attachments?: string[];
}

export interface ReportMetadata {
  processNumber?: string;
  municipality?: string;
  property?: string;
  inspectionDate?: string;
  documentation?: string;
  fieldObservations?: string;
}

// Chart Data
export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

export interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string;
  borderWidth?: number;
}

// UI State
export interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  activeView: ViewType;
  loading: boolean;
  error?: string;
}

export type ViewType = 'dashboard' | 'upload' | 'reports' | 'analytics';

// Dashboard Stats
export interface DashboardStats {
  totalReports: number;
  processedFiles: number;
  averageGenerationTime: number;
  successRate: number;
  monthlyGrowth: number;
}

// Activity
export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export type ActivityType = 
  | 'report_completed'
  | 'file_uploaded'
  | 'report_started'
  | 'error_occurred'
  | 'user_login';

// API Responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
  stack?: string;
}

export type ErrorType = 
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR'
  | 'FILE_UPLOAD_ERROR'
  | 'REPORT_GENERATION_ERROR'
  | 'UNKNOWN_ERROR';

// Configuration
export interface AppConfig {
  apiBaseUrl: string;
  maxFileSize: number;
  supportedFileTypes: string[];
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: {
    darkMode: boolean;
    analytics: boolean;
    notifications: boolean;
  };
}

// User
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  preferences: UserPreferences;
}

export type UserRole = 'admin' | 'user' | 'viewer';

export interface UserPreferences {
  darkMode: boolean;
  language: string;
  notifications: boolean;
  sidebarCollapsed: boolean;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
