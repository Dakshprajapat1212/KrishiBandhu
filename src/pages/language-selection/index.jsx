import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageHeader from './components/LanguageHeader';
import LanguageGrid from './components/LanguageGrid';
import LanguageFooter from './components/LanguageFooter';
import WelcomeMessage from './components/WelcomeMessage';
import { languages as LANG_LIST } from '../../i18n/languages';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use centralized language manifest
  const languages = LANG_LIST;

  useEffect(() => {
    // Check if this is first time user or language change
    const savedLanguage = localStorage.getItem('krishibandhu-language');
    const hasVisited = localStorage.getItem('krishibandhu-visited');
    
    if (!hasVisited) {
      setIsFirstTime(true);
      setSelectedLanguage('en'); // Default to English for first time
    } else {
      setSelectedLanguage(savedLanguage || 'en');
    }
  }, []);

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
  };

  const handleConfirm = async () => {
    if (!selectedLanguage) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Save language preference and mark as visited - FIX: Consistent flag usage
      localStorage.setItem('krishibandhu-language', selectedLanguage);
      // Immediately change i18n language so UI updates right away
      try {
        const i18n = await import('../../i18n');
        if (i18n && i18n.default) {
          i18n.default.changeLanguage(selectedLanguage);
        }
      } catch (err) {
        // Non-fatal if i18n fails to load/change
        console.warn('i18n changeLanguage error', err);
      }
      localStorage.setItem('krishibandhu-visited', 'true');
      localStorage.setItem('krishibandhu-language-selected', 'true'); // Added for dashboard consistency
  localStorage.setItem('krishibandhu-language-updated', new Date()?.toISOString());
  // Notify the app to re-read language and remount routes/components
  window.dispatchEvent(new Event('krishibandhu:language-changed'));
      
      // Navigate to main dashboard
      navigate('/crop-input-dashboard');
    } catch (error) {
      console.error('Language selection error:', error);
      // Handle error gracefully
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // If not first time, go back to previous page or dashboard
    if (isFirstTime) {
      return; // Can't cancel on first time
    }
    navigate(-1);
  };

  const handleClose = () => {
    if (!isFirstTime) {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Header */}
      <LanguageHeader 
        onClose={handleClose}
        showCloseButton={!isFirstTime}
        previewLanguage={selectedLanguage}
      />
      
      {/* Welcome Message for First Time Users */}
  <WelcomeMessage isFirstTime={isFirstTime} previewLanguage={selectedLanguage} />
      
      {/* Language Selection Grid */}
      <LanguageGrid
        languages={languages}
        selectedLanguage={selectedLanguage}
        onLanguageSelect={handleLanguageSelect}
      />
      
      {/* Fixed Footer */}
      <LanguageFooter
        selectedLanguage={selectedLanguage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isFirstTime={isFirstTime}
        disabled={isLoading}
        previewLanguage={selectedLanguage}
      />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-6 shadow-morphic-active">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="font-body text-foreground">
                Setting up your language...
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelection;