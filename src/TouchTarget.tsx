import { css } from "otion";
import React from "react";

export interface TouchTargetProps {
	children?: React.ReactNode;
}

export function TouchTarget({ children }: TouchTargetProps): JSX.Element {
	return (
		<div
			className={css({
				position: "relative",
				userSelect: "none",
				"::after": {
					position: "absolute",
					content: "''",
					minWidth: 44,
					minHeight: 44,
					width: "100%",
					height: "100%",
					top: "50%",
					left: "50%",
					transform: "translate(-50%,-50%)",
				},
			})}
		>
			{children}
		</div>
	);
}
