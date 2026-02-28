import { Link } from "@tanstack/react-router";
import { difficultyClassModifier, exercises } from "../config/exercises";
import { IconArrowRight } from "../components/Icons";
import "./Home.css";

function Home() {
	return (
		<main className="home-page">
			<div className="home-main">
				<nav aria-label="Упражнения">
					<ol className="exercises-list">
						{exercises.map(exercise => (
							<li key={exercise.id}>
								<Link
									to={exercise.path}
									className="exercise-card"
									aria-label={`Упражнение ${exercise.id}: ${exercise.title}, трудност ${exercise.difficulty}`}>
									<div
										className="exercise-card__num"
										aria-hidden="true">
										{String(exercise.id).padStart(2, "0")}
									</div>

									<div className="exercise-card__body">
										<h2 className="exercise-card__title">{exercise.title}</h2>
									</div>

									<div className="exercise-card__right">
										<span
											className={`difficulty-badge difficulty-badge--${difficultyClassModifier[exercise.difficulty]}`}
											aria-hidden="true">
											{exercise.difficulty}
										</span>
										<IconArrowRight className="exercise-card__arrow" />
									</div>
								</Link>
							</li>
						))}
					</ol>
				</nav>
			</div>
		</main>
	);
}

export default Home;
