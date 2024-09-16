import { toast } from "react-toastify";

export function toasterError(errorText: string) {
  toast.error(errorText);
}