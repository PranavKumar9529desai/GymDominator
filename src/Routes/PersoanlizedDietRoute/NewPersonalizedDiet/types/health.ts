export interface HealthData {
	weight: number;
	height: number;
	age: number;
	goal: string;
	fullname: string;
	gender: "male" | "female" | "other";
}

export interface HealthProfile {
	weight: number;
	height: number;
	age: number;
	goal: string;
	fullname: string;
	gender: string;
}
