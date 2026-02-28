import { useState, useEffect, useRef, useId, type SubmitEvent } from "react";
import type React from "react";
import { Tabs, Tab } from "./Tabs";
import { Accordion, AccordionItem } from "./Accordion";
import { FilterableList } from "./FilterableStudentList";
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
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;

		if (!dialog) {
			return;
		}

		if (open) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [open]);

	useEffect(() => {
		if (open) {
			setValue("");
		}
	}, [open]);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		const parsedGrade = parseFloat(value);

		if (isNaN(parsedGrade) || parsedGrade < 2 || parsedGrade > 6) {
			return;
		}

		onSubmit(parsedGrade);
	}

	function handleDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
		if (e.target === dialogRef.current) {
			onClose();
		}
	}

	return (
		<dialog
			ref={dialogRef}
			className="modal-dialog"
			aria-labelledby="modal-title"
			onClose={onClose}
			onClick={handleDialogClick}>
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
							Оценка (2 - 6)
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
							className="button"
							onClick={onClose}>
							Отказ
						</button>

						<button
							type="submit"
							className="button button--primary">
							Запази
						</button>
					</div>
				</form>
			</div>
		</dialog>
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
					className="button button--primary">
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
						className="button button--sm"
						onClick={() => setModal(true)}
						aria-label={`Нанеси оценка на ${student.name}`}>
						Нанеси оценка
					</button>
					<button
						type="button"
						className="button button--sm button--danger"
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
					["Среден успех", averageScore !== null ? averageScore.toFixed(2) : "–"],
					["Най-висока", maxScore !== null ? maxScore.toFixed(2) : "–"],
					["Най-ниска", minScore !== null ? minScore.toFixed(2) : "–"],
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

function StudentContainer({ student, onGrade, onDelete }: StudentRowProps) {
	return (
		<div className="student-container">
			<StudentRow
				student={student}
				onGrade={onGrade}
				onDelete={onDelete}
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
						<p className="student-scores-empty">Все още няма нанесени оценки.</p>
					)}
				</AccordionItem>
			</Accordion>
		</div>
	);
}

function Classroom() {
	const [students, setStudents] = useState<Student[]>([]);
	const [sortByAvg, setSortByAvg] = useState(false);

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

	const sortedStudents = sortByAvg
		? [...students].sort(
				(a, b) => studentAverageScore(b) - studentAverageScore(a),
			)
		: students;

	return (
		<div className="classroom">
			<Tabs>
				<Tab label="Добави ученик">
					<AddStudentForm onAdd={handleAdd} />
				</Tab>

				<Tab label={`Списък (${students.length})`}>
					<div className="classroom-students">
						{students.length > 1 && (
							<button
								type="button"
								className={`button button--sm classroom-sort-button ${sortByAvg ? "button--primary" : ""}`}
								onClick={() => setSortByAvg(value => !value)}
								aria-pressed={sortByAvg}>
								{sortByAvg ? "Сортирано по успех" : "Сортирай по успех"}
							</button>
						)}

						<FilterableList
							items={sortedStudents}
							filterFn={(student, query) =>
								student.name.toLowerCase().includes(query.toLowerCase())
							}
							renderItem={student => (
								<StudentContainer
									student={student}
									onGrade={handleGrade}
									onDelete={handleDelete}
								/>
							)}
							keyFn={student => student.id}
							searchLabel="Търси по име"
							searchPlaceholder="Име на ученик"
							searchId="classroom-search"
							emptyAllMessage="Все още няма добавени ученици."
							noResultsMessage={query => `Няма намерени ученици за "${query}"`}
							listAriaLabel="Списък с ученици"
						/>
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
