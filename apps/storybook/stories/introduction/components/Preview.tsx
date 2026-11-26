/**
 * Small snapshot frame for a component preview.
 * `inert` takes the live controls out of the tab order and the accessibility
 * tree; the card around it carries the link and name.
 */
export const Preview = ({ children }: { children: React.ReactNode }) => (
  <div
    className="flex items-center justify-center bg-surface-muted rounded-md h-20 overflow-hidden pointer-events-none select-none px-3"
    inert
  >
    <div className="flex items-center justify-center gap-2 scale-90 origin-center w-full">
      {children}
    </div>
  </div>
);
