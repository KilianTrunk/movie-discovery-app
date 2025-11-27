interface ContentDescriptionProps {
  title?: string;
  content: string;
}

export function ContentDescription({ title = "Overview", content }: ContentDescriptionProps) {
  if (!content) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-300 leading-relaxed">{content}</p>
    </div>
  );
}
