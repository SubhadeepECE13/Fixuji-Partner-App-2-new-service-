import { appAxios } from "@/store/apiconfig";
import {
  setAttendances,
  setError,
  setTodaysAttendance,
} from "@/store/reducers/attendance/attendanceSlice";
import { AppDispatch } from "@/store/Store";
import { MarkAttendanceFixedSearchResponse } from "./attendance.types";

export const getAttendance =
  (vendorId: number, page: number = 1, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await appAxios.post<MarkAttendanceFixedSearchResponse>(
        "/common/fixedSearch",
        {
          pageNo: page,
          pageSize: limit,
          shortCode: "ATTENDANCE_DAY",
          searchColumns: [],
          searchText: "",
          sortBy: "createdAt",
          sortDir: "DESC",
          fixedSearch: {
            // attendanceDate: {
            //   type: "string",
            //   value: [TodayDate],
            // },
            vendorId: {
              type: "number",
              value: [vendorId],
            },
          },
          fixedNotSearch: {},
          includes: {
            attendanceSegments: {
              where: {
                isActive: true,
              },
            },
          },
        }
      );

      const attendances = res.data.data.data ?? [];

      dispatch(setAttendances(attendances));

      dispatch(setTodaysAttendance(attendances[0] ?? null));
    } catch (error) {
      dispatch(setError("Failed to fetch attendance"));
    }
  };
