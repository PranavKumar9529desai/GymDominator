import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { MarkAttendance } from '@routes/QrScannerRoute/MarkAttedance';
import { Scanner } from '@yudiel/react-qr-scanner';
import { QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../lib/react-query';

interface QrValueType {
  AttendanceAction: {
    gymname: string;
    gymid: number;
    timestamp: string;
  };
}

export default function AttendanceQRScanner() {
  const navigate = useNavigate();

  async function handleAttendanceAction(data: QrValueType) {
    console.log('Handling attendance action:', data);

    // Get current time in UTC
    const now = new Date();
    const currentUTC = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours()
    );

    // Convert scanned timestamp to UTC
    const scannedTime = new Date(data.AttendanceAction.timestamp);
    const scannedUTC = Date.UTC(
      scannedTime.getUTCFullYear(),
      scannedTime.getUTCMonth(),
      scannedTime.getUTCDate(),
      scannedTime.getUTCHours()
    );

    // Add logging for debugging
    console.log('Current UTC time:', new Date(currentUTC).toISOString());
    console.log('Scanned QR UTC time:', new Date(scannedUTC).toISOString());

    const toleranceInHours = 1; // Allow up to 1 hour difference
    const timeDiff = Math.abs(currentUTC - scannedUTC) / (1000 * 60 * 60);

    if (timeDiff <= toleranceInHours) {
      try {
        const response = await MarkAttendance();
        if (response.success) {
          const isrevalidated = await queryClient.invalidateQueries({
            queryKey: ['attendance'],
          });
          console.log('isrevalidated', isrevalidated);
          navigate('/dashboard/attendance/success');
        } else {
          navigate('/dashboard/attendance/failure');
        }
      } catch (error) {
        console.error('Error marking attendance:', error);
        navigate('/dashboard/attendance/failure');
      }
    } else {
      console.log('QR code has expired. Time difference in hours:', timeDiff);
      navigate('/dashboard/attendance/failure');
    }
  }

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

                  try {
                    const parsedData: QrValueType = JSON.parse(rawValue);
                    if (parsedData.AttendanceAction) {
                      handleAttendanceAction(parsedData);
                    }
                  } catch (error) {
                    console.error('Failed to parse QR code:', error);
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
