import "./LengthWarning.css";

interface LengthWarningProps {
	value: string;
	max: number;
}

export function LengthWarning({ value, max }: LengthWarningProps) {
	if (value.length < max) {
		return null;
	}

	return (
		<p
			className="length-warning"
			role="alert">
			Достигнат е максималният брой символи ({max}).
		</p>
	);
}
