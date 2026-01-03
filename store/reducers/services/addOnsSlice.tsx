// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AddonVariant {
//   vehicle_type: string;
//   duration: number;
//   display_price: number;
//   actual_price: number;
// }

// export interface AddonItem {
//   id: string;
//   addon_name: string;
//   addon_desc?: string;
//   addon_img?: string;
//   addon_type?: string;
//   sort_order?: number;
//   actual_price?: number;
//   commission?: number;
//   recommended?: boolean;
//   variant: AddonVariant[];
// }

// interface AddonState {
//   loading: boolean;
//   data: AddonItem[];
//   error: string | null;
// }

// const initialState: AddonState = {
//   loading: false,
//   data: [],
//   error: null,
// };

// export const addonSlice = createSlice({
//   name: "addons",
//   initialState,
//   reducers: {
//     fetchAddonsStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchAddonsSuccess: (state, action: PayloadAction<AddonItem[]>) => {
//       state.loading = false;
//       state.data = action.payload;
//     },
//     fetchAddonsFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const { fetchAddonsStart, fetchAddonsSuccess, fetchAddonsFailure } =
//   addonSlice.actions;

// export default addonSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AddonInfo {
  id: number;
  addonName: string;
  addonDesc: string;
  addonType: string;
  addonImage: string | null;
  sortOrder: number;
  recommended: boolean;
}

export interface AddonItem {
  id: number; // mapping id
  actualPrice: number;
  displayPrice: number;
  duration: number;
  addon: AddonInfo;
}

export interface AddonPricingMapping {
  id: number;
  actualPrice: number;
  displayPrice: number;
  duration: number;
  default: boolean;
  addons: AddonItem[];
}

interface AddonState {
  loading: boolean;
  data: AddonPricingMapping | null;
  error: string | null;
}

const initialState: AddonState = {
  loading: false,
  data: null,
  error: null,
};

const addonSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    fetchAddonsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAddonsSuccess: (
      state,
      action: PayloadAction<AddonPricingMapping | null>
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchAddonsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchAddonsStart, fetchAddonsSuccess, fetchAddonsFailure } =
  addonSlice.actions;

export default addonSlice.reducer;
