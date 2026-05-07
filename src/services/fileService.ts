import type { UploadedFile } from '../types';
import { FILE_CONFIG, UTILS } from '../constants';

class FileService {
  private files: UploadedFile[] = [];

  async uploadFile(file: File): Promise<UploadedFile> {
    const uploadedFile: UploadedFile = {
      id: UTILS.generateId(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'processing',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.files.unshift(uploadedFile);

    // Simulate file processing
    await this.simulateFileProcessing(uploadedFile.id);

    return uploadedFile;
  }

  private async simulateFileProcessing(fileId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const file = this.files.find(f => f.id === fileId);
    if (file) {
      file.status = 'completed';
      file.url = `https://example.com/files/${file.id}`;
      file.updatedAt = new Date().toISOString();

      // Add mock metadata for images
      if (file.type.startsWith('image/')) {
        file.metadata = {
          dimensions: { width: 1920, height: 1080 },
          originalName: file.name,
        };
      }

      // Add mock metadata for PDFs
      if (file.type === 'application/pdf') {
        file.metadata = {
          pages: Math.floor(Math.random() * 20) + 1,
          originalName: file.name,
        };
      }
    }
  }

  async getFiles(): Promise<UploadedFile[]> {
    // Return mock data
    return [
      {
        id: '1',
        name: 'relatorio_ambiental.pdf',
        type: 'application/pdf',
        size: 2048576,
        uploadDate: '2024-05-06',
        status: 'completed',
        url: 'https://example.com/files/1',
        metadata: {
          pages: 15,
          originalName: 'relatorio_ambiental.pdf',
        },
        createdAt: '2024-05-06T10:00:00Z',
        updatedAt: '2024-05-06T10:02:00Z',
      },
      {
        id: '2',
        name: 'fotos_vistoria.zip',
        type: 'application/zip',
        size: 5242880,
        uploadDate: '2024-05-05',
        status: 'processing',
        createdAt: '2024-05-05T14:00:00Z',
        updatedAt: '2024-05-05T14:00:00Z',
      },
      {
        id: '3',
        name: 'matricula_imovel.pdf',
        type: 'application/pdf',
        size: 1024000,
        uploadDate: '2024-05-04',
        status: 'completed',
        url: 'https://example.com/files/3',
        metadata: {
          pages: 8,
          originalName: 'matricula_imovel.pdf',
        },
        createdAt: '2024-05-04T09:00:00Z',
        updatedAt: '2024-05-04T09:01:00Z',
      },
    ];
  }

  async getFileById(id: string): Promise<UploadedFile | null> {
    const file = this.files.find(f => f.id === id);
    return file || null;
  }

  async deleteFile(id: string): Promise<boolean> {
    const fileIndex = this.files.findIndex(f => f.id === id);
    if (fileIndex === -1) return false;

    this.files.splice(fileIndex, 1);
    return true;
  }

  validateFile(file: File): { valid: boolean; error?: string } {
    if (file.size > FILE_CONFIG.maxFileSize) {
      return {
        valid: false,
        error: `File size exceeds maximum limit of ${UTILS.formatFileSize(FILE_CONFIG.maxFileSize)}`,
      };
    }

    if (!FILE_CONFIG.supportedTypes.includes(file.type as any)) {
      return {
        valid: false,
        error: 'File type not supported',
      };
    }

    return { valid: true };
  }

  async uploadMultipleFiles(files: FileList): Promise<UploadedFile[]> {
    const uploadPromises = Array.from(files).map(file => this.uploadFile(file));
    return Promise.all(uploadPromises);
  }
}

export const fileService = new FileService();
