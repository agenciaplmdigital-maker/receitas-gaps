import { getRequestConfig } from 'next-intl/server';

// Simple, straightforward imports
import messages_pt_BR from '../locales/pt-BR/common.json';
import messages_en_US from '../locales/en-US/common.json';
import messages_es_ES from '../locales/es-ES/common.json';

const messagesByLocale = {
  'pt-BR': messages_pt_BR,
  'en-US': messages_en_US,
  'es-ES': messages_es_ES,
} as const;

export default getRequestConfig(async ({ locale }) => {
  const messages = messagesByLocale[locale as keyof typeof messagesByLocale] || messagesByLocale['pt-BR'];

  return {
    messages,
  };
});
