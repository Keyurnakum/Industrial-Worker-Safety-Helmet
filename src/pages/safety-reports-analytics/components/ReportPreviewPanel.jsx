import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportPreviewPanel = ({ 
  reports = [],
  onExportReport = () => {},
  onDeleteReport = () => {},
  onViewReport = () => {},
  className = '' 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReports, setSelectedReports] = useState([]);
  const reportsPerPage = 5;

  // Mock reports data
  const mockReports = [
    {
      id: 1,
      name: "Monthly Compliance Report - June 2024",
      type: "Compliance",
      generatedDate: new Date('2024-06-30'),
      size: "2.4 MB",
      format: "PDF",
      status: "completed",
      description: "Comprehensive safety compliance analysis for all sites including helmet usage, violation tracking, and regulatory adherence metrics."
    },
    {
      id: 2,
      name: "Incident Analysis Q2 2024",
      type: "Incident",
      generatedDate: new Date('2024-06-28'),
      size: "1.8 MB",
      format: "Excel",
      status: "completed",
      description: "Detailed incident report covering critical safety violations, near-miss events, and corrective action implementation status."
    },
    {
      id: 3,
      name: "Environmental Monitoring Weekly",
      type: "Environmental",
      generatedDate: new Date('2024-06-25'),
      size: "956 KB",
      format: "PDF",
      status: "completed",
      description: "Environmental sensor data analysis including temperature, humidity, gas levels, and noise measurements across all zones."
    },
    {
      id: 4,
      name: "Worker Performance Dashboard",
      type: "Performance",
      generatedDate: new Date('2024-06-24'),
      size: "3.1 MB",
      format: "PDF",
      status: "processing",
      description: "Individual worker safety performance metrics, training completion rates, and compliance scoring analysis."
    },
    {
      id: 5,
      name: "Safety Metrics Summary May 2024",
      type: "Summary",
      generatedDate: new Date('2024-05-31'),
      size: "1.2 MB",
      format: "CSV",
      status: "completed",
      description: "Executive summary of key safety indicators, trend analysis, and month-over-month performance comparisons."
    }
  ];

  const currentReports = reports?.length > 0 ? reports : mockReports;
  const totalPages = Math.ceil(currentReports?.length / reportsPerPage);
  const startIndex = (currentPage - 1) * reportsPerPage;
  const endIndex = startIndex + reportsPerPage;
  const paginatedReports = currentReports?.slice(startIndex, endIndex);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'processing':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'failed':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getFormatIcon = (format) => {
    switch (format?.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'excel':
        return 'FileSpreadsheet';
      case 'csv':
        return 'Database';
      default:
        return 'File';
    }
  };

  const handleSelectReport = (reportId) => {
    setSelectedReports(prev => 
      prev?.includes(reportId) 
        ? prev?.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReports?.length === paginatedReports?.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(paginatedReports?.map(report => report?.id));
    }
  };

  const handleBulkExport = () => {
    selectedReports?.forEach(reportId => {
      const report = currentReports?.find(r => r?.id === reportId);
      if (report) {
        onExportReport(report);
      }
    });
    setSelectedReports([]);
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Generated Reports</h2>
            <p className="text-sm text-muted-foreground">
              {currentReports?.length} reports available
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {selectedReports?.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkExport}
              iconName="Download"
              iconPosition="left"
            >
              Export Selected ({selectedReports?.length})
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            iconName={selectedReports?.length === paginatedReports?.length ? "Square" : "CheckSquare"}
          >
            {selectedReports?.length === paginatedReports?.length ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
      </div>
      <div className="p-6">
        {paginatedReports?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Reports Generated</h3>
            <p className="text-muted-foreground">Generate your first safety report to see it here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedReports?.map((report) => (
              <div
                key={report?.id}
                className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  checked={selectedReports?.includes(report?.id)}
                  onChange={() => handleSelectReport(report?.id)}
                  className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {report?.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {report?.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-muted-foreground">
                          Generated: {formatDate(report?.generatedDate)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Size: {report?.size}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(report?.status)}`}>
                          {report?.status?.charAt(0)?.toUpperCase() + report?.status?.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Icon name={getFormatIcon(report?.format)} size={14} />
                        <span>{report?.format}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewReport(report)}
                    className="h-8 w-8"
                    disabled={report?.status !== 'completed'}
                  >
                    <Icon name="Eye" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onExportReport(report)}
                    className="h-8 w-8"
                    disabled={report?.status !== 'completed'}
                  >
                    <Icon name="Download" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteReport(report?.id)}
                    className="h-8 w-8 text-error hover:text-error"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, currentReports?.length)} of {currentReports?.length} reports
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
              >
                Previous
              </Button>
              <span className="text-sm text-foreground px-3 py-1">
                {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPreviewPanel;