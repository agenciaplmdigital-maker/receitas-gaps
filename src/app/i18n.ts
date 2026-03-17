import { getRequestConfig } from 'next-intl/server';

const supportedLocales = ['pt-BR', 'en-US', 'es-ES'];

export default getRequestConfig(async ({ locale }) => {
  // Validate locale and fallback to Portuguese if invalid
  const validLocale = supportedLocales.includes(locale) ? locale : 'pt-BR';

  try {
    // Load all translation files for the locale
    const common = (await import(`../locales/${validLocale}/common.json`))
      .default;
    const dashboard = (await import(`../locales/${validLocale}/dashboard.json`))
      .default;
    const shopping = (await import(`../locales/${validLocale}/shopping.json`))
      .default;

    // Merge all messages into a single object with namespace keys
    return {
      messages: {
        ...common,
        dashboard,
        shopping,
      },
    };
  } catch (error) {
    console.error(`Failed to load translations for locale: ${validLocale}`, error);
    // Fallback to Portuguese if loading fails
    const common = (await import('../locales/pt-BR/common.json')).default;
    return {
      messages: common,
    };
  }
});
