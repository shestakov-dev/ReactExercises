interface IconProps {
	className?: string;
	size?: number;
}

const defaults = {
	"xmlns": "http://www.w3.org/2000/svg",
	"viewBox": "0 0 24 24",
	"fill": "none",
	"stroke": "currentColor",
	"strokeLinecap": "round" as const,
	"strokeLinejoin": "round" as const,
	"aria-hidden": true as const,
};

export function IconArrowLeft({ className, size = 16 }: IconProps) {
	return (
		<svg
			{...defaults}
			width={size}
			height={size}
			strokeWidth="2.5"
			className={className}>
			<path d="M19 12H5M12 19l-7-7 7-7" />
		</svg>
	);
}

export function IconArrowRight({ className, size = 16 }: IconProps) {
	return (
		<svg
			{...defaults}
			width={size}
			height={size}
			strokeWidth="2"
			className={className}>
			<path d="M5 12h14M12 5l7 7-7 7" />
		</svg>
	);
}

export function IconArrowUp({ className, size = 16 }: IconProps) {
	return (
		<svg
			{...defaults}
			width={size}
			height={size}
			strokeWidth="2.5"
			className={className}>
			<path d="M12 19V5M5 12l7-7 7 7" />
		</svg>
	);
}

export function IconArrowDown({ className, size = 16 }: IconProps) {
	return (
		<svg
			{...defaults}
			width={size}
			height={size}
			strokeWidth="2.5"
			className={className}>
			<path d="M12 5v14M19 12l-7 7-7-7" />
		</svg>
	);
}

export function IconChevronDown({ className, size = 16 }: IconProps) {
	return (
		<svg
			{...defaults}
			width={size}
			height={size}
			strokeWidth="2"
			className={className}>
			<path d="M6 9l6 6 6-6" />
		</svg>
	);
}

export function IconSearch({ className, size = 16 }: IconProps) {
	return (
		<svg
			{...defaults}
			width={size}
			height={size}
			strokeWidth="2"
			className={className}>
			<circle
				cx="11"
				cy="11"
				r="8"
			/>
			<path d="m21 21-4.35-4.35" />
		</svg>
	);
}

export function IconX({ className, size = 16 }: IconProps) {
	return (
		<svg
			{...defaults}
			width={size}
			height={size}
			strokeWidth="2.5"
			className={className}>
			<path d="M18 6L6 18M6 6l12 12" />
		</svg>
	);
}

export function IconCheck({ className, size = 16 }: IconProps) {
	return (
		<svg
			{...defaults}
			width={size}
			height={size}
			strokeWidth="2.5"
			className={className}>
			<path d="M20 6L9 17l-5-5" />
		</svg>
	);
}
