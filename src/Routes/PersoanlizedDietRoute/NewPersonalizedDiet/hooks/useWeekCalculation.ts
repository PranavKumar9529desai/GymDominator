import { useMemo } from "react";

export const useWeekCalculation = (startDate: Date | null) => {
	return useMemo(() => {
		if (!startDate) return { currentWeek: 1, isWeekLocked: true };

		const now = new Date();
		const diffTime = Math.abs(now.getTime() - startDate.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		const currentWeek = Math.min(Math.ceil(diffDays / 7), 4);

		return {
			currentWeek,
			isWeekLocked: false,
		};
	}, [startDate]);
};
