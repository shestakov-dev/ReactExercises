import { StudentCard } from "../components/StudentCard";
import { ExerciseLayout } from "../layouts/ExerciseLayout";

import "./StudentCardPage.css";

export function StudentCardPage() {
	return (
		<ExerciseLayout exerciseId={1}>
			<div className="demo-card-list">
				<StudentCard
					name="Иван Петров"
					grade="11Б"
					averageScore={5.67}
				/>
				<StudentCard
					name="Мария Иванова"
					grade="11А"
					averageScore={5.92}
				/>
				<StudentCard
					name="Георги Димитров"
					grade="10В"
					averageScore={5.45}
				/>
				<StudentCard
					name="Елена Стоянова"
					grade="12А"
					averageScore={6.0}
				/>
			</div>
		</ExerciseLayout>
	);
}
