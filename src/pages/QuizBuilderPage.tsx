import ExerciseLayout from "../layouts/ExerciseLayout";
import QuizBuilder from "../components/QuizBuilder";

function QuizBuilderPage() {
	return (
		<ExerciseLayout exerciseId={7}>
			<QuizBuilder />
		</ExerciseLayout>
	);
}

export default QuizBuilderPage;
