export type ComponentCardProps = {
  href: string;
  title: string;
  description: string;
  preview?: React.ReactNode;
};

export const ComponentCard = ({ href, title, description, preview }: ComponentCardProps) => (
  <div className="group flex flex-col rounded-lg border border-border-default bg-surface-default hover:border-interactive-accent hover:shadow-md transition-all duration-150 overflow-hidden">
    {/* Preview sits outside the link so component previews can include links or buttons. */}
    {preview ?? (
      <div className="flex items-center justify-center bg-surface-muted h-20" aria-hidden />
    )}
    <a
      href={href}
      className="px-4 py-3 border-t border-border-subtle no-underline block"
    >
      <span className="text-sm font-semibold text-foreground-primary group-hover:text-interactive-accent transition-colors block">
        {title}
      </span>
      <span className="text-xs text-foreground-secondary leading-relaxed">{description}</span>
    </a>
  </div>
);
