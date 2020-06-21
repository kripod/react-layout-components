import { useEffect, useState } from "react";

const sideOpposites = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left",
};

export type LogicalCSSPropertyFallbacks = {
	blockSize?: "width" | "height";
	inlineSize?: "width" | "height";
	blockStart?: keyof typeof sideOpposites;
	blockEnd?: keyof typeof sideOpposites;
	inlineStart?: keyof typeof sideOpposites;
	inlineEnd?: keyof typeof sideOpposites;
};

export function useLogicalCSSPropertyFallback(
	ref: React.RefObject<HTMLElement>,
): LogicalCSSPropertyFallbacks {
	const [state, setState] = useState({});

	useEffect(() => {
		if (
			typeof CSS !== "undefined" && // Support IE 9+
			CSS.supports("margin-block-end", "0") // Covers "{block,inline}-size", too
		) {
			// Avoid rerendering when no fallback is required
			return;
		}

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const computedStyle = window.getComputedStyle(ref.current!);
		const isDirectionRTL = computedStyle.direction === "rtl";

		let inlineStart: LogicalCSSPropertyFallbacks["inlineStart"] = isDirectionRTL
			? "bottom"
			: "top";
		let blockStart: LogicalCSSPropertyFallbacks["blockStart"] = "top";
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
			blockSize = "height";
			inlineStart = isDirectionRTL ? "right" : "left";
		}

		setState({
			blockSize,
			inlineSize: blockSize === "width" ? "height" : "width",
			blockStart,
			blockEnd: sideOpposites[blockStart],
			inlineStart,
			inlineEnd: sideOpposites[inlineStart],
		});
	}, [ref]);

	return state;
}
