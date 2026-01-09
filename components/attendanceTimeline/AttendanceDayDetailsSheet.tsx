import React, { forwardRef, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import CustomImage from "../common/CustomImage";
import Images from "@/utils/images";
import CustomBottomSheetModal from "../common/CustomBottomSheetModal";

type Props = {
  date: string;
  day: string;
  hours?: string;
  status?: string;
  shift?: string;
  image?: string;
};

const AttendanceDayDetailsSheet = forwardRef<BottomSheetModal, Props>(
  ({ date, day, hours, status, shift, image }, ref) => {
    const snapPoints = useMemo(() => ["50%"], []);
    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        initialSnapPoint={0}
        enablePanDownToClose={false}
        enableDynamicSizing={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            {date} | {day}
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{status || "Not Marked"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Working Hours</Text>
            <Text style={styles.value}>{hours || "N/A"}</Text>
          </View>

          {shift && (
            <View style={styles.row}>
              <Text style={styles.label}>Shift</Text>
              <Text style={styles.value}>{shift}</Text>
            </View>
          )}
          {image && (
            <View style={styles.row}>
              <Text style={styles.label}>Image</Text>
              <CustomImage imageUrl={image} resizeMode="cover" />
            </View>
          )}
        </View>
      </CustomBottomSheetModal>
    );
  }
);

export default AttendanceDayDetailsSheet;

const styles = StyleSheet.create({
  container: {
    padding: windowHeight(2),
  },

  title: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.lg,
    marginBottom: windowHeight(2),
    color: color.primary,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: windowHeight(1.5),
  },

  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
    color: "#6b7280",
  },

  value: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.sm,
    color: "#111827",
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(4),
    marginTop: windowHeight(2),
  },
});
