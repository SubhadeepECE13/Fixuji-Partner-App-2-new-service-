import { Dropdown } from "@/@types/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AttendanceState {
  attendances: Attendance[] | null;
  todayAttendance: Attendance | null;
  success: string | null;
  error: string | null;
}

const initialState: AttendanceState = {
  attendances: null,
  todayAttendance: null,
  success: null,
  error: null,
};
export const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setAttendances: (state, action: PayloadAction<Attendance[] | null>) => {
      state.attendances = action.payload;
    },
    setTodaysAttendance: (state, action: PayloadAction<Attendance | null>) => {
      state.todayAttendance = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string | null>) => {
      state.success = action.payload;
    },
  },
});

export const { setError, setSuccess, setTodaysAttendance, setAttendances } =
  attendanceSlice.actions;

export default attendanceSlice.reducer;
