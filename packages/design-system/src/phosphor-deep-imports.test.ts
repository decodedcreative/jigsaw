import { describe, expect, it } from "vitest";

/**
 * Runtime components deep-import Phosphor via public `./*` package exports
 * (e.g. `@phosphor-icons/react/List` → `dist/csr/List.es.js`). Keep this list
 * in sync with those imports — it fails CI if a Phosphor major drops the map.
 *
 * @see docs/using-jigsaw.md (Next.js + Phosphor icons)
 * @see JSW-114
 */
const DEEP_ICON_IMPORTS = [
  { subpath: "List", exportName: "ListIcon" },
  { subpath: "X", exportName: "XIcon" },
  { subpath: "Check", exportName: "CheckIcon" },
  { subpath: "Minus", exportName: "MinusIcon" },
  { subpath: "Plus", exportName: "PlusIcon" },
  { subpath: "CaretDown", exportName: "CaretDownIcon" },
  { subpath: "MagnifyingGlass", exportName: "MagnifyingGlassIcon" },
  { subpath: "CheckCircle", exportName: "CheckCircleIcon" },
  { subpath: "Info", exportName: "InfoIcon" },
  { subpath: "Warning", exportName: "WarningIcon" },
  { subpath: "XCircle", exportName: "XCircleIcon" },
] as const;

describe("Phosphor deep imports (JSW-114)", () => {
  it.each(DEEP_ICON_IMPORTS)(
    "resolves @$subpath with a defined $exportName",
    async ({ subpath, exportName }) => {
      const mod = await import(`@phosphor-icons/react/${subpath}`);
      const icon = mod[exportName];
      expect(icon, `${exportName} from @phosphor-icons/react/${subpath}`).toBeTypeOf("object");
      expect(icon).toBeTruthy();
    },
  );
});
