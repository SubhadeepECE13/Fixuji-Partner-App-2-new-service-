import Toast from "react-native-toast-message";
import { AppDispatch } from "@/store/Store";
import { appAxios } from "@/store/apiconfig";
import { getAllOrders } from "../orders/OrderAction";
import { triggerOrderRefetch } from "../carImage/refetchActions";
import { PAYMENT_MODE } from "../orders/orders.action";

export type StartJourneyEventPayload = {
  bookingId: number;
  staffs: number[];
  captainId: number;
};

export type StartJourneyPayload = {
  events: {
    name: "START_JOURNEY";
    payload: StartJourneyEventPayload;
  }[];
};

export const startJourney =
  (payload: StartJourneyPayload, refreshParams?: any) =>
  async (dispatch: AppDispatch) => {
    try {
      const formData = new FormData();
      formData.append("events", JSON.stringify(payload.events));
      const response = await appAxios.put("/booking/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Start journey form data", formData);

      Toast.show({
        type: "success",
        text1: "Journey started successfully",
      });

      if (refreshParams) {
        await dispatch(getAllOrders(refreshParams));
      }

      return response.data;
    } catch (error: any) {
      console.error("startJourney Error:", {
        status: error.response?.status,
        data: error.response?.data,
      });

      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Failed to start journey",
      });

      throw error;
    }
  };

// REACHED_LOCATION

export type ReachedLocationPayload = {
  bookingId: number;
  lat: number;
  long: number;
};

export const reachedLocation =
  (
    payload: ReachedLocationPayload,
    refreshParams?: {
      city: string;
      limit: number;
      page: number;
      search: string;
      status: string;
      operand: string;
    }
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const events = [
        {
          name: "REACHED_LOCATION",
          payload,
        },
      ];

      console.log("REACHED_LOCATION events:", JSON.stringify(events, null, 2));

      const formData = new FormData();
      formData.append("events", JSON.stringify(events));

      const response = await appAxios.put("/booking/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Toast.show({
        type: "success",
        text1: "Reached location successfully",
      });
      await dispatch(triggerOrderRefetch(String(payload.bookingId)));

      return response.data;
    } catch (error: any) {
      console.error("reachedLocation Error:", {
        status: error.response?.status,
        data: error.response?.data,
      });

      Toast.show({
        type: "error",
        text1:
          error.response?.data?.message || "Failed to update reached location",
      });

      throw error;
    }
  };

export type StartOrderPayload = {
  bookingId: number;
  lat: number;
  long: number;
  image: {
    uri: string;
    name: string;
    type: string;
  };
};

export const startOrder =
  (payload: StartOrderPayload, orderDocId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const events = [
        {
          name: "START_ORDER",
          payload: {
            bookingId: payload.bookingId,
            lat: payload.lat,
            long: payload.long,
          },
        },
      ];

      console.log("START_ORDER events:", JSON.stringify(events, null, 2));

      const formData = new FormData();
      formData.append("events", JSON.stringify(events));
      formData.append("image", payload.image as any);

      const res = await appAxios.put("/booking/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Toast.show({
        type: "success",
        text1: "Order started successfully",
      });

      await dispatch(triggerOrderRefetch(orderDocId));

      return res.data;
    } catch (error: any) {
      console.error("START_ORDER error:", error?.response?.data || error);

      Toast.show({
        type: "error",
        text1: "Failed to start order",
      });

      throw error;
    }
  };

export interface PaymentItem {
  paymentMode: PAYMENT_MODE;
  paymentAmount: number;
  cardNo?: string;
  cardExpiryDate?: string;
  cardHolderName?: string;
}

export interface CompleteOrderPayload {
  bookingId: number;
  payments: PaymentItem[];
  totalAmount: number;
  collectorId: number;
}

export const completeOrder =
  (payload: CompleteOrderPayload) => async (dispatch: AppDispatch) => {
    try {
      console.log("CompleteOrderPayload:", payload);
      console.log(
        "booking id for order completipon =========defhuivbdashfbgdaf====================>>>>>>>>>>>",
        payload
      );
      await appAxios.post("/booking/complete", payload);

      Toast.show({
        type: "success",
        text1: "Order completed successfully",
      });
      await dispatch(triggerOrderRefetch(String(payload.bookingId)));
      return true;
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed to complete order",
        text2: error?.response?.data?.message || "Something went wrong",
      });
      throw error;
    }
  };
