import { useState, useId } from "react";
import IconArrowUp from "../assets/icons/IconArrowUp";
import IconArrowDown from "../assets/icons/IconArrowDown";
import IconX from "../assets/icons/IconX";
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

const MAX_TITLE_LENGTH = 120;
const MAX_QUESTION_LENGTH = 200;
const MAX_OPTION_LENGTH = 150;

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
				<p className="quiz-title-preview">
					{title ?? <span className="placeholder-text">(Без заглавие)</span>}
				</p>
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
						maxLength={MAX_TITLE_LENGTH}
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
						<dt className="quiz-stats__item-label">{label}</dt>
						<dd className={`quiz-stats__item-value${warn ? " warn" : ""}`}>{val}</dd>
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
						className="button button--sm button--ghost"
						onClick={() => onMove(question.id, "up")}
						disabled={isFirst}
						aria-label="Премести нагоре">
						<IconArrowUp />
					</button>

					<button
						type="button"
						className="button button--sm button--ghost"
						onClick={() => onMove(question.id, "down")}
						disabled={isLast}
						aria-label="Премести надолу">
						<IconArrowDown />
					</button>

					<button
						type="button"
						className="button button--sm button--danger"
						onClick={() => onDelete(question.id)}
						aria-label={`Изтрий въпрос ${index + 1}`}>
						Изтрий
					</button>
				</div>
			</header>

			<div className="quiz-editor__body">
				<div>
					<label
						htmlFor={`quiz-text-${question.id}`}
						className="quiz-editor__field-label">
						Текст на въпроса
					</label>

					<input
						id={`quiz-text-${question.id}`}
						type="text"
						className="quiz-input"
						placeholder="Напишете въпроса..."
						value={question.text}
						onChange={e => update({ text: e.target.value })}
						maxLength={MAX_QUESTION_LENGTH}
					/>
				</div>

				{question.options.length > 0 && (
					<fieldset className="options-box">
						<legend className="options-box__legend">Отговори</legend>
						{question.options.map((option, optionIndex) => {
							const isCorrect = question.correctIndexes.includes(optionIndex);
							const checkId = `option-checkbox-${question.id}-${option.id}`;
							const inputId = `option-input-${question.id}-${option.id}`;

							return (
								<div
									key={option.id}
									className="option-row">
									<label
										htmlFor={checkId}
										className="option-row__check-label"
										title="Верен отговор">
										<input
											type="checkbox"
											id={checkId}
											className="option-row__check"
											checked={isCorrect}
											onChange={() => toggleCorrect(optionIndex)}
										/>
										<span className="visually-hidden">
											{isCorrect ? "Верен" : "Не е верен"}, отговор {optionIndex + 1}
										</span>
									</label>

									<label
										htmlFor={inputId}
										className="visually-hidden">
										Отговор {optionIndex + 1}
									</label>

									<input
										id={inputId}
										type="text"
										className={`quiz-input option-row__input ${isCorrect ? "option-row__input--correct" : ""}`}
										placeholder={`Отговор ${optionIndex + 1}`}
										value={option.text}
										onChange={e => updateOption(option.id, e.target.value)}
										maxLength={MAX_OPTION_LENGTH}
									/>

									<button
										type="button"
										className="button button--sm button--ghost"
										onClick={() => deleteOption(option.id)}
										aria-label={`Изтрий отговор ${optionIndex + 1}`}>
										<IconX />
									</button>
								</div>
							);
						})}
					</fieldset>
				)}

				<button
					type="button"
					className="button button--sm"
					onClick={addOption}
					disabled={question.options.length >= 6}>
					+ Добави отговор{question.options.length >= 6 ? " (макс. 6)" : ""}
				</button>
			</div>
		</article>
	);
}

type CheckState = "unchecked" | "checked" | "revealed";

