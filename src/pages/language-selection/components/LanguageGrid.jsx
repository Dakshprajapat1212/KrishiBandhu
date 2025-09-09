import React from 'react';
import LanguageCard from './LanguageCard';

const LanguageGrid = ({ languages, selectedLanguage, onLanguageSelect }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages?.map((language) => (
            <LanguageCard
              key={language?.code}
              language={language}
              isSelected={selectedLanguage === language?.code}
              onSelect={onLanguageSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageGrid;