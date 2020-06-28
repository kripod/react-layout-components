/* Inspired by: https://sid.st/unpolished/flex-gap-polyfill/ */

import { css } from "otion";
import * as React from "react";
import { useRef } from "react";

import { useLogicalCSSPropertyFallback } from "./useLogicalCSSPropertyFallback";
import { CSSProperties } from "./utils";

type CSSPropertyAlignItems = Exclude<
	CSSProperties["alignItems"],
	"flex-end" | "flex-start"
>;
type CSSPropertyJustifyContent = Exclude<
	CSSProperties["justifyContent"],
	"flex-end" | "flex-start"
>;

// TODO: Consider deprecating "direction" in favor of the Cluster component
export type StackProps = {
	as?: React.ElementType;
	childWrapper?: React.ElementType;
	spacing?: CSSProperties["gap"];
	children?: React.ReactNode;
} & (
	| {
			direction?: "column" | "column-reverse";
			alignInline?: CSSPropertyAlignItems;
			alignBlock?: CSSPropertyJustifyContent;
	  }
	| {
			direction: "row" | "row-reverse";
			alignInline?: CSSPropertyJustifyContent;
			alignBlock?: CSSPropertyAlignItems;
	  }
);

function prefixAlignmentValue(value: string | undefined): string | undefined {
	// Transform "end"/"start" into the more supported "flex-end"/"flex-start"
	return value === "end" || value === "start" ? `flex-${value}` : value;
}

export function Stack({
	as: Element = "div",
	childWrapper: ChildWrapper = "div",
	direction = "column", // Encourage a mobile-first design by default
	alignInline,
	alignBlock,
	spacing,
	children,
}: StackProps): JSX.Element {
	const lastChildIndex = React.Children.count(children) - 1;
	const isDirectionColumn = direction[0] === "c";
	const isDirectionReverse = direction.slice(-1) === "e";

	const elementRef = useRef<HTMLElement>(null);
	const { blockStart, inlineStart } = useLogicalCSSPropertyFallback(elementRef);
	const spacerClassName = css({
		[`margin-${
			isDirectionColumn
				? blockStart || "block-start"
				: inlineStart || "inline-start"
		}`]: spacing,
	});

	return (
		<Element
			ref={elementRef}
			className={css({
				display: "flex",
				flexDirection: direction,
				alignItems: prefixAlignmentValue(
					isDirectionColumn ? alignInline : alignBlock,
				),
				justifyContent: prefixAlignmentValue(
					isDirectionColumn ? alignBlock : alignInline,
				),
			})}
		>
			{React.Children.map(children, (child, index) => (
				<ChildWrapper
					className={
						index !== (isDirectionReverse ? lastChildIndex : 0)
							? spacerClassName
							: undefined
					}
				>
					{child}
				</ChildWrapper>
			))}
		</Element>
	);
}
