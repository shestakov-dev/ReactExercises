import { createFileRoute } from "@tanstack/react-router";
import { AccordionPage } from "../../pages/AccordionPage";

export const Route = createFileRoute("/exercises/accordion")({
	component: AccordionPage,
});
