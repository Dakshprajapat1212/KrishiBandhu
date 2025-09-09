import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/ui/MainNavigation';
import QuickPresetButtons from './components/QuickPresetButtons';
import CropInputForm from './components/CropInputForm';
import ProgressIndicator from './components/ProgressIndicator';
import RecentAnalysisCard from './components/RecentAnalysisCard';
import Icon from '../../components/AppIcon';

const CropInputDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cropType: '',
    location: '',
    soilCondition: '',
    irrigationMethod: '',
    seedType: ''
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('krishibandhu-language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Check if user has completed language selection
    const hasSelectedLanguage = localStorage.getItem('krishibandhu-language-selected');
    const hasVisited = localStorage.getItem('krishibandhu-visited');
    
    // If user hasn't completed language selection, redirect
    if (!hasSelectedLanguage || !hasVisited) {
      navigate('/language-selection');
      return;
    }

    // Load saved form data if exists for better UX
    const savedFormData = localStorage.getItem('krishibandhu-form-draft');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading form draft:', error);
      }
    }
  }, [navigate]);

  // Auto-save form data for better UX
  useEffect(() => {
    const hasData = Object.values(formData)?.some(value => value !== '');
    if (hasData) {
      localStorage.setItem('krishibandhu-form-draft', JSON.stringify(formData));
    }
  }, [formData]);

  const handlePresetSelect = (presetData) => {
    setFormData(presetData);
    
    // Smooth scroll to form
    setTimeout(() => {
      const formElement = document.querySelector('#crop-input-form');
      if (formElement) {
        formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleFormSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Store form data for results page
      localStorage.setItem('krishibandhu-crop-data', JSON.stringify(formData));
      
      // Clear form draft after successful submission
      localStorage.removeItem('krishibandhu-form-draft');
      
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsLoading(false);
      navigate('/yield-prediction-results');
    } catch (error) {
      console.error('Form submission error:', error);
      setIsLoading(false);
      // Add error handling UI here if needed
    }
  };

  const handleViewResults = () => {
    navigate('/yield-prediction-results');
  };

  const getWelcomeMessage = () => {
    const hour = new Date()?.getHours();
    let greeting;
    
    if (currentLanguage === 'hi') {
      if (hour < 12) greeting = 'सुप्रभात';
      else if (hour < 17) greeting = 'नमस्कार';
      else greeting = 'शुभ संध्या';
    } else {
      if (hour < 12) greeting = 'Good Morning';
      else if (hour < 17) greeting = 'Good Afternoon';
      else greeting = 'Good Evening';
    }
    
    return greeting;
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation onToggleCollapse={() => {}} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-morphic">
              <Icon name="Sprout" size={32} color="white" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <h1 className="font-heading font-bold text-3xl text-foreground">
                {getWelcomeMessage()}!
              </h1>
              <p className="font-body text-lg text-muted-foreground">
                {currentLanguage === 'hi' ? 'आइए आपकी फसल का विश्लेषण शुरू करते हैं' : "Let's analyze your crop potential"}
              </p>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <p className="font-body text-muted-foreground">
              {currentLanguage === 'hi' ? 'KrishiBandhu के साथ अपनी फसल की उत्पादन क्षमता, बाजार मूल्य और सुधार के सुझाव प्राप्त करें। सटीक भविष्यवाणी के लिए अपने खेत की जानकारी साझा करें।' : 'Get accurate yield predictions, market insights, and optimization recommendations with KrishiBandhu. Share your farm details for personalized analysis.'}
            </p>
          </div>
        </div>

        {/* Language Change Option */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate('/language-selection')}
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon name="Globe" size={16} />
            <span>{currentLanguage === 'hi' ? 'भाषा बदलें' : 'Change Language'}</span>
          </button>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator 
          currentStep={2} 
          totalSteps={3} 
          currentLanguage={currentLanguage} 
        />

        {/* Recent Analysis Card */}
        <RecentAnalysisCard 
          currentLanguage={currentLanguage}
          onViewResults={handleViewResults}
        />

        {/* Quick Preset Buttons */}
        <QuickPresetButtons 
          onPresetSelect={handlePresetSelect}
          currentLanguage={currentLanguage}
        />

        {/* Main Form */}
        <div id="crop-input-form">
          <CropInputForm
            formData={formData}
            onFormChange={setFormData}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            currentLanguage={currentLanguage}
          />
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg border border-border shadow-morphic p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} color="var(--color-success)" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground">
                {currentLanguage === 'hi' ? 'डेटा सुरक्षा' : 'Data Security'}
              </h3>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              {currentLanguage === 'hi' ? 'आपकी सभी जानकारी सुरक्षित है और केवल फसल विश्लेषण के लिए उपयोग की जाती है। हम आपकी निजता का सम्मान करते हैं।' : 'Your information is secure and used only for crop analysis. We respect your privacy and data protection.'}
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-morphic p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="var(--color-primary)" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground">
                {currentLanguage === 'hi' ? 'तत्काल परिणाम' : 'Instant Results'}
              </h3>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              {currentLanguage === 'hi' ? 'AI-आधारित विश्लेषण से सेकंडों में सटीक उत्पादन भविष्यवाणी, बाजार मूल्य और सुधार के सुझाव प्राप्त करें।' : 'Get accurate yield predictions, market prices, and improvement suggestions in seconds with AI-powered analysis.'}
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="font-caption text-xs text-muted-foreground">
            {currentLanguage === 'hi' 
              ? `© ${new Date()?.getFullYear()} KrishiBandhu - भारतीय किसानों के लिए स्मार्ट कृषि समाधान`
              : `© ${new Date()?.getFullYear()} KrishiBandhu - Smart Agriculture Solutions for Indian Farmers`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default CropInputDashboard;