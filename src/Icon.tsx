import { css } from "otion";
import React, { useRef } from "react";

import { useLogicalCSSPropertyFallback } from "./useLogicalCSSPropertyFallback";

export interface IconProps {
	label: string;
	alignLabel?: "before" | "after" | "collapse";
	children?: React.ReactNode;
}

export function Icon({ label, alignLabel, children }: IconProps): JSX.Element {
	return (
		<div
			className={css({
				display: "inline-flex",
				flexDirection: alignLabel === "before" ? "row-reverse" : undefined,
				alignItems: "baseline",
			})}
		>
			<div
				className={css({
					width: [
						".75em" /* TODO: Replace with font-specific cap height ratio */,
						"1cap",
					],
				})}
			>
				{children}
			</div>
			<div className={css({ margin: ".25em" })} />
			{label}
		</div>
	);
}
