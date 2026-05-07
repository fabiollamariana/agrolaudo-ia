import React from 'react';
import { REPORT_STATUS_LABELS } from '../constants';
import './Reports.css';

type ReportStatus = 'draft' | 'generating' | 'completed';
type ReportType = 'PRAD' | 'Monitoramento' | 'Vegetação' | 'TCRA';

interface Report {
  id: string;
  title: string;
  client: string;
  type: ReportType;
  status: ReportStatus;
  date: string;
  progress?: number;
}

interface ReportsProps {
  onGenerateReport: () => void;
}

const Reports: React.FC<ReportsProps> = ({
  onGenerateReport,
}) => {
  const reports: Report[] = [
    {
      id: '1',
      title: 'Relatório de Monitoramento',
      client: 'Fazenda Verde',
      type: 'Monitoramento',
      status: 'completed',
      date: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Análise de Solo',
      client: 'AgroTech',
      type: 'Vegetação',
      status: 'generating',
      date: new Date().toISOString(),
      progress: 65
    }
  ];

  const handleDownloadReport = async (report: Report) => {
    try {
      const blob = new Blob([`Conteúdo do relatório: ${report.title}`], { 
        type: 'application/pdf' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar relatório:', error);
    }
  };

  const handleViewReport = (report: Report) => {
    console.log('Visualizar relatório:', report);
  };

  const getStatusColor = (status: ReportStatus): string => {
    const colors: Record<ReportStatus, string> = {
      draft: '#64748b',
      generating: '#f59e0b',
      completed: '#10b981',
    };
    return colors[status] || '#64748b';
  };

  return (
    <div className="reports-section">
      <div className="reports-header">
        <h2>Meus Relatórios</h2>
        <button onClick={onGenerateReport} className="btn btn-primary">
          ➕ Novo Relatório
        </button>
      </div>
      
      {reports.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h3>Nenhum relatório encontrado</h3>
          <p>Comece gerando seu primeiro relatório ambiental.</p>
          <button onClick={onGenerateReport} className="btn btn-primary">
            Gerar Primeiro Relatório
          </button>
        </div>
      ) : (
        <div className="reports-grid">
          {reports.map((report: Report) => (
            <div key={report.id} className="report-card">
              <div className="report-header">
                <h3 title={report.title}>{report.title}</h3>
                <span 
                  className="report-status"
                  style={{ 
                    backgroundColor: getStatusColor(report.status),
                    color: '#ffffff'
                  }}
                >
                  {REPORT_STATUS_LABELS[report.status]}
                </span>
              </div>
              
              <div className="report-info">
                <p><strong>Cliente:</strong> {report.client}</p>
                <p><strong>Tipo:</strong> {report.type}</p>
                <p><strong>Data:</strong> {new Date(report.date).toLocaleDateString('pt-BR')}</p>
              </div>
              
              {report.status === 'generating' && report.progress !== undefined && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${report.progress}%` }}
                  />
                  <span>{report.progress}%</span>
                </div>
              )}
              
              <div className="report-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleViewReport(report)}
                  disabled={report.status !== 'completed'}
                >
                  👁️ Visualizar
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleDownloadReport(report)}
                  disabled={report.status !== 'completed'}
                >
                  📥 Baixar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
