import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, currentLanguage }) => {
  const steps = [
    {
      id: 1,
      label: currentLanguage === 'hi' ? 'भाषा चयन' : 'Language Selection',
      icon: 'Globe'
    },
    {
      id: 2,
      label: currentLanguage === 'hi' ? 'फसल की जानकारी' : 'Crop Information',
      icon: 'Clipboard'
    },
    {
      id: 3,
      label: currentLanguage === 'hi' ? 'उत्पादन भविष्यवाणी' : 'Yield Prediction',
      icon: 'TrendingUp'
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex flex-col items-center">
              <div 
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-morphic
                  ${step?.id <= currentStep
                    ? 'bg-primary text-white shadow-morphic'
                    : 'bg-muted border-2 border-border text-muted-foreground'
                  }
                  ${step?.id === currentStep ? 'ring-4 ring-primary/20 scale-110' : ''}
                `}
              >
                {step?.id < currentStep ? (
                  <Icon name="Check" size={20} color="white" strokeWidth={2.5} />
                ) : (
                  <Icon 
                    name={step?.icon} 
                    size={20} 
                    color={step?.id <= currentStep ? "white" : "var(--color-muted-foreground)"} 
                  />
                )}
              </div>
              <div className="mt-2 text-center">
                <div 
                  className={`
                    font-caption text-xs font-medium
                    ${step?.id <= currentStep ? 'text-primary' : 'text-muted-foreground'}
                  `}
                >
                  {step?.label}
                </div>
                <div className="font-caption text-xs text-muted-foreground mt-1">
                  {currentLanguage === 'hi' ? 'चरण' : 'Step'} {step?.id}
                </div>
              </div>
            </div>
            
            {index < steps?.length - 1 && (
              <div className="flex-1 mx-4">
                <div 
                  className={`
                    h-0.5 transition-morphic
                    ${step?.id < currentStep ? 'bg-primary' : 'bg-border'}
                  `}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 text-center">
        <div className="font-body text-sm text-muted-foreground">
          {currentLanguage === 'hi' 
            ? `चरण ${currentStep} का ${totalSteps} - फसल डेटा संग्रह`
            : `Step ${currentStep} of ${totalSteps} - Crop Data Collection`
          }
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;