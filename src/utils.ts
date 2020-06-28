import * as CSS from "csstype";

// eslint-disable-next-line @typescript-eslint/ban-types
export type CSSProperties = CSS.Properties<(string & {}) | number>;
