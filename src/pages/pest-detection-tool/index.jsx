import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/ui/MainNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ImageUploadArea from './components/ImageUploadArea';
import AnalysisProgress from './components/AnalysisProgress';
import DetectionResults from './components/DetectionResults';
import ActionsSummary from './components/ActionsSummary';

const PestDetectionTool = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [detectionResults, setDetectionResults] = useState([]);
  const [actionPlan, setActionPlan] = useState([]);

  // Mock detection results data
  const mockResults = [
    {
      id: 'pest-1',
      name: 'Brown Spot Disease',
      description: 'Fungal infection affecting rice leaves, causing brown spots with yellow halos',
      severity: 'High',
      confidence: 87,
      treatmentCost: 2500,
      symptoms: [
        'Brown circular spots on leaves',
        'Yellow halos around spots',
        'Premature leaf drying',
        'Reduced grain filling'
      ],
      treatments: [
        {
          name: 'Propiconazole Spray',
          description: 'Systemic fungicide for brown spot control',
          dosage: '1ml per liter of water',
          cost: 1200,
          priority: 'High'
        },
        {
          name: 'Copper Oxychloride',
          description: 'Preventive fungicide application',
          dosage: '2g per liter of water',
          cost: 800,
          priority: 'Medium'
        },
        {
          name: 'Organic Neem Oil',
          description: 'Natural fungicide alternative',
          dosage: '5ml per liter of water',
          cost: 500,
          priority: 'Low'
        }
      ],
      prevention: 'Maintain proper field drainage, avoid excessive nitrogen fertilization, and ensure adequate plant spacing for air circulation.'
    },
    {
      id: 'pest-2',
      name: 'Stem Borer Infestation',
      description: 'Insect pest causing damage to rice stems and reducing yield',
      severity: 'Medium',
      confidence: 73,
      treatmentCost: 1800,
      symptoms: [
        'Dead heart symptoms in young plants',
        'White ear heads in mature plants',
        'Small holes in stem',
        'Frass (insect waste) near holes'
      ],
      treatments: [
        {
          name: 'Chlorantraniliprole',
          description: 'Selective insecticide for stem borer control',
          dosage: '0.4ml per liter of water',
          cost: 1000,
          priority: 'High'
        },
        {
          name: 'Cartap Hydrochloride',
          description: 'Contact and stomach poison insecticide',
          dosage: '2g per liter of water',
          cost: 600,
          priority: 'Medium'
        },
        {
          name: 'Pheromone Traps',
          description: 'Biological control method',
          dosage: '10 traps per acre',
          cost: 200,
          priority: 'Low'
        }
      ],
      prevention: 'Use resistant varieties, maintain clean cultivation practices, and monitor fields regularly during vulnerable growth stages.'
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('krishibandhu-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleImageUpload = (imageData, fileName) => {
    setUploadedImage(imageData);
    setImageName(fileName);
    setAnalysisComplete(false);
    setDetectionResults([]);
    
    if (imageData) {
      // Start analysis automatically when image is uploaded
      setTimeout(() => {
        setIsAnalyzing(true);
      }, 500);
    }
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    setAnalysisComplete(true);
    setDetectionResults(mockResults);
  };

  const handleAddToActions = (result) => {
    if (!actionPlan?.find(action => action?.id === result?.id)) {
      setActionPlan(prev => [...prev, result]);
    }
  };

  const handleRemoveAction = (actionId) => {
    setActionPlan(prev => prev?.filter(action => action?.id !== actionId));
  };

  const handleViewFullPlan = () => {
    // Store action plan in localStorage for dashboard integration
    localStorage.setItem('krishibandhu-pest-actions', JSON.stringify(actionPlan));
    navigate('/yield-prediction-results');
  };

  const handleStartOver = () => {
    setUploadedImage(null);
    setImageName(null);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setDetectionResults([]);
    setActionPlan([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation onToggleCollapse={() => {}} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/crop-input-dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={16}
              className="transition-morphic hover:scale-micro"
            >
              Back to Dashboard
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Bug" size={24} color="var(--color-warning)" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground">
                Pest Detection Tool
              </h1>
              <p className="font-body text-muted-foreground">
                Upload crop images to identify diseases and pests with AI-powered analysis
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border shadow-morphic">
            <div className={`
              flex items-center space-x-2 px-3 py-1 rounded-full text-sm
              ${!uploadedImage 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-success/10 text-success border border-success/20'
              }
            `}>
              <Icon 
                name={!uploadedImage ? "Upload" : "Check"} 
                size={14} 
                strokeWidth={2.5}
              />
              <span className="font-medium">Upload Image</span>
            </div>
            
            <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            
            <div className={`
              flex items-center space-x-2 px-3 py-1 rounded-full text-sm
              ${!analysisComplete 
                ? 'bg-muted text-muted-foreground' 
                : 'bg-success/10 text-success border border-success/20'
              }
            `}>
              <Icon 
                name={analysisComplete ? "Check" : "Search"} 
                size={14} 
                strokeWidth={2.5}
              />
              <span className="font-medium">Analyze</span>
            </div>
            
            <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            
            <div className={`
              flex items-center space-x-2 px-3 py-1 rounded-full text-sm
              ${actionPlan?.length === 0 
                ? 'bg-muted text-muted-foreground' 
                : 'bg-success/10 text-success border border-success/20'
              }
            `}>
              <Icon 
                name={actionPlan?.length > 0 ? "Check" : "Plus"} 
                size={14} 
                strokeWidth={2.5}
              />
              <span className="font-medium">Add Actions</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Image Upload Area */}
          <ImageUploadArea
            onImageUpload={handleImageUpload}
            uploadedImage={uploadedImage}
            isAnalyzing={isAnalyzing}
          />

          {/* Analysis Progress */}
          {isAnalyzing && (
            <AnalysisProgress
              isAnalyzing={isAnalyzing}
              onAnalysisComplete={handleAnalysisComplete}
            />
          )}

          {/* Detection Results */}
          {analysisComplete && detectionResults?.length > 0 && (
            <DetectionResults
              results={detectionResults}
              onAddToActions={handleAddToActions}
            />
          )}

          {/* Actions Summary */}
          {actionPlan?.length > 0 && (
            <ActionsSummary
              actions={actionPlan}
              onRemoveAction={handleRemoveAction}
              onViewFullPlan={handleViewFullPlan}
            />
          )}

          {/* Action Buttons */}
          {analysisComplete && (
            <div className="flex items-center justify-center space-x-4 pt-6">
              <Button
                variant="outline"
                onClick={handleStartOver}
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={16}
                className="transition-morphic hover:scale-micro"
              >
                Analyze Another Image
              </Button>
              
              {actionPlan?.length > 0 && (
                <Button
                  variant="default"
                  onClick={handleViewFullPlan}
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                  className="transition-morphic hover:scale-micro"
                >
                  Continue to Dashboard
                </Button>
              )}
            </div>
          )}

          {/* Help Section */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-morphic">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  How to Use Pest Detection
                </h3>
                <div className="space-y-2 font-body text-sm text-muted-foreground">
                  <p>• Take clear, well-lit photos of affected plant parts</p>
                  <p>• Focus on visible symptoms like spots, holes, or discoloration</p>
                  <p>• Upload multiple images for comprehensive analysis</p>
                  <p>• Review detection results and add recommended actions to your plan</p>
                  <p>• Return to dashboard to integrate pest management with yield predictions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestDetectionTool;