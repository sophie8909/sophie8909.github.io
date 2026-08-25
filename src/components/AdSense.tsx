import { useEffect } from 'react';
import type { AppRoute } from '../hooks/useRoute';

const ADSENSE_ACCOUNT_ID = 'ca-pub-2263683088830621';
const ADSENSE_SCRIPT_URL =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ACCOUNT_ID}`;
const ADSENSE_SCRIPT_SELECTOR =
  'script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]';
const ADSENSE_META_SELECTOR = 'meta[name="google-adsense-account"]';

type AdSenseProps = {
  route: AppRoute;
};

const removeLoaders = () => {
  document.head.querySelectorAll(ADSENSE_SCRIPT_SELECTOR).forEach((element) => element.remove());
};

const ensureAccountMeta = () => {
  const metas = Array.from(
    document.head.querySelectorAll<HTMLMetaElement>(ADSENSE_META_SELECTOR)
  );
  const meta = metas.shift() ?? document.createElement('meta');

  meta.name = 'google-adsense-account';
  meta.content = ADSENSE_ACCOUNT_ID;

  if (!meta.isConnected) {
    document.head.append(meta);
  }

  metas.forEach((duplicate) => duplicate.remove());
};

const ensureLoader = () => {
  const scripts = Array.from(
    document.head.querySelectorAll<HTMLScriptElement>(ADSENSE_SCRIPT_SELECTOR)
  );
  const loader = scripts.find((script) => script.src === ADSENSE_SCRIPT_URL);

  scripts.filter((script) => script !== loader).forEach((duplicate) => duplicate.remove());

  if (loader) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = ADSENSE_SCRIPT_URL;
  script.crossOrigin = 'anonymous';
  document.head.append(script);
};

export const AdSense = ({ route }: AdSenseProps) => {
  useEffect(() => {
    ensureAccountMeta();

    if (route === '/') {
      const hasLoader = document.head.querySelector(ADSENSE_SCRIPT_SELECTOR) !== null;

      if (hasLoader) {
        removeLoaders();
        window.location.replace(window.location.href);
      }
      return;
    }

    ensureLoader();
  }, [route]);

  return null;
};
