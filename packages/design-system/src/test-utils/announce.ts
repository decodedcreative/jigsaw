import { computeAccessibleName, getRole } from "dom-accessibility-api";

/**
 * The phrase a screen reader announces for an element, e.g.
 * "button, Continue, disabled" (JSW-128).
 *
 * Built from the computed role, accessible name and the ARIA / HTML states that
 * screen readers read out. The wording of states is neutral rather than any one
 * screen reader's (VoiceOver says "dimmed", NVDA "unavailable"), so the test
 * pins down the semantics, not a vendor's vocabulary.
 */
export function announce(element: Element): string {
  const role = getRole(element) ?? element.tagName.toLowerCase();
  // Screen readers say aria-roledescription in place of the role, e.g. React
  // Aria's NumberField input is announced as "Number field", not "textbox".
  const roleWord = element.getAttribute("aria-roledescription") || role;
  const name = computeAccessibleName(element).trim();
  return [roleWord, name, ...states(element, role)].filter(Boolean).join(", ");
}

function attr(element: Element, name: string): string | null {
  return element.getAttribute(name);
}

function states(element: Element, role: string): string[] {
  const out: string[] = [];
  const input = element instanceof HTMLInputElement ? element : null;

  // Checked state for checkboxes, radios and switches.
  if (["checkbox", "radio", "switch", "menuitemcheckbox", "menuitemradio"].includes(role)) {
    const ariaChecked = attr(element, "aria-checked");
    if (ariaChecked === "mixed" || input?.indeterminate) out.push("mixed");
    else if (ariaChecked === "true" || input?.checked) out.push("checked");
    else out.push("not checked");
  }

  const pressed = attr(element, "aria-pressed");
  if (pressed === "true") out.push("pressed");
  else if (pressed === "false") out.push("not pressed");

  const popup = attr(element, "aria-haspopup");
  if (popup && popup !== "false") out.push(popup === "true" ? "has popup" : `has popup ${popup}`);

  const expanded = attr(element, "aria-expanded");
  if (expanded === "true") out.push("expanded");
  else if (expanded === "false") out.push("collapsed");

  if (attr(element, "aria-selected") === "true") out.push("selected");

  const current = attr(element, "aria-current");
  if (current && current !== "false") out.push(current === "true" ? "current" : `current ${current}`);

  if (attr(element, "aria-required") === "true" || (element as HTMLInputElement).required) out.push("required");
  if (attr(element, "aria-readonly") === "true" || (element as HTMLInputElement).readOnly) out.push("read only");
  if (attr(element, "aria-invalid") === "true") out.push("invalid");
  if (attr(element, "aria-disabled") === "true" || (element as HTMLButtonElement).disabled) out.push("disabled");

  return out;
}
