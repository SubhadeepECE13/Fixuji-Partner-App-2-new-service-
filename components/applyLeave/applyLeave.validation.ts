import * as Yup from "yup";
import dayjs from "dayjs";

export const applyLeaveValidationSchema = Yup.object().shape({
  leaveType: Yup.string().required("Please select a leave type"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string()
    .required("End date is required")
    .test(
      "is-after-start",
      "End date must be after or equal to start date",
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        return (
          dayjs(value).isAfter(dayjs(startDate)) ||
          dayjs(value).isSame(dayjs(startDate), "day")
        );
      }
    ),
  reason: Yup.string()
    .required("Reason is required")
    .min(10, "Reason must be at least 10 characters"),
});
