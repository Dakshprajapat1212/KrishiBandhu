import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionRecommendationCard = ({ recommendation, onTextToSpeech }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('krishibandhu-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    en: {
      priority: "Priority",
      viewDetails: "View Details",
      hideDetails: "Hide Details",
      implementationSteps: "Implementation Steps",
      expectedImpact: "Expected Impact",
      listenRecommendation: "Listen to Recommendation",
      goToTool: "Go to Tool"
    },
    hi: {
      priority: "प्राथमिकता",
      viewDetails: "विवरण देखें",
      hideDetails: "विवरण छुपाएं",
      implementationSteps: "कार्यान्वयन चरण",
      expectedImpact: "अपेक्षित प्रभाव",
      listenRecommendation: "सिफारिश सुनें",
      goToTool: "टूल पर जाएं"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'var(--color-error)';
      case 'medium':
        return 'var(--color-warning)';
      case 'low':
        return 'var(--color-success)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-error/10';
      case 'medium':
        return 'bg-warning/10';
      case 'low':
        return 'bg-success/10';
      default:
        return 'bg-muted/30';
    }
  };

  const handleTextToSpeech = () => {
    const text = `${recommendation?.title}. ${t?.priority}: ${recommendation?.priority}. ${recommendation?.description}. ${recommendation?.details}`;
    onTextToSpeech(text);
  };

  const handleToolNavigation = () => {
    if (recommendation?.toolPath) {
      navigate(recommendation?.toolPath);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-morphic p-6 transition-morphic hover:shadow-morphic-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${recommendation?.iconColor}20` }}
          >
            <Icon 
              name={recommendation?.icon} 
              size={24} 
              color={recommendation?.iconColor}
              strokeWidth={2}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
              {recommendation?.title}
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {recommendation?.description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <div className={`px-3 py-1 rounded-full ${getPriorityBg(recommendation?.priority)}`}>
            <span 
              className="font-caption text-xs font-medium"
              style={{ color: getPriorityColor(recommendation?.priority) }}
            >
              {t?.priority}: {recommendation?.priority}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleTextToSpeech}
            iconName="Volume2"
            iconSize={16}
            className="transition-morphic hover:scale-micro"
            title={t?.listenRecommendation}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
          className="transition-morphic hover:scale-micro"
        >
          {isExpanded ? t?.hideDetails : t?.viewDetails}
        </Button>
        
        {recommendation?.toolPath && (
          <Button
            variant="default"
            size="sm"
            onClick={handleToolNavigation}
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={16}
            className="transition-morphic hover:scale-micro"
          >
            {t?.goToTool}
          </Button>
        )}
      </div>
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-border animate-slide-up">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-heading font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="CheckSquare" size={18} color="var(--color-primary)" />
                <span>{t?.implementationSteps}</span>
              </h4>
              <ul className="space-y-2">
                {recommendation?.steps?.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="font-caption text-xs font-medium text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <span className="font-body text-sm text-foreground">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="TrendingUp" size={18} color="var(--color-success)" />
                <span>{t?.expectedImpact}</span>
              </h4>
              <div className="space-y-3">
                {recommendation?.impact?.map((impact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="font-body text-sm text-foreground">
                      {impact?.metric}
                    </span>
                    <span className="font-heading font-semibold text-success">
                      +{impact?.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionRecommendationCard;