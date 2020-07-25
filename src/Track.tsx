/* Inspired by: https://sid.st/unpolished/flex-gap-polyfill/ */

import { css } from "otion";
import React, { useRef } from "react";

import { Spacer } from "./Spacer";
import { useLogicalCSSPropertyFallback } from "./useLogicalCSSPropertyFallback";
import {
	CSSProperties,
	CSSPropertyJustifyContent,
	prefixFlexAlignmentValue,
} from "./utils";

export type TrackProps = {
	as?: React.ElementType;
	childWrapper?: React.ElementType;
	inlineFromWidth?: string | number;
	alignBlock?: CSSPropertyJustifyContent;
	spacing?: CSSProperties["gap"];
	reverse?: boolean;
	children?: React.ReactNode;
};

export function Track({
	as: Element = "div",
	childWrapper: ChildWrapper = "div",
	inlineFromWidth,
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
	const wrapperClassName =
		// Empty string gets discarded
		css({
			display: "flex",
			justifyContent: "center",
			flexBasis: inlineFromWidthWithUnit
				? `calc(((${inlineFromWidthWithUnit}) - (100% - (${
						+(spacing || 0) === 0 ? "0px" : spacing
				  })))*999)`
				: undefined,
			flexGrow: 1,
			[marginBlockStartProperty]: spacing,
			[marginInlineStartProperty]: spacing,
		}) || undefined;

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
			{React.Children.map(children, (child) =>
				React.isValidElement(child) && child.type === Spacer ? (
					child
				) : (
					<ChildWrapper className={wrapperClassName}>{child}</ChildWrapper>
				),
			)}
		</Element>
	);
}
