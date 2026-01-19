import { appAxios } from "@/store/apiconfig";
import { AttendanceType } from "./location/AttendanceFomData";


export const submitAttendanceAPI = async (
  type: AttendanceType,
  formData: FormData
) => {
  const url =
    type === "checkin"
      ? "/attendance/check-in"
      : "/attendance/check-out";

  const { data } = await appAxios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
