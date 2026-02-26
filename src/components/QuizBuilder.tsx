import { useState, useId } from "react";
import "./QuizBuilder.css";

interface Option {
	id: string;
	text: string;
}

interface Question {
	id: string;
	text: string;
	options: Option[];
	correctIndexes: number[];
}

type Mode = "edit" | "preview";

function QuizHeader({
	title,
	onChange,
	isPreview,
}: {
	title: string;
	onChange: (v: string) => void;
	isPreview: boolean;
}) {
	const id = useId();

	return (
		<div className="quiz-header-bar__field">
			<p className="quiz-header-bar__label">
				{isPreview ? "Заглавие" : "Заглавие на теста"}
			</p>

			{isPreview ? (
				<p className="quiz-title-preview">{title}</p>
			) : (
				<>
					<label
						htmlFor={id}
						className="visually-hidden">
						Заглавие
					</label>

					<input
						id={id}
						type="text"
						className="quiz-title-input"
						value={title}
						onChange={e => onChange(e.target.value)}
						placeholder="Въведете заглавие..."
					/>
				</>
			)}
		</div>
	);
}

function QuizStats({ questions }: { questions: Question[] }) {
	const totalOptions = questions.reduce(
		(acc, question) => acc + question.options.length,
		0,
	);

	const noCorrect = questions.filter(
		question => question.correctIndexes.length === 0,
	).length;

	return (
		<aside
			className="quiz-stats"
			aria-label="Статистики на теста">
			<h3 className="quiz-stats__heading">Статистики</h3>

			<dl className="quiz-stats__grid">
				{(
					[
						["Въпроси", String(questions.length), false],
						["Общо отговори", String(totalOptions), false],
						["Без верен отговор", String(noCorrect), noCorrect > 0],
					] as [string, string, boolean][]
				).map(([label, val, warn]) => (
					<div
						key={label}
						className="quiz-stats__item">
						<dt>{label}</dt>

						<dd className={warn ? "warn" : ""}>{val}</dd>
					</div>
				))}
			</dl>
		</aside>
	);
}

function QuestionEditor({
	question,
	index,
	onUpdate,
	onDelete,
	onMove,
	isFirst,
	isLast,
}: {
	question: Question;
	index: number;
	onUpdate: (id: string, question: Question) => void;
	onDelete: (id: string) => void;
	onMove: (id: string, dir: "up" | "down") => void;
	isFirst: boolean;
	isLast: boolean;
}) {
	function update(patch: Partial<Question>) {
		onUpdate(question.id, { ...question, ...patch });
	}

	function addOption() {
		if (question.options.length >= 6) {
			return;
		}

		update({
			options: [...question.options, { id: crypto.randomUUID(), text: "" }],
		});
	}

	function updateOption(optionId: string, text: string) {
		update({
			options: question.options.map(option =>
				option.id === optionId ? { ...option, text } : option,
			),
		});
	}

	function deleteOption(optionId: string) {
		const removedIndex = question.options.findIndex(
			option => option.id === optionId,
		);
		const newOptions = question.options.filter(option => option.id !== optionId);

		const correct = question.correctIndexes
			.filter(currentIndex => currentIndex !== removedIndex)
			.map(currentIndex =>
				currentIndex > removedIndex ? currentIndex - 1 : currentIndex,
			);

		update({ options: newOptions, correctIndexes: correct });
	}

	function toggleCorrect(index: number) {
		const newCorrectIndexes = question.correctIndexes.includes(index)
			? question.correctIndexes.filter(
					currentCorrectIndex => currentCorrectIndex !== index,
				)
			: [...question.correctIndexes, index];

		update({ correctIndexes: newCorrectIndexes });
	}

	const labelId = `quiz-editor-label-${question.id}`;

	return (
		<article
			className="quiz-editor"
			aria-labelledby={labelId}>
			<header className="quiz-editor__head">
				<span
					id={labelId}
					className="quiz-editor__num">
					Въпрос {index + 1}
				</span>

				<div className="quiz-editor__head-actions">
					<button
						type="button"
						className="btn btn--sm btn--ghost"
						onClick={() => onMove(question.id, "up")}
						disabled={isFirst}
						aria-label="Премести нагоре">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true">
							<path d="M12 19V5M5 12l7-7 7 7" />
						</svg>
					</button>

					<button
						type="button"
						className="btn btn--sm btn--ghost"
						onClick={() => onMove(question.id, "down")}
						disabled={isLast}
						aria-label="Премести надолу">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true">
							<path d="M12 5v14M19 12l-7 7-7-7" />
						</svg>
					</button>

					<button
						type="button"
						className="btn btn--sm btn--danger"
						onClick={() => onDelete(question.id)}
						aria-label={`Изтрий въпрос ${index + 1}`}>
						Изтрий
					</button>
				</div>
			</header>

			<div className="quiz-editor__body">
				<div>
					<p className="quiz-editor__field-label">Текст на въпроса</p>

					<label
						htmlFor={`quiz-text-${question.id}`}
						className="visually-hidden">
						Текст
					</label>

					<input
						id={`quiz-text-${question.id}`}
						type="text"
						className="quiz-input"
						placeholder="Напишете въпроса..."
						value={question.text}
						onChange={e => update({ text: e.target.value })}
					/>
				</div>

				{question.options.length > 0 && (
					<div
						className="options-box"
						role="group"
						aria-label="Отговори">
						<p className="options-box__legend">Отговори</p>
						{question.options.map((option, optionIndex) => {
							const isCorrect = question.correctIndexes.includes(optionIndex);

							return (
								<div
									key={option.id}
									className="option-row">
									<input
										type="checkbox"
										id={`option-checkbox-${question.id}-${option.id}`}
										className="option-row__check"
										checked={isCorrect}
										onChange={() => toggleCorrect(optionIndex)}
										aria-label="Верен отговор"
									/>

									<label
										htmlFor={`option-input-${question.id}-${option.id}`}
										className="visually-hidden">
										Отговор {optionIndex + 1}
									</label>

									<input
										id={`option-input-${question.id}-${option.id}`}
										type="text"
										className={`quiz-input option-row__input ${isCorrect ? "option-row__input--correct" : ""}`}
										placeholder={`Отговор ${optionIndex + 1}`}
										value={option.text}
										onChange={e => updateOption(option.id, e.target.value)}
									/>

									<button
										type="button"
										className="btn btn--sm btn--ghost"
										onClick={() => deleteOption(option.id)}
										aria-label={`Изтрий отговор ${optionIndex + 1}`}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13"
											height="13"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2.5"
											strokeLinecap="round"
											strokeLinejoin="round"
											aria-hidden="true">
											<path d="M18 6L6 18M6 6l12 12" />
										</svg>
									</button>
								</div>
							);
						})}
					</div>
				)}

				<button
					type="button"
					className="btn btn--sm"
					onClick={addOption}
					disabled={question.options.length >= 6}>
					+ Добави отговор{question.options.length >= 6 ? " (макс. 6)" : ""}
				</button>
			</div>
		</article>
	);
}

