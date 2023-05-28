import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const CustomYesNoAlert = (
  title: string,
  text: string,
  icon: SweetAlertIcon
) => {
  return MySwal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: "Si",
    cancelButtonText: "No",
  });
};

export const CustomResponseAlert = (
  title: string,
  text: string,
  icon: SweetAlertIcon
) => {
  return MySwal.fire({
    title: title,
    text: text,
    icon: icon,
    timerProgressBar: true,
  });
};
