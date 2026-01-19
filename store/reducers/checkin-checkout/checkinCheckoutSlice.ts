import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

import { submitAttendanceAPI } from "@/utils/attendanceAPI";
import {
  AttendanceFormPayload,
  createAttendanceFormData,
} from "@/utils/location/AttendanceFomData";

import { RootState } from "@/store/Store";
import { getAttendance } from "@/store/actions/attendance/attendance.actions";

export const submitAttendance = createAsyncThunk<
  any,
  {
    type: "checkin" | "checkout";
    payload: AttendanceFormPayload;
  },
  { state: RootState; rejectValue: string }
>(
  "checkinCheckout/submitAttendance",
  async ({ type, payload }, { dispatch, rejectWithValue }) => {
    try {
      const formData = createAttendanceFormData(payload, type);

      const response = await submitAttendanceAPI(type, formData);

      Toast.show({
        type: "success",
        text1:
          type === "checkin"
            ? "Checked in successfully"
            : "Checked out successfully",
      });

      dispatch(getAttendance(Number(payload.vendorId)) as any);

      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.errorMessage ||
        error?.response?.data?.message ||
        "Something went wrong";

      Toast.show({
        type: "error",
        text1: message,
      });

      return rejectWithValue(message);
    }
  }
);

const checkinCheckoutSlice = createSlice({
  name: "checkinCheckout",
  initialState: {
    loading: false,
    success: false,
    error: null as string | null,
  },
  reducers: {
    resetCheckinCheckoutState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAttendance.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitAttendance.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { resetCheckinCheckoutState } = checkinCheckoutSlice.actions;

export default checkinCheckoutSlice.reducer;
