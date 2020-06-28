import { css } from "otion";
import * as React from "react";

export interface PositioningBoundaryProps {
	children?: React.ReactNode;
}

export function PositioningBoundary({
	children,
}: PositioningBoundaryProps): JSX.Element {
	return <div className={css({ position: "relative" })}>{children}</div>;
}
