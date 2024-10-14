import QRCodeScannerComponent from "@components/Qrcode/QrCodeScanner";
export const QrScannerRoute = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen  ">
        <QRCodeScannerComponent />
      </div>
    </>
  );
};
