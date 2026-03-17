'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'pt-BR' | 'en-US' | 'es-ES';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt-BR');

  useEffect(() => {
    // Load locale from localStorage on client-side only
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && ['pt-BR', 'en-US', 'es-ES'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context.locale;
}

export function useSetLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useSetLocale must be used within LocaleProvider');
  }
  return context.setLocale;
}
