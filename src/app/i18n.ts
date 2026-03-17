import { getRequestConfig } from 'next-intl/server';

// Import all translation files statically
import commonPT from '../locales/pt-BR/common.json';
import dashboardPT from '../locales/pt-BR/dashboard.json';
import shoppingPT from '../locales/pt-BR/shopping.json';

import commonEN from '../locales/en-US/common.json';
import dashboardEN from '../locales/en-US/dashboard.json';
import shoppingEN from '../locales/en-US/shopping.json';

import commonES from '../locales/es-ES/common.json';
import dashboardES from '../locales/es-ES/dashboard.json';
import shoppingES from '../locales/es-ES/shopping.json';

// Map locales to their translations
const translations = {
  'pt-BR': {
    ...commonPT,
    dashboard: dashboardPT,
    shopping: shoppingPT,
  },
  'en-US': {
    ...commonEN,
    dashboard: dashboardEN,
    shopping: shoppingEN,
  },
  'es-ES': {
    ...commonES,
    dashboard: dashboardES,
    shopping: shoppingES,
  },
};

export default getRequestConfig(async ({ locale }) => ({
  messages: translations[locale as keyof typeof translations] || translations['pt-BR'],
}));
