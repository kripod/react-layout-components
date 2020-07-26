import { css } from "otion";
import React from "react";

export interface FrameProps {
	aspectRatio: number;
	children?: React.ReactElement;
}

export function Frame({ aspectRatio, children }: FrameProps): JSX.Element {
	return (
		<div
			// Source: https://css-tricks.com/aspect-ratio-boxes/
			className={css({
				position: "relative",
				width: "100%",
				paddingTop: `${100 / aspectRatio}%`,
				selectors: {
					"&>*": {
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						objectFit: "cover",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					},
				},
			})}
		>
			{children}
		</div>
	);
}
