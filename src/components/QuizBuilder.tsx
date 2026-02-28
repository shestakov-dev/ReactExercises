import { useState } from "react";
import { IconArrowUp, IconArrowDown, IconX, IconCheck } from "./Icons";
import { LengthWarning } from "./LengthWarning";

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
}: {
	title: string;
	onChange: (value: string) => void;
}) {
	return (
		<div className="quiz-header-bar__field">
			<label
				htmlFor="quiz-title-input"
				className="quiz-header-bar__label">
				Заглавие на теста
			</label>

			<input
				id="quiz-title-input"
				type="text"
				className="quiz-title-input"
				value={title}
				onChange={e => onChange(e.target.value)}
				placeholder="Въведете заглавие..."
				maxLength={MAX_TITLE_LENGTH}
			/>

			<LengthWarning
				value={title}
				max={MAX_TITLE_LENGTH}
			/>
		</div>
	);
}

function QuizStats({ questions }: { questions: Question[] }) {
	const totalOptions = questions.reduce(
		(total, question) => total + question.options.length,
		0,
	);

	const noCorrect = questions.filter(
		question => question.correctIndexes.length === 0,
	).length;

	const stats = [
		{ label: "Въпроси", value: String(questions.length), warn: false },
		{ label: "Общо отговори", value: String(totalOptions), warn: false },
		{ label: "Без верен отговор", value: String(noCorrect), warn: noCorrect > 0 },
	];

	return (
		<aside
			className="quiz-stats"
			aria-label="Статистики на теста">
			<h3 className="quiz-stats__heading">Статистики</h3>

			<dl className="quiz-stats__grid">
				{stats.map(({ label, value, warn }) => (
					<div
						key={label}
						className="quiz-stats__item">
						<dt className="quiz-stats__item-label">{label}</dt>

						<dd className={`quiz-stats__item-value${warn ? " warn" : ""}`}>
							{value}
						</dd>
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
	onMove: (id: string, direction: "up" | "down") => void;
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

	function toggleCorrect(indexToToggle: number) {
		const newCorrectIndexes = question.correctIndexes.includes(indexToToggle)
			? question.correctIndexes.filter(
					currentCorrectIndex => currentCorrectIndex !== indexToToggle,
				)
			: [...question.correctIndexes, indexToToggle];

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

					<LengthWarning
						value={question.text}
						max={MAX_QUESTION_LENGTH}
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
										title={isCorrect ? "Верен отговор" : "Маркирай като верен"}>
										<input
											type="checkbox"
											id={checkId}
											className="option-row__check"
											checked={isCorrect}
											onChange={() => toggleCorrect(optionIndex)}
										/>

										<span className="visually-hidden">
											{isCorrect ? "Верен" : "Неверен"}, отговор {optionIndex + 1}
										</span>
									</label>

									<label
										htmlFor={inputId}
										className="visually-hidden">
										Отговор {optionIndex + 1}
									</label>

									<div className="option-row__input-wrapper">
										<input
											id={inputId}
											type="text"
											className={`quiz-input option-row__input ${isCorrect ? "option-row__input--correct" : ""}`}
											placeholder={`Отговор ${optionIndex + 1}`}
											value={option.text}
											onChange={e => updateOption(option.id, e.target.value)}
											maxLength={MAX_OPTION_LENGTH}
										/>

										<LengthWarning
											value={option.text}
											max={MAX_OPTION_LENGTH}
										/>
									</div>

									<button
										type="button"
										className="button button--sm button--ghost option-row__delete"
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
					className="button button--sm quiz-add-option-button"
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
	revealed,
}: {
	question: Question;
	index: number;
	revealed: boolean;
}) {
	const [chosen, setChosen] = useState<number[]>([]);

	function toggle(optionIndex: number) {
		if (revealed) {
			return;
		}

		setChosen(previousChosen =>
			previousChosen.includes(optionIndex)
				? previousChosen.filter(currentIndex => currentIndex !== optionIndex)
				: [...previousChosen, optionIndex],
		);
	}

	function getOptionClass(optionIndex: number) {
		const isChosen = chosen.includes(optionIndex);
		const isCorrect = question.correctIndexes.includes(optionIndex);

		if (!revealed) {
			return isChosen ? "preview-option--chosen" : "";
		}

		if (isCorrect && isChosen) {
			return "preview-option--correct";
		} else if (isCorrect && !isChosen) {
			return "preview-option--missed";
		} else if (!isCorrect && isChosen) {
			return "preview-option--wrong";
		}

		return "";
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
					{question.options.map((option, optionIndex) => {
						const optionClass = getOptionClass(optionIndex);

						const isChosen = chosen.includes(optionIndex);

						return (
							<label
								key={option.id}
								className={`preview-option ${optionClass}`}>
								<input
									type="checkbox"
									className="preview-option__check"
									checked={isChosen}
									onChange={() => toggle(optionIndex)}
									disabled={revealed}
								/>

								{option.text ? (
									option.text
								) : (
									<em className="placeholder-text">(Без текст)</em>
								)}

								{revealed && question.correctIndexes.includes(optionIndex) && (
									<IconCheck
										size={16}
										className="preview-option__indicator preview-option__indicator--correct"
										aria-label="Верен отговор"
									/>
								)}

								{revealed &&
									isChosen &&
									!question.correctIndexes.includes(optionIndex) && (
										<IconX
											size={16}
											className="preview-option__indicator preview-option__indicator--wrong"
											aria-label="Грешен отговор"
										/>
									)}
							</label>
						);
					})}
				</div>
			)}
		</article>
	);
}

export function QuizBuilder() {
	const [mode, setMode] = useState<Mode>("edit");
	const [title, setTitle] = useState("Нов тест");
	const [questions, setQuestions] = useState<Question[]>([]);
	const [quizRevealed, setQuizRevealed] = useState(false);
	const [resetKey, setResetKey] = useState(0);

	function addQuestion() {
		setQuestions(previousQuestions => [
			...previousQuestions,
			{ id: crypto.randomUUID(), text: "", options: [], correctIndexes: [] },
		]);
	}

	function updateQuestion(id: string, updated: Question) {
		setQuestions(previousQuestions =>
			previousQuestions.map(question => (question.id === id ? updated : question)),
		);
	}

	function deleteQuestion(id: string) {
		setQuestions(previousQuestions =>
			previousQuestions.filter(question => question.id !== id),
		);
	}

	function moveQuestion(id: string, direction: "up" | "down") {
		setQuestions(previousQuestions => {
			const questionIndex = previousQuestions.findIndex(
				question => question.id === id,
			);

			if (questionIndex < 0) {
				return previousQuestions;
			}

			const targetIndex =
				direction === "up" ? questionIndex - 1 : questionIndex + 1;

			if (targetIndex < 0 || targetIndex >= previousQuestions.length) {
				return previousQuestions;
			}

			const nextQuestions = [...previousQuestions];

			[nextQuestions[questionIndex], nextQuestions[targetIndex]] = [
				nextQuestions[targetIndex],
				nextQuestions[questionIndex],
			];

			return nextQuestions;
		});
	}

	function handleCheckAll() {
		setQuizRevealed(true);
	}

	function handleResetAll() {
		setQuizRevealed(false);

		setResetKey(key => key + 1);
	}

	function handleModeToggle() {
		setMode(currentMode => {
			if (currentMode === "preview") {
				setQuizRevealed(false);

				setResetKey(key => key + 1);
			}

			return currentMode === "edit" ? "preview" : "edit";
		});
	}

	const isPreview = mode === "preview";

	return (
		<div className="quiz-builder">
			<div className="quiz-header-bar">
				{isPreview ? (
					<div className="quiz-header-bar__preview-title">
						<p className="quiz-title-preview">
							{title ?? <span className="placeholder-text">(Без заглавие)</span>}
						</p>
					</div>
				) : (
					<QuizHeader
						title={title}
						onChange={setTitle}
					/>
				)}

				<button
					type="button"
					className="button button--primary"
					onClick={handleModeToggle}>
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
							key={`${question.id}-${resetKey}`}
							question={question}
							index={index}
							revealed={quizRevealed}
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

				{isPreview && questions.length > 0 && (
					<div className="quiz-check-bar">
						{!quizRevealed ? (
							<button
								type="button"
								className="button button--primary"
								onClick={handleCheckAll}>
								Провери теста
							</button>
						) : (
							<button
								type="button"
								className="button"
								onClick={handleResetAll}>
								Нулирай
							</button>
						)}
					</div>
				)}
			</main>

			<QuizStats questions={questions} />
		</div>
	);
}
