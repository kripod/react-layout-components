import { css } from "otion";

// Source: https://css-tricks.com/snippets/css/clear-fix/
export const clearfix = css({
	"::after": {
		content: "''",
		display: "block",
		clear: "both",
	},
});

export const touchTarget = css({
	position: "relative",
	userSelect: "none",
	"::after": {
		content: "''",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%,-50%)",
		minWidth: 44,
		minHeight: 44,
		width: "100%",
		height: "100%",
	},
});
