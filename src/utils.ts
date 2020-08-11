import type { Globals, Properties } from "csstype";

// eslint-disable-next-line @typescript-eslint/ban-types
export type CSSProperties = Properties<(string & {}) | number>;

export type CSSPropertyAlignItems = Exclude<
	CSSProperties["alignItems"],
	Globals | "normal" | "flex-end" | "flex-start"
>;
export type CSSPropertyJustifyContent = Exclude<
	CSSProperties["justifyContent"],
	Globals | "normal" | "flex-end" | "flex-start" | "left" | "right"
>;

export function prefixFlexAlignmentValue(
	value: string | undefined,
): string | undefined {
	// Transform "end"/"start" into the more supported "flex-end"/"flex-start"
	return value === "end" || value === "start" ? `flex-${value}` : value;
}

export function supportsProperty(property: string): boolean {
	return (
		typeof CSS !== "undefined" /* Support IE 9+ */ &&
		CSS.supports /* Support SSR */ &&
		CSS.supports(property, "inherit")
	);
}

export function withUnit(
	value: string | number | undefined,
): string | undefined {
	return typeof value === "number" ? `${value}px` : value;
}
