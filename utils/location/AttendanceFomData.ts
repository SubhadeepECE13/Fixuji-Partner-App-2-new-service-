import { AttendancePayload } from "@/store/actions/attendance/attendance.types";


export const buildAttendanceFormData = (
  payload: AttendancePayload,
  type: "checkin" | "checkout"
) => {
  const formData = new FormData();

  formData.append("vendorId", String(payload.vendorId));
  formData.append("attendanceDate", payload.attendanceDate);

  if (type === "checkin") {
    formData.append("checkInGeoLocation", payload.geoLocation);
    formData.append("checkInDecodedAddress", payload.decodedAddress);
  } else {
    formData.append("checkOutGeoLocation", payload.geoLocation);
    formData.append("checkOutDecodedAddress", payload.decodedAddress);
  }

  if (payload.image) {
    formData.append(
      type === "checkin" ? "checkInImage" : "checkOutImage",
      payload.image as any
    );
  }

  return formData;
};
