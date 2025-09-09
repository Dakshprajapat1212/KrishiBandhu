import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ToolsDropdown = ({ isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAnalysisData, setHasAnalysisData] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const tools = [
    {
      id: 'pest-detection',
      label: 'Pest Detection',
      description: 'Identify crop diseases and pests',
      path: '/pest-detection-tool',
      icon: 'Bug',
      color: 'var(--color-warning)',
      available: true
    },
    {
      id: 'seed-comparison',
      label: 'Seed Comparison',
      description: 'Compare different seed varieties',
      path: '/seed-comparison-guide',
      icon: 'Wheat',
      color: 'var(--color-accent)',
      available: true
    }
  ];

  useEffect(() => {
    // Check if analysis data is available (simulate based on current route)
    const analysisRoutes = ['/yield-prediction-results'];
    setHasAnalysisData(analysisRoutes?.includes(location?.pathname));
  }, [location?.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToolSelect = (tool) => {
    navigate(tool?.path);
    setIsOpen(false);
  };

  const isToolActive = (path) => location?.pathname === path;

  if (isMobile) {
    return (
      <div className="space-y-2">
        <div className="font-caption text-xs font-medium text-muted-foreground uppercase tracking-wide px-3 py-1">
          Analysis Tools
        </div>
        {tools?.map((tool) => (
          <Button
            key={tool?.id}
            variant={isToolActive(tool?.path) ? "default" : "ghost"}
            size="sm"
            fullWidth
            onClick={() => handleToolSelect(tool)}
            iconName={tool?.icon}
            iconPosition="left"
            iconSize={18}
            className="justify-start"
            disabled={!tool?.available}
          >
            <div className="flex flex-col items-start">
              <span>{tool?.label}</span>
              <span className="font-caption text-xs text-muted-foreground">
                {tool?.description}
              </span>
            </div>
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Wrench"
        iconPosition="left"
        iconSize={18}
        className="transition-morphic hover:scale-micro"
      >
        Tools
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="ml-1 transition-transform duration-200"
        />
      </Button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-morphic-active z-50 animate-slide-up">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Wrench" size={18} color="var(--color-primary)" />
              <span className="font-heading font-medium text-foreground">
                Analysis Tools
              </span>
            </div>

            <div className="space-y-2">
              {tools?.map((tool) => (
                <button
                  key={tool?.id}
                  onClick={() => handleToolSelect(tool)}
                  disabled={!tool?.available}
                  className={`
                    w-full p-3 rounded-lg border text-left transition-morphic hover:scale-micro
                    ${isToolActive(tool?.path)
                      ? 'border-primary bg-primary/5 shadow-morphic'
                      : 'border-border bg-card hover:border-primary/30 hover:bg-primary/5'
                    }
                    ${!tool?.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${tool?.color}20` }}
                    >
                      <Icon 
                        name={tool?.icon} 
                        size={20} 
                        color={tool?.color}
                        strokeWidth={2}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-body font-medium text-foreground">
                        {tool?.label}
                      </div>
                      <div className="font-caption text-sm text-muted-foreground mt-1">
                        {tool?.description}
                      </div>
                      {!tool?.available && (
                        <div className="flex items-center space-x-1 mt-2">
                          <Icon name="Lock" size={12} color="var(--color-muted-foreground)" />
                          <span className="font-caption text-xs text-muted-foreground">
                            Complete analysis to unlock
                          </span>
                        </div>
                      )}
                    </div>
                    {isToolActive(tool?.path) && (
                      <Icon 
                        name="Check" 
                        size={16} 
                        color="var(--color-primary)" 
                        strokeWidth={2.5}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {!hasAnalysisData && (
              <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={16} color="var(--color-accent)" />
                  <div className="flex-1">
                    <div className="font-caption text-sm text-accent-foreground">
                      <strong>Tip:</strong> Complete your crop analysis to get personalized tool recommendations
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsDropdown;