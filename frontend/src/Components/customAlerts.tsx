import Swal, { SweetAlertIcon } from "sweetalert2";
import { NavigateFunction } from "react-router-dom";



const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast: any) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const coustomAlert = (icon: SweetAlertIcon, message: string) => {
  Toast.fire({
    icon: icon,
    title: message,
  });
};

export const coustomLogoutAlert = (navigate: NavigateFunction) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to logout!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "logged out!",
        text: "sucessfully logged out.",
        icon: "success",
      }).then(() => {
        // navigate("/signin");
        localStorage.removeItem("jwt");
        navigate("/signin");
        // window.location.href = "/signin";
      });
    }
  });
};

export const coustomWarningMsg = (navigate: NavigateFunction) => {
  Swal.fire({
    title: "Enroll in the 24 weeks challenge",
    text: "we will track your progress along the way",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "No",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Sucessfully Enrolled",
        text: "Welcome to 24 weeks challenge!🎉",
        confirmButtonText: "get started",
        icon: "success",
      }).then(() => {
        navigate("/dashboard/myprogress");
      });
    }
  });
};

export const DescriptionModal = async () => {
  const result = await Swal.fire({
    input: "textarea",
    title: "Share your interests, skills, or any fun facts here...",
    inputPlaceholder: "Type your description here...",
    inputAttributes: {
      "aria-label": "Anthing you like to share...",
    },
    showCancelButton: true,
  });

  if (result.isConfirmed) {
    await handleDescriptionSubmit(result.value);
  }
};
