import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const YieldPredictionCard = ({ yieldData, onTextToSpeech }) => {
  const [animatedYield, setAnimatedYield] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('krishibandhu-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Animate yield number
    const duration = 2000;
    const steps = 60;
    const increment = yieldData?.predicted / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= yieldData?.predicted) {
        setAnimatedYield(yieldData?.predicted);
        clearInterval(timer);
      } else {
        setAnimatedYield(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [yieldData?.predicted]);

  const translations = {
    en: {
      title: "Predicted Yield",
      quintalsPerAcre: "Quintals per Acre",
      confidence: "Confidence",
      explanation: "Based on your soil conditions, irrigation method, and crop variety, this yield prediction considers current weather patterns and historical data for your region.",
      listenExplanation: "Listen to Explanation"
    },
    hi: {
      title: "अनुमानित उत्पादन",
      quintalsPerAcre: "क्विंटल प्रति एकड़",
      confidence: "विश्वसनीयता",
      explanation: "आपकी मिट्टी की स्थिति, सिंचाई विधि और फसल की किस्म के आधार पर, यह उत्पादन पूर्वानुमान आपके क्षेत्र के लिए वर्तमान मौसम पैटर्न और ऐतिहासिक डेटा को ध्यान में रखता है।",
      listenExplanation: "व्याख्या सुनें"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const handleTextToSpeech = () => {
    const text = `${t?.title}. ${animatedYield?.toFixed(1)} ${t?.quintalsPerAcre}. ${t?.confidence} ${yieldData?.confidence}%. ${t?.explanation}`;
    onTextToSpeech(text);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-morphic p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={24} color="var(--color-primary)" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-foreground">
              {t?.title}
            </h2>
            <p className="font-caption text-sm text-muted-foreground">
              {yieldData?.cropType} • {yieldData?.location}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleTextToSpeech}
          iconName="Volume2"
          iconSize={18}
          className="transition-morphic hover:scale-micro"
          title={t?.listenExplanation}
        />
      </div>
      <div className="text-center mb-6">
        <div className="relative">
          <div className="text-6xl font-heading font-bold text-primary mb-2">
            {animatedYield?.toFixed(1)}
          </div>
          <div className="font-body text-lg text-muted-foreground">
            {t?.quintalsPerAcre}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="font-caption text-sm text-muted-foreground">
              Range: {yieldData?.minYield} - {yieldData?.maxYield}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} color="var(--color-primary)" />
            <span className="font-caption text-sm text-muted-foreground">
              {t?.confidence}: {yieldData?.confidence}%
            </span>
          </div>
        </div>
      </div>
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={18} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <p className="font-body text-sm text-foreground leading-relaxed">
            {t?.explanation}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-3 bg-primary/5 rounded-lg">
          <div className="font-heading font-semibold text-lg text-primary">
            {yieldData?.soilHealth}%
          </div>
          <div className="font-caption text-xs text-muted-foreground">
            Soil Health
          </div>
        </div>
        <div className="text-center p-3 bg-accent/10 rounded-lg">
          <div className="font-heading font-semibold text-lg text-accent-foreground">
            {yieldData?.weatherScore}%
          </div>
          <div className="font-caption text-xs text-muted-foreground">
            Weather Score
          </div>
        </div>
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <div className="font-heading font-semibold text-lg text-success">
            {yieldData?.inputEfficiency}%
          </div>
          <div className="font-caption text-xs text-muted-foreground">
            Input Efficiency
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPredictionCard;