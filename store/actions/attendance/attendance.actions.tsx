import { appAxios } from "@/store/apiconfig";
import {
  setAttendances,
  setError,
  setSuccess,
  setTodaysAttendance,
} from "@/store/reducers/attendance/attendanceSlice";
import { AppDispatch } from "@/store/Store";

export const checkInApi =
  (formData: FormData) => async (dispatch: AppDispatch) => {
    try {
      // Make the API request
      const res = await appAxios.post("/attendances/checkin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success response
      if (res.status === 201 || res.status === 200) {
        dispatch(setSuccess("Checked in successfully!"));
      } else {
        dispatch(setError("Failed to mark the attendance"));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError("Failed to mark the attendance"));
    }
  };

export const checkOutApi =
  (formData: FormData) => async (dispatch: AppDispatch) => {
    try {
      // Make the API request
      const res = await appAxios.post("/attendances/checkout", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success response
      if (res.status === 201 || res.status === 200) {
        dispatch(setSuccess("Checked out successfully!"));
      } else {
        dispatch(setError("Failed to mark the attendance"));
      }
    } catch (error) {
      dispatch(setError("Failed to mark the attendance"));
    }
  };

export const getAttendanceApi =
  ({ isToday, body }: RequestBody) =>
  async (dispatch: AppDispatch) => {
    try {
      let res = await appAxios.post<AttendanceResponse>(
        `/attendances/attendances-by-user-and-date`,
        body
      );
      if (res.status === 200) {
        if (isToday) {
          dispatch(
            setTodaysAttendance(
              res.data.attendances.length > 0 ? res.data.attendances[0] : null
            )
          );
        } else {
          dispatch(
            setAttendances(
              res.data.attendances.length > 0 ? res.data.attendances : null
            )
          );
        }
      }
    } catch (error) {
      dispatch(setError("Failed to fetch user data"));
    }
  };
