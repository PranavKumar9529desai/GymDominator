import axios from "axios";
import { HealthProfileFormData } from "./UserHealthProfileForm";

const PostUserHealthProfileForm = async (formData: HealthProfileFormData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/protected/healthform`,
    formData,
    {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
  );
  return response.data;
};

export default PostUserHealthProfileForm;
