import { Classroom } from "../components/Classroom";
import { ExerciseLayout } from "../layouts/ExerciseLayout";

export function ClassroomPage() {
	return (
		<ExerciseLayout exerciseId={6}>
			<Classroom />
		</ExerciseLayout>
	);
}
