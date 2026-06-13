import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import i18n, { LanguageCode, supportedLanguages } from '../i18n/config';

const syncLanguageUrl = (language: LanguageCode) => {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', language);
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
};

export const LanguageSelector = () => {
  const { t } = useTranslation();
  const currentLanguage = i18n.language as LanguageCode;

  const changeLanguage = (language: LanguageCode) => {
    window.localStorage.setItem('feiya-language', language);
    syncLanguageUrl(language);
    void i18n.changeLanguage(language);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(event.target.value as LanguageCode);
  };

  return (
    <div className="language-selector" aria-label={t('language.label')}>
      <div className="language-links">
        {supportedLanguages.map((language, index) => (
          <span className="language-link-wrap" key={language.code}>
            <button
              className="language-link"
              type="button"
              aria-current={currentLanguage === language.code ? 'true' : undefined}
              onClick={() => changeLanguage(language.code)}
            >
              {language.label}
            </button>
            {index < supportedLanguages.length - 1 ? (
              <span className="language-separator">|</span>
            ) : null}
          </span>
        ))}
      </div>

      <label className="language-select-label" htmlFor="language-select">
        {t('language.mobileLabel')}
      </label>
      <select
        id="language-select"
        className="language-select"
        value={currentLanguage}
        onChange={handleSelectChange}
      >
        {supportedLanguages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
};
