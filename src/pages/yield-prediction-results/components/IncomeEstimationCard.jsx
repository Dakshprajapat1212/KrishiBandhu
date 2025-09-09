import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncomeEstimationCard = ({ yieldData, marketPrice, onTextToSpeech }) => {
  const [animatedIncome, setAnimatedIncome] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('krishibandhu-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const grossIncome = yieldData * marketPrice;
  const productionCost = 15000; // Mock production cost per acre
  const netIncome = grossIncome - productionCost;

  useEffect(() => {
    // Animate income number
    const duration = 2000;
    const steps = 60;
    const increment = grossIncome / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= grossIncome) {
        setAnimatedIncome(grossIncome);
        clearInterval(timer);
      } else {
        setAnimatedIncome(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [grossIncome]);

  const translations = {
    en: {
      title: "Income Estimation",
      subtitle: "Based on predicted yield and market prices",
      grossIncome: "Gross Income",
      productionCost: "Production Cost",
      netIncome: "Net Income",
      perAcre: "per Acre",
      profitMargin: "Profit Margin",
      breakdownTitle: "Income Breakdown",
      listenIncome: "Listen to Income Details",
      incomeText: "Based on your predicted yield of {yield} quintals and current market price of ₹{price} per quintal, your estimated gross income is ₹{gross}. After deducting production costs of ₹{cost}, your net income would be ₹{net} per acre."
    },
    hi: {
      title: "आय अनुमान",
      subtitle: "अनुमानित उत्पादन और बाजार मूल्य के आधार पर",
      grossIncome: "सकल आय",
      productionCost: "उत्पादन लागत",
      netIncome: "शुद्ध आय",
      perAcre: "प्रति एकड़",
      profitMargin: "लाभ मार्जिन",
      breakdownTitle: "आय विवरण",
      listenIncome: "आय विवरण सुनें",
      incomeText: "आपके अनुमानित उत्पादन {yield} क्विंटल और वर्तमान बाजार मूल्य ₹{price} प्रति क्विंटल के आधार पर, आपकी अनुमानित सकल आय ₹{gross} है। ₹{cost} की उत्पादन लागत घटाने के बाद, आपकी शुद्ध आय ₹{net} प्रति एकड़ होगी।"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const profitMargin = ((netIncome / grossIncome) * 100)?.toFixed(1);

  const handleTextToSpeech = () => {
    const text = t?.incomeText?.replace('{yield}', yieldData?.toFixed(1))?.replace('{price}', marketPrice?.toLocaleString('en-IN'))?.replace('{gross}', grossIncome?.toLocaleString('en-IN'))?.replace('{cost}', productionCost?.toLocaleString('en-IN'))?.replace('{net}', netIncome?.toLocaleString('en-IN'));
    onTextToSpeech(text);
  };

  const getIncomeColor = (amount) => {
    return amount > 0 ? 'var(--color-success)' : 'var(--color-error)';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-morphic p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="IndianRupee" size={24} color="var(--color-success)" strokeWidth={2.5} />
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
        <Button
          variant="ghost"
          size="sm"
          onClick={handleTextToSpeech}
          iconName="Volume2"
          iconSize={18}
          className="transition-morphic hover:scale-micro"
          title={t?.listenIncome}
        />
      </div>
      {/* Main Income Display */}
      <div className="text-center mb-6">
        <div className="bg-success/5 rounded-lg p-6 mb-4">
          <div className="font-caption text-sm text-muted-foreground mb-2">
            {t?.grossIncome} {t?.perAcre}
          </div>
          <div className="text-4xl font-heading font-bold text-success mb-2">
            ₹{animatedIncome?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <span>{yieldData?.toFixed(1)} quintals × ₹{marketPrice?.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
      {/* Income Breakdown */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          {t?.breakdownTitle}
        </h3>
        
        <div className="space-y-3">
          {/* Gross Income */}
          <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Plus" size={18} color="var(--color-success)" />
              <span className="font-body font-medium text-foreground">
                {t?.grossIncome}
              </span>
            </div>
            <span className="font-heading font-semibold text-success">
              ₹{grossIncome?.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Production Cost */}
          <div className="flex items-center justify-between p-4 bg-error/5 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Minus" size={18} color="var(--color-error)" />
              <span className="font-body font-medium text-foreground">
                {t?.productionCost}
              </span>
            </div>
            <span className="font-heading font-semibold text-error">
              ₹{productionCost?.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Net Income */}
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
            <div className="flex items-center space-x-3">
              <Icon name="Equal" size={18} color="var(--color-primary)" />
              <span className="font-body font-semibold text-foreground">
                {t?.netIncome}
              </span>
            </div>
            <span 
              className="font-heading font-bold text-xl"
              style={{ color: getIncomeColor(netIncome) }}
            >
              ₹{netIncome?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Profit Margin */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="font-body font-medium text-foreground">
            {t?.profitMargin}
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-success rounded-full transition-all duration-1000"
                style={{ width: `${Math.max(0, Math.min(100, profitMargin))}%` }}
              />
            </div>
            <span 
              className="font-heading font-semibold"
              style={{ color: getIncomeColor(netIncome) }}
            >
              {profitMargin}%
            </span>
          </div>
        </div>
      </div>
      {/* Additional Info */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={18} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div className="font-body text-sm text-foreground">
            <p className="mb-2">
              <strong>Note:</strong> Income calculations are based on current market prices and may vary based on actual market conditions, quality of produce, and timing of sale.
            </p>
            <p className="text-muted-foreground">
              Production costs include seeds, fertilizers, pesticides, labor, and other farming expenses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeEstimationCard;