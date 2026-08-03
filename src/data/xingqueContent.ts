import type { LanguageCode } from '../i18n/config';

type ParagraphBlock = string[];

type RiluAccessOption = {
  status: string;
  href?: string;
  recommended?: string;
};

type ProductContent = {
  title: string;
  short: string;
  tags: string[];
  cta: string;
  href: string;
};

type WorkflowStep = {
  title: string;
  body: string;
};

type LocalDeviceContent = {
  title: string;
  body: ParagraphBlock;
  support: string;
};

export type XingQueContent = {
  nav: {
    xingque: string;
    beichen: string;
    rilu: string;
    chenxun: string;
    comingSoon: string;
  };
  hero: {
    alt: string;
  };
  xingque: {
    eyebrow: string;
    heading: string;
    branchEyebrow: string;
    body: ParagraphBlock;
  };
  beichen: {
    eyebrow: string;
    title: string;
    label: string;
    body: ParagraphBlock;
    cta: string;
  };
  workflow: {
    eyebrow: string;
    steps: WorkflowStep[];
  };
  rilu: ProductContent & {
    eyebrow: string;
    body: ParagraphBlock;
    access: RiluAccessOption[];
  };
  chenxun: ProductContent;
  productsNote: string;
  localDevice: LocalDeviceContent;
  privacy: LocalDeviceContent;
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
      beichen: 'Beichen Academy',
      rilu: 'Rilu',
      chenxun: 'Chenxun',
      comingSoon: 'Coming Soon'
    },
    hero: {
      alt: 'XingQue'
    },
    xingque: {
      eyebrow: 'XINGQUE / TOOL ECOSYSTEM',
      heading: 'A quiet constellation of small offices.',
      branchEyebrow: 'Beichen Academy',
      body: [
        'XingQue takes inspiration from the halls and offices of a traditional Chinese court.',
        'Each academy keeps its own charge.\nEach office tends to its own duties.',
        'Like stars scattered across the night sky,\nthey stand apart,\nyet quietly sustain the rhythms of daily life.'
      ],
    },
    beichen: {
      eyebrow: 'XINGQUE × BEICHEN',
      title: 'Beichen Academy',
      label: 'Language-learning tools for repeatable practice',
      body: [
        'Beichen, the Northern Star, stands at the center of the heavens.',
        'The Beichen Academy is entrusted with the study of languages:\ngathering words,\nordering passages,\nand through steady practice over time,\nturning unfamiliar tongues into familiar companions.'
      ],
      cta: 'Visit Beichen Academy'
    },
    workflow: {
      eyebrow: 'A SHARED WORKFLOW',
      steps: [
        {
          title: 'Configure learning preferences',
          body: 'Choose the language, level, format, and personal preferences that make the practice fit your day.'
        },
        {
          title: 'Generate a complete Prompt',
          body: 'The tool turns those choices into one complete instruction you can review before using it.'
        },
        {
          title: 'Copy it into ChatGPT',
          body: 'Copy the prompt into your own ChatGPT conversation. The external conversation creates the diary practice or confirms the learning schedule.'
        }
      ]
    },
    rilu: {
      eyebrow: 'Rilu',
      body: [
        'Enter a daily thought, fragment, keyword, or emotion, then choose the target language and CEFR level. Rilu also supports a native language, an optional secondary translation language, sentence count, and sentence length.',
        'Use Minimal, Natural, or Emotional presets, or make custom versions with correction behavior for balanced, natural, grammar, or vocabulary-focused practice.'
      ],
      title: 'Rilu',
      short: 'A foreign-language diary Prompt generator.',
      tags: [
        'Prompt preview',
        'Multiple styles',
        'Translation and correction'
      ],
      cta: 'Create a Rilu Prompt',
      href: '/Beichen/rilu/',
      access: [
        {
          status: 'Chrome Web Store',
          recommended: 'Desktop companion'
        },
        {
          status: 'Web version',
          href: 'https://feiyastudio.com/Beichen/rilu/'
        }
      ]
    },
    chenxun: {
      title: 'Chenxun',
      short: 'A scheduled foreign-language news-learning Prompt generator.',
      tags: [
        'Weekly difficulty',
        'Topics and sources',
        'Schedule settings'
      ],
      cta: 'Create a Chenxun Prompt',
      href: '/Beichen/chenxun/',
    },
    productsNote: 'The website organizes your settings and generates the Prompt; ChatGPT handles the actual content generation and scheduling.',
    localDevice: {
      title: 'Your settings stay on your device',
      body: [
        'Rilu and Chenxun keep the useful working state in the browser you choose. You can save, duplicate, import, and export your configurations as JSON while keeping control of the setup.',
        'This is a local configuration workflow, not an account, cloud-sync, or hosted content service.'
      ],
      support: 'Prompts remain visible for review before you copy them into your own conversation.'
    },
    privacy: {
      title: 'Your settings stay on your device',
      body: [
        'Rilu and Chenxun keep the useful working state in the browser you choose. You can save, duplicate, import, and export your configurations as JSON while keeping control of the setup.',
        'This is a local configuration workflow, not an account, cloud-sync, or hosted content service.'
      ],
      support: 'Prompts remain visible for review before you copy them into your own conversation.'
    },
    quote: ['Not built for speed.', 'Built for returning.'],
    license: {
      textBeforeLink: 'XingQue logo typeface: Chongxi Seal. Licensed under ',
      linkLabel: 'CC BY-ND 3.0 TW or later',
      textAfterLink: '.'
    }
  },
  'zh-TW': {
    nav: {
      xingque: '星闕 XingQue',
      beichen: '北辰院 Beichen Academy',
      rilu: '日錄 Rilu',
      chenxun: '晨訊司 Chenxun',
      comingSoon: '尚未開放'
    },
    hero: {
      alt: '星闕 XingQue'
    },
    xingque: {
      eyebrow: 'XINGQUE / TOOL ECOSYSTEM',
      heading: '群星各守其位。',
      branchEyebrow: '北辰院',
      body: [
        '星闕取意於古代宮闕與百司。',
        '諸院各有所掌，\n諸司各有所職。',
        '如群星分布於夜空，\n彼此獨立，\n卻共同維繫著日常。'
      ],
    },
    beichen: {
      eyebrow: 'XINGQUE × BEICHEN',
      title: '北辰院 Beichen Academy',
      label: '可重複使用的語言學習工具家族',
      body: [
        '北辰者，天之樞也。',
        '北辰院司掌諸語之學，\n收詞句、理篇章，\n以日積月累之功，\n使陌生之語漸成可親之語。'
      ],
      cta: '前往北辰院'
    },
    workflow: {
      eyebrow: '共同工作流程',
      steps: [
        {
          title: '設定學習偏好',
          body: '選擇語言、程度、輸出方式與個人偏好，讓練習能貼近當天的使用情境。'
        },
        {
          title: '產生完整 Prompt',
          body: '工具將這些選擇整理成一份完整指令，讓你在使用前先閱讀與確認。'
        },
        {
          title: '複製到 ChatGPT',
          body: '將 Prompt 複製到自己的 ChatGPT 對話中；外部對話會接續處理日記練習或確認學習排程。'
        }
      ]
    },
    rilu: {
      eyebrow: '日錄 Rilu',
      body: [
        '輸入今天的想法、片段、關鍵字或情緒，再選擇目標語言與 CEFR 程度。日錄也支援母語、可選的第二翻譯語言、句數與句子長度。',
        '可以使用 Minimal、Natural、Emotional 預設，也可以建立自訂版本，指定自然、文法、字彙或平衡取向的修正行為。'
      ],
      title: '日錄 Rilu',
      short: '外語日記 Prompt 產生器。',
      tags: [
        'Prompt 預覽',
        '多版本風格',
        '翻譯與修正'
      ],
      cta: '建立日錄 Prompt',
      href: '/Beichen/rilu/',
      access: [
        {
          status: 'Chrome Web Store',
          recommended: '桌面使用的擴充流程'
        },
        {
          status: '網頁版',
          href: 'https://feiyastudio.com/Beichen/rilu/'
        }
      ]
    },
    chenxun: {
      title: '晨訊司 Chenxun',
      short: '外語新聞學習排程 Prompt 產生器。',
      tags: [
        '每週難度',
        '主題與來源',
        '排程設定'
      ],
      cta: '建立晨訊司 Prompt',
      href: '/Beichen/chenxun/',
    },
    productsNote: '網站負責整理設定與產生 Prompt；實際內容生成與排程由 ChatGPT 完成。',
    localDevice: {
      title: '設定留在你的裝置裡',
      body: [
        '日錄與晨訊司會將有用的工作狀態留在你選擇的瀏覽器中。你可以保存、複製、匯入與匯出 JSON 設定，持續掌握自己的使用方式。',
        '這是本機設定流程，不是帳號、雲端同步或代為託管內容的服務。'
      ],
      support: 'Prompt 會先留在畫面上供你檢查，再由你決定是否複製到自己的對話。'
    },
    privacy: {
      title: '設定留在你的裝置裡',
      body: [
        '日錄與晨訊司會將有用的工作狀態留在你選擇的瀏覽器中。你可以保存、複製、匯入與匯出 JSON 設定，持續掌握自己的使用方式。',
        '這是本機設定流程，不是帳號、雲端同步或代為託管內容的服務。'
      ],
      support: 'Prompt 會先留在畫面上供你檢查，再由你決定是否複製到自己的對話。'
    },
    quote: ['不求一日精進，', '但求來日仍願再來。'],
    license: {
      textBeforeLink: '星闕 logo 字體：「崇羲篆體」，依 ',
      linkLabel: 'CC BY-ND 3.0 TW 或其後版本',
      textAfterLink: ' 授權使用。'
    }
  },
  'zh-CN': {
    nav: {
      xingque: '星阙 XingQue',
      beichen: '北辰院 Beichen Academy',
      rilu: '日录 Rilu',
      chenxun: '晨讯司 Chenxun',
      comingSoon: '尚未开放'
    },
    hero: {
      alt: '星阙 XingQue'
    },
    xingque: {
      eyebrow: 'XINGQUE / TOOL ECOSYSTEM',
      heading: '群星各守其位。',
      branchEyebrow: '北辰院',
      body: [
        '星阙取意于古代宫阙与百司。',
        '诸院各有所掌，\n诸司各有所职。',
        '如群星分布于夜空，\n彼此独立，\n却共同维系着日常。'
      ],
    },
    beichen: {
      eyebrow: 'XINGQUE × BEICHEN',
      title: '北辰院 Beichen Academy',
      label: '可重复使用的语言学习工具家族',
      body: [
        '北辰者，天之枢也。',
        '北辰院司掌诸语之学，\n收词句、理篇章，\n以日积月累之功，\n使陌生之语渐成可亲之语。'
      ],
      cta: '前往北辰院'
    },
    workflow: {
      eyebrow: '共同工作流程',
      steps: [
        {
          title: '设置学习偏好',
          body: '选择语言、程度、输出方式与个人偏好，让练习贴近当天的使用情境。'
        },
        {
          title: '生成完整 Prompt',
          body: '工具将这些选择整理成一份完整指令，让你在使用前先阅读与确认。'
        },
        {
          title: '复制到 ChatGPT',
          body: '将 Prompt 复制到自己的 ChatGPT 对话中；外部对话会接续处理日记练习或确认学习排程。'
        }
      ]
    },
    rilu: {
      eyebrow: '日录 Rilu',
      body: [
        '输入今天的想法、片段、关键词或情绪，再选择目标语言与 CEFR 程度。日录也支持母语、可选的第二翻译语言、句数与句子长度。',
        '可以使用 Minimal、Natural、Emotional 预设，也可以创建自定义版本，指定自然、语法、词汇或平衡取向的修正行为。'
      ],
      title: '日录 Rilu',
      short: '外语日记 Prompt 生成器。',
      tags: [
        'Prompt 预览',
        '多版本风格',
        '翻译与修正'
      ],
      cta: '创建日录 Prompt',
      href: '/Beichen/rilu/',
      access: [
        {
          status: 'Chrome Web Store',
          recommended: '桌面使用的扩展流程'
        },
        {
          status: '网页版',
          href: 'https://feiyastudio.com/Beichen/rilu/'
        }
      ]
    },
    chenxun: {
      title: '晨讯司 Chenxun',
      short: '外语新闻学习排程 Prompt 生成器。',
      tags: [
        '每周难度',
        '主题与来源',
        '排程设置'
      ],
      cta: '创建晨讯司 Prompt',
      href: '/Beichen/chenxun/',
    },
    productsNote: '网站负责整理设置与生成 Prompt；实际内容生成与排程由 ChatGPT 完成。',
    localDevice: {
      title: '设置留在你的设备里',
      body: [
        '日录与晨讯司会将有用的工作状态留在你选择的浏览器中。你可以保存、复制、导入与导出 JSON 设置，持续掌握自己的使用方式。',
        '这是本机设置流程，不是账号、云端同步或代为托管内容的服务。'
      ],
      support: 'Prompt 会先留在画面上供你检查，再由你决定是否复制到自己的对话。'
    },
    privacy: {
      title: '设置留在你的设备里',
      body: [
        '日录与晨讯司会将有用的工作状态留在你选择的浏览器中。你可以保存、复制、导入与导出 JSON 设置，持续掌握自己的使用方式。',
        '这是本机设置流程，不是账号、云端同步或代为托管内容的服务。'
      ],
      support: 'Prompt 会先留在画面上供你检查，再由你决定是否复制到自己的对话。'
    },
    quote: ['不求一日精进，', '但求来日仍愿再来。'],
    license: {
      textBeforeLink: '星阙 logo 字体：“崇羲篆体”，依 ',
      linkLabel: 'CC BY-ND 3.0 TW 或其后版本',
      textAfterLink: ' 授权使用。'
    }
  }
};

export const getXingQueContent = (language: string) =>
  xingqueContent[language as LanguageCode] ?? xingqueContent.en;
