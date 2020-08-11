import { css } from "otion";
import React, { useRef } from "react";

import { Spacer } from "./Spacer";
import { useLogicalInlineCSSProperty } from "./useLogicalInlineCSSProperty";
import {
	CSSProperties,
	CSSPropertyAlignItems,
	CSSPropertyJustifyContent,
	prefixFlexAlignmentValue,
	withUnit,
} from "./utils";

export type ClusterProps = {
	as?: React.ElementType;
	childWrapper?: React.ElementType;
	alignX?: CSSPropertyJustifyContent;
	alignY?: CSSPropertyAlignItems;
	spacing?: CSSProperties["gap"];
	children?: React.ReactNode;
};

export function Cluster({
	as: Element = "div",
	childWrapper: ChildWrapper = "div",
	alignX,
	alignY,
	spacing,
	children,
}: ClusterProps): JSX.Element {
	const elementRef = useRef<HTMLElement>(null);
	const [marginInlineStartProperty] = useLogicalInlineCSSProperty(
		"margin",
		elementRef,
	);

	const spacingWithUnit = withUnit(spacing);
	const negativeSpacingWithUnit = spacingWithUnit && `-${spacingWithUnit}`;

	const wrapperClassName =
		css({
			marginTop: spacingWithUnit,
			[marginInlineStartProperty]: spacingWithUnit,
		}) || undefined;

	return (
		<Element
			ref={elementRef}
			className={css({
				display: "flex",
				flexWrap: "wrap",
				alignItems: prefixFlexAlignmentValue(alignY),
				justifyContent: prefixFlexAlignmentValue(alignX),
				marginTop: negativeSpacingWithUnit,
				[marginInlineStartProperty]: negativeSpacingWithUnit,
			})}
		>
			{React.Children.map(children, (child) =>
				React.isValidElement(child) && child.type === Spacer ? (
					child
				) : (
					<ChildWrapper className={wrapperClassName || undefined}>
						{child}
					</ChildWrapper>
				),
			)}
		</Element>
	);
}
