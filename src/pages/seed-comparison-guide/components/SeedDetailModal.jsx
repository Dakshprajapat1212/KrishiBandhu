import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SeedDetailModal = ({ 
  seed, 
  isOpen, 
  onClose, 
  onSelectSeed,
  currentLanguage 
}) => {
  const translations = {
    en: {
      seedDetails: 'Seed Details',
      variety: 'Variety',
      yieldBoost: 'Yield Boost',
      costPerAcre: 'Cost per Acre',
      diseaseResistance: 'Disease Resistance',
      waterRequirement: 'Water Requirement',
      roi: 'Return on Investment',
      plantingSeason: 'Planting Season',
      maturityPeriod: 'Maturity Period',
      supplierInfo: 'Supplier Information',
      availability: 'Market Availability',
      seasonalRecommendations: 'Seasonal Recommendations',
      selectThisSeed: 'Select This Seed',
      close: 'Close',
      governmentCertified: 'Government Certified',
      subsidyEligible: 'Subsidy Eligible',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      days: 'days',
      kharif: 'Kharif (Monsoon)',
      rabi: 'Rabi (Winter)',
      zaid: 'Zaid (Summer)',
      available: 'Available',
      limited: 'Limited Stock',
      outOfStock: 'Out of Stock'
    },
    hi: {
      seedDetails: 'बीज विवरण',
      variety: 'किस्म',
      yieldBoost: 'उत्पादन वृद्धि',
      costPerAcre: 'प्रति एकड़ लागत',
      diseaseResistance: 'रोग प्रतिरोधक क्षमता',
      waterRequirement: 'पानी की आवश्यकता',
      roi: 'निवेश पर रिटर्न',
      plantingSeason: 'बुवाई का मौसम',
      maturityPeriod: 'पकने की अवधि',
      supplierInfo: 'आपूर्तिकर्ता की जानकारी',
      availability: 'बाजार में उपलब्धता',
      seasonalRecommendations: 'मौसमी सिफारिशें',
      selectThisSeed: 'यह बीज चुनें',
      close: 'बंद करें',
      governmentCertified: 'सरकारी प्रमाणित',
      subsidyEligible: 'सब्सिडी योग्य',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कम',
      days: 'दिन',
      kharif: 'खरीफ (मानसून)',
      rabi: 'रबी (सर्दी)',
      zaid: 'जायद (गर्मी)',
      available: 'उपलब्ध',
      limited: 'सीमित स्टॉक',
      outOfStock: 'स्टॉक समाप्त'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  if (!isOpen || !seed) return null;

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available': return 'var(--color-success)';
      case 'limited': return 'var(--color-warning)';
      case 'outOfStock': return 'var(--color-error)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getAvailabilityIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'limited': return 'AlertCircle';
      case 'outOfStock': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-lg shadow-morphic-active max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Wheat" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-xl text-foreground">
                {t?.seedDetails}
              </h2>
              <p className="font-body text-sm text-muted-foreground">
                {seed?.name}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
            className="transition-morphic hover:scale-micro"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="font-body text-sm font-medium text-muted-foreground">
                  {t?.variety}
                </label>
                <p className="font-body text-foreground mt-1">{seed?.variety}</p>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-muted-foreground">
                  {t?.yieldBoost}
                </label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-data font-medium text-success">
                    +{seed?.yieldBoost}%
                  </span>
                  <Icon name="TrendingUp" size={16} color="var(--color-success)" />
                </div>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-muted-foreground">
                  {t?.costPerAcre}
                </label>
                <p className="font-data font-medium text-foreground mt-1">
                  ₹{seed?.costPerAcre?.toLocaleString('en-IN')}
                </p>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-muted-foreground">
                  {t?.roi}
                </label>
                <p className="font-data font-medium text-primary mt-1">
                  {seed?.roi}%
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-body text-sm font-medium text-muted-foreground">
                  {t?.diseaseResistance}
                </label>
                <div className="flex items-center space-x-2 mt-1">
                  <div className={`
                    w-3 h-3 rounded-full
                    ${seed?.diseaseResistance === 'high' ? 'bg-success' : 
                      seed?.diseaseResistance === 'medium' ? 'bg-warning' : 'bg-error'}
                  `} />
                  <span className="font-body text-foreground capitalize">
                    {t?.[seed?.diseaseResistance] || seed?.diseaseResistance}
                  </span>
                </div>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-muted-foreground">
                  {t?.waterRequirement}
                </label>
                <div className="flex items-center space-x-2 mt-1">
                  <Icon 
                    name="Droplets" 
                    size={16} 
                    color={
                      seed?.waterRequirement === 'low' ? 'var(--color-success)' :
                      seed?.waterRequirement === 'medium' ? 'var(--color-warning)' :
                      'var(--color-error)'
                    }
                  />
                  <span className="font-body text-foreground capitalize">
                    {t?.[seed?.waterRequirement] || seed?.waterRequirement}
                  </span>
                </div>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-muted-foreground">
                  {t?.plantingSeason}
                </label>
                <p className="font-body text-foreground mt-1">
                  {t?.[seed?.plantingSeason] || seed?.plantingSeason}
                </p>
              </div>

              <div>
                <label className="font-body text-sm font-medium text-muted-foreground">
                  {t?.maturityPeriod}
                </label>
                <p className="font-body text-foreground mt-1">
                  {seed?.maturityPeriod} {t?.days}
                </p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {seed?.governmentCertified && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span className="font-body text-sm text-success">
                  {t?.governmentCertified}
                </span>
              </div>
            )}
            {seed?.subsidyEligible && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                <Icon name="Gift" size={16} color="var(--color-primary)" />
                <span className="font-body text-sm text-primary">
                  {t?.subsidyEligible}
                </span>
              </div>
            )}
          </div>

          {/* Supplier Information */}
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <h4 className="font-heading font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Store" size={18} color="var(--color-primary)" />
              <span>{t?.supplierInfo}</span>
            </h4>
            <div className="space-y-2">
              <p className="font-body text-sm text-foreground">
                <strong>Supplier:</strong> {seed?.supplier}
              </p>
              <p className="font-body text-sm text-foreground">
                <strong>Contact:</strong> {seed?.supplierContact}
              </p>
              <div className="flex items-center space-x-2">
                <span className="font-body text-sm text-foreground">
                  <strong>{t?.availability}:</strong>
                </span>
                <Icon 
                  name={getAvailabilityIcon(seed?.availability)} 
                  size={16} 
                  color={getAvailabilityColor(seed?.availability)}
                />
                <span 
                  className="font-body text-sm"
                  style={{ color: getAvailabilityColor(seed?.availability) }}
                >
                  {t?.[seed?.availability] || seed?.availability}
                </span>
              </div>
            </div>
          </div>

          {/* Seasonal Recommendations */}
          <div className="bg-accent/10 rounded-lg p-4">
            <h4 className="font-heading font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Calendar" size={18} color="var(--color-accent)" />
              <span>{t?.seasonalRecommendations}</span>
            </h4>
            <p className="font-body text-sm text-foreground">
              {seed?.seasonalRecommendations}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            {t?.close}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              onSelectSeed(seed);
              onClose();
            }}
            iconName="Check"
            iconPosition="left"
            iconSize={16}
          >
            {t?.selectThisSeed}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeedDetailModal;