import { useState, useId, type ReactNode } from "react";
import StudentCard from "./StudentCard";
import { IconSearch } from "./Icons";
import "./FilterableStudentList.css";

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	label?: string;
	placeholder?: string;
	id?: string;
}

export function SearchInput({
	value,
	onChange,
	label = "Търси",
	placeholder = "Търси...",
	id,
}: SearchInputProps) {
	const generatedId = useId();
	const inputId = id ?? generatedId;

	return (
		<div className="search-wrapper">
			<label
				htmlFor={inputId}
				className="form-label">
				{label}
			</label>

			<div
				className="search-field"
				role="none">
				<IconSearch className="search-field__icon" />

				<input
					id={inputId}
					type="search"
					className="search-field__input"
					placeholder={placeholder}
					value={value}
					onChange={e => onChange(e.target.value)}
				/>
			</div>
		</div>
	);
}

interface FilterableListProps<T> {
	items: T[];
	filterFn: (item: T, query: string) => boolean;
	renderItem: (item: T) => ReactNode;
	keyFn: (item: T) => string | number;
	searchLabel?: string;
	searchPlaceholder?: string;
	emptyAllMessage?: ReactNode;
	noResultsMessage?: (query: string) => ReactNode;
	searchId?: string;
	listAriaLabel?: string;
}

export function FilterableList<T>({
	items,
	filterFn,
	renderItem,
	keyFn,
	searchLabel = "Търси",
	searchPlaceholder = "Търси...",
	emptyAllMessage,
	noResultsMessage,
	searchId,
	listAriaLabel = "Резултати",
}: FilterableListProps<T>) {
	const [query, setQuery] = useState("");

	const trimmedQuery = query.trim();
	const filtered = items.filter(item => filterFn(item, trimmedQuery));

	return (
		<div className="filterable-list">
			<SearchInput
				value={query}
				onChange={setQuery}
				label={searchLabel}
				placeholder={searchPlaceholder}
				id={searchId}
			/>

			<p
				className="visually-hidden"
				aria-live="polite"
				aria-atomic="true">
				{filtered.length === 0
					? "Няма намерени резултати"
					: `${filtered.length} резултата намерени`}
			</p>

			{items.length === 0 && emptyAllMessage ? (
				<p
					className="filterable-list__empty"
					role="status">
					{emptyAllMessage}
				</p>
			) : filtered.length === 0 ? (
				<p
					className="filterable-list__empty"
					role="status">
					{noResultsMessage
						? noResultsMessage(trimmedQuery)
						: `Няма намерени резултати за "${trimmedQuery}"`}
				</p>
			) : (
				<ul
					className="filterable-list__results"
					aria-label={listAriaLabel}>
					{filtered.map(item => (
						<li key={keyFn(item)}>{renderItem(item)}</li>
					))}
				</ul>
			)}
		</div>
	);
}

// Student example (for the exercise to count as complete)
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

function FilterableStudentList() {
	return (
		<FilterableList
			items={STUDENTS}
			filterFn={(student, query) =>
				student.name.toLowerCase().includes(query.toLowerCase())
			}
			renderItem={student => (
				<StudentCard
					name={student.name}
					grade={student.grade}
					averageScore={student.averageScore}
				/>
			)}
			keyFn={student => student.id}
			searchLabel="Търси по име"
			searchPlaceholder="Име на ученик"
			noResultsMessage={query => `Няма намерени ученици за "${query}"`}
			listAriaLabel="Списък с ученици"
		/>
	);
}

export default FilterableStudentList;
