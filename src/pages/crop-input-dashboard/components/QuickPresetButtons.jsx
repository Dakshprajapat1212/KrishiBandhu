import React, { useEffect, useState } from 'react';

import Icon from '../../../components/AppIcon';

const QuickPresetButtons = ({ onPresetSelect, currentLanguage }) => {
  const presets = [
    {
      id: 'rain-stressed',
      label: currentLanguage === 'hi' ? 'वर्षा तनावग्रस्त' : 'Rain-stressed',
      description: currentLanguage === 'hi' ? 'कम वर्षा वाली स्थिति' : 'Low rainfall conditions',
      icon: 'CloudRain',
      color: 'var(--color-warning)',
      data: {
        cropType: 'wheat',
        location: 'Rajasthan, India',
        soilCondition: 'sandy',
        irrigationMethod: 'rainfed',
        seedType: 'local'
      }
    },
    {
      id: 'irrigated',
      label: currentLanguage === 'hi' ? 'सिंचित' : 'Irrigated',
      description: currentLanguage === 'hi' ? 'पर्याप्त सिंचाई सुविधा' : 'Adequate irrigation facility',
      icon: 'Droplets',
      color: 'var(--color-primary)',
      data: {
        cropType: 'rice',
        location: 'Punjab, India',
        soilCondition: 'clay',
        irrigationMethod: 'drip',
        seedType: 'certified'
      }
    },
    {
      id: 'hybrid-seed',
      label: currentLanguage === 'hi' ? 'हाइब्रिड बीज' : 'Hybrid-Seed',
      description: currentLanguage === 'hi' ? 'उच्च उत्पादन बीज' : 'High-yield seed variety',
      icon: 'Wheat',
      color: 'var(--color-accent)',
      data: {
        cropType: 'maize',
        location: 'Karnataka, India',
        soilCondition: 'loamy',
        irrigationMethod: 'sprinkler',
        seedType: 'hybrid'
      }
    }
  ];

  const [iconSize, setIconSize] = useState(() => {
    if (typeof window === 'undefined') return 24;
    return window.innerWidth >= 1024 ? 20 : 24;
  });

  useEffect(() => {
    const onResize = () => {
      setIconSize(window.innerWidth >= 1024 ? 20 : 24);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} color="var(--color-accent)" />
        <h3 className="font-heading font-semibold text-lg md:text-base text-foreground">
          {currentLanguage === 'hi' ? 'त्वरित डेमो प्रीसेट' : 'Quick Demo Presets'}
        </h3>
      </div>
      <p className="font-body text-sm md:text-sm text-muted-foreground mb-6 md:mb-4">
        {currentLanguage === 'hi' ? 'तुरंत परीक्षण के लिए पूर्व-निर्धारित डेटा के साथ फॉर्म भरें' : 'Fill the form instantly with pre-configured data for testing'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-3 lg:gap-4">
        {presets?.map((preset) => (
          <button
            key={preset?.id}
            onClick={() => onPresetSelect(preset?.data)}
            className="p-4 md:p-3 lg:p-2 bg-card border border-border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-morphic hover:scale-micro text-left group"
          >
            <div className="flex items-start space-x-3">
              <div
                className="w-12 h-12 md:w-10 md:h-10 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${preset?.color}20` }}
              >
                <Icon
                  name={preset?.icon}
                  size={iconSize}
                  color={preset?.color}
                  strokeWidth={2}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-medium text-foreground group-hover:text-primary transition-colors md:text-sm">
                  {preset?.label}
                </h4>
                <p className="font-caption text-sm text-muted-foreground mt-1 md:text-xs">
                  {preset?.description}
                </p>
                <div className="flex items-center space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="ArrowRight" size={14} color="var(--color-primary)" />
                  <span className="font-caption text-xs text-primary">
                    {currentLanguage === 'hi' ? 'लागू करें' : 'Apply preset'}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickPresetButtons;