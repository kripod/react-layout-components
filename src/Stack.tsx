import { css } from "otion";
import React from "react";

import { Spacer } from "./Spacer";
import {
	CSSProperties,
	CSSPropertyAlignItems,
	CSSPropertyJustifyContent,
	prefixFlexAlignmentValue,
} from "./utils";

export type StackProps = {
	as?: React.ElementType;
	childWrapper?: React.ElementType;
	alignX?: CSSPropertyAlignItems;
	alignY?: CSSPropertyJustifyContent;
	spacing?: CSSProperties["gap"];
	reverse?: boolean;
	children?: React.ReactNode;
};

export function Stack({
	as: Element = "div",
	childWrapper: ChildWrapper = "div",
	alignX,
	alignY,
	spacing,
	reverse,
	children,
}: StackProps): JSX.Element {
	const nonSpacedChildIndex = reverse ? React.Children.count(children) - 1 : 0;
	const wrapperClassName = css({ marginTop: spacing }) || undefined;

	return (
		<Element
			className={css({
				display: "flex",
				flexDirection: `column${reverse ? "-reverse" : ""}` as
					| "column"
					| "column-reverse",
				alignItems: prefixFlexAlignmentValue(alignX),
				justifyContent: prefixFlexAlignmentValue(alignY),
				":only-child": {
					height: "100%",
				},
			})}
		>
			{React.Children.map(children, (child, index) =>
				React.isValidElement(child) && child.type === Spacer ? (
					child
				) : (
					<ChildWrapper
						className={
							index !== nonSpacedChildIndex ? wrapperClassName : undefined
						}
					>
						{child}
					</ChildWrapper>
				),
			)}
		</Element>
	);
}
