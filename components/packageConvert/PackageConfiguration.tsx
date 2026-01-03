// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Dropdown } from "react-native-element-dropdown";
// import color from "@/themes/Colors.themes";
// import {
//   windowHeight,
//   windowWidth,
//   fontSizes,
// } from "@/themes/Constants.themes";
// import fonts from "@/themes/Fonts.themes";
// import { RootState } from "@/store/Store";
// import { useSelector } from "react-redux";

// interface Props {
//   serviceOpen: boolean;
//   variantOpen: boolean;
//   service: string | null;
//   variant: string | null;
//   services: { label: string; value: string }[];
//   variants: { label: string; value: string }[];
//   setServiceOpen: (open: boolean) => void;
//   setVariantOpen: (open: boolean) => void;
//   onServiceOpen: () => void;
//   onVariantOpen: () => void;
//   setService: (value: string | null) => void;
//   setVariant: (value: string | null) => void;
// }

// export default function PackageConfiguration({
//   serviceOpen,
//   variantOpen,
//   service,
//   variant,
//   services,
//   variants,
//   setService,
//   setVariant,
// }: Props) {
//   const { orderDetails } = useSelector(
//     (state: RootState) => state.orderDetails
//   );

//   return (
//     <View style={styles.card}>
//       <Text style={styles.sectionHeader}>Configuration</Text>

//       {/* SERVICE DROPDOWN */}
//       <View style={[styles.inputGroup, { zIndex: 3000 }]}>
//         <Text style={styles.label}>Selected Service</Text>

//         <Dropdown
//           style={styles.dropdown}
//           containerStyle={styles.dropdownBox}
//           placeholder="Select Service Type"
//           data={services}
//           labelField="label"
//           valueField="value"
//           value={service ?? orderDetails?.service?.name ?? null}
//           onChange={(item) => setService(item.value)}
//           maxHeight={220}
//         />
//       </View>

//       {/* VARIANT DROPDOWN */}
//       <View style={[styles.inputGroup, { zIndex: 2000 }]}>
//         <Text style={styles.label}>Vehicle Variant</Text>

//         <Dropdown
//           style={styles.dropdown}
//           containerStyle={styles.dropdownBox}
//           placeholder="Select Vehicle Variant"
//           data={variants}
//           labelField="label"
//           valueField="value"
//           value={variant ?? orderDetails?.customerVehicle?.model ?? null}
//           onChange={(item) => setVariant(item.value)}
//           maxHeight={220}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: color.whiteColor,
//     padding: windowWidth(5),
//     borderRadius: windowWidth(4),
//     marginBottom: windowHeight(3),
//   },
//   sectionHeader: {
//     fontSize: fontSizes.md,
//     fontFamily: fonts.bold,
//     color: color.primary,
//     marginBottom: windowHeight(2),
//   },
//   inputGroup: {
//     marginBottom: windowHeight(2),
//   },
//   label: {
//     fontSize: fontSizes.rg,
//     fontFamily: fonts.bold,
//     color: color.primary,
//     marginBottom: windowHeight(1),
//   },
//   dropdown: {
//     borderColor: color.borderBottomColor,
//     borderWidth: 1,
//     borderRadius: windowWidth(3),
//     height: windowHeight(6.5),
//     paddingHorizontal: windowWidth(3),
//   },
//   dropdownBox: {
//     borderColor: color.borderBottomColor,
//     borderRadius: windowWidth(3),
//     maxHeight: 220,
//   },
// });

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import color from "@/themes/Colors.themes";
import {
  windowHeight,
  windowWidth,
  fontSizes,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

interface Props {
  service: string | null;
  services: { label: string; value: string }[];
  setService: (value: string | null) => void;
}

export default function PackageConfiguration({
  service,
  services,
  setService,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionHeader}>Configuration</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Selected Service</Text>

        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownBox}
          placeholder="Select Service"
          data={services}
          labelField="label"
          valueField="value"
          value={service}
          onChange={(item) => setService(item.value)}
          maxHeight={220}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.whiteColor,
    padding: windowWidth(5),
    borderRadius: windowWidth(4),
    marginBottom: windowHeight(3),
  },
  sectionHeader: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
    marginBottom: windowHeight(2),
  },
  inputGroup: {
    marginBottom: windowHeight(2),
  },
  label: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.bold,
    color: color.primary,
    marginBottom: windowHeight(1),
  },
  dropdown: {
    borderColor: color.borderBottomColor,
    borderWidth: 1,
    borderRadius: windowWidth(3),
    height: windowHeight(6.5),
    paddingHorizontal: windowWidth(3),
  },
  dropdownBox: {
    borderColor: color.borderBottomColor,
    borderRadius: windowWidth(3),
    maxHeight: 220,
  },
});
