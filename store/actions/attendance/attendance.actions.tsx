import { appAxios } from "@/store/apiconfig";
import {
  setAttendances,
  setError,
  setTodaysAttendance
} from "@/store/reducers/attendance/attendanceSlice";
import { AppDispatch } from "@/store/Store";
import { MarkAttendanceFixedSearchResponse, RequestBody } from "./attendance.types";


export const getAttendanceApi =
  ({ isToday, body }: RequestBody) =>
  async (dispatch: AppDispatch) => {
    try {
      let res = await appAxios.post<MarkAttendanceFixedSearchResponse>(
        `/common/fixedSearch`,
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
