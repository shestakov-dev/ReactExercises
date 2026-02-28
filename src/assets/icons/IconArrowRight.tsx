interface IconProps {
	width?: number;
	height?: number;
	className?: string;
}

function IconArrowRight({ width = 15, height = 15, className }: IconProps) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true">
			<path d="M5 12h14M12 5l7 7-7 7" />
		</svg>
	);
}

export default IconArrowRight;
