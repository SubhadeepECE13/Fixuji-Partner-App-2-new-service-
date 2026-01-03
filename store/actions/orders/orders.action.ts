interface Vendor {
  vendor_name: string;
  vendor_img: string;
  vendor_description: string;
}

interface Variant {
  default: boolean;
  display_price: number;
  actual_price: number;
  vehicle_type: string;
  sort_order: number;
}

interface Location {
  address_type: string;
  id: string;
  full_address: string;
}

interface UserData {
  customer_zone: string;
  phoneNumber: string;
  displayName: string;
  customer_source: string;
  navigateAddressLink: string;
}

interface DateInfo {
  date: number;
  month: string;
  year: number;
  time: string;
  day: string;
  full_date: string;
}

interface OrderTimeStamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface Order {
  id: string;
  service_name: string;
  vendorId: string;
  customer_zone: string;
  orderDocId: string;
  vendor: Vendor;
  variant: Variant;
  location: Location;
  service_color: string;
  department: string;
  order_id: string;
  userData: UserData;
  date: DateInfo;
  orderTimeStamp?: OrderTimeStamp;
  status: string;
}

export interface GetAllOrders {
  data: {
    data: IBookingResponse[];
    currentPageNumber: number;
    pageSize: number;
    lastPageNumber: number;
  };
}
// export interface GetAllOrdersResponse {
//   success: boolean;
//   data: {
//     data: IBookingResponse[];
//   };
// }

//// new type
export type PERCENTAGEORAMT = "PERCENTAGE" | "AMOUNT";
export type PAYMENT_MODE =
  | "CASH"
  | "UPI"
  | "CHEQUE"
  | "CREDIT_CARD"
  | "DEBIT_CARD"
  | "WALLET"
  | "BANK_TRANSFER";

export type BOOKING_SOURCE = "DOORSTEP" | "STUDIO" | "PICKUP";
export type BOOKING_STATUS =
  | "CREATED"
  | "ASSIGNED"
  | "REASSIGNED"
  | "RESCHEDULED"
  | "ON_THE_WAY"
  | "REACHED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELED";
export type PAYMENT_STATUS =
  | "PAID"
  | "UNPAID"
  | "PARTIAL"
  | "REFUND"
  | "REFUNDED";
export type BOOKING_EVENT_NAME =
  | "ORDER_VENDOR_UPDATED"
  | "ORDER_STATUS_CHANGED"
  | "PACKAGE_UPDATED"
  | "CAPTAIN_CHANGED"
  | "START_JOURNEY"
  | "REACHED_LOCATION"
  | "START_ORDER"
  | "CHANGE_CAPTAIN"
  | "SCHEDULE"
  | "CHANGE_CUSTOMER_VEHICLE"
  | "CHANGE_CUSTOMER_ADDRESS"
  | "CHANGE_BOOKING_TYPE";

export const paymentModeOptions: { id: PAYMENT_MODE; value: string }[] = [
  {
    id: "CASH",
    value: "Cash",
  },
  {
    id: "CHEQUE",
    value: "Cheque",
  },
  {
    id: "UPI",
    value: "UPI",
  },
];
export const discountType: { id: PERCENTAGEORAMT; value: string }[] = [
  {
    id: "AMOUNT",
    value: "Amount",
  },
  {
    id: "PERCENTAGE",
    value: "Percentage",
  },
];

export const bookingType: { id: BOOKING_SOURCE; value: string }[] = [
  {
    id: "DOORSTEP",
    value: "Door Step",
  },
  {
    id: "PICKUP",
    value: "Pick Up",
  },
  {
    id: "STUDIO",
    value: "Studio",
  },
];
export interface IMasterIdName<T = number, V = string>
  extends Omit<IBaseObject, "id"> {
  id?: T;
  name?: V;
}
export type BaseModelAttr =
  | "isActive"
  | "createdBy"
  | "updatedBy"
  | "deletedBy"
  | "canceledBy"
  | "canceledAt"
  | "createdAt"
  | "updatedAt"
  | "deletedAt";

export type TAX_METHOD = "INCLUSIVE" | "EXCLUSIVE";
export type BrandType = "CAR" | "BIKE" | "BOTH";
export type CUSTOMER_TITLE = "MR" | "MRS" | "MISS";
export type GENDER = "MALE" | "FEMALE";
export type ADDON_TYPE = "EXTERIOR" | "INTERIOR" | "POLISH" | "OTHERS";
export type SERVICE_STATUS = "CAR" | "BIKE" | "BOTH";
export interface IBaseObject {
  id: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
}
export interface IMasterDropdown<T = number, V = string> {
  id?: T;
  value?: V;
}
export interface IDetailsItem {
  value: string;
}
export interface IDisclaimerItem {
  value: string | number;
}

export interface IServiceCommon {
  name: string;
  color: string;
  appDisplay: boolean;
  electricityCharges: number;
  notificationInterval: number;
  reminderInterval: number;
  showInHomepage: boolean;
  sortOrder: number;

