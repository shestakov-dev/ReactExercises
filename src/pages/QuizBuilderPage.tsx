import { ExerciseLayout } from "../layouts/ExerciseLayout";
import { QuizBuilder } from "../components/QuizBuilder";

export function QuizBuilderPage() {
	return (
		<ExerciseLayout exerciseId={7}>
			<QuizBuilder />
		</ExerciseLayout>
	);
}
