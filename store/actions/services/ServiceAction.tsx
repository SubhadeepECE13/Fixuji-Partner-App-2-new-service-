// import { appAxios } from "@/store/apiconfig";
// import {
//   fetchAddonsFailure,
//   fetchAddonsStart,
//   fetchAddonsSuccess,
// } from "@/store/reducers/services/addOnsSlice";
// import {
//   fetchServicesFailure,
//   fetchServicesStart,
//   fetchServicesSuccess,
// } from "@/store/reducers/services/serviceSlice";
// import {
//   updateServiceFailure,
//   updateServiceStart,
//   updateServiceSuccess,
// } from "@/store/reducers/services/updateServiceSlice";
// import { AppDispatch } from "@/store/Store";
// import Toast from "react-native-toast-message";
// import { triggerOrderRefetch } from "../carImage/refetchActions";

// export const fetchServices = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(fetchServicesStart());
//     const res = await appAxios.get(`/api/v1/getServices`);

//     const data = Array.isArray(res.data) ? res.data : res.data?.services || [];

//     dispatch(fetchServicesSuccess(data));
//   } catch (error: any) {
//     console.error("Error fetching services:", error);
//     dispatch(fetchServicesFailure(error.message || "Failed to fetch services"));
//     Toast.show({
//       type: "error",
//       text1: "Service fetch failed",
//       text2: error.message || "Please try again",
//     });
//   }
// };

// export const fetchAddonsByService =
//   (service: string, variant: string) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(fetchAddonsStart());

//       const res = await appAxios.get(
//         `/api/v1/getAddonsByService?service=${encodeURIComponent(
//           service
//         )}&variant=${encodeURIComponent(variant)}`
//       );

//       console.log(service, variant);

//       dispatch(fetchAddonsSuccess(res.data?.addons || []));
//     } catch (error: any) {
//       dispatch(fetchAddonsFailure(error.message || "Failed to fetch addons"));
//     }
//   };

// export interface UpdateServicePayload {
//   addons: string[];
//   variant: string;
//   service: string;
//   total: number;
// }

// export const updateServiceDetails =
//   (orderDocId: string, payload: UpdateServicePayload) =>
//   async (dispatch: AppDispatch) => {
//     try {
//       dispatch(updateServiceStart());

//       const finalPayload = {
//         ...payload,
//         addons: payload.addons.map((id) => String(id).trim()).filter(Boolean),
//       };

//       const endpoint = `/api/v1/updateService/${orderDocId}`;
//       console.log("Updating Service:", endpoint);
//       console.log("Final Payload Sent:", finalPayload);

//       const response = await appAxios.put(endpoint, finalPayload);

//       dispatch(updateServiceSuccess(response.data));

//       dispatch(triggerOrderRefetch(orderDocId));

//       Toast.show({
//         type: "success",
//         text1: "Package Updated ",
//         text2: "Service and add-ons updated successfully.",
//       });

//       return response.data;
//     } catch (error: any) {
//       console.error(" updateServiceDetails Error:", error.response || error);

//       dispatch(
//         updateServiceFailure(error?.response?.data?.message || "Update failed")
//       );

//       Toast.show({
//         type: "error",
//         text1: "Update Failed",
//         text2: error?.response?.data?.message || "Something went wrong.",
//       });

//       throw error;
//     }
//   };

import { appAxios } from "@/store/apiconfig";
import { AppDispatch } from "@/store/Store";
import Toast from "react-native-toast-message";
import {
  fetchServicesStart,
  fetchServicesSuccess,
  fetchServicesFailure,
} from "@/store/reducers/services/serviceSlice";
import {
  fetchAddonsStart,
  fetchAddonsSuccess,
  fetchAddonsFailure,
} from "@/store/reducers/services/addOnsSlice";
import {
  updateServiceFailure,
  updateServiceStart,
  updateServiceSuccess,
} from "@/store/reducers/services/updateServiceSlice";

/**
 * 🔹 Fetch Services (NEW API)
 */
export const fetchServices = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchServicesStart());

    const res = await appAxios.post("common/dropdownSearch", {
      shortCode: "SERVICE",
      searchText: "",
      searchColumns: [],
      fixedSearch: {},
      fixedNotSearch: {},
    });

    const services =
      res.data?.data?.map((item: any) => ({
        id: item.id,
        name: item.value,
      })) || [];

    dispatch(fetchServicesSuccess(services));
  } catch {
    dispatch(fetchServicesFailure("Failed to fetch services"));
  }
};

/**
 * 🔹 Fetch Addon + Pricing Mapping (NEW API)
 */
export const fetchAddonServiceVariantMapping =
  (serviceId: number, variantId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchAddonsStart());

      console.log(serviceId, variantId);

      const res = await appAxios.post("/addon-service-variant-mapping", {
        serviceId,
        variantId,
      });

      dispatch(fetchAddonsSuccess(res.data.data));
    } catch (error: any) {
      dispatch(
        fetchAddonsFailure(
          error?.response?.data?.message || "Failed to fetch addons"
        )
      );
    }
  };

export interface UpgradeBookingPayload {
  id: number;
  serviceId: number;
  addons: number[];
  serviceAmount: number;
  addonTotalAmount: number;
  discountAmount: number;
  taxAmount: number;
  grossAmount: number;
  netAmount: number;
  calculatedEta: number;
}

export const upgradeBooking =
  (payload: UpgradeBookingPayload) => async (dispatch: AppDispatch) => {
    try {
      dispatch(updateServiceStart());

      console.log(
        "🚀 Sending booking upgrade payload:\n",
        JSON.stringify(payload, null, 2)
      );

      const res = await appAxios.put("booking/upgrade", payload);

      dispatch(updateServiceSuccess(res.data));

      Toast.show({
        type: "success",
        text1: "Booking Upgraded Successfully",
      });

      return res.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || "Upgrade failed";

      dispatch(updateServiceFailure(message));

      Toast.show({
        type: "error",
        text1: "Upgrade Failed",
        text2: message,
      });

      throw error;
    }
  };
