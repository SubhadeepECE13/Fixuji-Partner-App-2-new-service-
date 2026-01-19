import { AttendanceSegment } from "./attendance.types";


export const mapSegmentsToPunches = (segments: AttendanceSegment[]) => {
  return segments.map((segment) => {
    const [checkInLat, checkInLong] =
      segment.checkInGeoLocation?.split(",").map(Number) ?? [];

    return {
      checkin: {
        time: segment.checkInTime,
        image: segment.checkInImage,
        address: segment.checkInDecodedAddress,
      },
      checkout: segment.checkOutTime
        ? {
            time: segment.checkOutTime,
            image: segment.checkOutImage,
            address: segment.checkOutDecodedAddress,
          }
        : undefined,
      location: {
        geolocation: {
          lat: checkInLat,
          long: checkInLong,
        },
      },
    };
  });
};
