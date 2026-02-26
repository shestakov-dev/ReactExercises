import { useState, Children, type ReactNode } from "react";
import "./Tabs.css";

export interface TabProps {
	label: string;
	children: ReactNode;
}

export function Tab(_props: TabProps) {
	return null;
}

export function Tabs({ children }: { children: ReactNode }) {
	const [active, setActive] = useState(0);

	const tabs = Children.toArray(children) as React.ReactElement<TabProps>[];

	return (
		<div className="tabs">
			<div
				role="tablist"
				aria-label="Навигация по табове"
				className="tabs__list">
				{tabs.map((tab, index) => (
					<button
						key={index}
						type="button"
						role="tab"
						id={`tab-${index}`}
						aria-selected={active === index}
						aria-controls={`tabpanel-${index}`}
						tabIndex={active === index ? 0 : -1}
						className="tabs__btn"
						onClick={() => setActive(index)}
						onKeyDown={e => {
							if (e.key === "ArrowRight") {
								setActive((active + 1) % tabs.length);
							} else if (e.key === "ArrowLeft") {
								setActive((active - 1 + tabs.length) % tabs.length);
							}
						}}>
						{tab.props.label}
					</button>
				))}
			</div>

			{tabs.map((tab, index) => (
				<div
					key={index}
					role="tabpanel"
					id={`tabpanel-${index}`}
					aria-labelledby={`tab-${index}`}
					tabIndex={0}
					hidden={active !== index}
					className="tabs__panel">
					{tab.props.children}
				</div>
			))}
		</div>
	);
}
