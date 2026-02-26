import Classroom from "../components/Classroom";
import ExerciseLayout from "../layouts/ExerciseLayout";

function ClassroomPage() {
	return (
		<ExerciseLayout exerciseId={6}>
			<Classroom />
		</ExerciseLayout>
	);
}

export default ClassroomPage;
