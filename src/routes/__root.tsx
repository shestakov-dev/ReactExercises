import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<a
				href="#main-content"
				className="skip-link">
				Прескочи към съдържанието
			</a>
			<Outlet />
		</>
	);
}
