import React from 'react';
import { UTILS, MOCK_DATA } from '../constants';
import './Analytics.css';

interface AnalyticsProps {}

const Analytics: React.FC<AnalyticsProps> = () => {
  // Use mock data for analytics
  const totalReports = MOCK_DATA.reports.length;
  const totalFiles = MOCK_DATA.files.length;
  const completedReports = MOCK_DATA.reports.filter(r => r.status === 'completed').length;
  const generatingReports = MOCK_DATA.reports.filter(r => r.status === 'generating').length;
  const completedFiles = MOCK_DATA.files.filter(f => f.status === 'completed').length;

  // Group reports by type
  const reportsByType = MOCK_DATA.reports.reduce((acc, report) => {
    acc[report.type] = (acc[report.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate success rate
  const successRate = totalReports > 0 ? (completedReports / totalReports * 100).toFixed(1) : '0';

  // Calculate average processing time (mock data)
  const avgProcessingTime = '2.3';

  // Calculate monthly growth (mock data)
  const monthlyGrowth = '+12%';

  return (
    <div className="analytics-section">
      <h2>Análises e Métricas</h2>
      
      <div className="analytics-grid">
        {/* Summary Cards */}
        <div className="analytics-card">
          <h3>Resumo Geral</h3>
          <div className="summary-stats">
            <div className="summary-item">
              <span className="summary-label">Total de Relatórios</span>
              <span className="summary-value">{totalReports}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total de Arquivos</span>
              <span className="summary-value">{totalFiles}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Taxa de Sucesso</span>
              <span className="summary-value">{successRate}%</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Crescimento Mensal</span>
              <span className="summary-value">{monthlyGrowth}</span>
            </div>
          </div>
        </div>

        {/* Reports by Type Chart */}
        <div className="analytics-card">
          <h3>Relatórios por Tipo</h3>
          <div className="chart-placeholder">
            <div className="bar-chart">
              {Object.entries(reportsByType).map(([type, count], index) => (
                <div key={type} className="bar-item">
                  <div className="bar-label">{type}</div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill" 
                      style={{ 
                        width: `${(count / Math.max(...Object.values(reportsByType))) * 100}%`,
                        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]
                      }}
                    />
                  </div>
                  <div className="bar-value">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="analytics-card">
          <h3>Distribuição por Status</h3>
          <div className="chart-placeholder">
            <div className="pie-chart">
              <div className="pie-segment" style={{ 
                background: 'conic-gradient(#10b981 0deg 120deg, #f59e0b 120deg 180deg, #64748b 180deg 360deg)',
                width: '150px',
                height: '150px',
                borderRadius: '50%'
              }} />
            </div>
            <div className="pie-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#10b981' }} />
                <span>Concluídos ({completedReports})</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#f59e0b' }} />
                <span>Gerando ({generatingReports})</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#64748b' }} />
                <span>Rascunhos (0)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="analytics-card full-width">
          <h3>Métricas de Desempenho</h3>
          <div className="metrics-table">
            <table>
              <thead>
                <tr>
                  <th>Métrica</th>
                  <th>Valor Atual</th>
                  <th>Mês Anterior</th>
                  <th>Variação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tempo Médio de Processamento</td>
                  <td>{avgProcessingTime} min</td>
                  <td>2.7 min</td>
                  <td className="positive">-15%</td>
                </tr>
                <tr>
                  <td>Taxa de Erro</td>
                  <td>1.5%</td>
                  <td>3.2%</td>
                  <td className="positive">-53%</td>
                </tr>
                <tr>
                  <td>Satisfação do Cliente</td>
                  <td>4.8/5</td>
                  <td>4.6/5</td>
                  <td className="positive">+4%</td>
                </tr>
                <tr>
                  <td>Arquivos Processados</td>
                  <td>{completedFiles}</td>
                  <td>{Math.floor(completedFiles * 0.85)}</td>
                  <td className="positive">+18%</td>
                </tr>
                <tr>
                  <td>Relatórios Gerados</td>
                  <td>{completedReports}</td>
                  <td>{Math.floor(completedReports * 0.88)}</td>
                  <td className="positive">+12%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* File Statistics */}
        <div className="analytics-card">
          <h3>Estatísticas de Arquivos</h3>
          <div className="file-stats">
            <div className="stat-item">
              <div className="stat-icon">📄</div>
              <div className="stat-info">
                <span className="stat-number">{MOCK_DATA.files.filter(f => f.type === 'application/pdf').length}</span>
                <span className="stat-label">PDFs</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🖼️</div>
              <div className="stat-info">
                <span className="stat-number">{MOCK_DATA.files.filter(f => f.type.startsWith('image/')).length}</span>
                <span className="stat-label">Imagens</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📁</div>
              <div className="stat-info">
                <span className="stat-number">{MOCK_DATA.files.filter(f => f.type.includes('zip')).length}</span>
                <span className="stat-label">Arquivos ZIP</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <span className="stat-number">{UTILS.formatFileSize(MOCK_DATA.files.reduce((acc, f) => acc + f.size, 0))}</span>
                <span className="stat-label">Espaço Total</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
