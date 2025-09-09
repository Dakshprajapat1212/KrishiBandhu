import React, { useEffect, useState } from "react";
import Routes from "./Routes";

function App() {
  // Use a small key that changes when language changes so entire route tree remounts
  const [langKey, setLangKey] = useState(() => {
    return localStorage.getItem('krishibandhu-language-updated') || String(Date.now());
  });

  useEffect(() => {
    const handler = () => {
      const ts = localStorage.getItem('krishibandhu-language-updated') || String(Date.now());
      setLangKey(ts);
    };

    window.addEventListener('krishibandhu:language-changed', handler);
    return () => window.removeEventListener('krishibandhu:language-changed', handler);
  }, []);

  return (
    <Routes key={langKey} />
  );
}

export default App;
