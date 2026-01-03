import { AppDispatch } from "@/store/Store";
import {
  FixedSearchSettingsResponse,
  SettingsResponse,
} from "./settings.types";
import { appAxios } from "@/store/apiconfig";
import {
  setSettings,
  setSettingsError,
} from "@/store/reducers/settings/settingsSlice";

export const getSettings = () => async (dispatch: AppDispatch) => {
  try {
    const res = await appAxios.post<FixedSearchSettingsResponse>(
      "/common/fixedSearch",
      {
        pageNo: 1,
        pageSize: 10,
        shortCode: "SETTINGS",
        searchColumns: [],
        searchText: "",
        sortBy: "createdAt",
        sortDir: "DESC",
        fixedSearch: {
          isActive: {
            type: "boolean",
            value: [true],
          },
        },
        fixedNotSearch: {},
        includes: {},
      }
    );

    const settings = res.data.data.data[0] ?? null;

    dispatch(setSettings(settings));
  } catch (error) {
    dispatch(setSettingsError("Failed to fetch settings"));
  }
};
