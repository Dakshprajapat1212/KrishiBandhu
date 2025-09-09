import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';

const WelcomeMessage = ({ isFirstTime = false, previewLanguage }) => {
  if (!isFirstTime) return null;
  const { t } = useTranslation();
  useEffect(() => {
    if (previewLanguage) {
      i18n.changeLanguage(previewLanguage).catch(() => {});
    }
    return () => {
      const saved = localStorage.getItem('krishibandhu-language') || 'en';
      i18n.changeLanguage(saved).catch(() => {});
    };
  }, [previewLanguage]);

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6 mx-6 mb-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="Sprout" size={24} color="white" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h2 className="font-heading font-bold text-xl text-foreground mb-2">
              {t('language.welcome_template', { brand: t('brand.name') })}
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              {t('language.description', { brand: t('brand.name') })}
            </p>
            <div className="flex items-center space-x-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span>Offline Ready</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Globe" size={16} color="var(--color-primary)" />
                <span>12 Languages</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Smartphone" size={16} color="var(--color-accent)" />
                <span>Mobile Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;