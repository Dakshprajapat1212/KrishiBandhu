import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/ui/MainNavigation';
import YieldPredictionCard from './components/YieldPredictionCard';
import ActionRecommendationCard from './components/ActionRecommendationCard';
import WhatIfAnalysisPanel from './components/WhatIfAnalysisPanel';
import MarketPriceCard from './components/MarketPriceCard';
import IncomeEstimationCard from './components/IncomeEstimationCard';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const YieldPredictionResults = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentYield, setCurrentYield] = useState(18.5);
  const [isSpeaking, setIsSpeaking] = useState(false);
  // Add this state for MainNavigation
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('krishibandhu-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock yield prediction data
  const yieldData = {
    predicted: 18.5,
    minYield: 16.2,
    maxYield: 20.8,
    confidence: 87,
    cropType: "Wheat (HD-2967)",
    location: "Ludhiana, Punjab",
    soilHealth: 82,
    weatherScore: 78,
    inputEfficiency: 85
  };

  // Mock recommendation data
  const recommendations = [
    {
      id: 1,
      title: "Irrigation Optimization",
      description: "Adjust irrigation schedule to improve water efficiency and prevent over-watering during critical growth phases.",
      priority: "High",
      icon: "Droplets",
      iconColor: "var(--color-primary)",
      toolPath: null,
      steps: [
        "Monitor soil moisture levels daily using a moisture meter",
        "Apply irrigation when soil moisture drops below 60%",
        "Use drip irrigation system for better water distribution",
        "Reduce irrigation frequency during flowering stage"
      ],
      impact: [
        { metric: "Water Efficiency", value: "15%" },
        { metric: "Yield Increase", value: "8%" }
      ],
      details: "Based on your soil type and current weather patterns, optimizing irrigation can significantly improve yield while reducing water consumption."
    },
    {
      id: 2,
      title: "Fertilizer Management",
      description: "Apply balanced NPK fertilizer with micronutrients to address soil deficiencies and boost plant growth.",
      priority: "Medium",
      icon: "Leaf",
      iconColor: "var(--color-success)",
      toolPath: null,
      steps: [
        "Conduct soil test to determine exact nutrient requirements",
        "Apply 120kg NPK (12:32:16) per acre as basal dose",
        "Top dress with 40kg Urea at tillering stage",
        "Apply micronutrient spray during grain filling"
      ],
      impact: [
        { metric: "Nutrient Uptake", value: "12%" },
        { metric: "Grain Quality", value: "10%" }
      ],
      details: "Proper fertilizer management ensures optimal plant nutrition throughout the growing season."
    },
    {
      id: 3,
      title: "Pest Monitoring",
      description: "Regular monitoring for aphids and rust diseases with preventive measures to protect crop health.",
      priority: "Medium",
      icon: "Bug",
      iconColor: "var(--color-warning)",
      toolPath: "/pest-detection-tool",
      steps: [
        "Inspect crops weekly for pest and disease symptoms",
        "Use yellow sticky traps to monitor aphid population",
        "Apply neem oil spray as preventive measure",
        "Contact extension officer if pest threshold is exceeded"
      ],
      impact: [
        { metric: "Crop Protection", value: "95%" },
        { metric: "Quality Preservation", value: "18%" }
      ],
      details: "Early detection and management of pests and diseases is crucial for maintaining crop health and yield."
    }
  ];

  const translations = {
    en: {
      title: "Yield Prediction Results",
      subtitle: "Comprehensive analysis and recommendations for your crop",
      backToDashboard: "Back to Dashboard",
      recommendations: "Action Recommendations",
      whatIfAnalysis: "What-If Analysis",
      marketPrices: "Market Information",
      incomeEstimation: "Income Estimation",
      stopSpeaking: "Stop Speaking"
    },
    hi: {
      title: "उत्पादन पूर्वानुमान परिणाम",
      subtitle: "आपकी फसल के लिए व्यापक विश्लेषण और सिफारिशें",
      backToDashboard: "डैशबोर्ड पर वापस जाएं",
      recommendations: "कार्य सिफारिशें",
      whatIfAnalysis: "क्या-अगर विश्लेषण",
      marketPrices: "बाजार जानकारी",
      incomeEstimation: "आय अनुमान",
      stopSpeaking: "बोलना बंद करें"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const handleTextToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis?.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis?.speak(utterance);
    }
  };

  const handleStopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
  };

  const handleYieldChange = (newYield) => {
    setCurrentYield(newYield);
  };

  const handleBackToDashboard = () => {
    navigate('/crop-input-dashboard');
  };

  // Add this function for MainNavigation
  const handleToggleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation onToggleCollapse={handleToggleNavCollapse} />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              {t?.title}
            </h1>
            <p className="font-body text-muted-foreground">
              {t?.subtitle}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {isSpeaking && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleStopSpeaking}
                iconName="VolumeX"
                iconPosition="left"
                iconSize={18}
                className="transition-morphic hover:scale-micro"
              >
                {t?.stopSpeaking}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToDashboard}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={18}
              className="transition-morphic hover:scale-micro"
            >
              {t?.backToDashboard}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Results */}
          <div className="lg:col-span-2 space-y-8">
            {/* Yield Prediction Card */}
            <YieldPredictionCard 
              yieldData={yieldData}
              onTextToSpeech={handleTextToSpeech}
            />

            {/* Action Recommendations */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Icon name="CheckSquare" size={24} color="var(--color-primary)" />
                <h2 className="font-heading font-bold text-2xl text-foreground">
                  {t?.recommendations}
                </h2>
              </div>
              <div className="space-y-6">
                {recommendations?.map((recommendation) => (
                  <ActionRecommendationCard
                    key={recommendation?.id}
                    recommendation={recommendation}
                    onTextToSpeech={handleTextToSpeech}
                  />
                ))}
              </div>
            </div>

            {/* What-If Analysis */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Icon name="Sliders" size={24} color="var(--color-accent)" />
                <h2 className="font-heading font-bold text-2xl text-foreground">
                  {t?.whatIfAnalysis}
                </h2>
              </div>
              <WhatIfAnalysisPanel
                baseYield={yieldData?.predicted}
                onYieldChange={handleYieldChange}
                onTextToSpeech={handleTextToSpeech}
              />
            </div>
          </div>

          {/* Right Column - Market & Income */}
          <div className="space-y-8">
            {/* Market Price Card */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Icon name="TrendingUp" size={24} color="var(--color-success)" />
                <h2 className="font-heading font-bold text-2xl text-foreground">
                  {t?.marketPrices}
                </h2>
              </div>
              <MarketPriceCard
                cropType={yieldData?.cropType}
                onTextToSpeech={handleTextToSpeech}
              />
            </div>

            {/* Income Estimation Card */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Icon name="IndianRupee" size={24} color="var(--color-success)" />
                <h2 className="font-heading font-bold text-2xl text-foreground">
                  {t?.incomeEstimation}
                </h2>
              </div>
              <IncomeEstimationCard
                yieldData={currentYield}
                marketPrice={2850}
                onTextToSpeech={handleTextToSpeech}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default YieldPredictionResults;