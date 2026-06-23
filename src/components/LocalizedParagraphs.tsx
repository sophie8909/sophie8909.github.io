type LocalizedParagraphsProps = {
  paragraphs: string[];
  className?: string;
};

export const LocalizedParagraphs = ({ paragraphs, className = '' }: LocalizedParagraphsProps) => (
  <div className={`localized-copy ${className}`.trim()}>
    {paragraphs.map((paragraph) => (
      <p key={paragraph}>{paragraph}</p>
    ))}
  </div>
);
