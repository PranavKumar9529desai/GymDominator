export const chartOptions = {
	responsive: true,
	interaction: {
		mode: "index" as const,
		intersect: false,
	},
	plugins: {
		title: {
			display: true,
		},
		legend: {
			position: "top" as const,
		},
	},
	scales: {
		y: {
			type: "linear" as const,
			display: true,
			position: "left" as const,
		},
		y1: {
			type: "linear" as const,
			display: true,
			position: "right" as const,
			grid: {
				drawOnChartArea: false,
			},
		},
	},
};
