import { QrCodeScannerComponent } from "@components/Qrcode/QrCodeScanner";

export const QrScannerRoute = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen  ">
        <QrCodeScannerComponent />
      </div>
    </>
  );
};
