import { FilterableList } from "../components/FilterableList";
import { StudentCard } from "../components/StudentCard";
import { ExerciseLayout } from "../layouts/ExerciseLayout";

interface Student {
	id: number;
	name: string;
	grade: string;
	averageScore: number;
}

const STUDENTS: Student[] = [
	{ id: 1, name: "Иван Петров", grade: "11А", averageScore: 5.62 },
	{ id: 2, name: "Мария Иванова", grade: "11Б", averageScore: 5.91 },
	{ id: 3, name: "Георги Димитров", grade: "10В", averageScore: 5.4 },
	{ id: 4, name: "Елена Стоянова", grade: "12А", averageScore: 5.98 },
	{ id: 5, name: "Петър Николов", grade: "10А", averageScore: 4.92 },
	{ id: 6, name: "Ана Великова", grade: "11А", averageScore: 5.76 },
	{ id: 7, name: "Димитър Маринов", grade: "12Б", averageScore: 5.31 },
	{ id: 8, name: "Виктория Тодорова", grade: "9В", averageScore: 5.84 },
];

export function FilterableListPage() {
	return (
		<ExerciseLayout exerciseId={4}>
			<FilterableList
				items={STUDENTS}
				filterFn={(student, query) =>
					student.name.toLowerCase().includes(query.toLowerCase())
				}
				renderItem={student => (
					<StudentCard
						name={student.name}
						grade={student.grade}
						averageScore={student.averageScore}
					/>
				)}
				keyFn={student => student.id}
				searchLabel="Търси по име"
				searchPlaceholder="Име на ученик"
				noResultsMessage={query => `Няма намерени ученици за "${query}"`}
				listAriaLabel="Списък с ученици"
			/>
		</ExerciseLayout>
	);
}
