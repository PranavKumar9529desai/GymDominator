import AttendanceFailed from '@components/Attendance/AttendanceFailure';
import AttendanceConfirmation from '@components/Attendance/AttendancSuccess';
import { useState } from 'react';
export const TodaysAttendanceStatusRoute = () => {
  const [AttendanceState] = useState<boolean>(true);

  return AttendanceState ? (
    <div className="h-screen w-full flex justify-center items-center">
      <AttendanceConfirmation />
    </div>
  ) : (
    <div className="h-screen w-full flex justify-center items-center">
      <AttendanceFailed />
    </div>
  );
};
