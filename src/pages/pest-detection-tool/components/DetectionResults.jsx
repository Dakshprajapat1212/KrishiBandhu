import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetectionResults = ({ results, onAddToActions }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [addedActions, setAddedActions] = useState(new Set());

  const handleAddToActions = (result) => {
    onAddToActions(result);
    setAddedActions(prev => new Set([...prev, result.id]));
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
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

  const getSeverityBg = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'low':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (!results || results?.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="CheckCircle" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Detection Results
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            {results?.length} issue{results?.length !== 1 ? 's' : ''} detected in your crop
          </p>
        </div>
      </div>
      {results?.map((result) => (
        <div 
          key={result?.id}
          className={`
            bg-card rounded-lg border shadow-morphic transition-morphic hover:shadow-morphic-hover
            ${getSeverityBg(result?.severity)}
          `}
        >
          {/* Result Header */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-heading font-semibold text-lg text-foreground">
                    {result?.name}
                  </h4>
                  <div 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getSeverityColor(result?.severity)}20`,
                      color: getSeverityColor(result?.severity)
                    }}
                  >
                    {result?.severity} Risk
                  </div>
                </div>
                
                <p className="font-body text-sm text-muted-foreground mb-3">
                  {result?.description}
                </p>

                {/* Confidence Level */}
                <div className="flex items-center space-x-3">
                  <span className="font-caption text-sm text-muted-foreground">
                    Confidence:
                  </span>
                  <div className="flex-1 max-w-32">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ 
                            width: `${result?.confidence}%`,
                            backgroundColor: getSeverityColor(result?.severity)
                          }}
                        />
                      </div>
                      <span className="font-data text-sm font-medium text-foreground">
                        {result?.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedCard(expandedCard === result?.id ? null : result?.id)}
                iconName={expandedCard === result?.id ? "ChevronUp" : "ChevronDown"}
                iconSize={16}
              >
                {expandedCard === result?.id ? 'Less' : 'More'}
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3">
              <Button
                variant={addedActions?.has(result?.id) ? "success" : "default"}
                size="sm"
                onClick={() => handleAddToActions(result)}
                iconName={addedActions?.has(result?.id) ? "Check" : "Plus"}
                iconPosition="left"
                iconSize={16}
                disabled={addedActions?.has(result?.id)}
                className="transition-morphic hover:scale-micro"
              >
                {addedActions?.has(result?.id) ? 'Added to Actions' : 'Add to Actions'}
              </Button>
              
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="IndianRupee" size={14} />
                <span className="font-caption text-sm">
                  Treatment: ₹{result?.treatmentCost?.toLocaleString('en-IN') || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Expanded Details */}
          {expandedCard === result?.id && (
            <div className="border-t border-border p-6 bg-card/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Symptoms */}
                <div>
                  <h5 className="font-heading font-medium text-foreground mb-3 flex items-center space-x-2">
                    <Icon name="Eye" size={16} color="var(--color-primary)" />
                    <span>Symptoms Detected</span>
                  </h5>
                  <ul className="space-y-2">
                    {result?.symptoms?.map((symptom, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="Dot" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
                        <span className="font-body text-sm text-foreground">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Treatment Recommendations */}
                <div>
                  <h5 className="font-heading font-medium text-foreground mb-3 flex items-center space-x-2">
                    <Icon name="Pill" size={16} color="var(--color-primary)" />
                    <span>Recommended Treatment</span>
                  </h5>
                  <div className="space-y-3">
                    {result?.treatments?.map((treatment, index) => (
                      <div key={index} className="p-3 bg-card rounded-lg border border-border">
                        <div className="flex items-start justify-between mb-2">
                          <h6 className="font-body font-medium text-foreground">
                            {treatment?.name}
                          </h6>
                          <span className="font-caption text-xs text-muted-foreground">
                            {treatment?.priority} Priority
                          </span>
                        </div>
                        <p className="font-caption text-sm text-muted-foreground mb-2">
                          {treatment?.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-body text-foreground">
                            Dosage: {treatment?.dosage}
                          </span>
                          <span className="font-data text-primary">
                            ₹{treatment?.cost?.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prevention Tips */}
              {result?.prevention && (
                <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <h5 className="font-heading font-medium text-accent-foreground mb-2 flex items-center space-x-2">
                    <Icon name="Shield" size={16} color="var(--color-accent)" />
                    <span>Prevention Tips</span>
                  </h5>
                  <p className="font-body text-sm text-accent-foreground">
                    {result?.prevention}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      {/* Summary Card */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-morphic">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
              Analysis Summary
            </h4>
            <p className="font-body text-sm text-muted-foreground mb-4">
              Based on the detected issues, immediate action is recommended to prevent crop damage and maintain yield quality.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="font-data text-lg font-semibold text-foreground">
                  {results?.filter(r => r?.severity === 'High')?.length}
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  High Priority
                </div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="font-data text-lg font-semibold text-foreground">
                  ₹{results?.reduce((sum, r) => sum + (r?.treatmentCost || 0), 0)?.toLocaleString('en-IN')}
                </div>
                <div className="font-caption text-xs text-muted-foreground">
                  Total Treatment Cost
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionResults;