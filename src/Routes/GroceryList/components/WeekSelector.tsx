interface Props {
  currentWeek: number;
  onWeekChange: (week: number) => void;
}

export function WeekSelector({ currentWeek, onWeekChange }: Props) {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => onWeekChange(Math.max(1, currentWeek - 1))}
        disabled={currentWeek === 1}
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:bg-gray-300"
      >
        Previous Week
      </button>
      <span className="font-medium">Week {currentWeek}</span>
      <button
        onClick={() => onWeekChange(Math.min(4, currentWeek + 1))}
        disabled={currentWeek === 4}
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:bg-gray-300"
      >
        Next Week
      </button>
    </div>
  );
}
