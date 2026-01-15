import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FixedSearchLeaveTypeResponse } from "@/store/actions/leave/leave.types";

type LeaveTypeState = {
  data: FixedSearchLeaveTypeResponse | null;
  error: string | null;
};

const initialState: LeaveTypeState = {
  data: null,
  error: null,
};

const leaveTypeSlice = createSlice({
  name: "leaveType",
  initialState,
  reducers: {
    setLeaveType(state, action: PayloadAction<FixedSearchLeaveTypeResponse>) {
      state.data = action.payload;
      state.error = null;
    },
    setLeaveTypeError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearLeaveType(state) {
      state.data = null;
      state.error = null;
    },
  },
});

export const { setLeaveType, setLeaveTypeError, clearLeaveType } =
  leaveTypeSlice.actions;
export default leaveTypeSlice.reducer;
