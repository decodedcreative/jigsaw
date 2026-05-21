import type { ReactNode } from "react";

export function TokenPage({ children }: { children: ReactNode }) {
  return (
    <div className="font-sans text-text-primary bg-surface-default p-8 max-w-5xl">
      {children}
    </div>
  );
}

export function TokenSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-text-primary mb-1">{title}</h2>
      {description ? (
        <p className="text-sm text-text-secondary mb-4">{description}</p>
      ) : null}
      {children}
    </section>
  );
}

export function ColorSwatch({
  label,
  value,
  className,
  textClassName = "text-text-primary",
}: {
  label: string;
  value: string;
  className?: string;
  textClassName?: string;
}) {
  return (
    <div className="flex flex-col w-28 shrink-0">
      <div
        className={`h-16 rounded-default border border-border-default ${className ?? ""}`}
        style={className ? undefined : { backgroundColor: value }}
        title={value}
      />
      <span className={`mt-2 text-xs font-medium ${textClassName}`}>{label}</span>
      <span className="text-[10px] text-text-muted font-mono break-all">{value}</span>
    </div>
  );
}

export function TokenRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-3">{children}</div>;
}

export function TypeSample({
  label,
  token,
  className,
  children,
}: {
  label: string;
  token: string;
  className: string;
  children?: ReactNode;
}) {
  return (
    <div className="py-3 border-b border-border-subtle last:border-0">
      <p className={`${className} text-text-primary`}>
        {children ?? "The quick brown fox jumps over the lazy dog"}
      </p>
      <p className="mt-1 text-xs text-text-muted font-mono">
        {label} · {token}
      </p>
    </div>
  );
}

export function SpacingSample({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 py-2 border-b border-border-subtle last:border-0">
      <span className="w-12 text-xs font-mono text-text-muted shrink-0">{label}</span>
      <span className="w-20 text-xs font-mono text-text-muted shrink-0">{value}</span>
      <div className="flex-1 flex items-center">
        <div className="h-4 bg-interactive-accent" style={{ width: value }} />
      </div>
    </div>
  );
}

export function RadiusSample({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col w-32 shrink-0">
      <div
        className="h-20 w-20 bg-surface-muted border border-border-default"
        style={{ borderRadius: value }}
      />
      <span className="mt-2 text-xs font-medium text-text-primary">{label}</span>
      <span className="text-[10px] text-text-muted font-mono">{value}</span>
    </div>
  );
}

export function ShadowSample({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col w-44 shrink-0">
      <div
        className="h-24 bg-surface-default border border-border-subtle rounded-md"
        style={{ boxShadow: value === "none" ? undefined : value }}
      />
      <span className="mt-3 text-xs font-medium text-text-primary">{label}</span>
      <span className="text-[10px] text-text-muted font-mono break-all">{value}</span>
    </div>
  );
}
