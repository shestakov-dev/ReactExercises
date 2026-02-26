import { createFileRoute } from "@tanstack/react-router";
import StatusBadgePage from "../../pages/StatusBadgePage";

export const Route = createFileRoute("/exercises/status-badge")({
	component: StatusBadgePage,
});
