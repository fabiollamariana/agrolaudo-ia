import React from 'react';
import { menuItems } from '../../constants';
import type { ViewType } from '../../types';
import './Header.css';

interface HeaderProps {
  activeView: ViewType;
  userName?: string;
  darkMode?: boolean;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  userName,
  darkMode = false,
  onNotificationClick,
  onProfileClick,
}) => {
  const currentViewLabel = menuItems.find(item => item.id === activeView)?.label || 'Dashboard';

  return (
    <header className={`main-header ${darkMode ? 'dark' : ''}`}>
      <div className="header-content">
        <h1 className="header-title">{currentViewLabel}</h1>
        <div className="header-actions">
          <button 
            className="notification-button"
            onClick={onNotificationClick}
            aria-label="Notificações"
          >
            🔔
            <span className="notification-badge">3</span>
          </button>
          <button 
            className="user-avatar"
            onClick={onProfileClick}
            aria-label="Perfil do usuário"
          >
            👤
          </button>
        </div>
        {userName && (
          <div className="user-info">
            <span className="user-name">{userName}</span>
          </div>
        )}
      </div>
    </header>
  );
};
