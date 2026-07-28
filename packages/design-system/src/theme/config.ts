import { twMerge as defaultTwMerge } from "tailwind-merge";

/**
 * Class-name merge function used by Jigsaw components.
 * Compatible with `tailwind-merge`'s `twMerge` / `extendTailwindMerge` result.
 */
export type TwMergeFn = typeof defaultTwMerge;

export type ThemeConfig = {
  twMerge: TwMergeFn;
};

let config: ThemeConfig = {
  twMerge: defaultTwMerge,
};

/**
 * Set the app-wide `twMerge` used by `getClassNames` and (as a fallback) by
 * theme hooks. Safe to call from a Server Component root layout or a client
 * providers module — no React context required.
 *
 * Last call wins (intentional for app-wide config). Not for per-subtree
 * overrides — use `ThemeProvider` on the client for that.
 */
export function configureTwMerge(twMergeFn: TwMergeFn): void {
  if (typeof twMergeFn !== "function") {
    throw new TypeError(
      `configureTwMerge expected a function (e.g. twMerge or extendTailwindMerge(...)), received ${typeof twMergeFn}`
    );
  }
  config = { ...config, twMerge: twMergeFn };
}

/**
 * Merge partial theme JS config into the module-level defaults.
 * Extensible for future non-CSS theme values beyond `twMerge`.
 */
export function configureTheme(partial: Partial<ThemeConfig>): void {
  if (partial.twMerge !== undefined) {
    configureTwMerge(partial.twMerge);
    return;
  }
  // No-op when called with an empty partial — keeps current config.
}

/** Current app-wide merge function (defaults to stock `tailwind-merge`). */
export function getTwMerge(): TwMergeFn {
  return config.twMerge;
}

/** Snapshot of the current module-level theme config. */
export function getThemeConfig(): Readonly<ThemeConfig> {
  return config;
}

/** Restore package defaults — intended for tests. */
export function resetThemeConfig(): void {
  config = { twMerge: defaultTwMerge };
}
