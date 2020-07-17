import { css } from "otion";

export const positioningBoundary = css({ position: "relative" });

export const touchTarget = `${positioningBoundary} ${css({
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
})}`;
