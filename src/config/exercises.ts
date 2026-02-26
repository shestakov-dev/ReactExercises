export type Difficulty = "Лесна" | "Средна" | "Сложна" | "Много сложна";

export interface Exercise {
	id: number;
	title: string;
	path: string;
	difficulty: Difficulty;
	description: string;
	hint?: string;
	codeExample?: string;
}

export const difficultyClassModifier: Record<Difficulty, string> = {
	"Лесна": "easy",
	"Средна": "medium",
	"Сложна": "hard",
	"Много сложна": "very-hard",
};

export const exercises: Exercise[] = [
	{
		id: 1,
		title: "Визитка на ученик",
		path: "/exercises/student-card",
		difficulty: "Лесна",
		description:
			"Създайте компонент StudentCard, който приема props: name, grade (клас) и averageScore (среден успех). Компонентът показва информацията в карта с инициали в кръгче.",
		hint: 'Инициалите може да вземете от name.split(" ").map(n => n[0]).join("")',
		codeExample: `// Пример за използване:
<StudentCard name="Иван Петров" grade="11Б" averageScore={5.67} />
<StudentCard name="Мария Иванова" grade="11А" averageScore={5.92} />

// Трябва да покаже:
// [ИП] Иван Петров
//      Клас: 11Б | Успех: 5.67`,
	},
	{
		id: 2,
		title: "Статус индикатор",
		path: "/exercises/status-badge",
		difficulty: "Лесна",
		description:
			'Създайте компонент StatusBadge, който приема prop status с възможни стойности "online", "away", "offline". Показва цветно кръгче (зелено / жълто / сиво) и текст. Използвайте условно рендериране за цвета.',
		codeExample: `// Пример за използване:
<StatusBadge status="online" />   // Зелено кръгче + "На линия"
<StatusBadge status="away" />     // Жълто кръгче + "Отсъства"
<StatusBadge status="offline" />  // Сиво кръгче + "Офлайн"

// Бонус: добавете prop "label" за потребителско име:
<StatusBadge status="online" label="Иван" />
// Зелено кръгче + "Иван - На линия"`,
	},
	{
		id: 3,
		title: "Акордеон",
		path: "/exercises/accordion",
		difficulty: "Средна",
		description:
			"Създайте компонент Accordion, който съдържа няколко AccordionItem. Всеки item приема title и children. При клик на заглавието, съдържанието се показва/скрива. Само един item може да бъде отворен едновременно.",
		hint:
			'State "openIndex" живее в Accordion (родителя). AccordionItem получава callback "onToggle" и "isOpen". Използвайте условно рендериране за children.',
		codeExample: `// Пример за използване:
<Accordion>
  <AccordionItem title="Какво е React?">
    <p>React е JavaScript библиотека за...</p>
  </AccordionItem>
  <AccordionItem title="Какво е компонент?">
    <p>Компонентът е преизползваем блок...</p>
  </AccordionItem>
  <AccordionItem title="Какво е JSX?">
    <p>JSX е синтактично разширение...</p>
  </AccordionItem>
</Accordion>`,
	},
	{
		id: 4,
		title: "Филтрируем списък с ученици",
		path: "/exercises/filterable-list",
		difficulty: "Средна",
		description:
			"Създайте система от компоненти за показване и филтриране на списък с ученици. SearchInput подава търсения текст нагоре чрез callback, а StudentList показва само учениците, чиито имена съвпадат с филтъра.",
		codeExample: `// Структура:
function SearchInput({ value, onChange }) { ... }
function StudentItem({ student }) { ... }

function FilterableStudentList() {
  const [query, setQuery] = useState("");
  const students = [
    { id: 1, name: "Иван Петров", grade: "11А" },
    { id: 2, name: "Мария Иванова", grade: "11Б" },
    // ...
  ];

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} />
      {filtered.length === 0
        ? <p>Няма намерени ученици</p>
        : filtered.map(s => <StudentItem key={s.id} student={s} />)
      }
    </div>
  );
}`,
	},
	{
		id: 5,
		title: "Система от табове",
		path: "/exercises/tabs",
		difficulty: "Сложна",
		description:
			"Създайте Tabs и Tab компоненти. Tabs е контейнер, който рендерира бутони за навигация от label prop на всяко Tab дете. При клик на бутон, показва съответния Tab children. Активният таб е визуално маркиран.",
		hint:
			'Tabs управлява state "activeIndex". Използвайте React.Children.toArray(children) за да обходите Tab децата. Всеки Tab трябва да има props: label, children. Рендерирайте бутоните от label-ите. Покажете children само на активния Tab.',
		codeExample: `// Пример за използване:
<Tabs>
  <Tab label="Профил">
    <p>Име: Иван Петров</p>
    <p>Клас: 11Б</p>
  </Tab>
  <Tab label="Оценки">
    <ul>
      <li>Математика: 5.50</li>
      <li>Физика: 6.00</li>
    </ul>
  </Tab>
  <Tab label="Настройки">
    <button>Промени парола</button>
  </Tab>
</Tabs>`,
	},
	{
		id: 6,
		title: "Мини класна стая",
		path: "/exercises/classroom",
		difficulty: "Сложна",
		description:
			'Създайте приложение "Класна стая" с няколко компонента. Учителят може да добавя ученици, да им поставя оценки и да вижда статистики. Използвайте lifting state up и множество callbacks.',
		hint:
			'Компоненти: AddStudentForm (форма с име и клас, callback onAdd), StudentRow (показва ученик + бутон "Постави оценка" + callback onGrade(studentId, grade)), GradeModal (модал за въвеждане на оценка), ClassStats (показва: брой ученици, среден успех, най-висока/ниска оценка). Бонус: добавете сортиране по среден успех.',
		codeExample: `function Classroom() {
  const [students, setStudents] = useState([]);
  // students: [{ id, name, grade, scores: [5, 4, 6, ...] }]

  return (
    <div>
      <AddStudentForm onAdd={...} />
      {students.map(s => (
        <StudentRow
          key={s.id}
          student={s}
          onGrade={(id, score) => { ... }}
          onDelete={(id) => { ... }}
        />
      ))}
      <ClassStats students={students} />
    </div>
  );
}`,
	},
	{
		id: 7,
		title: "Конструктор на тестове",
		path: "/exercises/quiz-builder",
		difficulty: "Много сложна",
		description:
			"Създайте мини приложение за конструиране на тестове. Учителят може да добавя въпроси с множество отговори, да маркира правилните, да пренарежда и изтрива въпроси. Приложението има два режима: Редактиране и Преглед (как ученикът ще вижда теста).",
		hint:
			'Компоненти и тяхната роля: QuizBuilder (главен компонент, държи целия state и превключва между режим "edit" и "preview"), QuizHeader (приема title + onChange callback), QuestionEditor (за един въпрос в edit режим с callbacks onUpdate, onDelete), QuestionPreview (за един въпрос в preview режим), QuizStats (статистики за теста). Концепции: Компоненти и Props, Условно рендериране (edit vs preview режим), Children и композиция, Callbacks, Lifting state up.',
		codeExample: `function QuizBuilder() {
  const [mode, setMode] = useState("edit"); // "edit" | "preview"
  const [title, setTitle] = useState("Нов тест");
  const [questions, setQuestions] = useState([]);
  // questions: [{ id, text, options, correctIndexes }]

  const addQuestion = () => { ... };
  const updateQuestion = (id, updated) => { ... };
  const deleteQuestion = (id) => { ... };
  const moveQuestion = (id, direction) => { ... }; // Бонус

  return (
    <div>
      <button onClick={() => setMode(
        mode === "edit" ? "preview" : "edit"
      )}>
        {mode === "edit" ? "Преглед" : "Редактиране"}
      </button>

      <QuizHeader
        title={title}
        onChange={setTitle}
        isPreview={mode === "preview"}
      />

      {questions.map(q =>
        mode === "edit"
          ? <QuestionEditor
              key={q.id}
              question={q}
              onUpdate={updateQuestion}
              onDelete={deleteQuestion}
            />
          : <QuestionPreview key={q.id} question={q} />
      )}

      {mode === "edit" && (
        <button onClick={addQuestion}>+ Нов въпрос</button>
      )}

      <QuizStats questions={questions} />
    </div>
  );
}`,
	},
];

export function getExerciseById(id: number): Exercise | undefined {
	return exercises.find(exercise => exercise.id === id);
}
