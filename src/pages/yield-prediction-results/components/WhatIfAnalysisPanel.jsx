import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WhatIfAnalysisPanel = ({ baseYield, onYieldChange, onTextToSpeech }) => {
  const [irrigationLevel, setIrrigationLevel] = useState(50);
  const [fertilizerLevel, setFertilizerLevel] = useState(50);
  const [currentYield, setCurrentYield] = useState(baseYield);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('krishibandhu-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Calculate yield based on irrigation and fertilizer levels using sensitivity formulas
    const irrigationImpact = (irrigationLevel - 50) * 0.02; // 2% per 10 units
    const fertilizerImpact = (fertilizerLevel - 50) * 0.015; // 1.5% per 10 units
    
    const newYield = baseYield * (1 + irrigationImpact + fertilizerImpact);
    setCurrentYield(Math.max(0, newYield));
    onYieldChange(Math.max(0, newYield));
  }, [irrigationLevel, fertilizerLevel, baseYield, onYieldChange]);

  const translations = {
    en: {
      title: "What-If Analysis",
      subtitle: "Adjust inputs to see yield impact",
      irrigation: "Irrigation Level",
      fertilizer: "Fertilizer Application",
      currentYield: "Projected Yield",
      quintalsPerAcre: "Quintals/Acre",
      reset: "Reset to Default",
      listenAnalysis: "Listen to Analysis",
      low: "Low",
      optimal: "Optimal",
      high: "High",
      yieldChange: "Yield Change",
      analysisText: "By adjusting irrigation to {irrigation}% and fertilizer to {fertilizer}%, your projected yield changes to {yield} quintals per acre."
    },
    hi: {
      title: "क्या-अगर विश्लेषण",
      subtitle: "उत्पादन प्रभाव देखने के लिए इनपुट समायोजित करें",
      irrigation: "सिंचाई स्तर",
      fertilizer: "उर्वरक अनुप्रयोग",
      currentYield: "अनुमानित उत्पादन",
      quintalsPerAcre: "क्विंटल/एकड़",
      reset: "डिफ़ॉल्ट पर रीसेट करें",
      listenAnalysis: "विश्लेषण सुनें",
      low: "कम",
      optimal: "इष्टतम",
      high: "उच्च",
      yieldChange: "उत्पादन परिवर्तन",
      analysisText: "सिंचाई को {irrigation}% और उर्वरक को {fertilizer}% पर समायोजित करके, आपका अनुमानित उत्पादन {yield} क्विंटल प्रति एकड़ में बदल जाता है।"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const handleReset = () => {
    setIrrigationLevel(50);
    setFertilizerLevel(50);
  };

  const handleTextToSpeech = () => {
    const text = t?.analysisText?.replace('{irrigation}', irrigationLevel)?.replace('{fertilizer}', fertilizerLevel)?.replace('{yield}', currentYield?.toFixed(1));
    onTextToSpeech(text);
  };

  const getYieldChangeColor = () => {
    const change = ((currentYield - baseYield) / baseYield) * 100;
    if (change > 0) return 'var(--color-success)';
    if (change < 0) return 'var(--color-error)';
    return 'var(--color-muted-foreground)';
  };

  const getYieldChangeIcon = () => {
    const change = ((currentYield - baseYield) / baseYield) * 100;
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-morphic p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Sliders" size={24} color="var(--color-accent)" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-foreground">
              {t?.title}
            </h2>
            <p className="font-caption text-sm text-muted-foreground">
              {t?.subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleTextToSpeech}
            iconName="Volume2"
            iconSize={18}
            className="transition-morphic hover:scale-micro"
            title={t?.listenAnalysis}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            iconName="RotateCcw"
            iconSize={18}
            className="transition-morphic hover:scale-micro"
          >
            {t?.reset}
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Irrigation Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-body font-medium text-foreground">
              {t?.irrigation}
            </label>
            <span className="font-heading font-semibold text-primary">
              {irrigationLevel}%
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={irrigationLevel}
              onChange={(e) => setIrrigationLevel(parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${irrigationLevel}%, var(--color-muted) ${irrigationLevel}%, var(--color-muted) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{t?.low}</span>
              <span>{t?.optimal}</span>
              <span>{t?.high}</span>
            </div>
          </div>
        </div>

        {/* Fertilizer Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-body font-medium text-foreground">
              {t?.fertilizer}
            </label>
            <span className="font-heading font-semibold text-success">
              {fertilizerLevel}%
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={fertilizerLevel}
              onChange={(e) => setFertilizerLevel(parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, var(--color-success) 0%, var(--color-success) ${fertilizerLevel}%, var(--color-muted) ${fertilizerLevel}%, var(--color-muted) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{t?.low}</span>
              <span>{t?.optimal}</span>
              <span>{t?.high}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Yield Preview */}
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
              {t?.currentYield}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-heading font-bold text-primary">
                {currentYield?.toFixed(1)}
              </span>
              <span className="font-body text-muted-foreground">
                {t?.quintalsPerAcre}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-caption text-sm text-muted-foreground mb-1">
              {t?.yieldChange}
            </div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={getYieldChangeIcon()} 
                size={18} 
                color={getYieldChangeColor()}
              />
              <span 
                className="font-heading font-semibold"
                style={{ color: getYieldChangeColor() }}
              >
                {((currentYield - baseYield) / baseYield * 100)?.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-card);
          border: 2px solid var(--color-primary);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-card);
          border: 2px solid var(--color-primary);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default WhatIfAnalysisPanel;