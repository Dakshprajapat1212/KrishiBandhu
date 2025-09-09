import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import LanguageSelector from './LanguageSelector';
import ToolsDropdown from './ToolsDropdown';

const MainNavigation = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // header will navigate to the central LanguageSelection page instead of opening a separate modal
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('krishibandhu-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/crop-input-dashboard',
      icon: 'Home',
      tooltip: 'Return to crop input dashboard'
    },
    {
      label: 'My Analysis',
      path: '/yield-prediction-results',
      icon: 'BarChart3',
      tooltip: 'View current yield predictions'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('krishibandhu-language', language);
    setShowLanguageSelector(false);
  // update timestamp and notify app to remount routes
  localStorage.setItem('krishibandhu-language-updated', new Date().toISOString());
  window.dispatchEvent(new Event('krishibandhu:language-changed'));
  };

  const isActive = (path) => location?.pathname === path;

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-morphic">
        <Icon name="Sprout" size={24} color="white" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <span className="font-heading font-bold text-xl text-foreground">
          KrishiBandhu
        </span>
        <span className="font-caption text-xs text-muted-foreground -mt-1">
          Smart Agriculture
        </span>
      </div>
    </div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-morphic">
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={isActive(item?.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={18}
                  className="transition-morphic hover:scale-micro"
                  title={item?.tooltip}
                >
                  {item?.label}
                </Button>
              ))}
              
              <ToolsDropdown />
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/language-selection')}
                iconName="Globe"
                iconSize={18}
                className="transition-morphic hover:scale-micro"
                title="Change language"
              >
                {currentLanguage?.toUpperCase()}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                iconName={isMobileMenuOpen ? "X" : "Menu"}
                iconSize={20}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border shadow-morphic-hover animate-slide-up">
            <div className="px-4 py-3 space-y-2">
              {navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={isActive(item?.path) ? "default" : "ghost"}
                  size="sm"
                  fullWidth
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={18}
                  className="justify-start"
                >
                  {item?.label}
                </Button>
              ))}
              
              <div className="pt-2 border-t border-border">
                <ToolsDropdown isMobile />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={() => {
                  navigate('/language-selection');
                  setIsMobileMenuOpen(false);
                }}
                iconName="Globe"
                iconPosition="left"
                iconSize={18}
                className="justify-start"
              >
                Language ({currentLanguage?.toUpperCase()})
              </Button>
            </div>
          </div>
        )}
      </header>
      {/* Language Selector Modal */}
  {/* Header now navigates to the central language selection page */}
      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
};

export default MainNavigation;