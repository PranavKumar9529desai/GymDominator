import AttendanceQRScanner from "@components/Qrcode/AttendanceQrScanner";
import { MainLayout } from "@layouts/MainLayout";

export function QrScannerRoute() {
  return (
    <MainLayout>
      <AttendanceQRScanner />
    </MainLayout>
  );
}
