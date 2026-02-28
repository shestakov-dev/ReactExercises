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

export function IconAPlus({ className, size = 16 }: IconProps) {
	return (
		<svg
			{...defaults}
			width={size}
			height={size}
			strokeWidth="2"
			className={className}>
			<path d="M3 19L8 5l5 14M5 14h6M18 9v6M15 12h6" />
		</svg>
	);
}

export function IconTrash({ className, size = 16 }: IconProps) {
	return (
		<svg
			{...defaults}
			width={size}
			height={size}
			strokeWidth="2"
			className={className}>
			<path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
		</svg>
	);
}
