import { useState, useId, type SubmitEvent } from "react";
import { Tabs, Tab } from "./Tabs";
import { Accordion, AccordionItem } from "./Accordion";
import StudentCard from "./StudentCard";
import "./FilterableStudentList.css";
import "./Classroom.css";

interface Student {
	id: string;
	name: string;
	grade: string;
	scores: number[];
}

interface GradeModalProps {
	open: boolean;
	studentName: string;
	onClose: () => void;
	onSubmit: (score: number) => void;
}

function GradeModal({ open, studentName, onClose, onSubmit }: GradeModalProps) {
	const [value, setValue] = useState("");
	const inputId = useId();

	if (!open) {
		return null;
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		const parsedGrade = parseFloat(value);

		if (isNaN(parsedGrade) || parsedGrade < 2 || parsedGrade > 6) {
			return;
		}

		onSubmit(parsedGrade);
		setValue("");
	}

	return (
		<div
			className="modal-overlay"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			onClick={e => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}>
			<div className="modal">
				<h3
					className="modal__title"
					id="modal-title">
					Нанеси оценка
				</h3>

				<p className="modal__sub">{studentName}</p>

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label
							htmlFor={inputId}
							className="form-label">
							Оценка (2 – 6)
						</label>

						<input
							id={inputId}
							type="number"
							className="form-input"
							min="2"
							max="6"
							step="0.25"
							placeholder="5.50"
							value={value}
							onChange={e => setValue(e.target.value)}
							autoFocus
							required
						/>
					</div>

					<div className="modal__actions">
						<button
							type="button"
							className="btn"
							onClick={onClose}>
							Отказ
						</button>

						<button
							type="submit"
							className="btn btn--primary">
							Запази
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

interface AddStudentFormProps {
	onAdd: (name: string, grade: string) => void;
}

function AddStudentForm({ onAdd }: AddStudentFormProps) {
	const [name, setName] = useState("");
	const [grade, setGrade] = useState("");
	const nameId = useId();
	const gradeId = useId();

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		const trimmedName = name.trim();
		const trimmedGrade = grade.trim();

		if (!trimmedName || !trimmedGrade) {
			return;
		}

		onAdd(trimmedName, trimmedGrade);

		setName("");
		setGrade("");
	}

	return (
		<form
			className="add-form"
			onSubmit={handleSubmit}
			aria-label="Добавяне на ученик">
			<div className="add-form__legend-bar">
				<p className="add-form__legend">Нов ученик</p>
			</div>

			<div className="add-form__body">
				<div className="form-group">
					<label
						htmlFor={nameId}
						className="form-label">
						Пълно име
					</label>

					<input
						id={nameId}
						type="text"
						className="form-input"
						placeholder="Иван Петров"
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
				</div>

				<div className="form-group">
					<label
						htmlFor={gradeId}
						className="form-label">
						Клас
					</label>

					<input
						id={gradeId}
						type="text"
						className="form-input"
						placeholder="11 А"
						value={grade}
						onChange={e => setGrade(e.target.value)}
						required
					/>
				</div>

				<button
					type="submit"
					className="btn btn--primary">
					Добави
				</button>
			</div>
		</form>
	);
}

interface StudentRowProps {
	student: Student;
	onGrade: (id: string, score: number) => void;
	onDelete: (id: string) => void;
}

function StudentRow({ student, onGrade, onDelete }: StudentRowProps) {
	const [modal, setModal] = useState(false);

	const avg =
		student.scores.length > 0
			? student.scores.reduce((acc, score) => acc + score, 0) /
				student.scores.length
			: 0;

	return (
		<>
			<div className="student-row">
				<div className="student-row__card">
					<StudentCard
						name={student.name}
						grade={student.grade}
						averageScore={avg}
					/>
				</div>

				<div className="student-row__actions">
					<button
						type="button"
						className="btn btn--sm"
						onClick={() => setModal(true)}
						aria-label={`Постави оценка на ${student.name}`}>
						+ Оценка
					</button>
					<button
						type="button"
						className="btn btn--sm btn--danger"
						onClick={() => onDelete(student.id)}
						aria-label={`Изтрий ${student.name}`}>
						Изтрий
					</button>
				</div>
			</div>

			<GradeModal
				open={modal}
				studentName={student.name}
				onClose={() => setModal(false)}
				onSubmit={score => {
					onGrade(student.id, score);
					setModal(false);
				}}
			/>
		</>
	);
}

function ClassStats({ students }: { students: Student[] }) {
	const allScores = students.flatMap(student => student.scores);
	const averageScore =
		allScores.length > 0
			? allScores.reduce((a, b) => a + b, 0) / allScores.length
			: null;

	const maxScore = allScores.length > 0 ? Math.max(...allScores) : null;
	const minScore = allScores.length > 0 ? Math.min(...allScores) : null;

	return (
		<aside
			className="class-stats"
			aria-label="Статистики на класа">
			<h3 className="class-stats__heading">Статистики</h3>
			<dl className="class-stats__grid">
				{[
					["Ученици", students.length],
					["Среден успех", averageScore !== null ? averageScore.toFixed(2) : "—"],
					["Най-висока", maxScore !== null ? maxScore.toFixed(2) : "—"],
					["Най-ниска", minScore !== null ? minScore.toFixed(2) : "—"],
				].map(([label, value]) => (
					<div
						key={label as string}
						className="class-stats__item">
						<dt>{label}</dt>
						<dd>{value}</dd>
					</div>
				))}
			</dl>
		</aside>
	);
}

function Classroom() {
	const [students, setStudents] = useState<Student[]>([]);
	const [sortByAvg, setSortByAvg] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	function handleAdd(name: string, grade: string) {
		const id = crypto.randomUUID();

		setStudents(previousStudents => [
			...previousStudents,
			{ id, name, grade, scores: [] },
		]);
	}

	function handleGrade(id: string, score: number) {
		setStudents(previousStudents =>
			previousStudents.map(student =>
				student.id === id
					? { ...student, scores: [...student.scores, score] }
					: student,
			),
		);
	}

	function handleDelete(id: string) {
		setStudents(previousStudents =>
			previousStudents.filter(student => student.id !== id),
		);
	}

	const studentAverageScore = (student: Student) =>
		student.scores.length > 0
			? student.scores.reduce((acc, score) => acc + score, 0) /
				student.scores.length
			: 0;

	const filteredStudents = students.filter(student =>
		student.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const displayed = sortByAvg
		? [...filteredStudents].sort(
				(a, b) => studentAverageScore(b) - studentAverageScore(a),
			)
		: filteredStudents;

	return (
		<div className="classroom">
			<Tabs>
				<Tab label="Добави ученик">
					<AddStudentForm onAdd={handleAdd} />
				</Tab>

				<Tab label={`Списък (${students.length})`}>
					<div className="classroom-students">
						<div className="search-wrapper">
							<label
								htmlFor="classroom-search"
								className="form-label">
								Търси по име
							</label>
							<div className="search-field">
								<svg
									className="search-field__icon"
									xmlns="http://www.w3.org/2000/svg"
									width="15"
									height="15"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true">
									<circle
										cx="11"
										cy="11"
										r="8"
									/>
									<path d="m21 21-4.35-4.35" />
								</svg>
								<input
									id="classroom-search"
									type="search"
									className="search-field__input"
									placeholder="Име на ученик"
									value={searchQuery}
									onChange={e => setSearchQuery(e.target.value)}
								/>
							</div>
						</div>

						{students.length > 1 && (
							<button
								type="button"
								className={`btn btn--sm ${sortByAvg ? "btn--primary" : ""}`}
								onClick={() => setSortByAvg(value => !value)}
								aria-pressed={sortByAvg}
								style={{ marginTop: "12px" }}>
								{sortByAvg ? "Сортирано по успех" : "Сортирай по успех"}
							</button>
						)}

						{students.length === 0 ? (
							<p className="classroom-empty">Все още няма добавени ученици.</p>
						) : displayed.length === 0 ? (
							<p className="classroom-empty">
								Няма намерени ученици за "{searchQuery}"
							</p>
						) : (
							<div className="students-list">
								{displayed.map(student => (
									<div
										key={student.id}
										className="student-container">
										<StudentRow
											student={student}
											onGrade={handleGrade}
											onDelete={handleDelete}
										/>

										<Accordion>
											<AccordionItem title="Покажи оценки">
												{student.scores.length > 0 ? (
													<div className="student-scores">
														<p className="student-scores__label">Всички оценки:</p>
														<div className="student-scores__list">
															{student.scores.map((score, i) => (
																<span
																	key={i}
																	className="score-chip">
																	{score.toFixed(2)}
																</span>
															))}
														</div>
													</div>
												) : (
													<p className="student-scores-empty">
														Все още няма поставени оценки.
													</p>
												)}
											</AccordionItem>
										</Accordion>
									</div>
								))}
							</div>
						)}
					</div>
				</Tab>

				<Tab label="Статистики">
					<ClassStats students={students} />
				</Tab>
			</Tabs>
		</div>
	);
}

export default Classroom;
