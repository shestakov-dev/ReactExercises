import { createFileRoute } from "@tanstack/react-router";
import { QuizBuilderPage } from "../../pages/QuizBuilderPage";

export const Route = createFileRoute("/exercises/quiz-builder")({
	component: QuizBuilderPage,
});
