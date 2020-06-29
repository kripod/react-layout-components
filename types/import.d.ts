// ESM-HMR Interface: `import.meta.hot`

interface ImportMeta {
	// TODO: Import the exact .d.ts files from "esm-hmr"
	// https://github.com/pikapkg/esm-hmr
	/* eslint-disable @typescript-eslint/no-explicit-any */
	hot: any;
	env: Record<string, any>;
	/* eslint-enable @typescript-eslint/no-explicit-any */
}