  description?: string | null;
  disclaimer?: IDisclaimerItem[] | [];
  details: IDetailsItem[];
}
export interface IServiceResponse extends IServiceCommon, IBaseObject {
  type: SERVICE_STATUS;
}

export interface IBookingAddonResponse extends IBaseObject {
  bookingId: number;
  addonId: number;
  addonName: string;
  actualPrice: number;
  displayPrice: number;
  duration: number;
}
export interface IBookingStatusHistories {
  id: number;
  bookingId: number;
  newStatus: BOOKING_STATUS;
  order: number;
  changedAt: Date;
  changedById: number | null;
  remarks: string | null;
  event: string | null;
}
export interface IBookingChargesResponse extends IBaseObject {
  bookingId: number;
  chargeTypeId: number;
  chargeName: string;
  chargeAmount: number;
  chargeDesc: string | null;
}
export interface IVendorCommon {
  vendorName: string;
  vendorPhone: string;
  voterId: string;
  aadharNumber: string;
  addressLine1: string;
  addressLine2?: string | null;
  bankName: string;
  drivingLicense: string;
  pinCode: string;
  password?: string;
  confirmPassword?: string;
  dateOfJoining: Date;
  rating?: number;
}
export interface IVendorResponse extends IVendorCommon, IBaseObject {
  id: number;
  city: IMasterDropdown;
  area: IMasterDropdown;
  status: string;
  vendorImg?: string | null;
}
export interface IBookingCaptainResponse
  extends Omit<IVendorResponse, "city" | "area"> {
  cityId: number;
  areaId: number;
}

export interface IBookingVendorResponse extends IBaseObject {
  vendor: IBookingCaptainResponse;
  commissionAmount?: number | undefined;
}

export interface IBookingCommon {
  bookingDate: Date;
  bookingTime: Date;
  makeAdvancedPayment: boolean;
  referralCode?: string | null;
  couponCode?: string | null;
  remarks?: string | null;
  discountValue?: number | null;
  advancePayment?: number | null;
  taxMethod: TAX_METHOD;
  taxValue: number;
  bookingType: BOOKING_SOURCE;
  confirmationMessage: boolean;
}
export interface IChargeDropdown extends IMasterDropdown {
  defaultPrice?: number;
}
export interface ICustomerVehicleBrandResponse {
  id: number;
  manufacturer: string;
  type: BrandType;
}
export interface ICustomerVehicleCommon {
  vehicleNumberPlate?: string | null;
  isDefault: boolean;
  pucExpiryDate?: Date | null;
  insuranceExpiryDate?: Date | null;
  roadTaxExpiryDate?: Date | null;
  registrationExpiryDate?: Date | null;
  insuranceProviderName?: string | null;
  insurancePolicyNumber?: string | null;
}

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}
export interface ICustomerVehicleResponse
  extends ICustomerVehicleCommon,
    IBaseObject {
  id: number;
  model: IMasterDropdown;
  variant: IMasterDropdown;
  brand: ICustomerVehicleBrandResponse;
  vehicleNumberPlateImage?: CustomFile[] | null;
}
export interface ICustomerCommon {
  customerName: string;
  phoneNumber: string;
  altPhoneNumber?: string | null;
  mobileAppDownloaded?: boolean;
  notes?: string | null;

  totalCars?: number | null;
  age: string | null;
  dob?: Date | null;
}
export interface ICustomerResponse extends ICustomerCommon, IBaseObject {
  customerSource?: IMasterDropdown | null;
  doorstepZone?: IMasterDropdown | null;
  city?: IMasterDropdown | null;
  title?: CUSTOMER_TITLE | null;
  gender?: GENDER | null;
  incomeGroup?: IMasterDropdown | null;
  spendingMentality?: IMasterDropdown | null;
  tag?: IMasterDropdown[] | [];
  language?: IMasterDropdown[] | [];
  totalCars?: number | null;
  profession?: IMasterDropdown | null;
  area?: IMasterDropdown | null;
  referredBy?: IMasterDropdown | null;
  lastBookingDate: Date | null;
  rating?: number | null;
  profileImg?: string | null;
}
export interface ICustomerAddressCommon {
  buildingName: string;
  street1?: string | null;
  street2?: string | null;
  landmark: string;
  googleMapsLink?: string | null;
  isDefault: boolean;
}
export interface ICustomerAddressResponse
  extends ICustomerAddressCommon,
    IBaseObject {
  id: number;
  city: IMasterDropdown;
  area: IMasterDropdown;
  doorStepZone: IMasterDropdown;
  addressType: string;
}

