/* Inspired by: https://sid.st/unpolished/flex-gap-polyfill/ */

import { css } from "otion";
import React, { useRef } from "react";

import { useLogicalCSSPropertyFallback } from "./useLogicalCSSPropertyFallback";
import {
	CSSProperties,
	CSSPropertyAlignItems,
	CSSPropertyJustifyContent,
	prefixFlexAlignmentValue,
} from "./utils";

export type TrackProps = {
	as?: React.ElementType;
	childWrapper?: React.ElementType;
	inlineFromWidth?: string | number;
	alignInline?: CSSPropertyJustifyContent;
	alignBlock?: CSSPropertyAlignItems;
	spacing?: CSSProperties["gap"];
	reverse?: boolean;
	children?: React.ReactNode;
};

export function Track({
	as: Element = "div",
	childWrapper: ChildWrapper = "div",
	inlineFromWidth,
	alignInline,
	alignBlock,
	spacing,
	reverse,
	children,
}: TrackProps): JSX.Element {
	const elementRef = useRef<HTMLElement>(null);
	const { blockStart, inlineStart } = useLogicalCSSPropertyFallback(elementRef);
	const marginBlockStartProperty = `margin-${blockStart || "block-start"}`;
	const marginInlineStartProperty = `margin-${inlineStart || "inline-start"}`;

	const inlineFromWidthWithUnit =
		typeof inlineFromWidth === "number"
			? `${inlineFromWidth}px`
			: inlineFromWidth;
	const wrapperClassName = css({
		display: "flex",
		justifyContent: prefixFlexAlignmentValue(alignInline),
		flexBasis: inlineFromWidthWithUnit
			? `calc(((${inlineFromWidthWithUnit}) - (100% - (${
					+(spacing || 0) === 0 ? "0px" : spacing
			  })))*999)`
			: undefined,
		flexGrow: 1,
		[marginBlockStartProperty]: spacing,
		[marginInlineStartProperty]: spacing,
	});

	const negativeSpacing =
		typeof spacing === "number"
			? -spacing
			: // Handles `undefined` with short-circuiting
			  spacing && `-${spacing}`;

	return (
		<Element
			ref={elementRef}
			className={css({
				display: "flex",
				flexDirection: reverse ? "row-reverse" : undefined,
				flexWrap: "wrap",
				alignItems: prefixFlexAlignmentValue(alignBlock),
				[marginBlockStartProperty]: negativeSpacing,
				[marginInlineStartProperty]: negativeSpacing,
			})}
		>
			{React.Children.map(children, (child) => (
				<ChildWrapper className={wrapperClassName}>{child}</ChildWrapper>
			))}
		</Element>
	);
}
