import FilterableStudentList from "../components/FilterableStudentList";
import ExerciseLayout from "../layouts/ExerciseLayout";

function FilterableListPage() {
	return (
		<ExerciseLayout exerciseId={4}>
			<FilterableStudentList />
		</ExerciseLayout>
	);
}

export default FilterableListPage;
