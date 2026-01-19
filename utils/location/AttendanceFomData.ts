export type AttendanceType = "checkin" | "checkout";

interface AttendancePayload {
  vendorId: string;
  geoLocation: string;
  decodedAddress: string;
  imageUri: string;
  isManager:Boolean
}
export type AttendanceFormPayload = {
  vendorId: string;
  geoLocation: string;
  decodedAddress: string;
  imageUri: string;
  isManager: boolean;
};

type FormDataFile = {
  uri: string;
  name: string;
  type: string;
};
export const createAttendanceFormData = (
  payload: AttendanceFormPayload,
  type: AttendanceType
): FormData => {
  const formData = new FormData();


  formData.append("vendorId", payload.vendorId);
  formData.append("isManager", String(payload.isManager));

  const file: FormDataFile = {
    uri: payload.imageUri,
    type: "image/jpeg",
    name: type === "checkin" ? "checkin.jpg" : "checkout.jpg",
  };

  if (type === "checkin") {
    formData.append("checkInGeoLocation", payload.geoLocation);
    formData.append("checkInDecodedAddress", payload.decodedAddress);
    formData.append("checkInImage", file as any);
  } else {
    formData.append("checkOutGeoLocation", payload.geoLocation);
    formData.append("checkOutDecodedAddress", payload.decodedAddress);
    formData.append("checkOutImage", file as any);
  }

  return formData;
};
