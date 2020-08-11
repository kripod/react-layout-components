import type { PropertiesHyphen } from "csstype";

import { useTextDirection } from "./useTextDirection";
import { supportsProperty } from "./utils";

export function useLogicalInlineCSSProperty(
	propertyGroup: "inset" | "margin" | "border" | "padding",
	ref: React.RefObject<HTMLElement>,
): readonly [keyof PropertiesHyphen, keyof PropertiesHyphen] {
	const startProperty = `${propertyGroup}-inline-start` as keyof PropertiesHyphen;
	const endProperty = `${propertyGroup}-inline-end` as keyof PropertiesHyphen;

	if (supportsProperty(endProperty)) return [startProperty, endProperty];

	let leftProperty: keyof PropertiesHyphen = "left";
	let rightProperty: keyof PropertiesHyphen = "right";
	if (propertyGroup !== "inset") {
		leftProperty = `${propertyGroup}-${leftProperty}` as keyof PropertiesHyphen;
		rightProperty = `${propertyGroup}-${rightProperty}` as keyof PropertiesHyphen;
	}
	return (
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useTextDirection(ref) === "rtl"
			? [rightProperty, leftProperty]
			: [leftProperty, rightProperty]
	);
}
