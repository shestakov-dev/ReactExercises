import { createFileRoute } from "@tanstack/react-router";
import { ClassroomPage } from "../../pages/ClassroomPage";

export const Route = createFileRoute("/exercises/classroom")({
	component: ClassroomPage,
});
