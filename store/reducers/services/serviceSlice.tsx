// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import { ServiceType } from "@/store/actions/services/services.action";
// import { IBookingResponse } from "@/store/actions/orders/orders.action";

// interface ServiceState {
//   loading: boolean;
//   data: ServiceType[];
//   error: string | null;
// }

// const initialState: ServiceState = {
//   loading: false,
//   data: [],
//   error: null,
// };

// const serviceSlice = createSlice({
//   name: "services",
//   initialState,
//   reducers: {
//     fetchServicesStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchServicesSuccess: (
//       state,
//       action: PayloadAction<IBookingResponse[]>
//     ) => {
//       state.loading = false;
//       state.data = action.payload;
//     },
//     fetchServicesFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     resetServiceState: (state) => {
//       state.loading = false;
//       state.data = [];
//       state.error = null;
//     },
//   },
// });

// export const {
//   fetchServicesStart,
//   fetchServicesSuccess,
//   fetchServicesFailure,
//   resetServiceState,
// } = serviceSlice.actions;

// export default serviceSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ServiceVariant {
  id: number;
  vehicle_type: string;
}

export interface ServiceType {
  id: number;
  name: string;
}

interface ServiceState {
  loading: boolean;
  data: ServiceType[];
  error: string | null;
}

const initialState: ServiceState = {
  loading: false,
  data: [],
  error: null,
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    fetchServicesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchServicesSuccess: (state, action: PayloadAction<ServiceType[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchServicesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchServicesStart,
  fetchServicesSuccess,
  fetchServicesFailure,
} = serviceSlice.actions;

export default serviceSlice.reducer;
