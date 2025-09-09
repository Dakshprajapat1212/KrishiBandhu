import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { languages as LANG_LIST } from '../../i18n/languages';

const LanguageSelector = ({ currentLanguage, onLanguageChange, onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  // Use centralized language manifest so header and main selection stay in sync
  const languages = LANG_LIST;

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
  };

  const handleConfirm = () => {
    // persist preference and update app language like main LanguageSelection
    localStorage.setItem('krishibandhu-language', selectedLanguage);
    localStorage.setItem('krishibandhu-visited', 'true');
    localStorage.setItem('krishibandhu-language-selected', 'true');
    localStorage.setItem('krishibandhu-language-updated', new Date().toISOString());

    // notify app
    window.dispatchEvent(new Event('krishibandhu:language-changed'));

    // attempt to change i18n immediately (non-blocking)
    import('../../i18n').then((i18n) => {
      if (i18n && i18n.default) {
        i18n.default.changeLanguage(selectedLanguage).catch(() => {});
      }
    }).catch(() => {});

    if (typeof onLanguageChange === 'function') onLanguageChange(selectedLanguage);
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-lg shadow-morphic-active max-w-2xl w-full max-h-[80vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Globe" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-lg text-foreground">
                Select Language
              </h2>
              <p className="font-body text-sm text-muted-foreground">
                Choose your preferred language for KrishiBandhu
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
            className="transition-morphic hover:scale-micro"
          />
        </div>

        {/* Language Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageSelect(language?.code)}
                className={`
                  p-4 rounded-lg border-2 transition-morphic hover:scale-micro text-left
                  ${selectedLanguage === language?.code
                    ? 'border-primary bg-primary/5 shadow-morphic-hover'
                    : 'border-border bg-card hover:border-primary/30 hover:bg-primary/5'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{language?.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-body font-medium text-foreground truncate">
                      {language?.name}
                    </div>
                    <div className="font-caption text-sm text-muted-foreground truncate">
                      {language?.nativeName}
                    </div>
                  </div>
                  {selectedLanguage === language?.code && (
                    <Icon 
                      name="Check" 
                      size={18} 
                      color="var(--color-primary)" 
                      strokeWidth={2.5}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Info" size={16} />
            <span className="font-caption text-sm">
              Language preference will be saved locally
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleConfirm}
              iconName="Check"
              iconPosition="left"
              iconSize={16}
              disabled={selectedLanguage === currentLanguage}
            >
              Apply Language
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;