import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Load all translation files for the locale
  const common = (await import(`../locales/${locale}/common.json`)).default;
  const dashboard = (await import(`../locales/${locale}/dashboard.json`)).default;
  const shopping = (await import(`../locales/${locale}/shopping.json`)).default;

  // Merge all messages into a single object with namespace keys
  return {
    messages: {
      ...common,
      dashboard,
      shopping,
    },
  };
});
