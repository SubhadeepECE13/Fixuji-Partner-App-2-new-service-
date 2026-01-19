import { Dropdown } from "@/@types/global";
import { AttendanceDay } from "@/store/actions/attendance/attendance.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AttendanceState {
  attendances: AttendanceDay[] | null;
  todayAttendance: AttendanceDay | null;
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
    setAttendances: (state, action: PayloadAction<AttendanceDay[] | null>) => {
      state.attendances = action.payload;
    },
    setTodaysAttendance: (state, action: PayloadAction<AttendanceDay | null>) => {
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
