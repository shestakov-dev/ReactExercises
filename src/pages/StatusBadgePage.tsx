import ExerciseLayout from "../layouts/ExerciseLayout";
import StatusBadge from "../components/StatusBadge";

function StatusBadgePage() {
	return (
		<ExerciseLayout exerciseId={2}>
			<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
				<section aria-label="Без label">
					<p
						style={{
							fontSize: "0.72rem",
							fontWeight: 700,
							letterSpacing: "0.08em",
							textTransform: "uppercase",
							color: "var(--text-muted)",
							marginBottom: "10px",
						}}>
						Без label
					</p>

					<div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
						<StatusBadge status="online" />
						<StatusBadge status="away" />
						<StatusBadge status="offline" />
					</div>
				</section>

				<section aria-label="С label (бонус)">
					<p
						style={{
							fontSize: "0.72rem",
							fontWeight: 700,
							letterSpacing: "0.08em",
							textTransform: "uppercase",
							color: "var(--text-muted)",
							marginBottom: "10px",
						}}>
						С label (бонус)
					</p>

					<div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
						<StatusBadge
							status="online"
							label="Иван"
						/>
						<StatusBadge
							status="away"
							label="Мария"
						/>
						<StatusBadge
							status="offline"
							label="Георги"
						/>
					</div>
				</section>
			</div>
		</ExerciseLayout>
	);
}

export default StatusBadgePage;
