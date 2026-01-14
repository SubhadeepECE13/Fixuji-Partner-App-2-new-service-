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
import React, { useEffect, useMemo, useState } from "react";
import { Text, StyleSheet, Platform, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
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
  visible: boolean;
  selectedDate?: string;
  minimumDate?: string;
  onDateChange: (date: string) => void;
  onClose?: () => void;
}

const DatePickerBottomSheet = ({
  title,
  visible,
  selectedDate,
  minimumDate,
  onDateChange,
  onClose,
}: Props) => {
  const initialDate = useMemo(
    () => (selectedDate ? dayjs(selectedDate).toDate() : new Date()),
    [selectedDate]
  );
  const [tempDate, setTempDate] = useState<Date>(initialDate);

  useEffect(() => {
    // When opening the picker, sync local state with latest selectedDate
    if (visible) setTempDate(initialDate);
  }, [visible, initialDate]);

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    // Android emits "dismissed" or "set". iOS keeps emitting "set" while scrolling.
    if (event.type === "dismissed") {
      onClose?.();
      return;
    }

    if (date) {
      setTempDate(date);
      // On Android we can treat selection as final and close immediately.
      if (Platform.OS !== "ios") {
        onDateChange(dayjs(date).format("YYYY-MM-DD"));
        onClose?.();
      }
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        {Platform.OS === "ios" && (
          <Text
            onPress={() => {
              onDateChange(dayjs(tempDate).format("YYYY-MM-DD"));
              onClose?.();
            }}
            style={styles.doneText}
          >
            Done
          </Text>
        )}
      </View>

      <View style={styles.container}>
        <DateTimePicker
          value={tempDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={minimumDate ? dayjs(minimumDate).toDate() : undefined}
          onChange={handleChange}
          style={styles.picker}
        />
      </View>
    </View>
  );
};

export default DatePickerBottomSheet;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.whiteColor,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: color.borderBottomColor,
    marginTop: windowHeight(1.5),
  },
  header: {
    paddingVertical: windowHeight(1.5),
    paddingHorizontal: windowWidth(4),
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: color.borderBottomColor,
    backgroundColor: color.whiteColor,
    flexDirection: "row",
  },
  headerText: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
    flex: 1,
    textAlign: "center",
  },
  doneText: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.semiBold,
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
