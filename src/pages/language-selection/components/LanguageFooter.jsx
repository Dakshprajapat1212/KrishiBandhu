import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { languages as LANG_LIST } from '../../../i18n/languages';
import { useTranslation } from 'react-i18next';

const LanguageFooter = ({ 
  selectedLanguage, 
  onConfirm, 
  onCancel, 
  isFirstTime = false,
  disabled = false 
}) => {
  // Compute which languages have translations from centralized manifest
  const supportedLanguages = LANG_LIST.filter(l => l.hasTranslation).map(l => l.code);
  const hasTranslation = !selectedLanguage || supportedLanguages.includes(selectedLanguage);
  const { t } = useTranslation();

  return (
    <div className="border-t border-border bg-card p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Info" size={16} />
            <div className="flex flex-col">
              <span className="font-body text-sm">
                {isFirstTime ? t('language.saved_message') : t('language.welcome')}
              </span>
              {/* Removed fallback warning per request */}
            </div>
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {!isFirstTime && (
              <Button
                variant="ghost"
                size="default"
                onClick={onCancel}
                className="flex-1 sm:flex-none"
              >
                {t('common.cancel')}
              </Button>
            )}
            <Button
              variant="default"
              size="default"
              onClick={onConfirm}
              disabled={disabled || !selectedLanguage}
              iconName="Check"
              iconPosition="left"
              iconSize={18}
              className="flex-1 sm:flex-none min-w-[120px]"
            >
              {isFirstTime ? t('language.get_started') : t('language.apply')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageFooter;