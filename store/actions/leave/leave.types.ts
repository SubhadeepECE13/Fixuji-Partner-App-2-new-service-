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
export interface LeaveRequestDaysResponse {
  id: number;
  date: Date;
  isHalfDay: boolean;
}
export interface LeaveHistoryResponse {
  id: number;
  refNo: string;
  vendorId: number;
  leaveTypeId: number;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  reason: string;
  leaveRequestDays:LeaveRequestDaysResponse[]
  status: "APPROVED" | "PENDING" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
}
export interface LeaveHistoryPagination {
  data: LeaveHistoryResponse[];
  totalRecords: number;
  currentPageNumber: number;
  pageSize: number;
  lastPageNumber: number;
}
export interface FixedSearchLeaveHistoryResponse {
  success: boolean;
  data: LeaveHistoryPagination;
  message: string;
}

