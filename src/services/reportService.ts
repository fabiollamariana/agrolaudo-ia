import type { Report, ReportContent } from '../types';
import { UTILS } from '../constants';

// Mock service for demonstration - replace with actual API calls
class ReportService {
  private reports: Report[] = [];

  async generateReport(content: ReportContent): Promise<Report> {
    const newReport: Report = {
      id: UTILS.generateId(),
      title: 'Novo Relatório Ambiental',
      client: 'Cliente Exemplo',
      type: 'PRAD',
      date: new Date().toISOString().split('T')[0],
      status: 'generating',
      progress: 0,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.reports.unshift(newReport);

    // Simulate progress
    await this.simulateProgress(newReport.id);

    return newReport;
  }

  private async simulateProgress(reportId: string): Promise<void> {
    const progressSteps = [25, 50, 75, 100];
    
    for (const progress of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const report = this.reports.find(r => r.id === reportId);
      if (report) {
        report.progress = progress;
        if (progress === 100) {
          report.status = 'completed';
          report.updatedAt = new Date().toISOString();
        }
      }
    }
  }

  async getReports(): Promise<Report[]> {
    // Return mock data for now
    return [
      {
        id: '1',
        title: 'PRAD - Fazenda São José',
        client: 'Empresa Agrícola Verde S/A',
        type: 'PRAD',
        date: '2024-05-06',
        status: 'completed',
        createdAt: '2024-05-06T10:00:00Z',
        updatedAt: '2024-05-06T11:30:00Z',
      },
      {
        id: '2',
        title: 'Monitoramento - Área Industrial',
        client: 'Indústria Metalúrgica Ltda',
        type: 'Monitoramento',
        date: '2024-05-05',
        status: 'generating',
        progress: 75,
        createdAt: '2024-05-05T14:00:00Z',
        updatedAt: '2024-05-05T14:45:00Z',
      },
      {
        id: '3',
        title: 'Laudo Vegetação - Residencial',
        client: 'Construtora Horizonte',
        type: 'Laudo Vegetação',
        date: '2024-05-04',
        status: 'draft',
        createdAt: '2024-05-04T09:00:00Z',
        updatedAt: '2024-05-04T09:15:00Z',
      },
    ];
  }

  async getReportById(id: string): Promise<Report | null> {
    const report = this.reports.find(r => r.id === id);
    return report || null;
  }

  async updateReport(id: string, updates: Partial<Report>): Promise<Report | null> {
    const reportIndex = this.reports.findIndex(r => r.id === id);
    if (reportIndex === -1) return null;

    this.reports[reportIndex] = {
      ...this.reports[reportIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return this.reports[reportIndex];
  }

  async deleteReport(id: string): Promise<boolean> {
    const reportIndex = this.reports.findIndex(r => r.id === id);
    if (reportIndex === -1) return false;

    this.reports.splice(reportIndex, 1);
    return true;
  }

  async downloadReport(id: string): Promise<Blob> {
    // Mock PDF generation
    const report = await this.getReportById(id);
    if (!report) throw new Error('Report not found');

    // Create a mock PDF blob
    const pdfContent = `
      Relatório: ${report.title}
      Cliente: ${report.client}
      Tipo: ${report.type}
      Data: ${report.date}
      Status: ${report.status}
    `;

    return new Blob([pdfContent], { type: 'application/pdf' });
  }
}

export const reportService = new ReportService();
