import React from "react";

import { Cluster } from "./Cluster";
import { Spacer } from "./Spacer";
import { Stack } from "./Stack";

export default function App(): JSX.Element {
	return (
		<>
			<Stack spacing={8}>
				<div>a</div>
				<div>b</div>
				<div>c</div>
			</Stack>

			<Cluster spacing="2em">
				<div>Logo</div>
				<Spacer />
				<div>Menu 1</div>
				<div>Menu 2</div>
			</Cluster>
		</>
	);
}
