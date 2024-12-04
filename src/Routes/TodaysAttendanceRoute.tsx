import { Sidebar2 } from "@components/SideBar/Sidebar2";
import { BottomNavigation } from "@components/Dashboard/PremiumUsersBNC";
import { TodayAttendance } from "@components/Attendance/Todaysattendance";
export default function TodaysAttendanceRoute() {
  return (
    <div className="h-screen bg-[#f0f0f0]">
      <div className="lg:grid grid-cols-5 h-screen">
        <div className="col-span-1 hidden lg:block">
          <Sidebar2 />
        </div>
        <div className="lg:hidden block">
          <BottomNavigation />
        </div>

        <div className="lg:col-span-4 w-full h-screen flex justify-center items-top lg:items-center ">
          <TodayAttendance streak={20} entryTime="9 Am" />
        </div>
      </div>
    </div>
  );
}
