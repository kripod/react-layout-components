import React from "react";

import { Cluster } from "./Cluster";
import { Spacer } from "./Spacer";

export default function App(): JSX.Element {
	return (
		<Cluster spacing="2em">
			<div>Logo</div>
			<Spacer />
			<div>Menu 1</div>
			<div>Menu 2</div>
		</Cluster>
	);
}
