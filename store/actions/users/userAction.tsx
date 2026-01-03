import { AppDispatch } from "@/store/Store";

import { LOGIN } from "@/store/API";
import { appAxios } from "@/store/apiconfig";
import { clearUser, setError } from "@/store/reducers/users/userSlice";
import { tokenStorage, userStorage } from "@/store/Storage";
import { resetAndNavigate } from "@/utils/Helpers";
import { setUser } from "../../reducers/users/userSlice";
import { UserAuthResponse, UserResponse } from "./users.types";

interface Login {
  username: string;
  password: string;
}

export interface SettingsResponse {
  mainUrl: string;
  phoneNumberForNotifications: number[];
  quality: number;
  tolerance: {
    time: number;
    distance: number;
  };
  messageFlag: boolean;
  paymentLink: string;
  callMaskingNumber: string;
  permissionFlag: {
    ivr: boolean;
    image_click: boolean;
    update_service: boolean;
  };
  version: string;
  appLink: string;
}

export const login = (data: Login) => async (dispatch: AppDispatch) => {
  try {
    const res = await appAxios.post<UserAuthResponse>(LOGIN, data);

    if (!res.data.success) {
      dispatch(setError(res.data.message));
      return;
    }

    const { accessToken, permission } = res.data.data;

    tokenStorage.set("accessToken", accessToken);
    tokenStorage.set("permissionToken", permission);

    resetAndNavigate("/(routes)/dashboard");
  } catch (error: any) {
    console.log("Login error:", error?.response?.data || error.message);

    dispatch(setError(error?.response?.data?.message || "Invalid credentials"));
  }
};

export const logout = () => (dispatch: any) => {
  tokenStorage.clearAll();
  userStorage.clearAll();

  dispatch(clearUser());

  resetAndNavigate("/(routes)/login");
};

// export const getUserData = () => async (dispatch: AppDispatch) => {
//   try {
//     console.log("user details called");

//     const res = await appAxios.get<UserResponse>("/api/v1/me");

//     if (res.data.success) {
//       dispatch(setUser(res.data.user));
//     } else {
//       logout();
//     }
//   } catch (error) {
//     dispatch(setError("Failed to fetch user data"));
//     logout();
//   }
// };

export const getUserData = () => async (dispatch: AppDispatch) => {
  try {
    const res = await appAxios.get<UserResponse>("/auth/get-user-details");

    if (res.data.success) {
      const userWithId = {
        ...res.data.data.user,
        id: res.data.data.user.id,
      };
      dispatch(setUser(userWithId));
    } else {
      logout();
    }
  } catch (error) {
    dispatch(setError("Failed to fetch user data"));
    logout();
  }
};
