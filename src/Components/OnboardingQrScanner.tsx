import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { MarkAttendance } from '@routes/QrScannerRoute/MarkAttedance';
import { Scanner } from '@yudiel/react-qr-scanner';
import { QrCode } from 'lucide-react';
import { useNavigate } from 'react-router';
interface QrValueType {
  AttendanceAction: {
    gymname: string;
    gymid: number;
    timestamp: string;
  };
  OnboardingAction: {
    gymname: string;
    gymid: string;
    hash: string;
  };
}

async function handleAttendanceAction(data: QrValueType) {
  console.log('Handling attendance action:', data);
  const now = new Date();
  now.setMinutes(0, 0, 0); // Set to current hour
  const scannedTime = new Date(data.AttendanceAction.timestamp);

  if (now.getTime() === scannedTime.getTime()) {
    try {
      // Get userId from your auth context or local storage
      const response = await MarkAttendance();

      if (response.success) {
        console.log('Attendance marked successfully');
        // TODO: Show success message to user
      } else {
        console.error('Failed to mark attendance:', response.error);
        // TODO: Show error message to user
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      // TODO: Show error message to user
    }
  } else {
    console.log('QR code has expired');
    // TODO: Show error message to user
  }
}

export default function QRCodeScannerComponent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <CardHeader className="bg-blue-600 text-white py-6">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center space-x-2">
            <QrCode className="w-8 h-8" />
            <span>Scan QR Code</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col items-center justify-center p-6 space-y-6">
          <div className="w-full aspect-square relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 z-10 border-4 border-blue-400 rounded-2xl animate-pulse" />
            <div className="absolute inset-0 z-20 border-2 border-white" />
            <Scanner
              onScan={(results) => {
                if (results && results.length > 0) {
                  const result = results[0];
                  const rawValue = result.rawValue;
                  console.log('Raw value of the QR code is:', rawValue);

                  // Parse the rawValue if it's a JSON string
                  try {
                    const parsedData: QrValueType = JSON.parse(rawValue);
                    if (parsedData.OnboardingAction) {
                      const { gymname, gymid, hash } = parsedData.OnboardingAction;
                      console.log('Onbording action data:', parsedData.OnboardingAction);
                      // navigate this route
                      navigate(
                        `/onboarding/beforegymenrollment?gymname=${gymname}&hash=${hash}&gymid=${gymid}`
                      );
                    } else if (parsedData.AttendanceAction) {
                      console.log('Attendance action data called : ', parsedData.AttendanceAction);
                      handleAttendanceAction(parsedData);
                    }
                    console.log('Parsed data: is this ', parsedData.AttendanceAction.gymname);
                    // handleAttendanceAction(parsedData);
                    // TODO handle the attendance action
                  } catch (error) {
                    console.error('Failed to parse rawValue:', error);
                  }
                }
              }}
              onError={(error) => {
                console.error('Error scanning QR code:', error);
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 py-4">
          <p className="text-sm text-gray-500 w-full text-center">- powered by gymnavigator.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
