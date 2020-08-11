import { css } from "otion";
import React from "react";

export type PinBoardProps = {
	children?: React.ReactNode;
};

export function PinBoard({ children }: PinBoardProps): JSX.Element {
	return (
		<div className={css({ position: "relative", width: "100%" })}>
			{children}
		</div>
	);
}