export interface IBookingFormData extends IBookingCommon {
  id?: number;
  customerVehicle: ICustomerVehicleResponse;
  discountType: IMasterDropdown<PERCENTAGEORAMT, string> | null;
  paymentMode: IMasterDropdown<PAYMENT_MODE, string> | null;
  customerInfo: ICustomerResponse;
  customerAddress: ICustomerAddressResponse;
  service: IMasterDropdown;
  customer: ICustomerResponse | null;
  addonsList: IAddonPricingSelected[];
  vendor?: IMasterDropdown | null;
  vendorInfo: IVendorResponse;
  charges?: IChargeFormData[] | null;
  duration?: number | null;
  actualPrice?: number | null;
  displayPrice?: number | null;
}
export interface IChargeFormData extends IChargeCommon {
  charge: IChargeDropdown | null;
}
export interface IChargeCommon {
  chargeAmount?: number | null;
  chargeDesc?: string | null;
}
export interface IChargePayload extends IChargeCommon {
  chargeTypeId?: number;
  chargeName?: string;
}
export interface IBookingPayload
  extends Omit<IBookingCommon, "bookingDate" | "bookingTime"> {
  customerAddressId: number;
  customerVehicleId: number;
  captainId?: number | null;
  bookingWeekday: number;
  serviceId: number;
  doorstepZoneId: number;
  departmentId: number;
  areaId: number;
  cityId: number;
  calculatedEta: number;
  serviceAmount: number;
  discountAmount: number;
  taxAmount: number;
  grossAmount: number;
  netAmount: number;
  paidAmount: number;
  customerId: number;
  addonTotalAmount: number;
  chargesTotalAmount: number;
  bookingSource: "ADMIN";
  addons: number[];
  charges?: IChargePayload[] | null;
  bookingDate: string;
  bookingTime: string;
}

export interface IAddon {
  id: number;
  addonName: string;
  addonImage: string | null;
  addonType: ADDON_TYPE;
}
export interface IAddonPricing {
  id: number;
  actualPrice: number;
  displayPrice: number;
  duration: number;
  addon: IAddon;
}
export interface IAddonPricingSelected extends IAddonPricing {
  isSelected: boolean;
}
export interface IPricingMappingResponse {
  id: number;
  actualPrice: number;
  displayPrice: number;
  sortOrder: number;
  duration: number;
  default: boolean;
  addons: IAddonPricing[];
}

export type IBookingPayment = IBaseObject & {
  bookingId: number;
  transactionNo: string;
  bookingAmount: number;
  bankName: string | null;
  chequeNo: string | null;
  cardNo: string | null;
  cardExpiryDate: string | null;
  cardHolderName: string | null;
  paymentDate: string;
  paymentMode: PAYMENT_MODE;
  paymentAmount: number;
};
export interface ICustomerTagResponse {
  id: number;
  name: string;
  description: string;
  colorCode: string;
  isSearchable: boolean;
}
export interface ICustomerBookingResponse extends ICustomerCommon, IBaseObject {
  customerSource?: IMasterIdName | null;
  doorstepZone?: IMasterIdName | null;
  gender?: GENDER | null;
  incomeGroup?: IMasterIdName | null;
  tags?: ICustomerTagResponse[] | [];
  totalCars?: number | null;
  lastBookingDate: Date | null;
  rating?: number | null;
  profileImg?: string | null;
}
export interface IBookingResponse extends IBaseObject {
  orderId: string;
  customerId: number;
  customerAddressId: number;
  customerVehicleId: number;
  bookingDate: Date;
  bookingTime: string;
  bookingType: BOOKING_SOURCE;
  bookingWeekday: number;
  serviceAmount: number;
  addonTotalAmount: number;
  chargesTotalAmount: number;
  discountType: PERCENTAGEORAMT | null;
  discountValue: number;
  discountAmount: number;
  taxMethod: TAX_METHOD;
  taxValue: number;
  taxAmount: number;
  grossAmount: number;
  netAmount: number;
  paidAmount: number;
  initialBookingAmount: number;
  calculatedEta: number;
  isAppBooking: boolean;
  status: BOOKING_STATUS;
  reachedLocation: string | null;
  startLocation: string | null;
  reachedTime: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  startOrderImgUrl: string | null;
  timeDifference: number | null;
  distanceDifference: number | null;
  captainId: number | null;
  bookingSource: "ADMIN";
  remarks: string | null;
  packageConvertedBy: IBookingCaptainResponse | null;
  referralCode: string | null;
  makeAdvancedPayment: boolean;
  canceledAt: Date | null;
  canceledBy: string | null;
  paymentStatus: PAYMENT_STATUS;
  bookingAddons: Omit<IBookingAddonResponse, BaseModelAttr>[];
  bookingCharges: Omit<IBookingChargesResponse, BaseModelAttr>[];
  customer: ICustomerBookingResponse | null;
  customerVehicle: ICustomerVehicleResponse | null;
  bookingAddress:
    | (ICustomerAddressResponse & { customerAddressId: number })
    | null;
  doorstepZone: IMasterDropdown | null;
  area: IMasterDropdown | null;
  city: IMasterDropdown | null;
  department: IMasterDropdown | null;
  service: IServiceResponse | null;
  captain: IBookingCaptainResponse | null;
  bookingVendors: IBookingVendorResponse[];
  bookingStatusHistories: IBookingStatusHistories[];
  bookingPayments: IBookingPayment[];
}
