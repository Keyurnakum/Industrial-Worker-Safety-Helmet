import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const BreadcrumbTrail = ({ 
  customBreadcrumbs = null,
  showHome = true,
  className = '' 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Route mapping for breadcrumb generation
  const routeMap = {
    '/real-time-safety-dashboard': {
      label: 'Dashboard',
      icon: 'LayoutDashboard'
    },
    '/worker-management': {
      label: 'Workers',
      icon: 'Users'
    },
    '/safety-alerts-incidents': {
      label: 'Incidents',
      icon: 'AlertTriangle'
    },
    '/environmental-monitoring': {
      label: 'Environment',
      icon: 'Thermometer'
    },
    '/safety-reports-analytics': {
      label: 'Reports',
      icon: 'BarChart3'
    },
    '/login': {
      label: 'Login',
      icon: 'LogIn'
    }
  };

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    // Add home/dashboard if requested and not already there
    if (showHome && location?.pathname !== '/real-time-safety-dashboard') {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/real-time-safety-dashboard',
        icon: 'LayoutDashboard'
      });
    }

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap?.[currentPath];
      
      if (routeInfo) {
        breadcrumbs?.push({
          label: routeInfo?.label,
          path: currentPath,
          icon: routeInfo?.icon,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render if no breadcrumbs or only one item
  if (!breadcrumbs || breadcrumbs?.length <= 1) {
    return null;
  }

  const handleBreadcrumbClick = (path) => {
    if (path && path !== location?.pathname) {
      navigate(path);
    }
  };

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          const isClickable = !isLast && breadcrumb?.path;

          return (
            <li key={breadcrumb?.path || index} className="flex items-center space-x-2">
              {/* Breadcrumb Item */}
              {isClickable ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBreadcrumbClick(breadcrumb?.path)}
                  className="flex items-center space-x-1 px-2 py-1 h-auto text-muted-foreground hover:text-foreground"
                >
                  {breadcrumb?.icon && (
                    <Icon name={breadcrumb?.icon} size={14} />
                  )}
                  <span>{breadcrumb?.label}</span>
                </Button>
              ) : (
                <div className="flex items-center space-x-1 px-2 py-1">
                  {breadcrumb?.icon && (
                    <Icon 
                      name={breadcrumb?.icon} 
                      size={14} 
                      className={isLast ? 'text-foreground' : 'text-muted-foreground'} 
                    />
                  )}
                  <span className={isLast ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                    {breadcrumb?.label}
                  </span>
                </div>
              )}
              {/* Separator */}
              {!isLast && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-muted-foreground" 
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;