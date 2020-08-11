import { css } from "otion";
import React, { useRef } from "react";

import { useLogicalInlineCSSProperty } from "./useLogicalInlineCSSProperty";
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
	alignX?: CSSPropertyJustifyContent;
	alignY?: CSSPropertyAlignItems;
	spacing?: CSSProperties["rowGap"];
	spacingInline?: CSSProperties["columnGap"];
	reverse?: boolean;
	children?: React.ReactNode;
};

export function Lane({
	as: Element = "div",
	childWrapper: ChildWrapper = "div",
	inlineFromWidth,
	alignX,
	alignY,
	spacing,
	spacingInline = spacing,
	reverse,
	children,
}: LaneProps): JSX.Element {
	const elementRef = useRef<HTMLElement>(null);
	const [marginInlineStartProperty] = useLogicalInlineCSSProperty(
		"margin",
		elementRef,
	);

	const inlineFromWidthWithUnit = withUnit(inlineFromWidth);
	const spacingBlockWithUnit = withUnit(spacing);
	const spacingInlineWithUnit = withUnit(spacingInline);

	const wrapperClassName = css({
		display: "flex",
		justifyContent: prefixFlexAlignmentValue(alignX),
		flexBasis: inlineFromWidthWithUnit
			? `calc(((${inlineFromWidthWithUnit}) - (100% - (${
					spacingInlineWithUnit || "0px"
			  })))*999)`
			: undefined,
		flexGrow: 1,
		marginTop: spacingBlockWithUnit,
		[marginInlineStartProperty]: spacingInlineWithUnit,
	});

	return (
		<Element
			ref={elementRef}
			className={css({
				display: "flex",
				flexDirection: reverse ? "row-reverse" : undefined,
				flexWrap: "wrap",
				alignItems: prefixFlexAlignmentValue(alignY),
				marginTop: spacingBlockWithUnit && `-${spacingBlockWithUnit}`,
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
