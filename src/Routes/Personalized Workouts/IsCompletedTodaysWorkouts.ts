import axios from "axios";

export const checkWorkoutCompletion = async () => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/workout-completion-status`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			},
		);
		return response.data.completed;
	} catch (error) {
		console.error("Error checking workout completion:", error);
		return false;
	}
};

export const markWorkoutCompleted = async () => {
	try {
		await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/mark-workout-completed`,
			{},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			},
		);
		return true;
	} catch (error) {
		console.error("Error marking workout as completed:", error);
		return false;
	}
};
