import { css } from "otion";
import React, { useRef } from "react";

import { useLogicalInlineCSSProperty } from "./useLogicalInlineCSSProperty";

export type PinProps = {
	alignX: "center" | "start" | "end";
	alignY: "center" | "start" | "end";
	offset?: string | number;
	children?: React.ReactNode;
};

export function Pin({
	alignX,
	alignY,
	offset = 16 /* TODO: Replace with a design token */,
	children,
}: PinProps): JSX.Element {
	const elementRef = useRef<HTMLDivElement>(null);
	const [
		insetInlineStartProperty,
		insetInlineEndProperty,
	] = useLogicalInlineCSSProperty("inset", elementRef);

	const rules: { [key: string]: string | number } = { position: "absolute" };

	let translateX: string | number = 0;
	let translateY: string | number = 0;

	if (alignX === "start") {
		rules[insetInlineStartProperty] = offset;
	} else if (alignX === "end") {
		rules[insetInlineEndProperty] = offset;
	} else {
		rules.left = "50%";
		translateX = "-50%";
	}

	if (alignY === "start") {
		rules.top = offset;
	} else if (alignY === "end") {
		rules.bottom = offset;
	} else {
		rules.top = "50%";
		translateY = "-50%";
	}

	if (translateX || translateY) {
		rules.transform = `translate(${translateX},${translateY})`;
	}

	return (
		<div ref={elementRef} className={css(rules)}>
			{children}
		</div>
	);
}
