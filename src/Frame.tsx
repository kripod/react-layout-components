import { css } from "otion";
import React from "react";

import type { CSSProperties } from "./utils";

export interface FrameProps {
	aspectRatio: number;
	objectPosition?: CSSProperties["objectPosition"];
	children?: React.ReactElement;
}

export function Frame({
	aspectRatio,
	objectPosition,
	children,
}: FrameProps): JSX.Element {
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
						objectPosition,
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
