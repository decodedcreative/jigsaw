export type TokenCardProps = {
  href: string;
  icon?: string;
  title: string;
  description: string;
};

export const TokenCard = ({ href, icon, title, description }: TokenCardProps) => (
  <a
    href={href}
    className="group flex flex-col gap-1 p-4 rounded-lg border border-border-default bg-surface-default hover:border-interactive-accent hover:shadow-md transition-all duration-150 no-underline"
  >
    {icon && (
      <span className="text-2xl mb-1 leading-none" aria-hidden>
        {icon}
      </span>
    )}
    <span className="text-sm font-semibold text-text-primary group-hover:text-interactive-accent transition-colors">
      {title}
    </span>
    <span className="text-xs text-text-secondary leading-relaxed">{description}</span>
  </a>
);
