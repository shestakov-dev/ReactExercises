import ExerciseLayout from "../layouts/ExerciseLayout";
import StatusBadge from "../components/StatusBadge";
import "./StatusBadgePage.css";

function StatusBadgePage() {
	return (
		<ExerciseLayout exerciseId={2}>
			<div className="status-demo">
				<section
					className="status-demo__section"
					aria-label="Без label">
					<p className="status-demo__heading">Без label</p>

					<div className="status-demo__badges">
						<StatusBadge status="online" />
						<StatusBadge status="away" />
						<StatusBadge status="offline" />
					</div>
				</section>

				<section
					className="status-demo__section"
					aria-label="С label (бонус)">
					<p className="status-demo__heading">С label (бонус)</p>

					<div className="status-demo__badges">
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
