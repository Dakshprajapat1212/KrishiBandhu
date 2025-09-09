import React from 'react';
import Icon from '../../../components/AppIcon';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import i18n from '../../../i18n';

const LanguageHeader = ({ onClose, showCloseButton = true, previewLanguage }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (previewLanguage) {
      i18n.changeLanguage(previewLanguage).catch(() => {});
    }
    return () => {
      // revert back to currently selected language in localStorage (do not apply)
      const saved = localStorage.getItem('krishibandhu-language') || 'en';
      i18n.changeLanguage(saved).catch(() => {});
    };
  }, [previewLanguage]);

  return (
    <div className="flex items-center justify-between p-6 border-b border-border bg-card">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <Icon name="Globe" size={24} color="var(--color-primary)" strokeWidth={2} />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground">
            {t('language.choose')}
          </h1>
          <p className="font-body text-muted-foreground mt-1">
            {t('language.welcome_template', { brand: t('brand.name') })}
          </p>
        </div>
      </div>
      {showCloseButton && (
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
        >
          <Icon name="X" size={20} color="var(--color-muted-foreground)" />
        </button>
      )}
    </div>
  );
};

export default LanguageHeader;