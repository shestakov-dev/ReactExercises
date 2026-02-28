interface IconProps {
	width?: number;
	height?: number;
	className?: string;
}

function IconArrowUp({ width = 13, height = 13, className }: IconProps) {
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
			<path d="M12 19V5M5 12l7-7 7 7" />
		</svg>
	);
}

export default IconArrowUp;
