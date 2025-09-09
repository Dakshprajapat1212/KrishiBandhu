import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AnalysisProgress = ({ isAnalyzing, onAnalysisComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    { label: "Processing image...", duration: 1000 },
    { label: "Detecting patterns...", duration: 1500 },
    { label: "Analyzing symptoms...", duration: 1200 },
    { label: "Generating results...", duration: 800 }
  ];

  useEffect(() => {
    if (!isAnalyzing) {
      setProgress(0);
      setCurrentStep(0);
      return;
    }

    let totalDuration = 0;
    let currentDuration = 0;

    const runAnalysis = async () => {
      for (let i = 0; i < analysisSteps?.length; i++) {
        setCurrentStep(i);
        const stepDuration = analysisSteps?.[i]?.duration;
        
        // Animate progress for current step
        const startProgress = (currentDuration / analysisSteps?.reduce((sum, step) => sum + step?.duration, 0)) * 100;
        const endProgress = ((currentDuration + stepDuration) / analysisSteps?.reduce((sum, step) => sum + step?.duration, 0)) * 100;
        
        const startTime = Date.now();
        const animateProgress = () => {
          const elapsed = Date.now() - startTime;
          const stepProgress = Math.min(elapsed / stepDuration, 1);
          const currentProgress = startProgress + (endProgress - startProgress) * stepProgress;
          
          setProgress(currentProgress);
          
          if (stepProgress < 1) {
            requestAnimationFrame(animateProgress);
          }
        };
        
        animateProgress();
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        currentDuration += stepDuration;
      }
      
      setProgress(100);
      setTimeout(() => {
        onAnalysisComplete();
      }, 500);
    };

    runAnalysis();
  }, [isAnalyzing, onAnalysisComplete]);

  if (!isAnalyzing) return null;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-morphic">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 relative">
          {/* Circular Progress Ring */}
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="var(--color-muted)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="var(--color-primary)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 36}`}
              strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
              className="transition-all duration-300 ease-out"
            />
          </svg>
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin">
              <Icon name="Loader2" size={24} color="var(--color-primary)" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="font-heading font-semibold text-lg text-foreground mb-2">
            Analyzing Your Crop
          </div>
          <div className="font-body text-sm text-muted-foreground">
            {analysisSteps?.[currentStep]?.label}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="font-data text-sm text-primary font-medium">
          {Math.round(progress)}% Complete
        </div>
      </div>
      {/* Analysis Steps */}
      <div className="mt-6 space-y-3">
        {analysisSteps?.map((step, index) => (
          <div 
            key={index}
            className={`
              flex items-center space-x-3 p-3 rounded-lg transition-morphic
              ${index < currentStep 
                ? 'bg-success/10 border border-success/20' 
                : index === currentStep 
                  ? 'bg-primary/10 border border-primary/20' :'bg-muted/50 border border-border'
              }
            `}
          >
            <div className={`
              w-6 h-6 rounded-full flex items-center justify-center
              ${index < currentStep 
                ? 'bg-success' 
                : index === currentStep 
                  ? 'bg-primary' :'bg-muted-foreground'
              }
            `}>
              {index < currentStep ? (
                <Icon name="Check" size={14} color="white" strokeWidth={2.5} />
              ) : index === currentStep ? (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              ) : (
                <div className="w-2 h-2 bg-white rounded-full opacity-50" />
              )}
            </div>
            
            <span className={`
              font-body text-sm
              ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}
            `}>
              {step?.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisProgress;