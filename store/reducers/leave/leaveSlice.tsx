import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LeaveBalanceResponseByVendorIdAndYear,
  LeaveType,
} from "@/store/actions/leave/leave.types";

interface LeaveState {
  loading: boolean;
  success: string | null;
  error: string | null;
  leaveTypes: LeaveType[];
  leaveBalance: LeaveBalanceResponseByVendorIdAndYear[];
}

const initialState: LeaveState = {
  loading: false,
  success: null,
  error: null,
  leaveTypes: [],
  leaveBalance: [],
};

export const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string | null>) => {
      state.success = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLeaveTypes: (state, action: PayloadAction<LeaveType[]>) => {
      state.leaveTypes = action.payload;
    },
    setleaveBalance: (
      state,
      action: PayloadAction<LeaveBalanceResponseByVendorIdAndYear[]>
    ) => {
      state.leaveBalance = action.payload;
    },

    resetLeaveState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setSuccess,
  setError,
  setLeaveTypes,
  resetLeaveState,
  setleaveBalance,
} = leaveSlice.actions;

export default leaveSlice.reducer;
