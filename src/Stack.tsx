/* Inspired by: https://sid.st/unpolished/flex-gap-polyfill/ */

import * as CSS from "csstype";
import { css } from "otion";
import * as React from "react";
import { useRef } from "react";
import { Box, PolymorphicComponentProps } from "react-polymorphic-box";

import { useLogicalCSSPropertyFallback } from "./useLogicalCSSPropertyFallback";
import { PropsOf } from "./utils";

// eslint-disable-next-line @typescript-eslint/ban-types
type CSSProperties = CSS.Properties<(string & {}) | number>;
type CSSPropertyJustifyContent = Exclude<
	CSSProperties["justifyContent"],
	"flex-end" | "flex-start"
>;
type CSSPropertyAlignItems = Exclude<
	CSSProperties["alignItems"],
	"flex-end" | "flex-start"
>;

function prefixAlignmentValue(value: string | undefined): string | undefined {
	// Transform "end"/"start" into the more supported "flex-end"/"flex-start"
	return value === "end" || value === "start" ? `flex-${value}` : value;
}

// TODO: Consider deprecating "direction" in favor of the Cluster component
export type StackOwnProps = {
	childWrapper?: React.ElementType;
	spacing?: CSSProperties["gap"];
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

export type StackProps<E extends React.ElementType> = PolymorphicComponentProps<
	E,
	StackOwnProps
>;

const defaultElement = "div";

export function Stack<E extends React.ElementType = typeof defaultElement>({
	childWrapper: ChildWrapper = "div",
	direction = "column", // Encourage a mobile-first design by default
	alignInline,
	alignBlock,
	spacing,
	className,
	children,
	...restProps
}: StackProps<E>): JSX.Element {
	const outerEl = useRef<PropsOf<E>["ref"]>(null);

	const { blockStart, inlineStart } = useLogicalCSSPropertyFallback(outerEl);
	const marginBlockStartProperty = `margin${
		blockStart
			? blockStart[0].toUpperCase() + blockStart.slice(1)
			: "BlockStart"
	}`;
	const marginInlineStartProperty = `margin${
		inlineStart
			? inlineStart[0].toUpperCase() + inlineStart.slice(1)
			: "InlineStart"
	}`;

	const isDirectionColumn = direction[0] === "c"; // "column", "column-reverse"

	return (
		<Box
			ref={outerEl}
			as={defaultElement}
			className={
				(className ? `${className} ` : "") +
				css({
					display: "flex",
					flexDirection: direction,
					alignItems: prefixAlignmentValue(
						isDirectionColumn ? alignInline : alignBlock,
					),
					justifyContent: prefixAlignmentValue(
						isDirectionColumn ? alignBlock : alignInline,
					),
				})
			}
			{...restProps}
		>
			{React.Children.map(children, (child, index) => (
				<ChildWrapper
					className={
						(
							direction.slice(-1) === "e" /* "reverse" */
								? index < children.length - 1
								: /* 0 < */ index
						)
							? css(
									isDirectionColumn
										? { [marginBlockStartProperty]: spacing }
										: { [marginInlineStartProperty]: spacing },
							  )
							: undefined
					}
				>
					{child}
				</ChildWrapper>
			))}
		</Box>
	);
}
