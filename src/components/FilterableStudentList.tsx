import { useState, useId, type ReactNode } from "react";
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

			<div className="search-field">
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
