import { createFileRoute } from "@tanstack/react-router";
import TabsPage from "../../pages/TabsPage";

export const Route = createFileRoute("/exercises/tabs")({
	component: TabsPage,
});
