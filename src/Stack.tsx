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

export type StackProps = {
	as?: React.ElementType;
	childWrapper?: React.ElementType;
	alignInline?: CSSPropertyAlignItems;
	alignBlock?: CSSPropertyJustifyContent;
	spacing?: CSSProperties["gap"];
	reverse?: boolean;
	children?: React.ReactNode;
};

export function Stack({
	as: Element = "div",
	childWrapper: ChildWrapper = "div",
	alignInline,
	alignBlock,
	spacing,
	reverse,
	children,
}: StackProps): JSX.Element {
	const lastChildIndex = React.Children.count(children) - 1;

	const elementRef = useRef<HTMLElement>(null);
	const { blockStart } = useLogicalCSSPropertyFallback(elementRef);

	const wrapperClassName =
		// Empty string gets discarded
		css({ [`margin-${blockStart || "block-start"}`]: spacing }) || undefined;

	return (
		<Element
			ref={elementRef}
			className={css({
				display: "flex",
				flexDirection: "column",
				alignItems: prefixFlexAlignmentValue(alignInline),
				justifyContent: prefixFlexAlignmentValue(alignBlock),
				":only-child": {
					height: "100%",
				},
			})}
		>
			{React.Children.map(children, (child, index) => (
				<ChildWrapper
					className={
						index !== (reverse ? lastChildIndex : 0)
							? wrapperClassName
							: undefined
					}
				>
					{child}
				</ChildWrapper>
			))}
		</Element>
	);
}
