import { isIE } from "./env";

/* Make SVGs unfocusable by default in IE10+ */
if (isIE) {
	const svgElements = document.getElementsByTagName("svg");
	let i = svgElements.length;
	while (i--) {
		if (!svgElements[i].hasAttribute("focusable")) {
			svgElements[i].setAttribute("focusable", "false");
		}
	}
}
