import axios from "axios";

interface ValidPeriodResponse {
  msg: string;
  user: {
    isValid: boolean;
    startDate: string | null;
    endDate: string | null;
  };
}

export const GetIsValidPeriod = async (): Promise<ValidPeriodResponse> => {
  try {
    const response = await axios.get<ValidPeriodResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/isvalidperiod`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    console.log("User valid period data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user valid period:", error);
    return {
      msg: "Failed to fetch user valid period",
      user: {
        isValid: false,
        startDate: null,
        endDate: null
      }
    };
  }
};
