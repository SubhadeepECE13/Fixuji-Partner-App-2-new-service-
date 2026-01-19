import { submitAttendanceAPI } from "@/utils/attendanceAPI";
import { AttendanceFormPayload, createAttendanceFormData } from "@/utils/location/AttendanceFomData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";


export const submitAttendance = createAsyncThunk(
  "attendance/submit",
  async (
    {
      type,
      payload,
    }: {
      type: "checkin" | "checkout";
      payload: AttendanceFormPayload;
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = createAttendanceFormData(payload, type);
      const response = await submitAttendanceAPI(type, formData);


      Toast.show({
        type: "success",
        text1: type === "checkin" ? "Checked in successfully" : "Checked out successfully",
      });

      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.errorMessage ||
        error?.response?.data?.message ||
        "Something went to much wrong";

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
    todayAttendance: null as any,
  },
  reducers: {
    resetAttendance: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.todayAttendance = action.payload;
      })
      .addCase(submitAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAttendance } = checkinCheckoutSlice.actions;
export default checkinCheckoutSlice.reducer;
