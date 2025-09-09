import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/ui/MainNavigation';
import SeedCategoryCard from './components/SeedCategoryCard';
import FilterControls from './components/FilterControls';
import SeedDetailModal from './components/SeedDetailModal';
import YieldProjectionCard from './components/YieldProjectionCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SeedComparisonGuide = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeFilter, setActiveFilter] = useState('yield');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [detailModalSeed, setDetailModalSeed] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('krishibandhu-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      title: 'Seed Comparison Guide',
      subtitle: 'Compare different seed varieties to optimize your crop yield and investment returns',
      backToDashboard: 'Back to Dashboard',
      certifiedSeeds: 'Government certified seeds with quality assurance',
      hybridSeeds: 'High-yield hybrid varieties with enhanced traits',
      localSeeds: 'Traditional local varieties adapted to regional conditions'
    },
    hi: {
      title: 'बीज तुलना गाइड',
      subtitle: 'अपनी फसल की पैदावार और निवेश रिटर्न को अनुकूलित करने के लिए विभिन्न बीज किस्मों की तुलना करें',
      backToDashboard: 'डैशबोर्ड पर वापस जाएं',
      certifiedSeeds: 'गुणवत्ता आश्वासन के साथ सरकारी प्रमाणित बीज',
      hybridSeeds: 'बेहतर गुणों के साथ उच्च उत्पादन हाइब्रिड किस्में',
      localSeeds: 'क्षेत्रीय परिस्थितियों के अनुकूल पारंपरिक स्थानीय किस्में'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  // Mock seed data
  const seedCategories = [
    {
      type: 'certified',
      description: t?.certifiedSeeds
    },
    {
      type: 'hybrid',
      description: t?.hybridSeeds
    },
    {
      type: 'local',
      description: t?.localSeeds
    }
  ];

  const mockSeeds = {
    certified: [
      {
        id: 'cert-1',
        name: 'HD-3086',
        variety: 'Certified Wheat',
        yieldBoost: 15,
        costPerAcre: 3500,
        diseaseResistance: 'high',
        waterRequirement: 'medium',
        roi: 125,
        governmentCertified: true,
        subsidyEligible: true,
        plantingSeason: 'rabi',
        maturityPeriod: 120,
        supplier: 'National Seeds Corporation',
        supplierContact: '+91-11-2436-7890',
        availability: 'available',
        seasonalRecommendations: `Best planted during November-December in North India. Requires 4-5 irrigations during growing season. Suitable for wheat-rice cropping system.`
      },
      {
        id: 'cert-2',
        name: 'PBW-725',
        variety: 'Certified Wheat',
        yieldBoost: 12,
        costPerAcre: 3200,
        diseaseResistance: 'high',
        waterRequirement: 'low',
        roi: 140,
        governmentCertified: true,
        subsidyEligible: true,
        plantingSeason: 'rabi',
        maturityPeriod: 115,
        supplier: 'Punjab Agricultural University',
        supplierContact: '+91-161-240-1960',
        availability: 'limited',
        seasonalRecommendations: `Drought-tolerant variety suitable for late sowing. Can be planted till mid-December. Requires minimal irrigation.`
      }
    ],
    hybrid: [
      {
        id: 'hyb-1',
        name: 'DBW-187',
        variety: 'Hybrid Wheat',
        yieldBoost: 25,
        costPerAcre: 5500,
        diseaseResistance: 'high',
        waterRequirement: 'medium',
        roi: 180,
        governmentCertified: true,
        subsidyEligible: false,
        plantingSeason: 'rabi',
        maturityPeriod: 125,
        supplier: 'Mahyco Seeds',
        supplierContact: '+91-22-6742-4000',
        availability: 'available',
        seasonalRecommendations: `High-yielding hybrid suitable for irrigated conditions. Plant during optimal sowing window (Nov 15 - Dec 5) for best results.`
      },
      {
        id: 'hyb-2',
        name: 'WH-1105',
        variety: 'Hybrid Wheat',
        yieldBoost: 30,
        costPerAcre: 6200,
        diseaseResistance: 'medium',
        waterRequirement: 'high',
        roi: 165,
        governmentCertified: false,
        subsidyEligible: false,
        plantingSeason: 'rabi',
        maturityPeriod: 130,
        supplier: 'Bayer CropScience',
        supplierContact: '+91-22-3989-6000',
        availability: 'available',
        seasonalRecommendations: `Premium hybrid with highest yield potential. Requires assured irrigation and fertile soil conditions for optimal performance.`
      }
    ],
    local: [
      {
        id: 'loc-1',
        name: 'Kharchia-65',
        variety: 'Local Wheat',
        yieldBoost: 8,
        costPerAcre: 2200,
        diseaseResistance: 'medium',
        waterRequirement: 'low',
        roi: 110,
        governmentCertified: false,
        subsidyEligible: true,
        plantingSeason: 'rabi',
        maturityPeriod: 110,
        supplier: 'Local Seed Dealer',
        supplierContact: '+91-98765-43210',
        availability: 'available',
        seasonalRecommendations: `Salt-tolerant variety suitable for problematic soils. Traditional variety with good adaptation to local conditions.`
      },
      {
        id: 'loc-2',
        name: 'Lok-1',
        variety: 'Local Wheat',
        yieldBoost: 5,
        costPerAcre: 1800,
        diseaseResistance: 'low',
        waterRequirement: 'low',
        roi: 95,
        governmentCertified: false,
        subsidyEligible: true,
        plantingSeason: 'rabi',
        maturityPeriod: 105,
        supplier: 'Village Cooperative',
        supplierContact: '+91-98765-12345',
        availability: 'available',
        seasonalRecommendations: `Traditional variety with low input requirements. Suitable for marginal farmers with limited resources.`
      }
    ]
  };

  const baselineYield = 35.5; // quintals per acre

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSortOrderChange = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleSeedSelect = (seed) => {
    setSelectedSeed(seed);
  };

  const handleSeedDetail = (seed) => {
    setDetailModalSeed(seed);
    setIsDetailModalOpen(true);
  };

  const handleUpdatePlan = () => {
    // Store selected seed in localStorage for dashboard integration
    localStorage.setItem('krishibandhu-selected-seed', JSON.stringify(selectedSeed));
    navigate('/crop-input-dashboard');
  };

  const getSortedSeeds = (seeds) => {
    return [...seeds]?.sort((a, b) => {
      let aValue, bValue;
      
      switch (activeFilter) {
        case 'cost':
          aValue = a?.costPerAcre;
          bValue = b?.costPerAcre;
          break;
        case 'yield':
          aValue = a?.yieldBoost;
          bValue = b?.yieldBoost;
          break;
        case 'water':
          aValue = a?.waterRequirement === 'low' ? 1 : a?.waterRequirement === 'medium' ? 2 : 3;
          bValue = b?.waterRequirement === 'low' ? 1 : b?.waterRequirement === 'medium' ? 2 : 3;
          break;
        case 'disease':
          aValue = a?.diseaseResistance === 'high' ? 3 : a?.diseaseResistance === 'medium' ? 2 : 1;
          bValue = b?.diseaseResistance === 'high' ? 3 : b?.diseaseResistance === 'medium' ? 2 : 1;
          break;
        case 'roi':
          aValue = a?.roi;
          bValue = b?.roi;
          break;
        default:
          aValue = a?.yieldBoost;
          bValue = b?.yieldBoost;
      }

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation onToggleCollapse={() => {}} />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/crop-input-dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={18}
              className="transition-morphic hover:scale-micro"
            >
              {t?.backToDashboard}
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Wheat" size={32} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground">
                {t?.title}
              </h1>
              <p className="font-body text-muted-foreground mt-2">
                {t?.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <FilterControls
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          sortOrder={sortOrder}
          onSortOrderChange={handleSortOrderChange}
          currentLanguage={currentLanguage}
        />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Seed Categories */}
          <div className="xl:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {seedCategories?.map((category) => (
                <SeedCategoryCard
                  key={category?.type}
                  category={category}
                  seeds={getSortedSeeds(mockSeeds?.[category?.type])}
                  selectedSeed={selectedSeed}
                  onSeedSelect={handleSeedSelect}
                  currentLanguage={currentLanguage}
                />
              ))}
            </div>
          </div>

          {/* Yield Projection Card */}
          <div className="xl:col-span-1">
            <div className="sticky top-24">
              <YieldProjectionCard
                selectedSeed={selectedSeed}
                baselineYield={baselineYield}
                onUpdatePlan={handleUpdatePlan}
                currentLanguage={currentLanguage}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Seed Detail Modal */}
      <SeedDetailModal
        seed={detailModalSeed}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onSelectSeed={handleSeedSelect}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default SeedComparisonGuide;