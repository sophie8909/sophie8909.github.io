import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div>
        <p className="footer-brand">Feiya Studio</p>
      </div>
      <p>{t('footer.copyright')}</p>
    </footer>
  );
};
