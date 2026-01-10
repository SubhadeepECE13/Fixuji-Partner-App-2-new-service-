import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomImage from "@/components/common/CustomImage";
import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import { fontSizes, windowHeight } from "@/themes/Constants.themes";

type Props = {
  label: string;
  time?: string;
  image?: string;
};

const AttendancePunchRow = ({ label, time, image }: Props) => {
  return (
    <View style={styles.row}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.time}>{time || "N/A"}</Text>
      </View>

      {image && (
        <View style={styles.imageBox}>
          <CustomImage imageUrl={image} resizeMode="cover" />
        </View>
      )}
    </View>
  );
};

export default AttendancePunchRow;

const styles = StyleSheet.create({
  row: {
    marginBottom: windowHeight(1.5),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: windowHeight(0.6),
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
    color: "#6b7280",
  },
  time: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.sm,
    color: "#111827",
  },
  imageBox: {
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#e5e7eb",
  },
});
