import { css } from "otion";
import React from "react";

import { Spacer } from "./Spacer";
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
	const spacingWithUnit =
		typeof spacing === "number" ? `${spacing}px` : spacing;
	const halfSpacingFallback =
		spacingWithUnit &&
		spacingWithUnit.replace(/\d+/, (match) => `${+match / 2}`);

	const spacerClassName =
		halfSpacingFallback &&
		css({ margin: [halfSpacingFallback, `calc(${spacingWithUnit}/2)`] });

	return (
		<div className={css({ overflow: "hidden" })}>
			<Element
				className={css({
					display: "flex",
					flexWrap: "wrap",
					alignItems: prefixFlexAlignmentValue(alignBlock),
					justifyContent: prefixFlexAlignmentValue(alignInline),
					margin: halfSpacingFallback && [
						`-${halfSpacingFallback}`,
						`calc(-${spacingWithUnit}/2)`,
					],
				})}
			>
				{React.Children.map(children, (child) =>
					React.isValidElement(child) && child.type === Spacer ? (
						child
					) : (
						<ChildWrapper className={spacerClassName}>{child}</ChildWrapper>
					),
				)}
			</Element>
		</div>
	);
}
