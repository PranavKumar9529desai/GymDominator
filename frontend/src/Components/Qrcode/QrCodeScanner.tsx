import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";

export const QrCodeScannerComponent = () => {
  const navigate = useNavigate();

  function handleScan() { 
  
    console.log("this component is called");

    navigate("/dashboard/workouts");
  }

  return (
    <>
      <div className="w-60">
        <Scanner
          onScan={() => {
            console.log("handle scan is called");
            handleScan();
          }}
        />
      </div>
    </>
  );
};
