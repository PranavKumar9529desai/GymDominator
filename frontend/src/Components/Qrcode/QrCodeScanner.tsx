import { Scanner } from "@yudiel/react-qr-scanner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/ui/card";
import { QrCode } from "lucide-react";
import { useNavigate } from "react-router";
export default function QRCodeScannerComponent() {
  const navigate = useNavigate();

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
              onScan={(result) => {
                console.log("result of the qrcode is ", result);
                navigate("/dashboard/attendance/todaysattendance");
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
