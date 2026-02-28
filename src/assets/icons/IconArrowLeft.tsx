interface IconProps {
	width?: number;
	height?: number;
	className?: string;
}

function IconArrowLeft({ width = 14, height = 14, className }: IconProps) {
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
			<path d="M19 12H5M12 19l-7-7 7-7" />
		</svg>
	);
}

export default IconArrowLeft;
