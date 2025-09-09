import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterControls = ({ 
  activeFilter, 
  onFilterChange, 
  sortOrder, 
  onSortOrderChange,
  currentLanguage 
}) => {
  const translations = {
    en: {
      sortBy: 'Sort by',
      cost: 'Cost',
      yieldPotential: 'Yield Potential',
      waterEfficiency: 'Water Efficiency',
      diseaseResistance: 'Disease Resistance',
      roi: 'ROI',
      ascending: 'Low to High',
      descending: 'High to Low'
    },
    hi: {
      sortBy: 'इसके अनुसार क्रमबद्ध करें',
      cost: 'लागत',
      yieldPotential: 'उत्पादन क्षमता',
      waterEfficiency: 'पानी की दक्षता',
      diseaseResistance: 'रोग प्रतिरोधक क्षमता',
      roi: 'निवेश पर रिटर्न',
      ascending: 'कम से अधिक',
      descending: 'अधिक से कम'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const filterOptions = [
    { 
      id: 'cost', 
      label: t?.cost, 
      icon: 'DollarSign',
      description: 'Sort by seed cost per acre'
    },
    { 
      id: 'yield', 
      label: t?.yieldPotential, 
      icon: 'TrendingUp',
      description: 'Sort by expected yield boost'
    },
    { 
      id: 'water', 
      label: t?.waterEfficiency, 
      icon: 'Droplets',
      description: 'Sort by water requirement'
    },
    { 
      id: 'disease', 
      label: t?.diseaseResistance, 
      icon: 'Shield',
      description: 'Sort by disease resistance level'
    },
    { 
      id: 'roi', 
      label: t?.roi, 
      icon: 'Target',
      description: 'Sort by return on investment'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-morphic p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Sort By Label */}
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-medium text-foreground">
            {t?.sortBy}
          </h3>
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((option) => (
            <Button
              key={option?.id}
              variant={activeFilter === option?.id ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(option?.id)}
              iconName={option?.icon}
              iconPosition="left"
              iconSize={16}
              className="transition-morphic hover:scale-micro"
              title={option?.description}
            >
              {option?.label}
            </Button>
          ))}
        </div>

        {/* Sort Order Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSortOrderChange}
            iconName={sortOrder === 'asc' ? "ArrowUp" : "ArrowDown"}
            iconPosition="left"
            iconSize={16}
            className="transition-morphic hover:scale-micro"
            title={sortOrder === 'asc' ? t?.ascending : t?.descending}
          >
            {sortOrder === 'asc' ? t?.ascending : t?.descending}
          </Button>
        </div>
      </div>
      {/* Active Filter Info */}
      {activeFilter && (
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon 
              name={filterOptions?.find(f => f?.id === activeFilter)?.icon || 'Filter'} 
              size={16} 
              color="var(--color-primary)" 
            />
            <span className="font-body text-sm text-primary">
              Sorted by {filterOptions?.find(f => f?.id === activeFilter)?.label?.toLowerCase()} 
              ({sortOrder === 'asc' ? t?.ascending?.toLowerCase() : t?.descending?.toLowerCase()})
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;