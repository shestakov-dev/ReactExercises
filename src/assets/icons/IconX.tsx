interface IconProps {
	width?: number;
	height?: number;
	className?: string;
}

function IconX({ width = 13, height = 13, className }: IconProps) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<path d="M18 6L6 18M6 6l12 12" />
		</svg>
	);
}

export default IconX;
