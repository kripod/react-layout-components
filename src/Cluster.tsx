import { css } from "otion";
import * as React from "react";

import { CSSProperties } from "./utils";

export type ClusterProps = {
	as?: React.ElementType;
	childWrapper?: React.ElementType;
	spacing?: CSSProperties["gap"];
	children?: React.ReactNode;
};

export function Cluster({
	as: Element = "div",
	childWrapper: ChildWrapper = "div",
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
					margin: halfSpacingFallback && [
						`-${halfSpacingFallback}`,
						`calc(-${spacingWithUnit}/2)`,
					],
				})}
			>
				{React.Children.map(children, (child) => (
					<ChildWrapper className={spacerClassName}>{child}</ChildWrapper>
				))}
			</Element>
		</div>
	);
}
