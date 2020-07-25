import { css } from "otion";
import React from "react";

import { Spacer } from "./Spacer";
import { VisuallyHidden } from "./VisuallyHidden";

export interface IconProps {
	label: string;
	alignLabel?: "before" | "after";
	hideLabel?: boolean;
	children?: React.ReactNode;
}

export function Icon({
	label,
	alignLabel,
	hideLabel,
	children,
}: IconProps): JSX.Element {
	return (
		<div
			className={css({
				display: "inline-flex",
				flexDirection: alignLabel === "before" ? "row-reverse" : undefined,
				alignItems: "baseline",
			})}
		>
			<div
				aria-hidden
				className={css({
					width: [
						".75em" /* TODO: Replace with font-specific cap height ratio */,
						"1cap",
					],
				})}
			>
				{children}
			</div>

			{hideLabel ? (
				<VisuallyHidden>{label}</VisuallyHidden>
			) : (
				<>
					<Spacer minSize=".5em" />
					{label}
				</>
			)}
		</div>
	);
}
