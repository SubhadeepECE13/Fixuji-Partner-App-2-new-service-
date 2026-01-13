import { Href, router } from "expo-router";
import dayjs from "dayjs";
export const resetAndNavigate = (newPath: Href) => {
  if (router.canGoBack()) {
    router.dismissAll();
  }
  router.replace(newPath);
};

export const calculateDays = (
  startDate?: string | Date,
  endDate?: string | Date
): number => {
  if (!startDate || !endDate) return 0;

  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (!start.isValid() || !end.isValid()) return 0;

  return end.diff(start, "day") + 1;
};
