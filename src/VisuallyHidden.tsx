import { css } from "otion";
import React from "react";

export interface VisuallyHiddenProps {
	children?: React.ReactNode;
}

export function VisuallyHidden({ children }: VisuallyHiddenProps): JSX.Element {
	return (
		<span
			className={css({
				/* Source: https://www.a11yproject.com/posts/2013-01-11-how-to-hide-content/ */
				position: "absolute",
				overflow: "hidden",
				width: 1,
				height: 1,
				margin: -1, // Fixes: twbs/bootstrap#25686
				clip: "rect(0 0 0 0)",
				// clipPath: "inset(50%)", // Slow, see: styled-components/polished#454
				whiteSpace: "nowrap",
			})}
		>
			{children}
		</span>
	);
}
