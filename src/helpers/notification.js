import toast from "react-hot-toast";

export const showSuccessMsg = (msg = "") => {
  toast.success(msg);
};

export const showErrorMsg = (msg = "") => {
  toast.error(msg);
};
