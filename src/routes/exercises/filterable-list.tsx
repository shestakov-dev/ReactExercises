import { createFileRoute } from "@tanstack/react-router";
import FilterableListPage from "../../pages/FilterableListPage";

export const Route = createFileRoute("/exercises/filterable-list")({
	component: FilterableListPage,
});
