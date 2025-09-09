import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SeedCategoryCard = ({ 
  category, 
  seeds, 
  selectedSeed, 
  onSeedSelect, 
  currentLanguage 
}) => {
  const getCategoryIcon = (type) => {
    switch (type) {
      case 'certified': return 'Award';
      case 'hybrid': return 'Zap';
      case 'local': return 'Sprout';
      default: return 'Wheat';
    }
  };

  const getCategoryColor = (type) => {
    switch (type) {
      case 'certified': return 'var(--color-success)';
      case 'hybrid': return 'var(--color-primary)';
      case 'local': return 'var(--color-accent)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const translations = {
    en: {
      certified: 'Certified Seeds',
      hybrid: 'Hybrid Seeds',
      local: 'Local Seeds',
      yieldBoost: 'Yield Boost',
      costPerAcre: 'Cost per Acre',
      diseaseResistance: 'Disease Resistance',
      waterRequirement: 'Water Requirement',
      roi: 'ROI',
      selectSeed: 'Select Seed',
      selected: 'Selected',
      governmentCertified: 'Government Certified',
      subsidyEligible: 'Subsidy Eligible',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      moderate: 'Moderate'
    },
    hi: {
      certified: 'प्रमाणित बीज',
      hybrid: 'हाइब्रिड बीज',
      local: 'स्थानीय बीज',
      yieldBoost: 'उत्पादन वृद्धि',
      costPerAcre: 'प्रति एकड़ लागत',
      diseaseResistance: 'रोग प्रतिरोधक क्षमता',
      waterRequirement: 'पानी की आवश्यकता',
      roi: 'निवेश पर रिटर्न',
      selectSeed: 'बीज चुनें',
      selected: 'चयनित',
      governmentCertified: 'सरकारी प्रमाणित',
      subsidyEligible: 'सब्सिडी योग्य',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कम',
      moderate: 'सामान्य'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const categoryTitle = {
    certified: t?.certified,
    hybrid: t?.hybrid,
    local: t?.local
  }?.[category?.type];

  return (
    <div className="bg-card rounded-lg border border-border shadow-morphic p-6">
      {/* Category Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${getCategoryColor(category?.type)}20` }}
        >
          <Icon 
            name={getCategoryIcon(category?.type)} 
            size={24} 
            color={getCategoryColor(category?.type)}
            strokeWidth={2}
          />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {categoryTitle}
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            {category?.description}
          </p>
        </div>
      </div>
      {/* Seeds List */}
      <div className="space-y-4">
        {seeds?.map((seed) => (
          <div
            key={seed?.id}
            className={`
              p-4 rounded-lg border-2 transition-morphic cursor-pointer
              ${selectedSeed?.id === seed?.id
                ? 'border-primary bg-primary/5 shadow-morphic-hover'
                : 'border-border bg-card hover:border-primary/30 hover:bg-primary/5'
              }
            `}
            onClick={() => onSeedSelect(seed)}
          >
            {/* Seed Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-body font-medium text-foreground">
                  {seed?.name}
                </h4>
                <p className="font-caption text-sm text-muted-foreground mt-1">
                  {seed?.variety}
                </p>
              </div>
              {selectedSeed?.id === seed?.id && (
                <Icon 
                  name="Check" 
                  size={20} 
                  color="var(--color-primary)" 
                  strokeWidth={2.5}
                />
              )}
            </div>

            {/* Yield Boost */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-sm text-muted-foreground">
                {t?.yieldBoost}
              </span>
              <div className="flex items-center space-x-2">
                <span className="font-data font-medium text-success">
                  +{seed?.yieldBoost}%
                </span>
                <Icon name="TrendingUp" size={16} color="var(--color-success)" />
              </div>
            </div>

            {/* Cost */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-sm text-muted-foreground">
                {t?.costPerAcre}
              </span>
              <span className="font-data font-medium text-foreground">
                ₹{seed?.costPerAcre?.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Disease Resistance */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-sm text-muted-foreground">
                {t?.diseaseResistance}
              </span>
              <div className="flex items-center space-x-2">
                <div className={`
                  w-2 h-2 rounded-full
                  ${seed?.diseaseResistance === 'high' ? 'bg-success' : 
                    seed?.diseaseResistance === 'medium' ? 'bg-warning' : 'bg-error'}
                `} />
                <span className="font-body text-sm text-foreground capitalize">
                  {t?.[seed?.diseaseResistance] || seed?.diseaseResistance}
                </span>
              </div>
            </div>

            {/* Water Requirement */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-body text-sm text-muted-foreground">
                {t?.waterRequirement}
              </span>
              <div className="flex items-center space-x-2">
                <Icon 
                  name="Droplets" 
                  size={16} 
                  color={
                    seed?.waterRequirement === 'low' ? 'var(--color-success)' :
                    seed?.waterRequirement === 'medium' ? 'var(--color-warning)' :
                    'var(--color-error)'
                  }
                />
                <span className="font-body text-sm text-foreground capitalize">
                  {t?.[seed?.waterRequirement] || seed?.waterRequirement}
                </span>
              </div>
            </div>

            {/* ROI */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-body text-sm text-muted-foreground">
                {t?.roi}
              </span>
              <span className="font-data font-medium text-primary">
                {seed?.roi}%
              </span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {seed?.governmentCertified && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 border border-success/20 rounded-full">
                  <Icon name="Shield" size={12} color="var(--color-success)" />
                  <span className="font-caption text-xs text-success">
                    {t?.governmentCertified}
                  </span>
                </div>
              )}
              {seed?.subsidyEligible && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 border border-primary/20 rounded-full">
                  <Icon name="Gift" size={12} color="var(--color-primary)" />
                  <span className="font-caption text-xs text-primary">
                    {t?.subsidyEligible}
                  </span>
                </div>
              )}
            </div>

            {/* Select Button */}
            <Button
              variant={selectedSeed?.id === seed?.id ? "default" : "outline"}
              size="sm"
              fullWidth
              iconName={selectedSeed?.id === seed?.id ? "Check" : "Plus"}
              iconPosition="left"
              iconSize={16}
              className="transition-morphic"
            >
              {selectedSeed?.id === seed?.id ? t?.selected : t?.selectSeed}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeedCategoryCard;