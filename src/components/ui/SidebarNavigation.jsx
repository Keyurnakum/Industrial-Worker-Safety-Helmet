import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const SidebarNavigation = ({ 
  isCollapsed = false, 
  onToggleCollapse = () => {},
  className = '' 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/real-time-safety-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Real-time safety monitoring and worker status overview'
    },
    {
      label: 'Workers',
      path: '/worker-management',
      icon: 'Users',
      tooltip: 'Worker tracking, shift management, and device status'
    },
    {
      label: 'Incidents',
      path: '/safety-alerts-incidents',
      icon: 'AlertTriangle',
      tooltip: 'Safety violations, incident reports, and resolution tracking'
    },
    {
      label: 'Environment',
      path: '/environmental-monitoring',
      icon: 'Thermometer',
      tooltip: 'Environmental sensors, hazard detection, and zone monitoring'
    },
    {
      label: 'Reports',
      path: '/safety-reports-analytics',
      icon: 'BarChart3',
      tooltip: 'Analytics, compliance reports, and trend analysis'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center px-4' : 'px-6'} py-6 border-b border-border`}>
        {isCollapsed ? (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-primary-foreground" />
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">SafetyHelmet</h1>
              <p className="text-xs text-muted-foreground">Monitor</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigationItems?.map((item) => {
            const isActive = isActiveRoute(item?.path);
            return (
              <li key={item?.path}>
                <button
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center px-3' : 'px-4'} py-3 rounded-lg text-sm font-medium transition-colors duration-200 group relative ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                  title={isCollapsed ? item?.tooltip : ''}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className={`${isCollapsed ? '' : 'mr-3'} ${isActive ? 'text-primary-foreground' : ''}`} 
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item?.label}</span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-elevation-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-300">
                      {item?.label}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle Button - Desktop Only */}
      <div className={`hidden lg:flex ${isCollapsed ? 'justify-center px-4' : 'px-6'} py-4 border-t border-border`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="flex items-center space-x-2"
        >
          <Icon 
            name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
            size={16} 
          />
          {!isCollapsed && <span className="text-sm">Collapse</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-100 ${
        isCollapsed ? 'lg:w-20' : 'lg:w-60'
      } bg-card border-r border-border transition-all duration-300 ${className}`}>
        <SidebarContent />
      </aside>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-300"
      >
        <Icon name="Menu" size={24} />
      </Button>
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-300">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileOpen(false)}
          />
          
          {/* Mobile Sidebar */}
          <aside className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border slide-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">SafetyHelmet</h1>
                  <p className="text-xs text-muted-foreground">Monitor</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <nav className="px-4 py-6">
              <ul className="space-y-2">
                {navigationItems?.map((item) => {
                  const isActive = isActiveRoute(item?.path);
                  return (
                    <li key={item?.path}>
                      <button
                        onClick={() => handleNavigation(item?.path)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <Icon 
                          name={item?.icon} 
                          size={20} 
                          className={`mr-3 ${isActive ? 'text-primary-foreground' : ''}`} 
                        />
                        <span className="truncate">{item?.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default SidebarNavigation;