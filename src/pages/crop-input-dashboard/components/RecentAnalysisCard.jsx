import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentAnalysisCard = ({ currentLanguage, onViewResults }) => {
  const recentAnalyses = [
    {
      id: 1,
      cropType: currentLanguage === 'hi' ? 'गेहूं' : 'Wheat',
      location: currentLanguage === 'hi' ? 'पंजाब, भारत' : 'Punjab, India',
      predictedYield: '45.2',
      confidence: 92,
      date: '2025-01-06',
      status: 'completed'
    },
    {
      id: 2,
      cropType: currentLanguage === 'hi' ? 'चावल' : 'Rice',
      location: currentLanguage === 'hi' ? 'हरियाणा, भारत' : 'Haryana, India',
      predictedYield: '38.7',
      confidence: 88,
      date: '2025-01-04',
      status: 'completed'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return currentLanguage === 'hi' ? date?.toLocaleDateString('hi-IN')
      : date?.toLocaleDateString('en-IN');
  };

  if (recentAnalyses?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-morphic p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {currentLanguage === 'hi' ? 'हाल के विश्लेषण' : 'Recent Analysis'}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewResults}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
        >
          {currentLanguage === 'hi' ? 'सभी देखें' : 'View All'}
        </Button>
      </div>
      <div className="space-y-3">
        {recentAnalyses?.slice(0, 2)?.map((analysis) => (
          <div
            key={analysis?.id}
            className="p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-morphic cursor-pointer"
            onClick={onViewResults}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Wheat" size={16} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h4 className="font-body font-medium text-foreground">
                      {analysis?.cropType}
                    </h4>
                    <p className="font-caption text-xs text-muted-foreground">
                      {analysis?.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="TrendingUp" size={14} color="var(--color-success)" />
                    <span className="font-data font-medium text-success">
                      {analysis?.predictedYield} {currentLanguage === 'hi' ? 'क्विंटल/एकड़' : 'quintals/acre'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Target" size={14} color="var(--color-primary)" />
                    <span className="font-caption text-muted-foreground">
                      {analysis?.confidence}% {currentLanguage === 'hi' ? 'विश्वसनीयता' : 'confidence'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} color="var(--color-muted-foreground)" />
                    <span className="font-caption text-muted-foreground">
                      {formatDate(analysis?.date)}
                    </span>
                  </div>
                </div>
              </div>
              
              <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Lightbulb" size={16} color="var(--color-accent)" />
          <p className="font-caption text-sm text-accent-foreground">
            {currentLanguage === 'hi' ?'पिछले विश्लेषण के आधार पर नई भविष्यवाणी अधिक सटीक होगी।' :'New predictions will be more accurate based on previous analysis.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentAnalysisCard;