import { TodayAttendance } from "@components/Attendance/Todaysattendance";

export default function TodaysAttendanceRoute() {
  return (
    <div className="w-full h-screen flex justify-center items-top lg:items-center">
      <TodayAttendance streak={20} entryTime="9 Am" />
    </div>
  );
}
