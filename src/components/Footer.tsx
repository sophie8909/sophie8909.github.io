import { useTranslation } from 'react-i18next';
import { getXingQueContent } from '../data/xingqueContent';

type FooterProps = {
  route: string;
};

const chongxiLicenseUrl = 'https://xiaoxue.iis.sinica.edu.tw/chongxi/copyright.htm';

export const Footer = ({ route }: FooterProps) => {
  const { i18n, t } = useTranslation();
  const showXingQueAttribution = route === '/xingque' || route === '/xingque/beichen';
  const content = getXingQueContent(i18n.language);

  return (
    <footer className="site-footer">
      <div>
        <p className="footer-brand">Feiya Studio</p>
        {showXingQueAttribution ? (
          <p className="footer-attribution">
            {content.license.textBeforeLink}
            <a href={chongxiLicenseUrl} rel="noreferrer" target="_blank">
              {content.license.linkLabel}
            </a>
            {content.license.textAfterLink}
          </p>
        ) : null}
      </div>
      <p>{t('footer.copyright')}</p>
    </footer>
  );
};
