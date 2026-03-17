import commonPT from '@/locales/pt-BR/common.json';
import commonEN from '@/locales/en-US/common.json';
import commonES from '@/locales/es-ES/common.json';

type Locale = 'pt-BR' | 'en-US' | 'es-ES';

const messages: Record<Locale, typeof commonPT> = {
  'pt-BR': commonPT,
  'en-US': commonEN,
  'es-ES': commonES,
};

export function getMessage(locale: Locale, key: string, defaultValue: string = key): string {
  const keys = key.split('.');
  let value: any = messages[locale];

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      return defaultValue;
    }
  }

  return value ?? defaultValue;
}

export function getMessages(locale: Locale) {
  return messages[locale] || messages['pt-BR'];
}
