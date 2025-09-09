import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CropInputForm = ({ formData, onFormChange, onSubmit, isLoading, currentLanguage }) => {
  const [errors, setErrors] = useState({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const cropOptions = [
    { value: 'wheat', label: currentLanguage === 'hi' ? 'गेहूं' : 'Wheat' },
    { value: 'rice', label: currentLanguage === 'hi' ? 'चावल' : 'Rice' },
    { value: 'maize', label: currentLanguage === 'hi' ? 'मक्का' : 'Maize' },
    { value: 'sugarcane', label: currentLanguage === 'hi' ? 'गन्ना' : 'Sugarcane' },
    { value: 'cotton', label: currentLanguage === 'hi' ? 'कपास' : 'Cotton' },
    { value: 'soybean', label: currentLanguage === 'hi' ? 'सोयाबीन' : 'Soybean' },
    { value: 'mustard', label: currentLanguage === 'hi' ? 'सरसों' : 'Mustard' },
    { value: 'groundnut', label: currentLanguage === 'hi' ? 'मूंगफली' : 'Groundnut' }
  ];

  const soilOptions = [
    { 
      value: 'clay', 
      label: currentLanguage === 'hi' ? 'चिकनी मिट्टी' : 'Clay Soil',
      description: currentLanguage === 'hi' ? 'पानी रोकने वाली, पोषक तत्वों से भरपूर' : 'Water-retentive, nutrient-rich'
    },
    { 
      value: 'sandy', 
      label: currentLanguage === 'hi' ? 'बलुई मिट्टी' : 'Sandy Soil',
      description: currentLanguage === 'hi' ? 'जल्दी सूखने वाली, अच्छी जल निकासी' : 'Fast-draining, good aeration'
    },
    { 
      value: 'loamy', 
      label: currentLanguage === 'hi' ? 'दोमट मिट्टी' : 'Loamy Soil',
      description: currentLanguage === 'hi' ? 'संतुलित, सबसे अच्छी खेती के लिए' : 'Balanced, ideal for cultivation'
    },
    { 
      value: 'black', 
      label: currentLanguage === 'hi' ? 'काली मिट्टी' : 'Black Soil',
      description: currentLanguage === 'hi' ? 'कपास के लिए उत्तम, नमी रोकने वाली' : 'Excellent for cotton, moisture-retentive'
    }
  ];

  const irrigationOptions = [
    { 
      value: 'rainfed', 
      label: currentLanguage === 'hi' ? 'वर्षा आधारित' : 'Rainfed',
      description: currentLanguage === 'hi' ? 'केवल बारिश पर निर्भर' : 'Dependent on rainfall only'
    },
    { 
      value: 'flood', 
      label: currentLanguage === 'hi' ? 'बाढ़ सिंचाई' : 'Flood Irrigation',
      description: currentLanguage === 'hi' ? 'पारंपरिक जल भराव विधि' : 'Traditional water flooding method'
    },
    { 
      value: 'drip', 
      label: currentLanguage === 'hi' ? 'ड्रिप सिंचाई' : 'Drip Irrigation',
      description: currentLanguage === 'hi' ? 'पानी की बचत, सटीक सिंचाई' : 'Water-saving, precise irrigation'
    },
    { 
      value: 'sprinkler', 
      label: currentLanguage === 'hi' ? 'स्प्रिंकलर सिंचाई' : 'Sprinkler Irrigation',
      description: currentLanguage === 'hi' ? 'छिड़काव द्वारा समान वितरण' : 'Even distribution through spraying'
    }
  ];

  const seedOptions = [
    { 
      value: 'local', 
      label: currentLanguage === 'hi' ? 'स्थानीय बीज' : 'Local Seed',
      description: currentLanguage === 'hi' ? 'पारंपरिक, स्थानीय किस्म' : 'Traditional, local variety'
    },
    { 
      value: 'certified', 
      label: currentLanguage === 'hi' ? 'प्रमाणित बीज' : 'Certified Seed',
      description: currentLanguage === 'hi' ? 'गुणवत्ता प्रमाणित, बेहतर उत्पादन' : 'Quality certified, better yield'
    },
    { 
      value: 'hybrid', 
      label: currentLanguage === 'hi' ? 'हाइब्रिड बीज' : 'Hybrid Seed',
      description: currentLanguage === 'hi' ? 'उच्च उत्पादन, रोग प्रतिरोधी' : 'High-yield, disease resistant'
    }
  ];

  const locationSuggestions = [
    'Punjab, India', 'Haryana, India', 'Uttar Pradesh, India', 'Rajasthan, India',
    'Maharashtra, India', 'Karnataka, India', 'Andhra Pradesh, India', 'Tamil Nadu, India',
    'West Bengal, India', 'Madhya Pradesh, India', 'Gujarat, India', 'Bihar, India'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.cropType) {
      newErrors.cropType = currentLanguage === 'hi' ? 'फसल का प्रकार चुनें' : 'Please select crop type';
    }
    
    if (!formData?.location || formData?.location?.trim()?.length < 3) {
      newErrors.location = currentLanguage === 'hi' ? 'वैध स्थान दर्ज करें (कम से कम 3 अक्षर)' : 'Please enter a valid location (min 3 characters)';
    }
    
    if (!formData?.soilCondition) {
      newErrors.soilCondition = currentLanguage === 'hi' ? 'मिट्टी की स्थिति चुनें' : 'Please select soil condition';
    }
    
    if (!formData?.irrigationMethod) {
      newErrors.irrigationMethod = currentLanguage === 'hi' ? 'सिंचाई विधि चुनें' : 'Please select irrigation method';
    }

    if (!formData?.seedType) {
      newErrors.seedType = currentLanguage === 'hi' ? 'बीज का प्रकार चुनें' : 'Please select seed type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsValidating(true);
    
    // FIX: Add proper validation delay for UX
    setTimeout(() => {
      if (validateForm()) {
        onSubmit();
      }
      setIsValidating(false);
    }, 300);
  };

  const handleInputChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
      utterance.onend = () => setIsSpeaking(false);
      // FIX: Add error handling for speech synthesis
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event?.error);
        setIsSpeaking(false);
      };
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // FIX: Clear speech on component unmount
  React.useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="bg-card rounded-lg border border-border shadow-morphic p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Clipboard" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground">
              {currentLanguage === 'hi' ? 'फसल की जानकारी दर्ज करें' : 'Enter Crop Information'}
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              {currentLanguage === 'hi' ? 'सटीक भविष्यवाणी के लिए सभी फील्ड भरें' : 'Fill all fields for accurate predictions'}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={isSpeaking ? stopSpeaking : () => speakText(currentLanguage === 'hi' ? 'फसल की जानकारी दर्ज करें। सभी फील्ड भरना आवश्यक है।' : 'Enter crop information form. All fields are required.')}
          iconName={isSpeaking ? "VolumeX" : "Volume2"}
          iconSize={18}
          className="transition-morphic hover:scale-micro"
          title={currentLanguage === 'hi' ? 'निर्देश सुनें' : 'Listen to instructions'}
          disabled={isLoading}
        />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Crop Type Selection */}
        <Select
          label={currentLanguage === 'hi' ? 'फसल का प्रकार' : 'Crop Type'}
          description={currentLanguage === 'hi' ? 'आप कौन सी फसल उगा रहे हैं?' : 'What crop are you growing?'}
          placeholder={currentLanguage === 'hi' ? 'फसल चुनें...' : 'Select crop...'}
          options={cropOptions}
          value={formData?.cropType}
          onChange={(value) => handleInputChange('cropType', value)}
          error={errors?.cropType}
          required
          searchable
          className="mb-6"
          disabled={isLoading}
        />

        {/* Location Input */}
        <Input
          label={currentLanguage === 'hi' ? 'स्थान' : 'Location'}
          type="text"
          placeholder={currentLanguage === 'hi' ? 'उदाहरण: पंजाब, भारत' : 'Example: Punjab, India'}
          description={currentLanguage === 'hi' ? 'आपके खेत का स्थान (राज्य और देश)' : 'Location of your farm (state and country)'}
          value={formData?.location}
          onChange={(e) => handleInputChange('location', e?.target?.value)}
          error={errors?.location}
          required
          className="mb-6"
          disabled={isLoading}
          maxLength={100}
        />

        {/* Soil Condition */}
        <Select
          label={currentLanguage === 'hi' ? 'मिट्टी की स्थिति' : 'Soil Condition'}
          description={currentLanguage === 'hi' ? 'आपके खेत की मिट्टी का प्रकार' : 'Type of soil in your field'}
          placeholder={currentLanguage === 'hi' ? 'मिट्टी चुनें...' : 'Select soil type...'}
          options={soilOptions}
          value={formData?.soilCondition}
          onChange={(value) => handleInputChange('soilCondition', value)}
          error={errors?.soilCondition}
          required
          className="mb-6"
          disabled={isLoading}
        />

        {/* Irrigation Method */}
        <Select
          label={currentLanguage === 'hi' ? 'सिंचाई विधि' : 'Irrigation Method'}
          description={currentLanguage === 'hi' ? 'आप कैसे सिंचाई करते हैं?' : 'How do you irrigate your crops?'}
          placeholder={currentLanguage === 'hi' ? 'सिंचाई विधि चुनें...' : 'Select irrigation method...'}
          options={irrigationOptions}
          value={formData?.irrigationMethod}
          onChange={(value) => handleInputChange('irrigationMethod', value)}
          error={errors?.irrigationMethod}
          required
          className="mb-6"
          disabled={isLoading}
        />

        {/* Seed Type */}
        <Select
          label={currentLanguage === 'hi' ? 'बीज का प्रकार' : 'Seed Type'}
          description={currentLanguage === 'hi' ? 'आप किस प्रकार के बीज का उपयोग करते हैं?' : 'What type of seeds do you use?'}
          placeholder={currentLanguage === 'hi' ? 'बीज का प्रकार चुनें...' : 'Select seed type...'}
          options={seedOptions}
          value={formData?.seedType}
          onChange={(value) => handleInputChange('seedType', value)}
          error={errors?.seedType}
          required
          className="mb-8"
          disabled={isLoading}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading || isValidating}
          iconName="TrendingUp"
          iconPosition="left"
          iconSize={20}
          className="h-14 text-lg font-semibold transition-morphic hover:scale-micro"
          disabled={isLoading || isValidating}
        >
          {isLoading || isValidating
            ? (currentLanguage === 'hi' ? 'विश्लेषण हो रहा है...' : 'Analyzing...') 
            : (currentLanguage === 'hi' ? 'उत्पादन की भविष्यवाणी करें' : 'Predict Yield')
          }
        </Button>
      </form>
      {/* Help Text */}
      <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5" />
          <div className="flex-1">
            <p className="font-caption text-sm text-accent-foreground">
              <strong>{currentLanguage === 'hi' ? 'सुझाव:' : 'Tip:'}</strong>{' '}
              {currentLanguage === 'hi' ?'सटीक परिणामों के लिए वर्तमान मौसम और खेत की वास्तविक स्थिति के आधार पर जानकारी दें। आपका डेटा स्वचालित रूप से सुरक्षित हो जाएगा।' :'Provide information based on current season and actual field conditions for accurate results. Your data will be automatically saved as you type.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropInputForm;