import React from 'react';
import { MOCK_DATA } from '../constants';
import './Dashboard.css';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const stats = MOCK_DATA.dashboardStats;
  const chartData = MOCK_DATA.chartData;

  return (
    <div className="dashboard-grid">
      {/* Stats Cards */}
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <h3>Total de Relatórios</h3>
          <p className="stat-number">{stats.totalReports}</p>
          <span className="stat-change">+{stats.monthlyGrowth}% este mês</span>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">📁</div>
        <div className="stat-content">
          <h3>Arquivos Processados</h3>
          <p className="stat-number">{stats.processedFiles}</p>
          <span className="stat-change">+8% este mês</span>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">⏱️</div>
        <div className="stat-content">
          <h3>Tempo Médio de Geração</h3>
          <p className="stat-number">{stats.averageGenerationTime} min</p>
          <span className="stat-change">-15% este mês</span>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <h3>Taxa de Sucesso</h3>
          <p className="stat-number">{stats.successRate}%</p>
          <span className="stat-change">+2% este mês</span>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <h3>Relatórios por Tipo</h3>
        <div className="chart-placeholder">
          {chartData.labels.map((label, index) => (
            <div key={label} className="chart-bar">
              <div className="chart-label">{label}</div>
              <div className="chart-progress">
                <div 
                  className="chart-fill" 
                  style={{ 
                    width: `${chartData.datasets[0].data[index] * 2}%`,
                    backgroundColor: chartData.datasets[0].backgroundColor[index]
                  }}
                />
              </div>
              <div className="chart-value">{chartData.datasets[0].data[index]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Atividade Recente</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📄</div>
            <div className="activity-content">
              <p>PRAD - Fazenda São José concluído</p>
              <span className="activity-time">Há 2 horas</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📁</div>
            <div className="activity-content">
              <p>3 arquivos enviados por Empresa Agrícola</p>
              <span className="activity-time">Há 4 horas</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📊</div>
            <div className="activity-content">
              <p>Relatório de Monitoramento iniciado</p>
              <span className="activity-time">Há 6 horas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
