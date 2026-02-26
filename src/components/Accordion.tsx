import { useState, Children, type ReactNode, type ReactElement } from "react";
import "./Accordion.css";

export interface AccordionItemProps {
	title: string;
	children: ReactNode;

	isOpen?: boolean;
	onToggle?: () => void;
	itemId?: string;
}

export function AccordionItem({
	title,
	children,

	isOpen = false,
	onToggle,
	itemId = "item",
}: AccordionItemProps) {
	const buttonId = `${itemId}-btn`;
	const bodyId = `${itemId}-body`;

	return (
		<div className="accordion-item">
			<h3 className="accordion-item__heading">
				<button
					id={buttonId}
					type="button"
					className="accordion-item__btn"
					aria-expanded={isOpen}
					aria-controls={bodyId}
					onClick={onToggle}>
					{title}
					<svg
						className="accordion-item__icon"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true">
						<path d="M6 9l6 6 6-6" />
					</svg>
				</button>
			</h3>
			<div
				id={bodyId}
				role="region"
				aria-labelledby={buttonId}
				hidden={!isOpen}>
				<div className="accordion-item__body">{children}</div>
			</div>
		</div>
	);
}

export function Accordion({ children }: { children: ReactNode }) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const items = Children.toArray(children) as ReactElement<AccordionItemProps>[];

	return (
		<div className="accordion">
			{items.map((item, index) => (
				<AccordionItem
					key={index}
					{...item.props}
					itemId={`accordion-${index}`}
					isOpen={openIndex === index}
					onToggle={() => setOpenIndex(openIndex === index ? null : index)}
				/>
			))}
		</div>
	);
}
