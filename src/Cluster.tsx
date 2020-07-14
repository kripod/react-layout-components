import { css } from "otion";
import React, { useRef } from "react";

import { Spacer } from "./Spacer";
import { useLogicalCSSPropertyFallback } from "./useLogicalCSSPropertyFallback";
import {
	CSSProperties,
	CSSPropertyAlignItems,
	CSSPropertyJustifyContent,
	prefixFlexAlignmentValue,
} from "./utils";

export type ClusterProps = {
	as?: React.ElementType;
	childWrapper?: React.ElementType;
	alignInline?: CSSPropertyJustifyContent;
	alignBlock?: CSSPropertyAlignItems;
	spacing?: CSSProperties["gap"];
	children?: React.ReactNode;
};

export function Cluster({
	as: Element = "div",
	childWrapper: ChildWrapper = "div",
	alignInline,
	alignBlock,
	spacing,
	children,
}: ClusterProps): JSX.Element {
	const elementRef = useRef<HTMLElement>(null);
	const { blockStart, inlineStart } = useLogicalCSSPropertyFallback(elementRef);
	const marginBlockStartProperty = `margin-${blockStart || "block-start"}`;
	const marginInlineStartProperty = `margin-${inlineStart || "inline-start"}`;

	const wrapperClassName =
		// Empty string gets discarded
		css({
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
				flexWrap: "wrap",
				alignItems: prefixFlexAlignmentValue(alignBlock),
				justifyContent: prefixFlexAlignmentValue(alignInline),
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
