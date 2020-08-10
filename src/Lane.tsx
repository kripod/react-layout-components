/* Inspired by: https://sid.st/unpolished/flex-gap-polyfill/ */

import { css } from "otion";
import React, { useRef } from "react";

import { useLogicalCSSPropertyFallback } from "./useLogicalCSSPropertyFallback";
import {
	CSSProperties,
	CSSPropertyAlignItems,
	CSSPropertyJustifyContent,
	prefixFlexAlignmentValue,
	withUnit,
} from "./utils";

export type LaneProps = {
	as?: React.ElementType;
	childWrapper?: React.ElementType;
	inlineFromWidth?: string | number;
	alignInline?: CSSPropertyJustifyContent;
	alignBlock?: CSSPropertyAlignItems;
	spacing?: CSSProperties["rowGap"];
	spacingInline?: CSSProperties["columnGap"];
	reverse?: boolean;
	children?: React.ReactNode;
};

export function Lane({
	as: Element = "div",
	childWrapper: ChildWrapper = "div",
	inlineFromWidth,
	alignInline,
	alignBlock,
	spacing,
	spacingInline = spacing,
	reverse,
	children,
}: LaneProps): JSX.Element {
	const elementRef = useRef<HTMLElement>(null);
	const { blockStart, inlineStart } = useLogicalCSSPropertyFallback(elementRef);
	const marginBlockStartProperty = `margin-${blockStart || "block-start"}`;
	const marginInlineStartProperty = `margin-${inlineStart || "inline-start"}`;

	const inlineFromWidthWithUnit = withUnit(inlineFromWidth);
	const spacingBlockWithUnit = withUnit(spacing);
	const spacingInlineWithUnit = withUnit(spacingInline);

	const wrapperClassName = css({
		display: "flex",
		justifyContent: prefixFlexAlignmentValue(alignInline),
		flexBasis: inlineFromWidthWithUnit
			? `calc(((${inlineFromWidthWithUnit}) - (100% - (${
					spacingInlineWithUnit || "0px"
			  })))*999)`
			: undefined,
		flexGrow: 1,
		[marginBlockStartProperty]: spacingBlockWithUnit,
		[marginInlineStartProperty]: spacingInlineWithUnit,
	});

	return (
		<Element
			ref={elementRef}
			className={css({
				display: "flex",
				flexDirection: reverse ? "row-reverse" : undefined,
				flexWrap: "wrap",
				alignItems: prefixFlexAlignmentValue(alignBlock),
				[marginBlockStartProperty]:
					spacingBlockWithUnit && `-${spacingBlockWithUnit}`,
				[marginInlineStartProperty]:
					spacingInlineWithUnit && `-${spacingInlineWithUnit}`,
			})}
		>
			{React.Children.map(children, (child) => (
				<ChildWrapper className={wrapperClassName}>{child}</ChildWrapper>
			))}
		</Element>
	);
}
