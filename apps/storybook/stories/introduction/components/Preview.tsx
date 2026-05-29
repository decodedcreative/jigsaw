/** Small, pointer-events-none snapshot frame for a component preview. */
export const Preview = ({ children }: { children: React.ReactNode }) => (
  <div
    className="flex items-center justify-center bg-surface-muted rounded-md h-20 overflow-hidden pointer-events-none select-none px-3"
    aria-hidden
  >
    <div className="flex items-center justify-center gap-2 scale-90 origin-center w-full">
      {children}
    </div>
  </div>
);
