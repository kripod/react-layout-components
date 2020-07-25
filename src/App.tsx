/* Source of example texts: https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode#Example */

import type { Property as CSSProperty } from "csstype";
import { css } from "otion";
import React from "react";

import { Cluster } from "./Cluster";
import { Icon } from "./Icon";
import { Spacer } from "./Spacer";
import { Stack } from "./Stack";

export default function App(): JSX.Element {
	return (
		<div className={css({ overflowX: "hidden" })}>
			<h1>React Layout Components</h1>
			<p>
				Experimentation and examples for cross-browser layout component testing.
				The project is primarily inspired by{" "}
				<a href="https://every-layout.dev/">Every Layout</a>.
			</p>

			<h2>Cluster</h2>

			<h3>Horizontal (LTR) script</h3>
			<div className={css({ writingMode: "horizontal-tb" })}>
				<Cluster spacing="2em">
					<div>Example text</div>
					<Spacer />
					<div>Example text</div>
					<div>Example text</div>
				</Cluster>
			</div>

			<h3>Horizontal (RTL) script</h3>
			<div className={css({ writingMode: "horizontal-tb", direction: "rtl" })}>
				<Cluster spacing="2em">
					<div>מלל ארוך לדוגמא</div>
					<Spacer />
					<div>מלל ארוך לדוגמא</div>
					<div>מלל ארוך לדוגמא</div>
				</Cluster>
			</div>

			<h3>Vertical script</h3>
			<div
				className={css({
					writingMode: ["tb-rl" as CSSProperty.WritingMode, "vertical-rl"],
				})}
			>
				<Cluster spacing="2em">
					<div>我家没有电脑。</div>
					<Spacer />
					<div>我家没有电脑。</div>
					<div>我家没有电脑。</div>
				</Cluster>
			</div>

			<h2>Stack</h2>

			<h3>Horizontal (LTR) script</h3>
			<div className={css({ writingMode: "horizontal-tb" })}>
				<Stack alignInline="start" spacing="1em">
					<div>Example text</div>
					<div>Example text</div>
					<div>Example text</div>
				</Stack>
			</div>

			<h3>Horizontal (RTL) script</h3>
			<div className={css({ writingMode: "horizontal-tb", direction: "rtl" })}>
				<Stack alignInline="start" spacing="1em">
					<div>מלל ארוך לדוגמא</div>
					<div>מלל ארוך לדוגמא</div>
					<div>מלל ארוך לדוגמא</div>
				</Stack>
			</div>

			<h2>Icon</h2>

			<h3>Horizontal (LTR) script</h3>
			<div className={css({ writingMode: "horizontal-tb" })}>
				<div>
					<Icon label="Close symbol">
						<svg viewBox="0 0 10 10" stroke="currentColor" strokeWidth="2">
							<path d="M1,1 9,9 M9,1 1,9" />
						</svg>
					</Icon>
				</div>
				<Icon label="Close symbol" alignLabel="before">
					<svg viewBox="0 0 10 10" stroke="currentColor" strokeWidth="2">
						<path d="M1,1 9,9 M9,1 1,9" />
					</svg>
				</Icon>
			</div>

			<h3>Horizontal (RTL) script</h3>
			<div className={css({ writingMode: "horizontal-tb", direction: "rtl" })}>
				<div>
					<Icon label="Close symbol">
						<svg viewBox="0 0 10 10" stroke="currentColor" strokeWidth="2">
							<path d="M1,1 9,9 M9,1 1,9" />
						</svg>
					</Icon>
				</div>
				<div>
					<Icon label="Close" alignLabel="before">
						<svg viewBox="0 0 10 10" stroke="currentColor" strokeWidth="2">
							<path d="M1,1 9,9 M9,1 1,9" />
						</svg>
					</Icon>
				</div>
			</div>
		</div>
	);
}
