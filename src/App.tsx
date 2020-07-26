/* Source of example texts: https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode#Example */

import type { Property as CSSProperty } from "csstype";
import { css } from "otion";
import React from "react";

import { Cluster } from "./Cluster";
import { Frame } from "./Frame";
import { Icon } from "./Icon";
import { Lane } from "./Lane";
import { Spacer } from "./Spacer";
import { Stack } from "./Stack";

const crossSVG = (
	<svg
		viewBox="0 0 10 10"
		stroke="currentColor"
		strokeWidth={2}
		focusable={false}
	>
		<path d="M1,1 9,9 M9,1 1,9" />
	</svg>
);

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
					<div>Example text 1</div>
					<Spacer />
					<div>Example text 2</div>
					<div>Example text 3</div>
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
					<div>Example text 1</div>
					<div>Example text 2</div>
					<div>Example text 3</div>
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

			<h2>Lane</h2>

			<h3>Horizontal (LTR) script</h3>
			<div className={css({ writingMode: "horizontal-tb" })}>
				<Lane inlineFromWidth={600} alignBlock="center" spacing="1em">
					<>
						Example text 1<br />
						Example text 2
					</>
					<Spacer minSize={20} />
					<>Example text 3</>
					<>Example text 4</>
				</Lane>
			</div>

			<h3>Horizontal (RTL) script</h3>
			<div className={css({ writingMode: "horizontal-tb", direction: "rtl" })}>
				<Lane inlineFromWidth={600} alignBlock="center" spacing="1em">
					<>
						מלל ארוך לדוגמא
						<br />
						מלל ארוך לדוגמא
					</>
					<Spacer minSize={20} />
					<>מלל ארוך לדוגמא</>
					<>מלל ארוך לדוגמא</>
				</Lane>
			</div>

			<h2>Icon</h2>

			<h3>Horizontal (LTR) script</h3>
			<div className={css({ writingMode: "horizontal-tb" })}>
				<div>
					<Icon label="Close dialog" hideLabel>
						{crossSVG}
					</Icon>
				</div>
				<div>
					<Icon label="Close dialog">{crossSVG}</Icon>
				</div>
				<div>
					<Icon label="Close dialog" alignLabel="before">
						{crossSVG}
					</Icon>
				</div>
			</div>

			<h3>Horizontal (RTL) script</h3>
			<div className={css({ writingMode: "horizontal-tb", direction: "rtl" })}>
				<div>
					<Icon label="Close dialog" hideLabel>
						{crossSVG}
					</Icon>
				</div>
				<div>
					<Icon label="Close dialog">{crossSVG}</Icon>
				</div>
				<div>
					<Icon label="Close dialog" alignLabel="before">
						{crossSVG}
					</Icon>
				</div>
			</div>

			<h2>Frame</h2>

			<Lane inlineFromWidth={600} alignBlock="start">
				<Frame aspectRatio={16 / 9} objectPosition="top">
					<img
						src="https://via.placeholder.com/100x100"
						alt="Placeholder for 100×100 pixels"
					/>
				</Frame>
				<Frame aspectRatio={21 / 9}>
					<div>Hello, world!</div>
				</Frame>
				<Frame aspectRatio={16 / 9}>
					<iframe
						title="Video of Rick Astley's Never Gonna Give You Up"
						width={560}
						height={315}
						src="https://www.youtube.com/embed/dQw4w9WgXcQ"
						frameBorder={0}
						allowFullScreen
					/>
				</Frame>
			</Lane>
		</div>
	);
}
