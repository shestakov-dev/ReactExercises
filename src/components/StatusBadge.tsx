import "./StatusBadge.css";

type Status = "online" | "away" | "offline";

interface StatusBadgeProps {
	status: Status;
	label?: string;
}

const config: Record<Status, { text: string; classModifier: string }> = {
	online: { text: "На линия", classModifier: "online" },
	away: { text: "Отсъства", classModifier: "away" },
	offline: { text: "Офлайн", classModifier: "offline" },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
	const { text, classModifier } = config[status];

	const display = label ? `${label} – ${text}` : text;

	return (
		<span
			className={`status-badge status-badge--${classModifier}`}
			role="status"
			aria-label={`Статус: ${display}`}>
			<span
				className="status-badge__dot"
				aria-hidden="true"
			/>

			{display}
		</span>
	);
}
