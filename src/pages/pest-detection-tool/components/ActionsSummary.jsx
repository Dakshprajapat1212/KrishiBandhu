import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionsSummary = ({ actions, onRemoveAction, onViewFullPlan }) => {
  if (!actions || actions?.length === 0) return null;

  const totalCost = actions?.reduce((sum, action) => sum + (action?.treatmentCost || 0), 0);
  const highPriorityCount = actions?.filter(action => 
    action?.treatments?.some(t => t?.priority === 'High')
  )?.length;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-morphic">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="ClipboardList" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Action Plan Summary
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              {actions?.length} action{actions?.length !== 1 ? 's' : ''} added to your plan
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onViewFullPlan}
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={16}
          className="transition-morphic hover:scale-micro"
        >
          View Full Plan
        </Button>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="font-data text-lg font-semibold text-foreground">
            {actions?.length}
          </div>
          <div className="font-caption text-xs text-muted-foreground">
            Total Actions
          </div>
        </div>
        
        <div className="text-center p-3 bg-error/10 rounded-lg">
          <div className="font-data text-lg font-semibold text-error">
            {highPriorityCount}
          </div>
          <div className="font-caption text-xs text-muted-foreground">
            High Priority
          </div>
        </div>
        
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <div className="font-data text-lg font-semibold text-success">
            ₹{totalCost?.toLocaleString('en-IN')}
          </div>
          <div className="font-caption text-xs text-muted-foreground">
            Total Cost
          </div>
        </div>
      </div>
      {/* Actions List */}
      <div className="space-y-3">
        {actions?.map((action) => (
          <div 
            key={action?.id}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border"
          >
            <div className="flex items-center space-x-3 flex-1">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: action?.severity === 'High' ?'var(--color-error)' 
                    : action?.severity === 'Medium' ?'var(--color-warning)' :'var(--color-success)'
                }}
              >
                <Icon 
                  name={action?.severity === 'High' ? 'AlertTriangle' : 'Bug'} 
                  size={14} 
                  color="white" 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-body font-medium text-foreground truncate">
                  {action?.name}
                </div>
                <div className="font-caption text-sm text-muted-foreground">
                  {action?.treatments?.length || 0} treatment{action?.treatments?.length !== 1 ? 's' : ''} • 
                  ₹{(action?.treatmentCost || 0)?.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveAction(action?.id)}
              iconName="X"
              iconSize={14}
              className="text-muted-foreground hover:text-error transition-morphic"
            />
          </div>
        ))}
      </div>
      {/* Next Steps */}
      <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5" />
          <div>
            <h4 className="font-body font-medium text-accent-foreground mb-1">
              Next Steps
            </h4>
            <p className="font-caption text-sm text-accent-foreground">
              Return to your dashboard to integrate these pest management actions with your overall crop plan and get updated yield predictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionsSummary;