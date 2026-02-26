import ExerciseLayout from "../layouts/ExerciseLayout";
import StudentCard from "../components/StudentCard";
import { Tabs, Tab } from "../components/Tabs";

function TabsPage() {
	return (
		<ExerciseLayout exerciseId={5}>
			<Tabs>
				<Tab label="Профил">
					<StudentCard
						name="Иван Петров"
						averageScore={5.67}
						grade="11 Б"
					/>
				</Tab>

				<Tab label="Оценки">
					<ul>
						<li>Математика: 5.50</li>
						<li>Физика: 6.00</li>
						<li>Биология: 5.50</li>
						<li>История: 5.75</li>
					</ul>
				</Tab>

				<Tab label="Настройки">
					<button type="button">Промени парола</button>
				</Tab>
			</Tabs>
		</ExerciseLayout>
	);
}

export default TabsPage;
