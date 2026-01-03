import { LOCK_CALL } from "@/store/API";
import { appAxios } from "@/store/apiconfig";
import {
  sendLocationFailure,
  sendLocationStart,
  sendLocationSuccess,
} from "@/store/reducers/orders/locationSlice";
import {
  fetchOrderDetailsFailure,
  fetchOrderDetailsStart,
  fetchOrderDetailsSuccess,
} from "@/store/reducers/orders/orderDetailesSlice";
import { setIsOrderEnd, setOrders } from "@/store/reducers/orders/orderSlice";
import { setError } from "@/store/reducers/users/userSlice";
import { AppDispatch } from "@/store/Store";
import Toast from "react-native-toast-message";
import { triggerOrderRefetch } from "../carImage/refetchActions";
import { GetAllOrders, IBookingResponse } from "./orders.action";
export interface CallLockRequest {
  callTo: string;
  callFrom: string;
  customerName: string;
  department: string;
}

export interface CallLockResponse {
  success: boolean;
  msg?: string;
  data?: any;
}
export const getAllOrders =
  ({
    limit = 10,
    page = 1,
    search = "",
    status,
  }: {
    limit: number;
    page: number;
    search: string;
    status: string[];
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await appAxios.post<GetAllOrders>("/common/fixedSearch", {
        pageNo: page,
        pageSize: limit,
        shortCode: "BOOKING",
        searchColumns: [],
        searchText: "",
        sortBy: "createdAt",
        sortDir: "DESC",
        fixedSearch: {
          isActive: {
            type: "boolean",
            value: [true],
          },
          status: {
            type: "string",
            value: status,
          },
        },
        fixedNotSearch: {},
        includes: {
          bookingAddons: {
            where: {
              isActive: true,
            },
          },
          bookingCharges: {
            where: {
              isActive: true,
            },
          },
          customer: {
            include: {
              customerTagMappings: true,
            },
          },
          bookingAddress: true,
          customerVehicle: true,
          bookingVendors: {
            where: {
              isActive: true,
            },
          },
          bookingPayments: {
            where: {
              isActive: true,
            },
          },
          bookingStatusHistories: true,
        },
      });

      const { data: orders, currentPageNumber, lastPageNumber } = res.data.data;

      dispatch(setIsOrderEnd(currentPageNumber >= lastPageNumber));
      dispatch(setOrders({ orders, page }));
    } catch (error) {
      dispatch(setError("Failed to fetch order data"));
    }
  };

export const lockCall =
  (callData: CallLockRequest) => async (dispatch: AppDispatch) => {
    console.log("lockCall thunk dispatched with payload:", callData);
    try {
      const res = await appAxios.post<CallLockResponse>(LOCK_CALL, callData);
      console.log("Call lock API response:", res.data);

      if (!res.data.success) {
        dispatch(setError(res.data.msg || "Failed to lock call"));
      }
      return res.data;
    } catch (error) {
      console.error("Call lock API error:", error);
      dispatch(setError("Call lock failed due to server error"));
      return { success: false, msg: "Server Error" };
    }
  };

export const fetchOrderDetailsByDocId =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchOrderDetailsStart());

      const response = await appAxios.post("/common/fetch", {
        shortCode: "BOOKING",
        id,
        includes: {
          bookingAddons: { where: { isActive: true } },
          bookingCharges: { where: { isActive: true } },
          customer: {
            include: {
              customerTagMappings: true,
              customerSource: true,
            },
          },
          bookingAddress: true,
          customerVehicle: true,
          bookingVendors: { where: { isActive: true } },
          bookingPayments: { where: { isActive: true } },
          bookingStatusHistories: true,
        },
      });
      console.log("fetching order details for this id =======>>>>>>", id);

      const booking: IBookingResponse = response.data.data;

      dispatch(fetchOrderDetailsSuccess(booking));
    } catch (error: any) {
      dispatch(
        fetchOrderDetailsFailure(error.message || "Something went wrong")
      );
    }
  };

export const sendLocation =
  (latitude: number, longitude: number, orderDocId: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(sendLocationStart());

      const response = await appAxios.post(
        `api/v1/updateReachedAction/${orderDocId}`,
        {
          latitude,
          longitude,
        }
      );

      dispatch(sendLocationSuccess(response.data));

      Toast.show({
        type: "success",
        text1: "Location Sent",
        text2: "Location updated successfully ",
      });

      await dispatch(triggerOrderRefetch(orderDocId));

      return response.data;
    } catch (error: any) {
      dispatch(
        sendLocationFailure(
          error?.response?.data?.message || "Failed to send location"
        )
      );

      Toast.show({
        type: "error",
        text1: "Sending Failed",
        text2: error?.response?.data?.message || "Something went wrong.",
      });

      throw error;
    }
  };

interface CompleteOrderBody {
  recievePayment: number;
  paymentMethod: "CASH" | "UPI";
  delay?: number;
}

// export const completeOrder = (orderDocId: string, body: CompleteOrderBody) => {
//   return async (dispatch: any) => {
//     try {
//       dispatch(completeOrderStart());

//       const payload = {
//         recievePayment: body.recievePayment,
//         paymentMethod: body.paymentMethod,
//         delay: body.delay ?? 0,
//       };

//       const endpoint = `/api/v1/completeOrder/${orderDocId}`;

//       const response = await appAxios.put(endpoint, payload);

//       dispatch(completeOrderSuccess());

//       return response.data;
//     } catch (err: any) {
//       const msg =
//         err?.response?.data?.message || "Failed to complete order. Try again.";

//       dispatch(completeOrderFail(msg));
//       throw err;
//     }
//   };
// };

// export const startOrder = (orderDocId: string) => {
//   return async (dispatch: any) => {
//     try {
//       dispatch(startOrderStart());

//       const endpoint = `/api/v1/startOrder/${orderDocId}`;

//       const response = await appAxios.post(endpoint);

//       dispatch(startOrderSuccess());

//       dispatch(triggerOrderRefetch(orderDocId));

//       return response.data;
//     } catch (err: any) {
//       const msg =
//         err?.response?.data?.message ||
//         "Failed to start order. Please try again.";

//       dispatch(startOrderFail(msg));

//       dispatch(triggerOrderRefetch(orderDocId));

//       throw err;
//     }
//   };
// };
