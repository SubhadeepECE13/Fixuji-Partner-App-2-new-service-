import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AttendancePunchRow from "./AttendancePunchRow";
import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import { fontSizes, windowHeight } from "@/themes/Constants.themes";

type Props = {
  index: number;
  checkin?: { time: string; image?: string };
  checkout?: { time: string; image?: string };
};

const AttendancePunchGroup = ({ index, checkin, checkout }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Punch {index + 1}</Text>

      <AttendancePunchRow
        label="Check In"
        time={checkin?.time}
        image={checkin?.image}
      />

      <AttendancePunchRow
        label="Check Out"
        time={checkout?.time}
        image={checkout?.image}
      />
    </View>
  );
};

export default AttendancePunchGroup;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9fafb",
    borderRadius: 14,
    padding: windowHeight(1.5),
    marginBottom: windowHeight(2),
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.md,
    color: color.primary,
    marginBottom: windowHeight(1),
  },
});
