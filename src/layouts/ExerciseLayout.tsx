import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import "./ExerciseLayout.css";
import { difficultyClassModifier, getExerciseById } from "../config/exercises";

interface ExerciseLayoutProps {
	exerciseId: number;
	children: ReactNode;
}

function ExerciseLayout({ exerciseId, children }: ExerciseLayoutProps) {
	const exercise = getExerciseById(exerciseId);

	if (!exercise) {
		return <div>Упражнението не е намерено</div>;
	}

	const { id, title, difficulty, description, hint, codeExample } = exercise;
	return (
		<div className="exercise-page">
			<header className="exercise-topbar">
				<div className="exercise-topbar__inner">
					<nav aria-label="Навигация">
						<Link
							to="/"
							className="exercise-topbar__back"
							aria-label="Назад към всички упражнения">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true">
								<path d="M19 12H5M12 19l-7-7 7-7" />
							</svg>
							Всички упражнения
						</Link>
					</nav>

					<div
						className="exercise-topbar__sep"
						aria-hidden="true"
					/>

					<span className="exercise-topbar__label">{title}</span>
				</div>
			</header>

			<div className="exercise-body">
				<aside
					className="exercise-aside"
					aria-label="Описание на задачата">
					<p className="exercise-aside__number">Задача {id}</p>
					<h1 className="exercise-aside__title">{title}</h1>

					<div className="exercise-aside__meta">
						<span
							className={`difficulty-badge difficulty-badge--${difficultyClassModifier[difficulty]}`}
							aria-label={`Трудност: ${difficulty}`}>
							{difficulty}
						</span>
					</div>

					<div
						className="exercise-aside__rule"
						aria-hidden="true"
					/>

					<p className="exercise-aside__section">Описание</p>
					<div className="exercise-aside__desc">
						<p>{description}</p>
						{codeExample && (
							<pre className="exercise-aside__code">
								<code>{codeExample}</code>
							</pre>
						)}
					</div>

					{hint && (
						<div
							className="exercise-aside__hint"
							role="note"
							aria-label="Подсказка">
							<p className="exercise-aside__hint-label">Подсказка</p>
							<p>{hint}</p>
						</div>
					)}
				</aside>

				<section
					className="exercise-demo"
					aria-label="Демо на задачата">
					<p className="exercise-demo__label">Демо</p>

					{children}
				</section>
			</div>
		</div>
	);
}

export default ExerciseLayout;
