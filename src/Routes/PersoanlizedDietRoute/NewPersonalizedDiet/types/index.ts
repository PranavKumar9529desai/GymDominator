export interface HealthData {
  weight: number;
  height: number;
  age: number;
  goal: string;
  fullname: string;
}

export interface WeekProgress {
  currentWeek: number;
  isWeekLocked: boolean;
  startDate: Date;
}
