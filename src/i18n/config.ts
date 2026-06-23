import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import zhCN from '../locales/zh-CN.json';
import zhTW from '../locales/zh-TW.json';

export const supportedLanguages = [
  { code: 'zh-TW', label: '繁體中文', shortLabel: '繁中' },
  { code: 'zh-CN', label: '简体中文', shortLabel: '简中' },
  { code: 'en', label: 'English', shortLabel: 'EN' }
] as const;

export type LanguageCode = (typeof supportedLanguages)[number]['code'];

const resources = {
  'zh-TW': { translation: zhTW },
  'zh-CN': { translation: zhCN },
  en: { translation: en }
};

const isLanguageCode = (value: string | null): value is LanguageCode =>
  supportedLanguages.some((language) => language.code === value);

const getInitialLanguage = (): LanguageCode => {
  const params = new URLSearchParams(window.location.search);
  const queryLanguage = params.get('lang');

  if (isLanguageCode(queryLanguage)) {
    window.localStorage.setItem('feiya-language', queryLanguage);
    return queryLanguage;
  }

  const savedLanguage = window.localStorage.getItem('feiya-language');
  if (isLanguageCode(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = window.navigator.language;
  if (browserLanguage.startsWith('zh-TW') || browserLanguage.startsWith('zh-Hant')) {
    return 'zh-TW';
  }

  if (browserLanguage.startsWith('zh')) {
    return 'zh-CN';
  }

  return 'en';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
