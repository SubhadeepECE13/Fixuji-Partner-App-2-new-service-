import { appAxios } from "@/store/apiconfig";
import {
  setLoading,
  setError,
  setSuccess,
} from "@/store/reducers/leave/leaveSlice";
import { AppDispatch } from "@/store/Store";
import {
  ApplyLeaveRequest,
  FixedSearchLeaveBalanceResponse,
  FixedSearchLeaveTypeResponse,
} from "./leave.types";
import {
  setLeaveTypes,
  setleaveBalance,
} from "@/store/reducers/leave/leaveSlice";

export const applyLeaveApi =
  (data: ApplyLeaveRequest) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await appAxios.post("/leave-request", data);

      if (res.status === 200 || res.status === 201) {
        dispatch(setSuccess("Leave application submitted successfully!"));
        dispatch(setLoading(false));
        return { success: true };
      } else {
        dispatch(setError("Failed to submit leave application"));
        dispatch(setLoading(false));
        return { success: false };
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.message ||
        "Failed to submit leave application. Please try again.";
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
      return { success: false };
    }
  };

export const getLeaveType = () => async (dispatch: AppDispatch) => {
  try {
    const res = await appAxios.post<FixedSearchLeaveTypeResponse>(
      "/common/dropdownSearch",
      {
        shortCode: "LEAVE_TYPE",
        searchColumns: [],
        searchText: "",
        fixedSearch: {
          isActive: {
            type: "boolean",
            value: [true],
          },
        },
        fixedNotSearch: {},
      }
    );

    const leaveTypes = res.data.data ?? [];

    console.log("leaveTypes response from api :::::::::>>>>>>>>>", leaveTypes);

    dispatch(setLeaveTypes(leaveTypes));
  } catch (error) {
    dispatch(setError("Failed to fetch leave types"));
  }
};

export const getLeaveBalanceByVendorIdAndFinancialYear =
  (vendorId: number, leaveTypeId: number, year: number) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await appAxios.post<FixedSearchLeaveBalanceResponse>(
        "/common/fixedSearch",
        {
          pageNo: 1,
          pageSize: 10,
          shortCode: "LEAVE_BALANCE",
          searchColumns: [],
          searchText: "",
          sortBy: "createdAt",
          sortDir: "DESC",
          fixedSearch: {
            isActive: {
              type: "boolean",
              value: [true],
            },
            vendorId: {
              type: "number",
              value: [vendorId],
            },
            leaveTypeId: {
              type: "number",
              value: [leaveTypeId],
            },
            year: {
              type: "number",
              value: [year],
            },
          },
          fixedNotSearch: {},
          includes: {},
        }
      );

      const leaveBalance = res.data.data.data ?? [];

      console.log(
        "Leave Balance Api REsponse By Year And Vendor Id response from api :::::::::>>>>>>>>>",
        leaveBalance
      );

      dispatch(setleaveBalance(leaveBalance));
    } catch (error) {
      dispatch(setError("Failed to fetch leave balance"));
    }
  };