function QuestionPreview({
	question,
	index,
}: {
	question: Question;
	index: number;
}) {
	const [chosen, setChosen] = useState<number[]>([]);
	const [state, setState] = useState<CheckState>("unchecked");

	// Only show options with non-empty text
	const visibleOptions = question.options
		.map((opt, originalIndex) => ({ ...opt, originalIndex }))
		.filter(opt => opt.text.trim() !== "");

	function toggle(originalIndex: number) {
		if (state === "revealed") return;
		setChosen(prev =>
			prev.includes(originalIndex)
				? prev.filter(i => i !== originalIndex)
				: [...prev, originalIndex],
		);
	}

	function handleCheck() {
		setState("revealed");
	}

	function handleReset() {
		setChosen([]);
		setState("unchecked");
	}

	function getOptionClass(originalIndex: number) {
		const isChosen = chosen.includes(originalIndex);
		const isCorrect = question.correctIndexes.includes(originalIndex);

		if (state !== "revealed") {
			return isChosen ? "preview-option--chosen" : "";
		}

		if (isCorrect && isChosen) return "preview-option--correct";
		if (isCorrect && !isChosen) return "preview-option--missed";
		if (!isCorrect && isChosen) return "preview-option--wrong";
		return "";
	}

	return (
		<article
			className="quiz-preview"
			aria-label={`Въпрос ${index + 1}`}>
			<p className="quiz-preview__num">Въпрос {index + 1}</p>

			<p className="quiz-preview__text">
				{question.text || <span className="placeholder-text">(Без текст)</span>}
			</p>

			{visibleOptions.length > 0 && (
				<>
					<div
						className="preview-options"
						role="group"
						aria-label="Отговори">
						{visibleOptions.map(option => {
							const optClass = getOptionClass(option.originalIndex);
							const isChosen = chosen.includes(option.originalIndex);

							return (
								<label
									key={option.id}
									className={`preview-option ${optClass}`}>
									<input
										type="checkbox"
										className="preview-option__check"
										checked={isChosen}
										onChange={() => toggle(option.originalIndex)}
										disabled={state === "revealed"}
									/>
									{option.text}
									{state === "revealed" &&
										question.correctIndexes.includes(option.originalIndex) && (
											<span
												className="preview-option__indicator preview-option__indicator--correct"
												aria-label="Верен отговор">
												✓
											</span>
										)}
									{state === "revealed" &&
										isChosen &&
										!question.correctIndexes.includes(option.originalIndex) && (
											<span
												className="preview-option__indicator preview-option__indicator--wrong"
												aria-label="Грешен отговор">
												✗
											</span>
										)}
								</label>
							);
						})}
					</div>

					<div className="preview-actions">
						{state !== "revealed" ? (
							<button
								type="button"
								className="button button--sm button--primary"
								onClick={handleCheck}>
								Провери
							</button>
						) : (
							<button
								type="button"
								className="button button--sm"
								onClick={handleReset}>
								Нулирай
							</button>
						)}
					</div>
				</>
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

	const isPreview = mode === "preview";

	return (
		<div className="quiz-builder">
			<div className="quiz-header-bar">
				<QuizHeader
					title={title}
					onChange={setTitle}
					isPreview={isPreview}
				/>

				<button
					type="button"
					className={`button${isPreview ? " button--primary" : ""}`}
					onClick={() => setMode(m => (m === "edit" ? "preview" : "edit"))}>
					{isPreview ? "Редактиране" : "Преглед"}
				</button>
			</div>

			<main
				className="quiz-questions"
				aria-label="Въпроси">
				{questions.length === 0 && (
					<p className="quiz-empty">
						{isPreview ? "Тестът е празен." : "Няма въпроси. Добавете първия."}
					</p>
				)}

				{questions.map((question, index) =>
					isPreview ? (
						<QuestionPreview
							key={question.id}
							question={question}
							index={index}
						/>
					) : (
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
					),
				)}

				{!isPreview && (
					<button
						type="button"
						className="button quiz-add-button"
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
