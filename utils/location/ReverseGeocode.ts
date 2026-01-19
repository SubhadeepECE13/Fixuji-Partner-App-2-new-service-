import * as ExpoLocation from "expo-location";

export const reverseGeocode = async (
  latitude: number,
  longitude: number
) => {
  try {
    const result = await ExpoLocation.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (!result || result.length === 0) return null;

    const address = result[0];

    return {
      fullAddress: [
        address.name,
        address.street,
        address.city,
        address.region,
        address.postalCode,
        address.country,
      ]
        .filter(Boolean)
        .join(", "),

      city: address.city ?? "",
      state: address.region ?? "",
      country: address.country ?? "",
      postalCode: address.postalCode ?? "",
    };
  } catch (error) {
    console.log("Reverse geocode error:", error);
    return null;
  }
};
