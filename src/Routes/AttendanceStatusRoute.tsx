import AttendanceFailed from "@components/Attendance/AttendanceFailure";
import AttendanceConfirmation from "@components/Attendance/AttendancSuccess";
import { useState } from "react";
import { Sidebar2 } from "@components/SideBar/Sidebar2";
import { BottomNavigation } from "@components/Dashboard/PremiumUsersBNC";

export const TodaysAttendanceStatus = () => {
  // TODO   this status will come from the backend
  const [AttendanceState] = useState<boolean>(true);
  if (AttendanceState) {
    return (
      <>
        <div className=" h-screen w-full flex justify-center items-center">
          <AttendanceConfirmation />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="h-screen w-full flex justify-center items-center">
          <AttendanceFailed />
        </div>
      </>
    );
  }
};

export const TodaysAttendanceStatusRoute = () => {
  return (
    <div className="h-screen bg-[#f0f0f0]">
      <div className="lg:grid grid-cols-5 h-screen">
        <div className="col-span-1 hidden lg:block">
          <Sidebar2 />
        </div>
        <div className="lg:hidden block">
          <BottomNavigation />
        </div>

        <div className="col-span-4 overflow-y-auto ">
          <TodaysAttendanceStatus />
        </div>
      </div>
    </div>
  );
};
