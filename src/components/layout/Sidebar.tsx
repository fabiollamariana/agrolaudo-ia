import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { menuItems } from '../../constants';
import type { ViewType } from '../../types';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activeView,
  onViewChange,
  onToggle,
}) => {
  const { isDark, toggle } = useTheme();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🌿</span>
          <span className="logo-text">AgroLaudo IA</span>
        </div>
        <button onClick={onToggle} className="sidebar-toggle">
          {isOpen ? '◀' : '▶'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewType)}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={toggle} className="theme-toggle">
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </aside>
  );
};
