import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const TopHeader = ({ 
  currentUser = { name: 'Safety Manager', role: 'Manager' },
  alertCount = 3,
  onSiteChange = () => {},
  onProfileClick = () => {},
  onLogout = () => {},
  onNotificationClick = () => {},
  className = ''
}) => {
  const [selectedSite, setSelectedSite] = useState('Site A - Manufacturing');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const sites = [
    'Site A - Manufacturing',
    'Site B - Warehouse',
    'Site C - Processing',
    'Site D - Assembly'
  ];

  const handleSiteChange = (site) => {
    setSelectedSite(site);
    onSiteChange(site);
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    onLogout();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 bg-card border-b border-border z-200 ${className}`}>
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section - Site Selector */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={selectedSite}
              onChange={(e) => handleSiteChange(e?.target?.value)}
              className="appearance-none bg-muted border border-border rounded-lg px-4 py-2 pr-8 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {sites?.map((site) => (
                <option key={site} value={site}>
                  {site}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
          </div>
          
          {/* System Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></div>
            <span className="text-sm text-muted-foreground">System Online</span>
          </div>
        </div>

        {/* Center Section - Current Time */}
        <div className="hidden md:flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-sm font-mono text-foreground">
            {new Date()?.toLocaleTimeString('en-US', { 
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </span>
        </div>

        {/* Right Section - Alerts and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Alert Notifications */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onNotificationClick}
            className="relative"
          >
            <Icon name="Bell" size={20} />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {alertCount > 9 ? '9+' : alertCount}
              </span>
            )}
          </Button>

          {/* Emergency Button */}
          <Button
            variant="destructive"
            size="sm"
            className="hidden sm:flex items-center space-x-2"
            onClick={() => alert('Emergency protocol activated')}
          >
            <Icon name="AlertTriangle" size={16} />
            <span>Emergency</span>
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                {currentUser?.name?.charAt(0)}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-foreground">{currentUser?.name}</div>
                <div className="text-xs text-muted-foreground">{currentUser?.role}</div>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </Button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 py-2 z-300">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onProfileClick();
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted flex items-center space-x-2"
                >
                  <Icon name="User" size={16} />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted flex items-center space-x-2"
                >
                  <Icon name="Settings" size={16} />
                  <span>Settings</span>
                </button>
                <div className="border-t border-border my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-error hover:bg-muted flex items-center space-x-2"
                >
                  <Icon name="LogOut" size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;