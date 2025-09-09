import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SeedComparisonGuide from './pages/seed-comparison-guide';
import LanguageSelection from './pages/language-selection';
import CropInputDashboard from './pages/crop-input-dashboard';
import PestDetectionTool from './pages/pest-detection-tool';
import YieldPredictionResults from './pages/yield-prediction-results';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CropInputDashboard />} />
        <Route path="/seed-comparison-guide" element={<SeedComparisonGuide />} />
        <Route path="/language-selection" element={<LanguageSelection />} />
        <Route path="/crop-input-dashboard" element={<CropInputDashboard />} />
        <Route path="/pest-detection-tool" element={<PestDetectionTool />} />
        <Route path="/yield-prediction-results" element={<YieldPredictionResults />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
