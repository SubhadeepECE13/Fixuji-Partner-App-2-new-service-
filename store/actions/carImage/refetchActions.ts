import { AppDispatch } from "@/store/Store";
import { fetchOrderDetailsByDocId } from "../orders/OrderAction";

export const triggerOrderRefetch =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      console.log("Refetching order details for:", id);
      await dispatch(fetchOrderDetailsByDocId(id));
    } catch (error) {
      console.error("Failed to refetch order:", error);
    }
  };
