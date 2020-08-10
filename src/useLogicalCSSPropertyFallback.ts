import { useEffect, useState } from "react";

const sideOpposites = {
	top: "bottom",
	left: "right",
	right: "left",
	bottom: "top",
};

export type LogicalCSSPropertyFallbacks = {
	blockSize?: "width" | "height";
	inlineSize?: "width" | "height";
	blockStart?: keyof typeof sideOpposites;
	blockEnd?: keyof typeof sideOpposites;
	inlineStart?: keyof typeof sideOpposites;
	inlineEnd?: keyof typeof sideOpposites;
};

const hasNativeSupport =
	typeof CSS !== "undefined" /* Support IE 9+ and SSR */ &&
	CSS.supports /* Support SSR */ &&
	CSS.supports("margin-block-end", "0"); /* Covers "{block,inline}-size", too */

export function useLogicalCSSPropertyFallback(
	ref: React.RefObject<HTMLElement>,
): LogicalCSSPropertyFallbacks {
	// Avoid overhead when no fallback is required
	if (hasNativeSupport) return {};

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [state, setState] = useState({});

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const computedStyle = window.getComputedStyle(ref.current!);
		const isDirectionRTL = computedStyle.direction === "rtl";

		let blockStart: LogicalCSSPropertyFallbacks["blockStart"] = "top";
		let inlineStart: LogicalCSSPropertyFallbacks["inlineStart"] = isDirectionRTL
			? "bottom"
			: "top";
		let blockSize: LogicalCSSPropertyFallbacks["blockSize"] = "width";

		const writingMode = computedStyle.writingMode || ""; // Support Opera Mini
		const writingModeID =
			// Obsolete values are treated as in the spec:
			// https://www.w3.org/TR/css-writing-modes-4/#svg-writing-mode
			// eslint-disable-next-line no-nested-ternary
			writingMode.length > 2
				? writingMode.slice(-1)
				: writingMode[0] === "t"
				? "l"
				: "";

		if (writingModeID === "l" /* "vertical-rl" */) {
			blockStart = "right";
		} else if (writingModeID === "r" /* "vertical-lr" */) {
			blockStart = "left";
		} else {
			/* "horizontal-tb" */
			inlineStart = isDirectionRTL ? "right" : "left";
			blockSize = "height";
		}

		setState({
			blockStart,
			inlineStart,
			blockSize,
			inlineSize: blockSize[0] === "w" /* "width" */ ? "height" : "width",
			blockEnd: sideOpposites[blockStart],
			inlineEnd: sideOpposites[inlineStart],
		});
	}, [ref]);

	return state;
}