function QuestionPreview({
	question,
	index,
}: {
	question: Question;
	index: number;
}) {
	const [chosen, setChosen] = useState<number[]>([]);

	function toggle(index: number) {
		setChosen(previousChosen =>
			previousChosen.includes(index)
				? previousChosen.filter(chosen => chosen !== index)
				: [...previousChosen, index],
		);
	}

	return (
		<article
			className="quiz-preview"
			aria-label={`Въпрос ${index + 1}`}>
			<p className="quiz-preview__num">Въпрос {index + 1}</p>

			<p className="quiz-preview__text">
				{question.text ?? <span className="placeholder-text">(Без текст)</span>}
			</p>

			{question.options.length > 0 && (
				<div
					className="preview-options"
					role="group"
					aria-label="Отговори">
					{question.options.map((option, index) => (
						<label
							key={option.id}
							className={`preview-option ${chosen.includes(index) ? "preview-option--chosen" : ""}`}>
							<input
								type="checkbox"
								className="preview-option__check"
								checked={chosen.includes(index)}
								onChange={() => toggle(index)}
							/>
							{option.text ?? <span className="placeholder-text">(Без текст)</span>}
						</label>
					))}
				</div>
			)}
		</article>
	);
}

function QuizBuilder() {
	const [mode, setMode] = useState<Mode>("edit");
	const [title, setTitle] = useState("Нов тест");
	const [questions, setQuestions] = useState<Question[]>([]);

	function addQuestion() {
		const id = crypto.randomUUID();

		setQuestions(previousQuestions => [
			...previousQuestions,
			{ id, text: "", options: [], correctIndexes: [] },
		]);
	}
	function updateQuestion(id: string, updated: Question) {
		setQuestions(previousQuestions =>
			previousQuestions.map(q => (q.id === id ? updated : q)),
		);
	}

	function deleteQuestion(id: string) {
		setQuestions(previousQuestions =>
			previousQuestions.filter(question => question.id !== id),
		);
	}

	function moveQuestion(id: string, direction: "up" | "down") {
		setQuestions(previousQuestions => {
			const questionIndex = previousQuestions.findIndex(q => q.id === id);

			if (questionIndex < 0) {
				return previousQuestions;
			}

			const swap = direction === "up" ? questionIndex - 1 : questionIndex + 1;

			if (swap < 0 || swap >= previousQuestions.length) {
				return previousQuestions;
			}

			const next = [...previousQuestions];

			[next[questionIndex], next[swap]] = [next[swap], next[questionIndex]];

			return next;
		});
	}

	return (
		<div className="quiz-builder">
			<div className="quiz-header-bar">
				<QuizHeader
					title={title}
					onChange={setTitle}
					isPreview={mode === "preview"}
				/>

				<button
					type="button"
					className={`btn ${mode === "preview" ? "" : "btn--primary"}`}
					onClick={() => setMode(m => (m === "edit" ? "preview" : "edit"))}
					aria-pressed={mode === "preview"}>
					{mode === "edit" ? "Преглед" : "Редактиране"}
				</button>
			</div>

			<main
				className="quiz-questions"
				aria-label="Въпроси">
				{questions.length === 0 && (
					<p className="quiz-empty">
						{mode === "edit" ? "Няма въпроси. Добавете първия." : "Тестът е празен."}
					</p>
				)}

				{questions.map((question, index) =>
					mode === "edit" ? (
						<QuestionEditor
							key={question.id}
							question={question}
							index={index}
							onUpdate={updateQuestion}
							onDelete={deleteQuestion}
							onMove={moveQuestion}
							isFirst={index === 0}
							isLast={index === questions.length - 1}
						/>
					) : (
						<QuestionPreview
							key={question.id}
							question={question}
							index={index}
						/>
					),
				)}

				{mode === "edit" && (
					<button
						type="button"
						className="btn quiz-add-btn"
						onClick={addQuestion}>
						+ Нов въпрос
					</button>
				)}
			</main>

			<QuizStats questions={questions} />
		</div>
	);
}

export default QuizBuilder;
