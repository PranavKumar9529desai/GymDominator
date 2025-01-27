import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "sonner";
import { useEffect, useCallback } from "react";

export function UpdatePrompt() {
	const {
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegisteredSW(swUrl: string) {
			console.log("SW Registered at:", swUrl);
		},
		onRegisterError(error: Error) {
			console.error("SW registration failed:", error);
		},
		registerType: "autoUpdate",
	});

	// Check for updates when user focuses the window
	useEffect(() => {
		const onFocus = () => updateServiceWorker(false);
		window.addEventListener("focus", onFocus);
		return () => window.removeEventListener("focus", onFocus);
	}, [updateServiceWorker]);

	const handleUpdate = useCallback(() => {
		updateServiceWorker(true);
	}, [updateServiceWorker]);

	const handleDismiss = useCallback(() => {
		setNeedRefresh(false);
	}, [setNeedRefresh]);

	useEffect(() => {
		if (needRefresh) {
			toast.info("New version available!", {
				description: "Click to update to the latest version",
				action: {
					label: "Update",
					onClick: handleUpdate,
				},
				onDismiss: handleDismiss,
			});
		}
	}, [needRefresh, handleUpdate, handleDismiss]);

	return null;
}
