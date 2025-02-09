import { Scanner } from '@yudiel/react-qr-scanner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { QrCode } from 'lucide-react';
import { useNavigate } from 'react-router';

interface QrValueType {
  AttendanceAction: {
    // dummy actions
    name: string;
    action: string;
  };
  OnboardingAction: {
    gymname: string;
    gymid: string;
    hash: string;
  };
}

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
                      console.log('Onbording action data:', parsedData.AttendanceAction);
                      // do the user attachment backend call
                      navigate(
                        `/onboarding/beforegymenrollment?gymname=${gymname}&hash=${hash}&gymid=${gymid}`
                      );
                    }
                    console.log('Parsed data:', parsedData);
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
          <p className="text-sm text-gray-500 w-full text-center">- powered by GymNavigator.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
