// import React, { forwardRef, useMemo } from "react";
// import { Text, StyleSheet } from "react-native";
// import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
// import ModernDatePicker from "react-native-modern-datepicker";
// import CustomBottomSheetModal from "@/components/common/CustomBottomSheetModal";
// import color from "@/themes/Colors.themes";
// import fonts from "@/themes/Fonts.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";

// interface Props {
//   title: string;
//   selectedDate: string;
//   minimumDate: string;
//   onDateChange: (date: string) => void;
// }

// const DatePickerBottomSheet = forwardRef<BottomSheetModal, Props>(
//   ({ title, selectedDate, minimumDate, onDateChange }, ref) => {
//     const snapPoints = useMemo(() => ["70%"], []);

//     return (
//       <CustomBottomSheetModal
//         ref={ref}
//         snapPoints={snapPoints}
//         initialSnapPoint={0}
//         enablePanDownToClose
//       >
//         <BottomSheetView style={styles.header}>
//           <Text style={styles.headerText}>{title}</Text>
//         </BottomSheetView>

//         <BottomSheetView style={styles.container}>
//           <ModernDatePicker
//             mode="datepicker"
//             selected={selectedDate}
//             minimumDate={minimumDate}
//             onDateChange={onDateChange}
//             options={{
//               backgroundColor: color.whiteColor,
//               textHeaderColor: color.primary,
//               selectedTextColor: color.whiteColor,
//               mainColor: color.primary,
//               textSecondaryColor: color.regularText,
//               borderColor: color.lightGray,
//             }}
//           />
//         </BottomSheetView>
//       </CustomBottomSheetModal>
//     );
//   }
// );

// export default DatePickerBottomSheet;

// const styles = StyleSheet.create({
//   header: {
//     paddingVertical: windowHeight(1.5),
//     justifyContent: "center",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: color.borderBottomColor,
//     backgroundColor: color.whiteColor,
//   },
//   headerText: {
//     fontSize: fontSizes.md,
//     fontFamily: fonts.bold,
//     color: color.primary,
//   },
//   container: {
//     padding: windowWidth(2),
//     alignItems: "center",
//   },
// });
import React, { forwardRef, useMemo, useState } from "react";
import { Text, StyleSheet, Platform, View } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import CustomBottomSheetModal from "@/components/common/CustomBottomSheetModal";
import dayjs from "dayjs";
import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";

interface Props {
  title: string;
  selectedDate?: string;
  minimumDate?: string;
  onDateChange: (date: string) => void;
}

const DatePickerBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ title, selectedDate, minimumDate, onDateChange }, ref) => {
    const snapPoints = useMemo(() => ["40%"], []);
    const [tempDate, setTempDate] = useState<Date>(
      selectedDate ? dayjs(selectedDate).toDate() : new Date()
    );

    const handleChange = (event: DateTimePickerEvent, date?: Date) => {
      if (event.type === "set" && date) {
        setTempDate(date);
        onDateChange(dayjs(date).format("YYYY-MM-DD"));
      }
    };

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        initialSnapPoint={0}
        enablePanDownToClose
      >
        <View>
          <BottomSheetView style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
          </BottomSheetView>

          <BottomSheetView style={styles.container}>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              minimumDate={
                minimumDate ? dayjs(minimumDate).toDate() : undefined
              }
              onChange={handleChange}
              style={styles.picker}
            />
          </BottomSheetView>
        </View>
      </CustomBottomSheetModal>
    );
  }
);

export default DatePickerBottomSheet;

const styles = StyleSheet.create({
  header: {
    paddingVertical: windowHeight(1.5),
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: color.borderBottomColor,
    backgroundColor: color.whiteColor,
  },
  headerText: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
  },
  container: {
    padding: windowWidth(3),
    alignItems: "center",
  },
  picker: {
    width: "100%",
  },
});
