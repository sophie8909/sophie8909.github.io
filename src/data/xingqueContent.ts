import type { LanguageCode } from '../i18n/config';

type ParagraphBlock = string[];

type FutureOffice = {
  title: string;
  copy: string;
};

type RiluFeature = {
  title: string;
  copy: string;
};

export type XingQueContent = {
  nav: {
    xingque: string;
    beichen: string;
    rilu: string;
    comingSoon: string;
  };
  hero: {
    alt: string;
    subtitle: string;
  };
  xingque: {
    eyebrow: string;
    heading: string;
    body: ParagraphBlock;
  };
  beichen: {
    eyebrow: string;
    title: string;
    label: string;
    body: ParagraphBlock;
    cta: string;
  };
  rilu: {
    eyebrow: string;
    title: string;
    short: string;
    body: ParagraphBlock;
    outputsLabel: string;
    outputs: string[];
    featuresHeading: string;
    features: RiluFeature[];
  };
  offices: {
    eyebrow: string;
    title: string;
    body: ParagraphBlock;
    cards: FutureOffice[];
  };
  privacy: {
    title: string;
    body: string;
  };
  quote: string[];
  license: {
    textBeforeLink: string;
    linkLabel: string;
    textAfterLink: string;
  };
};

export const xingqueContent: Record<LanguageCode, XingQueContent> = {
  en: {
    nav: {
      xingque: 'XingQue',
      beichen: 'Beichen',
      rilu: 'Rilu',
      comingSoon: 'Coming Soon'
    },
    hero: {
      alt: 'XingQue',
      subtitle: 'xingque'
    },
    xingque: {
      eyebrow: 'Branches',
      heading: 'A quiet constellation of small offices.',
      body: [
        'XingQue takes inspiration from the halls and offices of a traditional Chinese court.',
        'Each academy keeps its own charge.\nEach office tends to its own duties.',
        'Like stars scattered across the night sky,\nthey stand apart,\nyet quietly sustain the rhythms of daily life.'
      ]
    },
    beichen: {
      eyebrow: 'XingQue Branch',
      title: 'XingQue Beichen',
      label: 'Beichen Academy',
      body: [
        'Beichen, the Northern Star, stands at the center of the heavens.',
        'The Beichen Academy is entrusted with the study of languages:\ngathering words,\nordering passages,\nand through steady practice over time,\nturning unfamiliar tongues into familiar companions.'
      ],
      cta: 'Explore Beichen'
    },
    rilu: {
      eyebrow: 'First Office',
      title: 'Rilu · Daily Language Journal',
      short: 'A daily language journal for small and steady practice.',
      body: [
        'Rilu is the first office established within Beichen.',
        'It helps thoughts, fragments, emotions, and unfinished sentences find their place in the language being learned.'
      ],
      outputsLabel: 'Rilu keeps the practice small:',
      outputs: ['Minimal', 'Natural', 'Emotional'],
      featuresHeading: 'Practice pieces',
      features: [
        {
          title: 'Diary writing',
          copy: 'Write from a thought, fragment, or unfinished sentence.'
        },
        {
          title: 'Level control',
          copy: 'Keep the line short while adjusting the writing level.'
        },
        {
          title: 'Vocabulary capture',
          copy: 'Save useful words from the language being practiced.'
        },
        {
          title: 'Returning',
          copy: 'Come back to small records without turning practice into a heavy session.'
        }
      ]
    },
    offices: {
      eyebrow: 'Later',
      title: 'Offices of Beichen',
      body: [
        'Rilu is the first office within Beichen.',
        'In time, more offices may be established for reading, vocabulary, speaking practice, and review.',
        'Each serves a different duty, yet all follow the same path of gradual learning.'
      ],
      cards: [
        { title: 'Reading Office', copy: 'For reading practice.' },
        { title: 'Vocabulary Archive', copy: 'For keeping words.' },
        { title: 'Speaking Room', copy: 'For speaking practice.' },
        { title: 'Review Hall', copy: 'For returning to what has been learned.' }
      ]
    },
    privacy: {
      title: 'Local by default',
      body: 'Rilu keeps captured replies and vocabulary records on your device by default. No account system, no backend, and no analytics are required for the local workflow.'
    },
    quote: ['Not built for speed.', 'Built for returning.'],
    license: {
      textBeforeLink: 'XingQue logo typeface: Chongxi Seal Script by Wang Hsin-Yi. Licensed under ',
      linkLabel: 'CC BY-ND 3.0 TW or later',
      textAfterLink: '.'
    }
  },
  'zh-TW': {
    nav: {
      xingque: '星闕',
      beichen: '北辰',
      rilu: '日錄',
      comingSoon: '尚未開放'
    },
    hero: {
      alt: '星闕',
      subtitle: '星闕'
    },
    xingque: {
      eyebrow: '諸院',
      heading: '群星各守其位。',
      body: [
        '星闕取意於古代宮闕與百司。',
        '諸院各有所掌，\n諸司各有所職。',
        '如群星分布於夜空，\n彼此獨立，\n卻共同維繫著日常。'
      ]
    },
    beichen: {
      eyebrow: '星闕分院',
      title: '星闕 · 北辰',
      label: '北辰院',
      body: [
        '北辰者，天之樞也。',
        '北辰院司掌諸語之學，\n收詞句、理篇章，\n以日積月累之功，\n使陌生之語漸成可親之語。'
      ],
      cta: '進入北辰'
    },
    rilu: {
      eyebrow: '首設之司',
      title: '日錄司',
      short: '以日日之記，養語言之功。',
      body: [
        '日錄司為北辰院首設之司。',
        '凡一日所思、\n所見、\n所感，',
        '皆可記之。',
        '或數語，\n或片言，',
        '終成一頁。'
      ],
      outputsLabel: '日錄所求者小而可久：',
      outputs: ['極簡', '自然', '含情'],
      featuresHeading: '修習之事',
      features: [
        {
          title: '日記',
          copy: '由一念、一句、未成之語起筆。'
        },
        {
          title: '程度',
          copy: '使語句短而可用，並依程度調整。'
        },
        {
          title: '收詞',
          copy: '留下練習語言中可再相逢的詞句。'
        },
        {
          title: '復返',
          copy: '以小記錄反覆回來，不使修習成為重負。'
        }
      ]
    },
    offices: {
      eyebrow: '他日',
      title: '北辰院諸司',
      body: [
        '今設日錄一司。',
        '他日或增閱文之閣，\n藏詞之庫，\n習聲之房，\n溫習之館。',
        '皆循其職，\n各守其事。'
      ],
      cards: [
        { title: '閱文之閣', copy: '司掌閱文。' },
        { title: '藏詞之庫', copy: '司掌藏詞。' },
        { title: '習聲之房', copy: '司掌習聲。' },
        { title: '溫習之館', copy: '司掌復返。' }
      ]
    },
    privacy: {
      title: '本機為先',
      body: '日錄將擷取的回覆與詞彙紀錄預設留在裝置之中。本機流程不需帳號、不需後端，也不需分析追蹤。'
    },
    quote: ['不求一日精進，', '但求來日仍願再來。'],
    license: {
      textBeforeLink: '星闕 logo 字體：王心怡書寫之「崇羲篆體」，依 ',
      linkLabel: 'CC BY-ND 3.0 TW 或其後版本',
      textAfterLink: ' 授權使用。'
    }
  },
  'zh-CN': {
    nav: {
      xingque: '星阙',
      beichen: '北辰',
      rilu: '日录',
      comingSoon: '尚未开放'
    },
    hero: {
      alt: '星阙',
      subtitle: '星阙'
    },
    xingque: {
      eyebrow: '诸院',
      heading: '群星各守其位。',
      body: [
        '星阙取意于古代宫阙与百司。',
        '诸院各有所掌，\n诸司各有所职。',
        '如群星分布于夜空，\n彼此独立，\n却共同维系着日常。'
      ]
    },
    beichen: {
      eyebrow: '星阙分院',
      title: '星阙 · 北辰',
      label: '北辰院',
      body: [
        '北辰者，天之枢也。',
        '北辰院司掌诸语之学，\n收词句、理篇章，\n以日积月累之功，\n使陌生之语渐成可亲之语。'
      ],
      cta: '进入北辰'
    },
    rilu: {
      eyebrow: '首设之司',
      title: '日录司',
      short: '以日日之记，养语言之功。',
      body: [
        '日录司为北辰院首设之司。',
        '凡一日所思、\n所见、\n所感，',
        '皆可记之。',
        '或数语，\n或片言，',
        '终成一页。'
      ],
      outputsLabel: '日录所求者小而可久：',
      outputs: ['极简', '自然', '含情'],
      featuresHeading: '修习之事',
      features: [
        {
          title: '日记',
          copy: '由一念、一句、未成之语起笔。'
        },
        {
          title: '程度',
          copy: '使语句短而可用，并依程度调整。'
        },
        {
          title: '收词',
          copy: '留下练习语言中可再相逢的词句。'
        },
        {
          title: '复返',
          copy: '以小记录反复回来，不使修习成为重负。'
        }
      ]
    },
    offices: {
      eyebrow: '他日',
      title: '北辰院诸司',
      body: [
        '今设日录一司。',
        '他日或增阅文之阁，\n藏词之库，\n习声之房，\n温习之馆。',
        '皆循其职，\n各守其事。'
      ],
      cards: [
        { title: '阅文之阁', copy: '司掌阅文。' },
        { title: '藏词之库', copy: '司掌藏词。' },
        { title: '习声之房', copy: '司掌习声。' },
        { title: '温习之馆', copy: '司掌复返。' }
      ]
    },
    privacy: {
      title: '本机为先',
      body: '日录将撷取的回复与词汇记录默认留在设备之中。本机流程不需账号、不需后端，也不需分析追踪。'
    },
    quote: ['不求一日精进，', '但求来日仍愿再来。'],
    license: {
      textBeforeLink: '星阙 logo 字体：王心怡书写之“崇羲篆体”，依 ',
      linkLabel: 'CC BY-ND 3.0 TW 或其后版本',
      textAfterLink: ' 授权使用。'
    }
  }
};

export const getXingQueContent = (language: string) =>
  xingqueContent[language as LanguageCode] ?? xingqueContent.en;
