import { QRCodeSVG } from "qrcode.react";
// import { GymdominatorLogo } from "@assets/gym-launch-logo.png";
export const QrCodeComponent = () => {
  return (
    <>
      <QRCodeSVG
        value={"https://gymdominator.vercel.app"}
        title={"Title for my QR Code"}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        marginSize={0}
        imageSettings={{
          src: "https://dox5krzvmlbv8.cloudfront.net/assets/hero.jpg",
          x: undefined,
          y: undefined,
          height: 24,
          width: 24,
          opacity: 1,
          excavate: true,
        }}
      />
    </>
  );
};
