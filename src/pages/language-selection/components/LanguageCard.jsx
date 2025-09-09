import React from 'react';
import Icon from '../../../components/AppIcon';

const LanguageCard = ({ language, isSelected, onSelect, className = '' }) => {
  // FIX: Add better error handling for missing language data
  if (!language) {
    return null;
  }

  const handleClick = () => {
    if (onSelect && language?.code) {
      onSelect(language?.code);
    }
  };

  return (
    <button
      onClick={handleClick}
      // FIX: Add accessibility attributes
      role="option"
      aria-selected={isSelected}
      aria-label={`Select ${language?.name || 'Unknown'} (${language?.nativeName || 'Unknown'})`}
      tabIndex={0}
      className={`
        w-full p-4 rounded-xl border-2 transition-all duration-300 text-left
        hover:scale-[1.02] hover:shadow-morphic-hover active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
        ${isSelected 
          ? 'border-primary bg-primary/10 shadow-morphic' 
          : 'border-border bg-card hover:border-primary/30 hover:bg-primary/5'
        }
        ${className}
      `}
      style={{ minHeight: '44px' }}
      // FIX: Add keyboard navigation support
      onKeyDown={(e) => {
        if (e?.key === 'Enter' || e?.key === ' ') {
          e?.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="text-3xl flex-shrink-0">
            {language?.flag || '🏳️'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-heading font-semibold text-lg text-foreground truncate">
              {language?.nativeName || 'Unknown Language'}
            </div>
            <div className="font-body text-sm text-muted-foreground truncate">
              {language?.name || 'Unknown'}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 ml-3">
          <div className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center
                {language?.hasTranslation && (
                  <div className="mt-1 inline-block text-xs text-white bg-primary px-2 py-1 rounded-full">
                    Translated
                  </div>
                )}
            ${isSelected 
              ? 'border-primary bg-primary' : 'border-muted-foreground/30'
            }
          `}>
            {isSelected && (
              <Icon 
                name="Check" 
                size={14} 
                color="white" 
                strokeWidth={3}
              />
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default LanguageCard;