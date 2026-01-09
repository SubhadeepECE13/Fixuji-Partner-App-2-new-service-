import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import AttendanceDayDetailsSheet from "./AttendanceDayDetailsSheet";

type Props = {
  date: string;
  day: string;
  hours?: string;
  status?: "PRESENT" | "ABSENT" | "HD" | "NOT_MARKED";
  shift?: string;
  image?: string;
};

const AttendanceDayCard = ({
  date,
  day,
  hours,
  status,
  shift,
  image,
}: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.dateText}>
            {date} | {day}
          </Text>
          <Text style={styles.hoursText}>{hours || "Not Marked"}</Text>
        </View>

        <View style={styles.statusRow}>
          <View style={styles.buttonRow}>
            <View
              style={[styles.statusBtn, status === "PRESENT" && styles.present]}
            >
              <Text
                style={[
                  styles.statusText,
                  status === "PRESENT" && styles.activeText,
                ]}
              >
                Present
              </Text>
            </View>

            <View style={[styles.statusBtn, status === "HD" && styles.hd]}>
              <Text
                style={[
                  styles.statusText,
                  status === "HD" && styles.activeText,
                ]}
              >
                HD
              </Text>
            </View>

            <View
              style={[styles.statusBtn, status === "ABSENT" && styles.absent]}
            >
              <Text
                style={[
                  styles.statusText,
                  status === "ABSENT" && styles.activeText,
                ]}
              >
                Absent
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.arrowBtn} onPress={openSheet}>
            <MaterialCommunityIcons
              name="chevron-down"
              size={22}
              color={color.primary}
            />
          </TouchableOpacity>
        </View>

        {shift && <Text style={styles.shiftText}>{shift}</Text>}
      </View>

      <AttendanceDayDetailsSheet
        ref={bottomSheetRef}
        date={date}
        day={day}
        hours={hours}
        status={status}
        shift={shift}
        image={image}
      />
    </>
  );
};

export default AttendanceDayCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: color.whiteColor,
    borderRadius: 14,
    marginHorizontal: windowWidth(4),
    marginBottom: windowHeight(1.5),
    padding: windowHeight(2),
    elevation: 2,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: windowHeight(1.5),
  },

  dateText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.md,
    color: color.appHeaderText,
  },

  hoursText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
    color: "#6b7280",
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonRow: {
    flexDirection: "row",
    gap: windowWidth(2),
  },

  statusBtn: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    paddingVertical: windowHeight(0.8),
    paddingHorizontal: windowWidth(3),
  },

  statusText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
    color: "#6b7280",
  },

  activeText: {
    color: "#fff",
  },

  present: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },

  hd: {
    backgroundColor: "#f59e0b",
    borderColor: "#f59e0b",
  },

  absent: {
    backgroundColor: "#ef4444",
    borderColor: "#ef4444",
  },

  arrowBtn: {
    backgroundColor: "#eff6ff",
    borderRadius: 8,
    padding: 6,
  },

  shiftText: {
    marginTop: windowHeight(1),
    fontFamily: fonts.regular,
    fontSize: fontSizes.sm,
    color: "#6b7280",
  },
});
