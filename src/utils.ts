import * as CSS from "csstype";

// eslint-disable-next-line @typescript-eslint/ban-types
export type CSSProperties = CSS.Properties<(string & {}) | number>;

export type CSSPropertyAlignItems = Exclude<
	CSSProperties["alignItems"],
	"flex-end" | "flex-start"
>;
export type CSSPropertyJustifyContent = Exclude<
	CSSProperties["justifyContent"],
	"flex-end" | "flex-start"
>;

export function prefixFlexAlignmentValue(
	value: string | undefined,
): string | undefined {
	// Transform "end"/"start" into the more supported "flex-end"/"flex-start"
	return value === "end" || value === "start" ? `flex-${value}` : value;
}
