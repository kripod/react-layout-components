import { useEffect, useLayoutEffect } from "react";

import { IS_BROWSER } from "./env";

export const useIsomorphicLayoutEffect = IS_BROWSER
	? useLayoutEffect
	: useEffect;
