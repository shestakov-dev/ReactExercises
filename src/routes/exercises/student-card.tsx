import { createFileRoute } from "@tanstack/react-router";
import StudentCardPage from "../../pages/StudentCardPage";

export const Route = createFileRoute("/exercises/student-card")({
	component: StudentCardPage,
});
