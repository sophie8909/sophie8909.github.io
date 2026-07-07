interface FrontmatterData {
  [key: string]: string;
}

export const calculatorUrl = 'https://sxstx.feiyastudio.com/';
export const sxstxUpdateArchiveRoute = '/sxstx-calculator/blog/update';

export interface UpdatePost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  route: string;
}

export interface FaqEntry {
  slug: string;
  question: string;
  order: number;
  content: string;
}

const parseMarkdownFile = (markdown: string) => {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, content: markdown.trim() };
  }

  const data = match[1].split(/\r?\n/).reduce<FrontmatterData>((accumulator, line) => {
    const separatorIndex = line.indexOf(':');

    if (separatorIndex === -1) {
      return accumulator;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (key) {
      accumulator[key] = value;
    }

    return accumulator;
  }, {});

  return { data, content: match[2].trim() };
};

const getSlug = (path: string) => path.split('/').pop()?.replace(/\.md$/, '') ?? path;

const updateFiles = import.meta.glob('../../blog/update/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

const faqFiles = import.meta.glob('../../blog/faq/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

export const updates = Object.entries(updateFiles)
  .map<UpdatePost>(([path, markdown]) => {
    const { data, content } = parseMarkdownFile(markdown);
    const slug = getSlug(path);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      description: data.description ?? '',
      content,
      route: `${sxstxUpdateArchiveRoute}/${slug}`
    };
  })
  .filter((post) => post.title && post.date)
  .sort((a, b) => b.date.localeCompare(a.date));

export const faq = Object.entries(faqFiles)
  .map<FaqEntry>(([path, markdown]) => {
    const { data, content } = parseMarkdownFile(markdown);
    const slug = getSlug(path);

    return {
      slug,
      question: data.question ?? slug,
      order: Number(data.order ?? 9999),
      content
    };
  })
  .filter((entry) => entry.question && entry.content)
  .sort((a, b) => a.order - b.order);
