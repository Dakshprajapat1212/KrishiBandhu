import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const YieldProjectionCard = ({ 
  selectedSeed, 
  baselineYield, 
  onUpdatePlan,
  currentLanguage 
}) => {
  const translations = {
    en: {
      yieldProjection: 'Updated Yield Projection',
      baselineYield: 'Baseline Yield',
      withSelectedSeed: 'With Selected Seed',
      projectedIncrease: 'Projected Increase',
      totalYield: 'Total Projected Yield',
      quintalsPerAcre: 'quintals/acre',
      updateCropPlan: 'Update Crop Plan',
      returnToDashboard: 'Return to Dashboard',
      noSeedSelected: 'No seed selected',
      selectSeedFirst: 'Please select a seed variety to see updated projections'
    },
    hi: {
      yieldProjection: 'अपडेटेड उत्पादन प्रक्षेपण',
      baselineYield: 'आधारभूत उत्पादन',
      withSelectedSeed: 'चयनित बीज के साथ',
      projectedIncrease: 'अनुमानित वृद्धि',
      totalYield: 'कुल अनुमानित उत्पादन',
      quintalsPerAcre: 'क्विंटल/एकड़',
      updateCropPlan: 'फसल योजना अपडेट करें',
      returnToDashboard: 'डैशबोर्ड पर वापस जाएं',
      noSeedSelected: 'कोई बीज चयनित नहीं',
      selectSeedFirst: 'अपडेटेड प्रक्षेपण देखने के लिए कृपया एक बीज किस्म चुनें'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  if (!selectedSeed) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-morphic p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Wheat" size={32} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="font-heading font-medium text-foreground mb-2">
            {t?.noSeedSelected}
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            {t?.selectSeedFirst}
          </p>
        </div>
      </div>
    );
  }

  const projectedYield = baselineYield * (1 + selectedSeed?.yieldBoost / 100);
  const yieldIncrease = projectedYield - baselineYield;

  return (
    <div className="bg-card rounded-lg border border-border shadow-morphic p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {t?.yieldProjection}
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            {selectedSeed?.name}
          </p>
        </div>
      </div>
      {/* Yield Comparison */}
      <div className="space-y-4 mb-6">
        {/* Baseline Yield */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
              <Icon name="Minus" size={16} color="var(--color-muted-foreground)" />
            </div>
            <span className="font-body text-foreground">
              {t?.baselineYield}
            </span>
          </div>
          <span className="font-data font-medium text-foreground">
            {baselineYield?.toFixed(1)} {t?.quintalsPerAcre}
          </span>
        </div>

        {/* Projected Increase */}
        <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={16} color="var(--color-success)" />
            </div>
            <span className="font-body text-foreground">
              {t?.projectedIncrease}
            </span>
          </div>
          <div className="text-right">
            <span className="font-data font-medium text-success">
              +{yieldIncrease?.toFixed(1)} {t?.quintalsPerAcre}
            </span>
            <div className="font-caption text-xs text-success">
              (+{selectedSeed?.yieldBoost}%)
            </div>
          </div>
        </div>

        {/* Total Projected Yield */}
        <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={16} color="var(--color-primary)" />
            </div>
            <span className="font-body font-medium text-foreground">
              {t?.totalYield}
            </span>
          </div>
          <span className="font-data font-semibold text-xl text-primary">
            {projectedYield?.toFixed(1)} {t?.quintalsPerAcre}
          </span>
        </div>
      </div>
      {/* Visual Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-caption text-sm text-muted-foreground">
            Yield Improvement
          </span>
          <span className="font-caption text-sm font-medium text-primary">
            +{selectedSeed?.yieldBoost}%
          </span>
        </div>
        <div className="w-full bg-muted/30 rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-500"
            style={{ width: `${Math.min(selectedSeed?.yieldBoost, 100)}%` }}
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          size="sm"
          fullWidth
          onClick={onUpdatePlan}
          iconName="Check"
          iconPosition="left"
          iconSize={16}
          className="transition-morphic hover:scale-micro"
        >
          {t?.updateCropPlan}
        </Button>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => window.history?.back()}
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={16}
          className="transition-morphic hover:scale-micro"
        >
          {t?.returnToDashboard}
        </Button>
      </div>
    </div>
  );
};

export default YieldProjectionCard;