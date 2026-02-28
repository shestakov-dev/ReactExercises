import "./StudentCard.css";

interface StudentCardProps {
	name: string;
	grade: string;
	averageScore: number;
}

export function StudentCard({ name, grade, averageScore }: StudentCardProps) {
	const initials = name
		.split(" ")
		.map(nameSegment => nameSegment[0])
		.join("");

	return (
		<article
			className="student-card"
			aria-label={`Ученик: ${name}`}>
			<div
				className="student-card__avatar"
				aria-hidden="true">
				{initials}
			</div>

			<div className="student-card__info">
				<p className="student-card__name">{name}</p>

				<dl className="student-card__meta">
					<div>
						<dt>Клас:</dt>
						<dd>{grade}</dd>
					</div>

					<div>
						<dt>Успех:</dt>
						<dd>{averageScore.toFixed(2)}</dd>
					</div>
				</dl>
			</div>
		</article>
	);
}
