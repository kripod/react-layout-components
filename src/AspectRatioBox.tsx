import { css } from "otion";
import React from "react";

import { clearfix } from "./mixins";

export interface AspectRatioBoxProps {
	minRatio: number;
	children?: React.ReactNode;
}

export function AspectRatioBox({
	minRatio,
	children,
}: AspectRatioBoxProps): JSX.Element {
	return (
		<div
			// Source: https://keithjgrant.com/posts/2017/03/aspect-ratios/
			className={`${clearfix} ${css({
				"::before": {
					content: "''",
					float: "left",
					paddingTop: `${100 / minRatio}%`,
				},
			})}`}
		>
			{children}
		</div>
	);
}
