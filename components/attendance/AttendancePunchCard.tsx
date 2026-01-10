import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import AttendanceDayDetails from "./AttendanceDayDetails";

type Props = {
  index: number;
  punch: {
    checkin?: { time?: string; image?: string; address: string };
    checkout?: { time?: string; image?: string; address: string };
    location?: { geolocation: { lat: number; long: number } };
  };
};

const AttendancePunchCard = ({ index, punch }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Punch {index + 1}</Text>
          <Text style={styles.label}>Kolkata Shift | 10AM to 12:00PM</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Check In</Text>
          <Text style={styles.value}>{punch.checkin?.time || "N/A"}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Check Out</Text>
          <Text style={styles.value}>
            {punch.checkout?.time || "Still Checked In"}
          </Text>
        </View>

        <TouchableOpacity style={styles.footer} onPress={openSheet}>
          <Text style={styles.footerText}>View details</Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={18}
            color={color.primary}
          />
        </TouchableOpacity>
      </View>

      <AttendanceDayDetails ref={bottomSheetRef} punch={punch} index={index} />
    </>
  );
};

export default AttendancePunchCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: windowHeight(2),
    marginBottom: windowHeight(1.5),

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: windowHeight(1.5),
  },

  title: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.md,
    color: color.primary,
  },

  iconBtn: {
    backgroundColor: "#eff6ff",
    padding: 6,
    borderRadius: 8,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: windowHeight(0.8),
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

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: windowHeight(0.5),
  },

  footer: {
    marginTop: windowHeight(1.5),
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: windowWidth(1.5),
  },

  footerText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
    color: color.primary,
  },
});
