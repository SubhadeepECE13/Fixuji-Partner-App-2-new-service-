export interface IFeatureFlag {
  update_service_flag: boolean;
  click_image_flag: boolean;
  ivr_flag: boolean;
}

export interface IMappingData {
  id: number;
  value: string;
}

export interface IMapping {
  mappingId: number;
  data: IMappingData;
}

export interface IUser {
  id: number;
  userId: number;
  name: string;
  username: string;
  imgUrl: string | null;
  userType: string;
}

export interface UserDetailsData {
  user: IUser;
  currentRole: IMapping;
  roles: IMapping[];
  currentArea: IMapping;
  areas: IMapping[];
  currentDept: IMapping;
  depts: IMapping[];
}

export interface UserResponse {
  success: true;
  data: UserDetailsData;
  message: string;
}

export interface AuthSuccessResponse {
  success: true;
  data: {
    accessToken: string;
    permission: string;
  };
  message: string;
}

export interface AuthErrorResponse {
  success: false;
  message: string;
}

export type UserAuthResponse = AuthSuccessResponse | AuthErrorResponse;
