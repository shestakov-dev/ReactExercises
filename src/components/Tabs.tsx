import {
	useState,
	Children,
	useRef,
	type ReactNode,
	type ReactElement,
	type KeyboardEvent,
} from "react";

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
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const tabs = Children.toArray(children) as ReactElement<TabProps>[];

	function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
		if (e.key === "ArrowRight") {
			e.preventDefault();

			const next = (index + 1) % tabs.length;

			setActive(next);

			tabRefs.current[next]?.focus();
			tabRefs.current[next]?.scrollIntoView({
				inline: "nearest",
				block: "nearest",
			});
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();

			const prev = (index - 1 + tabs.length) % tabs.length;

			setActive(prev);

			tabRefs.current[prev]?.focus();
			tabRefs.current[prev]?.scrollIntoView({
				inline: "nearest",
				block: "nearest",
			});
		} else if (e.key === "Home") {
			e.preventDefault();

			setActive(0);

			tabRefs.current[0]?.focus();
		} else if (e.key === "End") {
			e.preventDefault();

			const last = tabs.length - 1;

			setActive(last);

			tabRefs.current[last]?.focus();
		}
	}

	return (
		<div className="tabs">
			<div
				role="tablist"
				aria-label="Навигация по табове"
				className="tabs__list">
				{tabs.map((tab, index) => (
					<button
						key={index}
						ref={el => {
							tabRefs.current[index] = el;
						}}
						type="button"
						role="tab"
						id={`tab-${index}`}
						aria-selected={active === index}
						aria-controls={`tabpanel-${index}`}
						tabIndex={active === index ? 0 : -1}
						className="tabs__button"
						onClick={() => {
							setActive(index);

							tabRefs.current[index]?.scrollIntoView({
								inline: "nearest",
								block: "nearest",
							});
						}}
						onKeyDown={e => handleKeyDown(e, index)}>
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
					hidden={active !== index}
					className="tabs__panel">
					{tab.props.children}
				</div>
			))}
		</div>
	);
}
