import { useState } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useTextDirection(
	ref: React.RefObject<HTMLElement>,
): "ltr" | "rtl" | undefined {
	const [direction, setDirection] = useState<string>();

	useIsomorphicLayoutEffect(() => {
		const computedStyle = window.getComputedStyle(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			ref.current!,
		);
		setDirection(computedStyle.direction);
	}, [ref]);

	return direction as "ltr" | "rtl" | undefined;
}
