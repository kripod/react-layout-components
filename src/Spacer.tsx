import { css } from "otion";
import React from "react";

export type SpacerProps = {
	minSize?: string | number;
};

export function Spacer({ minSize }: SpacerProps): JSX.Element {
	return (
		<div
			className={css({ margin: "auto", minWidth: minSize, minHeight: minSize })}
		/>
	);
}
