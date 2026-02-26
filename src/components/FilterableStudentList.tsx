import { useState } from "react";
import StudentCard from "./StudentCard";
import "./FilterableStudentList.css";

interface Student {
	id: number;
	name: string;
	grade: string;
	averageScore: number;
}

const STUDENTS: Student[] = [
	{ id: 1, name: "Иван Петров", grade: "11А", averageScore: 5.62 },
	{ id: 2, name: "Мария Иванова", grade: "11Б", averageScore: 5.91 },
	{ id: 3, name: "Георги Димитров", grade: "10В", averageScore: 5.4 },
	{ id: 4, name: "Елена Стоянова", grade: "12А", averageScore: 5.98 },
	{ id: 5, name: "Петър Николов", grade: "10А", averageScore: 4.92 },
	{ id: 6, name: "Ана Великова", grade: "11А", averageScore: 5.76 },
	{ id: 7, name: "Димитър Маринов", grade: "12Б", averageScore: 5.31 },
	{ id: 8, name: "Виктория Тодорова", grade: "9В", averageScore: 5.84 },
];

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
	return (
		<div className="search-wrapper">
			<label
				htmlFor="student-search"
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
					id="student-search"
					type="search"
					className="search-field__input"
					placeholder="Име на ученик"
					value={value}
					onChange={e => onChange(e.target.value)}
				/>
			</div>
		</div>
	);
}

function FilterableStudentList() {
	const [query, setQuery] = useState("");

	const filtered = STUDENTS.filter(student =>
		student.name.toLowerCase().includes(query.toLowerCase()),
	);

	return (
		<div className="filterable-list">
			<SearchInput
				value={query}
				onChange={setQuery}
			/>

			<p
				className="visually-hidden"
				aria-live="polite"
				aria-atomic="true">
				{filtered.length === 0
					? "Няма намерени ученици"
					: `${filtered.length} ученика намерени`}
			</p>

			{filtered.length === 0 ? (
				<p
					className="filterable-list__empty"
					role="status">
					Няма намерени ученици за "{query}"
				</p>
			) : (
				<ul
					className="student-list"
					aria-label="Резултати">
					{filtered.map(student => (
						<li
							key={student.id}
							className="student-list__item">
							<StudentCard
								name={student.name}
								grade={student.grade}
								averageScore={student.averageScore}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default FilterableStudentList;
