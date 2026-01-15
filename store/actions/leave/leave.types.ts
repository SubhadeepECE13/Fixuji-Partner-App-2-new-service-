import { IBookingVendorResponse } from "../orders/orders.action";
import { IUser } from "../users/users.types";

export interface ApplyLeaveRequest {
  vendorId: number;
  leaveTypeId: number;
  startDate: string;
  endDate: string;
  reason: string;
  halfDays?: string[];
}

export interface LeaveType {
  id: number;
  value: string;
  allowHalfDay: boolean;
}

export interface FixedSearchLeaveTypeResponse {
  success: boolean;
  data: LeaveType[];
  message: string;
}

export interface LeaveBalanceResponseByVendorIdAndYear {
  id: number;
  year: number;
  quantity: number;
  leaveType: LeaveType;
  vendor: IUser;
}

export interface LeaveBalancePagination {
  data: LeaveBalanceResponseByVendorIdAndYear[];
  totalRecords: number;
  currentPageNumber: number;
  pageSize: number;
  lastPageNumber: number;
}

export interface FixedSearchLeaveBalanceResponse {
  success: boolean;
  data: LeaveBalancePagination;
  message: string;
}
