export interface AttendancePayload {
  vendorId: number;
  geoLocation: string;    
  decodedAddress: string;
  image?: {
    uri: string;
    name: string;
    type: string;
  };
};
export interface Attachment {
  uri: string;
  type: string;
  name: string;
}


export interface AttendanceCheckInReq {
  date: string;
  clock_in: string; 
  checkin_geolocation: string; 
  checkin_distance: number | null;
  checkin_area: number | null; 
  checkin_attendance_place: string;
  checkin_attachment: Attachment;
}


export interface AttendanceCheckOutReq {
  date: string; 
  clock_out: string;
  checkout_geolocation: string; 
  checkout_distance: number | null;
  checkout_area: number | null; 
  checkout_attendance_place: string;
  checkout_attachment: Attachment;
}

export interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  country: string;
  city: string | null;
  province: string | null;
  zipcode: string | null;
  address: string | null;
  gender: string;
  resume: string | null;
  avatar: string;
  document: string | null;
  birth_date: string; 
  joining_date: string | null; 
  company_id: number;
  department_id: number;
  designation_id: number;
  office_shift_id: number;
  remaining_leave: number;
  total_leave: number;
  hourly_rate: number;
  basic_salary: number;
  employment_type: string;
  leaving_date: string | null; 
  marital_status: string;
  facebook: string | null;
  skype: string | null;
  whatsapp: string | null;
  twitter: string | null;
  linkedin: string | null;
  created_at: string; 
  updated_at: string; 
  deleted_at: string | null; 
  password: string;
  role_id: number;
  reporting_to: number;
  time_zone: string | null;
  currency: string | null;
  is_all_warehouses: string; 
}


export interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  created_at: string;
  updated_at: string; 
  deleted_at: string | null; 
}


 export interface Attendance {
  id: number;
  user_id: number;
  company_id: number;
  employee_id: number;
  date: string; 
  clock_in: string; 
  clock_in_ip: string;
  clock_out: string;
  clock_out_ip: string;
  clock_in_out: number;
  depart_early: string;
  late_time: string;
  overtime: string; 
  total_work: string; 
  total_rest: string; 
  status: string; 
  created_at: string; 
  updated_at: string; 
  deleted_at: string | null; 
  checkin_geolocation: string;
  checkout_geolocation: string; 
  checkin_distance: string;
  checkin_area: number;
  checkin_attachment: string;
  checkin_attendance_place: string;
  checkout_area: string; 
  checkout_attachment: string; 
  checkout_attendance_place: string;
  checkout_distance: string; 
  employee: Employee;
  company: Company;
}


export interface Pagination {
  totalRows: number;
  currentPage: number;
  perPage: number;
}


 export interface AttendanceResponse {
  attendances: Attendance[];
  totalRows: number;
  currentPage: number;
  perPage: number;
}

export interface RequestBody {
  body: {
    user_id: string;
    start_date: string;
    end_date: string;
  };
  isToday: boolean;
}

export interface AttendanceSegment {
  id: number;
  attendanceDayId: number;
  segmentType: "OVERTIME" | "REGULAR" | string;
  checkInTime: string; 
  checkOutTime: string; 
  shiftCheckInTime: string;
  shiftCheckOutTime: string; 
  durationMinutes: number;
  checkInImage: string;
  checkOutImage: string;
  checkInGeoLocation: string; 
  checkOutGeoLocation: string; 
  checkInDecodedAddress: string;
  checkOutDecodedAddress: string;
  isManager: boolean;
  managerId: number | null;
  source: "VENDOR" | "EMPLOYEE" | string;
}
export interface AttendanceDay {
  id: number;
  attendanceDate: string; 
  status: "PRESENT" | "ABSENT" | "LEAVE" | string;
  shiftStatus: "DEFAULT_SHIFT" | string;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED" | string;
  earlyCheckInTotalMinutes: number;
  lateCheckOutTotalMinutes: number;
  lateCheckInTotalMinutes: number;
  earlyCheckOutTotalMinutes: number;
  extraTimeTotalMinutes: number;
  isCalculated: boolean;
  attendanceSegments: AttendanceSegment[];
}


export interface MarkAttendanceFixedSearchResponse {
  success: boolean;
  data: {
    data: AttendanceDay[];
  };
}