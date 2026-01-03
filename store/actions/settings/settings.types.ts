export type FixedSearchSettingsResponse = {
  success: true;
  data: {
    data: SettingsResponse[];
    totalRecords: number;
    currentPageNumber: number;
    pageSize: number;
    lastPageNumber: number;
  };
  message: string;
};

export type SettingsResponse = {
  id: number;
  ivrAlertFlag: boolean;
  ivrMissedFlag: boolean;
  primaryIvrNumber: string;
  sendWhatsappAlerts: string;
  staffIvrNumber: string;
  timeRange: string;
  calculationMethod: string;
  roundingMethod: string;
  roundingPrecision: number;
  commissionPercentage: number;
};
