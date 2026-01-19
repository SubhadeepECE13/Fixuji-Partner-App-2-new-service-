export interface AttendancePayload {
  vendorId: number;
  attendanceDate: string;
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

// Define the main interface for the attendance record
export interface AttendanceCheckInReq {
  date: string; // Format: 'YYYY-MM-DD'
  clock_in: string; // Format: 'HH:mm'
  checkin_geolocation: string; // JSON stringified Geolocation
  checkin_distance: number | null;
  checkin_area: number | null; // 'null' if selectedRegion is 'office', otherwise the region ID
  checkin_attendance_place: string;
  checkin_attachment: Attachment;
}

// Define the main interface for the attendance record
export interface AttendanceCheckOutReq {
  date: string; // Format: 'YYYY-MM-DD'
  clock_out: string; // Format: 'HH:mm'
  checkout_geolocation: string; // JSON stringified Geolocation
  checkout_distance: number | null;
  checkout_area: number | null; // 'null' if selectedRegion is 'office', otherwise the region ID
  checkout_attendance_place: string;
  checkout_attachment: Attachment;
}

// Employee interface
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
  birth_date: string; // ISO Date string
  joining_date: string | null; // ISO Date string or null
  company_id: number;
  department_id: number;
  designation_id: number;
  office_shift_id: number;
  remaining_leave: number;
  total_leave: number;
  hourly_rate: number;
  basic_salary: number;
  employment_type: string;
  leaving_date: string | null; // ISO Date string or null
  marital_status: string;
  facebook: string | null;
  skype: string | null;
  whatsapp: string | null;
  twitter: string | null;
  linkedin: string | null;
  created_at: string; // ISO Date string
  updated_at: string; // ISO Date string
  deleted_at: string | null; // ISO Date string or null
  password: string;
  role_id: number;
  reporting_to: number;
  time_zone: string | null;
  currency: string | null;
  is_all_warehouses: string; // "0" or "1"
}

// Company interface
export interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  created_at: string; // ISO Date string
  updated_at: string; // ISO Date string
  deleted_at: string | null; // ISO Date string or null
}

// Attendance interface
 export interface Attendance {
  id: number;
  user_id: number;
  company_id: number;
  employee_id: number;
  date: string; // Format: 'YYYY-MM-DD'
  clock_in: string; // Format: 'HH:mm'
  clock_in_ip: string;
  clock_out: string; // Format: 'HH:mm'
  clock_out_ip: string;
  clock_in_out: number;
  depart_early: string; // Format: 'HH:mm'
  late_time: string; // Format: 'HH:mm'
  overtime: string; // Format: 'HH:mm'
  total_work: string; // Format: 'HH:mm'
  total_rest: string; // Format: 'HH:mm'
  status: string; // e.g., 'present'
  created_at: string; // ISO Date string
  updated_at: string; // ISO Date string
  deleted_at: string | null; // ISO Date string or null
  checkin_geolocation: string; // JSON stringified Geolocation
  checkout_geolocation: string; // JSON stringified Geolocation
  checkin_distance: string; // Numeric value as string
  checkin_area: number;
  checkin_attachment: string; // URL or path to attachment
  checkin_attendance_place: string;
  checkout_area: string; // Assuming it's a string based on the JSON
  checkout_attachment: string; // URL or path to attachment
  checkout_attendance_place: string;
  checkout_distance: string; // Numeric value as string
  employee: Employee;
  company: Company;
}

// Pagination interface
export interface Pagination {
  totalRows: number;
  currentPage: number;
  perPage: number;
}

// Overall response interface
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
