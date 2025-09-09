import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MarketPriceCard = ({ cropType, onTextToSpeech }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('krishibandhu-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock market data with 7-day trend
  const marketData = {
    currentPrice: 2850,
    previousPrice: 2720,
    trend: [2650, 2680, 2720, 2750, 2780, 2820, 2850],
    marketName: "Kharif Mandi, Punjab",
    lastUpdated: "2 hours ago",
    priceRange: { min: 2650, max: 2900 },
    demandLevel: "High"
  };

  const translations = {
    en: {
      title: "Market Price",
      currentPrice: "Current Price",
      perQuintal: "per Quintal",
      priceChange: "Price Change",
      sevenDayTrend: "7-Day Trend",
      marketLocation: "Market Location",
      lastUpdated: "Last Updated",
      priceRange: "Price Range",
      demand: "Demand",
      listenPrices: "Listen to Prices",
      high: "High",
      medium: "Medium",
      low: "Low"
    },
    hi: {
      title: "बाजार मूल्य",
      currentPrice: "वर्तमान मूल्य",
      perQuintal: "प्रति क्विंटल",
      priceChange: "मूल्य परिवर्तन",
      sevenDayTrend: "7-दिन की प्रवृत्ति",
      marketLocation: "बाजार स्थान",
      lastUpdated: "अंतिम अपडेट",
      priceRange: "मूल्य सीमा",
      demand: "मांग",
      listenPrices: "मूल्य सुनें",
      high: "उच्च",
      medium: "मध्यम",
      low: "कम"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const priceChange = marketData?.currentPrice - marketData?.previousPrice;
  const priceChangePercent = (priceChange / marketData?.previousPrice) * 100;

  const handleTextToSpeech = () => {
    const changeText = priceChange > 0 ? `increased by ${priceChange}` : `decreased by ${Math.abs(priceChange)}`;
    const text = `${t?.title} for ${cropType}. ${t?.currentPrice}: ₹${marketData?.currentPrice} ${t?.perQuintal}. Price has ${changeText} rupees from yesterday. ${t?.demand} is ${marketData?.demandLevel}.`;
    onTextToSpeech(text);
  };

  const getPriceChangeColor = () => {
    return priceChange >= 0 ? 'var(--color-success)' : 'var(--color-error)';
  };

  const getPriceChangeIcon = () => {
    return priceChange >= 0 ? 'TrendingUp' : 'TrendingDown';
  };

  const getDemandColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'var(--color-success)';
      case 'medium':
        return 'var(--color-warning)';
      case 'low':
        return 'var(--color-error)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-morphic p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={24} color="var(--color-success)" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-foreground">
              {t?.title}
            </h2>
            <p className="font-caption text-sm text-muted-foreground">
              {cropType} • {marketData?.marketName}
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
          title={t?.listenPrices}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Price */}
        <div className="space-y-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="font-caption text-sm text-muted-foreground mb-1">
              {t?.currentPrice}
            </div>
            <div className="text-3xl font-heading font-bold text-foreground mb-1">
              ₹{marketData?.currentPrice?.toLocaleString('en-IN')}
            </div>
            <div className="font-body text-sm text-muted-foreground">
              {t?.perQuintal}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getPriceChangeIcon()} 
                size={16} 
                color={getPriceChangeColor()}
              />
              <span 
                className="font-heading font-semibold text-sm"
                style={{ color: getPriceChangeColor() }}
              >
                ₹{Math.abs(priceChange)} ({priceChangePercent?.toFixed(1)}%)
              </span>
            </div>
            <div className="text-muted-foreground text-sm">
              vs yesterday
            </div>
          </div>
        </div>

        {/* 7-Day Trend Sparkline */}
        <div className="space-y-4">
          <div>
            <h3 className="font-body font-medium text-foreground mb-3">
              {t?.sevenDayTrend}
            </h3>
            <div className="relative h-16 bg-muted/30 rounded-lg p-2">
              <svg width="100%" height="100%" viewBox="0 0 280 48" className="overflow-visible">
                <defs>
                  <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-success)" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                
                {/* Trend line */}
                <polyline
                  fill="none"
                  stroke="var(--color-success)"
                  strokeWidth="2"
                  points={marketData?.trend?.map((price, index) => {
                    const x = (index / (marketData?.trend?.length - 1)) * 260 + 10;
                    const minPrice = Math.min(...marketData?.trend);
                    const maxPrice = Math.max(...marketData?.trend);
                    const y = 40 - ((price - minPrice) / (maxPrice - minPrice)) * 32;
                    return `${x},${y}`;
                  })?.join(' ')}
                />
                
                {/* Area fill */}
                <polygon
                  fill="url(#priceGradient)"
                  points={`10,40 ${marketData?.trend?.map((price, index) => {
                    const x = (index / (marketData?.trend?.length - 1)) * 260 + 10;
                    const minPrice = Math.min(...marketData?.trend);
                    const maxPrice = Math.max(...marketData?.trend);
                    const y = 40 - ((price - minPrice) / (maxPrice - minPrice)) * 32;
                    return `${x},${y}`;
                  })?.join(' ')} 270,40`}
                />
                
                {/* Data points */}
                {marketData?.trend?.map((price, index) => {
                  const x = (index / (marketData?.trend?.length - 1)) * 260 + 10;
                  const minPrice = Math.min(...marketData?.trend);
                  const maxPrice = Math.max(...marketData?.trend);
                  const y = 40 - ((price - minPrice) / (maxPrice - minPrice)) * 32;
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="3"
                      fill="var(--color-success)"
                      stroke="var(--color-card)"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Market Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="font-caption text-xs text-muted-foreground mb-1">
            {t?.priceRange}
          </div>
          <div className="font-body font-medium text-foreground">
            ₹{marketData?.priceRange?.min} - ₹{marketData?.priceRange?.max}
          </div>
        </div>
        
        <div className="text-center">
          <div className="font-caption text-xs text-muted-foreground mb-1">
            {t?.demand}
          </div>
          <div 
            className="font-body font-medium"
            style={{ color: getDemandColor(marketData?.demandLevel) }}
          >
            {marketData?.demandLevel}
          </div>
        </div>
        
        <div className="text-center">
          <div className="font-caption text-xs text-muted-foreground mb-1">
            {t?.marketLocation}
          </div>
          <div className="font-body font-medium text-foreground text-xs">
            {marketData?.marketName}
          </div>
        </div>
        
        <div className="text-center">
          <div className="font-caption text-xs text-muted-foreground mb-1">
            {t?.lastUpdated}
          </div>
          <div className="font-body font-medium text-foreground text-xs">
            {marketData?.lastUpdated}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPriceCard;