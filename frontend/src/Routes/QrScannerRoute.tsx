import { QrCodeScannerComponent } from "@components/Qrcode/QrCodeScanner";

export const QrScannerRoute = () => {
  // let;s add some commment about what we are doing here here is what we are doing here t


  return (
    <>
      <div className="flex justify-center items-center h-screen  ">
        <QrCodeScannerComponent />
      </div>
    </>
  );
};
