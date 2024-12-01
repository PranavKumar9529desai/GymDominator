import { ChooseAccountibulityPartner } from "@components/ChooseAccountibilitypartner/chooseacpartner";
import { Navbar2 } from "@components/Navbar/Navbar2";

export const ChooseAccountibilityPartnerRoute = () => {
  return (
    <div>
      <div>
        <Navbar2 TextColor="black" />
      </div>
      <div className="">
        <ChooseAccountibulityPartner />
      </div>
    </div>
  );
};
