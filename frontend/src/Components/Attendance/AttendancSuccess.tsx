import GreenTickImage from "@assets/green-tick-icon.png";
export default function AttendanceConfirmation() {
  const name = "Pranavkumar";
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center min-h-[500px] flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-6">Attendance</h1>
        <p className="mb-8 text-xl text-gray-600">
          {name}, we successfully marked your attendance
        </p>
        <div className="mb-4">
          <div className="inline-block p-4 bg-green-100 rounded-full animate-pulse">
            <img
              src={GreenTickImage}
              alt="Attendance marked"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
        </div>
        <p className="text-2xl font-semibold mb-8">{date}</p>
      </div>
      <div className="flex flex-col space-y-4">
        <button
          //   onClick={handleSeeWorkouts}
          className="w-full px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          See today's workouts
        </button>
        <button
          //   onClick={handleCheckProgress}
          className="w-full px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition-colors"
        >
          Check progress
        </button>
      </div>
    </div>
  );
}