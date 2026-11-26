import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  classesInSelectors,
  classesWithoutCss,
  pageRoutes,
  unescapeCssIdentifier,
} from "./packed-app-checks.mjs";

describe("pageRoutes", () => {
  it("lists page routes without route groups, handlers, Next's own pages or dynamic routes", () => {
    const manifest = {
      "/(app)/team/page": "/team",
      "/(auth)/sign-in/page": "/sign-in",
      "/page": "/",
      "/_not-found/page": "/_not-found",
      "/api/health/route": "/api/health",
      "/blog/[slug]/page": "/blog/[slug]",
    };
    assert.deepEqual(pageRoutes(manifest), ["/", "/sign-in", "/team"]);
  });
});

describe("unescapeCssIdentifier", () => {
  it("turns Tailwind's escaped class names back into the class", () => {
    assert.equal(
      unescapeCssIdentifier("hover\\:bg-surface-muted"),
      "hover:bg-surface-muted",
    );
    assert.equal(unescapeCssIdentifier("w-1\\/2"), "w-1/2");
    assert.equal(
      unescapeCssIdentifier("max-w-\\[min\\(100vw-2rem\\,24rem\\)\\]"),
      "max-w-[min(100vw-2rem,24rem)]",
    );
    assert.equal(unescapeCssIdentifier("\\32 xl\\:p-4"), "2xl:p-4");
  });
});

describe("classesInSelectors", () => {
  it("finds every class in compound and pseudo selectors", () => {
    const classes = classesInSelectors([
      ".a.b:hover > .c",
      ".group:hover .group-hover\\:underline",
      "button",
    ]);
    assert.deepEqual([...classes].sort(), [
      "a",
      "b",
      "c",
      "group",
      "group-hover:underline",
    ]);
  });
});

describe("classesWithoutCss", () => {
  it("reports classes no rule mentions", () => {
    assert.deepEqual(
      classesWithoutCss(
        ["p-4", "bg-nope", "hover:underline"],
        [".p-4", ".hover\\:underline:hover"],
      ),
      ["bg-nope"],
    );
  });

  it("ignores marker classes that only other selectors use", () => {
    assert.deepEqual(
      classesWithoutCss(
        ["group", "group/item", "peer", "react-aria-Button"],
        [],
      ),
      [],
    );
  });
});
