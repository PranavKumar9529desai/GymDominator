import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function MonthProgressComponent2() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8)); // September 2024
  const [_selectedDate, _setSelectedDate] = useState(new Date(2024, 8, 24)); // September 24, 2024

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  const days = getDaysInMonth(currentMonth);
  const firstDayOfMonth = days[0].getDay();

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };


  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Track your progress with GymNavigator</h1>
      <div className="flex justify-between items-center mb-4">
        <button 
          type="button"
          onClick={prevMonth} 
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold">
          {new Date(currentMonth.getFullYear(), currentMonth.getMonth()).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button 
          type="button"
          onClick={nextMonth} 
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => {
          const prevMonthDate = new Date(currentMonth);
          prevMonthDate.setDate(0 - index);
          return (
            <div 
              key={`empty-${prevMonthDate.toISOString()}`} 
              className="h-12" 
            />
          );
        })}
        {days.map((date) => (
          <button
            type="button"
            key={date.toString()}
            className={`h-12 rounded-lg text-sm font-medium transition-colors ${
              isToday(date)
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Monthly Progress</h3>
        <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="bg-primary h-full rounded-full" style={{ width: '7%' }} />
        </div>
        <p className="text-right text-sm text-gray-600 mt-1">7%</p>
      </div>
    </div>
  );
}
