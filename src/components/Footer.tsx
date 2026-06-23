import { useTranslation } from 'react-i18next';

type FooterProps = {
  route: string;
};

const chongxiLicenseUrl = 'https://xiaoxue.iis.sinica.edu.tw/chongxi/copyright.htm';

export const Footer = ({ route }: FooterProps) => {
  const { t } = useTranslation();
  const showXingQueAttribution = route === '/xingque' || route === '/xingque/beichen';

  return (
    <footer className="site-footer">
      <div>
        <p className="footer-brand">Feiya Studio</p>
        {showXingQueAttribution ? (
          <p className="footer-attribution">
            XingQue logo typeface: Chongxi Seal Script by Wang Hsin-Yi. Licensed under{' '}
            <a href={chongxiLicenseUrl} rel="noreferrer" target="_blank">
              CC BY-ND 3.0 TW or later
            </a>
            . <span lang="zh-Hant">星闕 logo 字體：王心怡書寫之「崇羲篆體」。</span>
          </p>
        ) : null}
      </div>
      <p>{t('footer.copyright')}</p>
    </footer>
  );
};
