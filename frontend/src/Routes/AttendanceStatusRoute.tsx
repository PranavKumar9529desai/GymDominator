import AttendanceFailed from "@components/Attendance/AttendanceFailure";
import AttendanceConfirmation from "@components/Attendance/AttendancSuccess";
import { useState } from "react";

export const AttendanceStatus = () => {
  // TODO   this status will come from the backend
  const [AttendanceState] = useState<boolean>(true);
  if (AttendanceState) {
    return (
      <>
        <div className=" h-screen w-screen flex justify-center items-center">
          <AttendanceConfirmation />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="h-screen w-screen flex justify-center items-center">
          <AttendanceFailed />
        </div>
      </>
    );
  }
};
