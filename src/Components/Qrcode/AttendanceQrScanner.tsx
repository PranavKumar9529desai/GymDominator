import { Scanner } from "@yudiel/react-qr-scanner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { QrCode } from "lucide-react";
import { MarkAttendance } from "@routes/QrScannerRoute/MarkAttedance";

interface QrValueType {
  AttendanceAction: {
    gymname: string;
    gymid: number;
    timestamp: string;
  };
}

async function handleAttendanceAction(data: QrValueType) {
  console.log("Handling attendance action:", data);
  const now = new Date();
  now.setMinutes(0, 0, 0);
  const scannedTime = new Date(data.AttendanceAction.timestamp);
  
  if (now.getTime() === scannedTime.getTime()) {
    try {
      const response = await MarkAttendance();
      if (response.success) {
        console.log("Attendance marked successfully");
      } else {
        console.error("Failed to mark attendance:", response.error);
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  } else {
    console.log("QR code has expired");
  }
}

export default function AttendanceQRScanner() {

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <CardHeader className="bg-blue-600 text-white py-6">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center space-x-2">
            <QrCode className="w-8 h-8" />
            <span>Scan Attendance QR</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col items-center justify-center p-6 space-y-6">
          <div className="w-full aspect-square relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 z-10 border-4 border-blue-400 rounded-2xl animate-pulse"></div>
            <div className="absolute inset-0 z-20 border-2 border-white"></div>
            <Scanner
              onScan={(results) => {
                if (results && results.length > 0) {
                  const result = results[0];
                  const rawValue = result.rawValue;
                  console.log("Raw value of the QR code is:", rawValue);

                  try {
                    const parsedData: QrValueType = JSON.parse(rawValue);
                    if (parsedData.AttendanceAction) {
                      handleAttendanceAction(parsedData);
                    }
                  } catch (error) {
                    console.error("Failed to parse QR code:", error);
                  }
                }
              }}
              onError={(error) => {
                console.error("Error scanning QR code:", error);
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 py-4">
          <p className="text-sm text-gray-500 w-full text-center">
            - powered by gymdominator.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
