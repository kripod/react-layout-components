export const isBrowser = typeof window !== "undefined";
export const isIE = isBrowser && window.navigator.msPointerEnabled;
