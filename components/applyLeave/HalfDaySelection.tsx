import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CustomIcon } from "@/components/common/Icon";
import color from "@/themes/Colors.themes";
import { fontSizes, windowHeight, windowWidth } from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import dayjs from "dayjs";

interface HalfDaySelectionProps {
  startDate: string;
  endDate: string;
  daysCount: number;
  halfDayDates: { [key: string]: "first" | "second" };
  onHalfDayChange: (dates: { [key: string]: "first" | "second" }) => void;
}

const HalfDaySelection: React.FC<HalfDaySelectionProps> = ({
  startDate,
  endDate,
  daysCount,
  halfDayDates,
  onHalfDayChange,
}) => {
  const handleCheckboxPress = (date: string, half: "first" | "second") => {
    const selectedHalf = halfDayDates[date];
    if (selectedHalf === half) {
      const newDates = { ...halfDayDates };
      delete newDates[date];
      onHalfDayChange(newDates);
    } else {
      onHalfDayChange({ ...halfDayDates, [date]: half });
    }
  };

  return (
    <View style={styles.halfDayContainer}>
      <View style={styles.halfDayHeader}>
        <CustomIcon
          type="MaterialCommunityIcons"
          name="clock-outline"
          size={windowHeight(2.2)}
          color={color.primary}
        />
        <Text style={styles.halfDayTitle}>Half Day Selection (Optional)</Text>
      </View>
      {Array.from({ length: daysCount }, (_, i) => {
        const date = dayjs(startDate).add(i, "day").format("YYYY-MM-DD");
        const selectedHalf = halfDayDates[date];
        return (
          <View key={date} style={styles.halfDayItem}>
            <Text style={styles.halfDayDate}>
              {dayjs(date).format("DD MMM YYYY")}
            </Text>
            <View style={styles.halfDayOptions}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => handleCheckboxPress(date, "first")}
              >
                <View
                  style={[
                    styles.checkbox,
                    selectedHalf === "first" && styles.checkboxChecked,
                  ]}
                >
                  {selectedHalf === "first" && (
                    <CustomIcon
                      type="MaterialCommunityIcons"
                      name="check"
                      size={windowHeight(1.8)}
                      color={color.whiteColor}
                    />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>First Half</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => handleCheckboxPress(date, "second")}
              >
                <View
                  style={[
                    styles.checkbox,
                    selectedHalf === "second" && styles.checkboxChecked,
                  ]}
                >
                  {selectedHalf === "second" && (
                    <CustomIcon
                      type="MaterialCommunityIcons"
                      name="check"
                      size={windowHeight(1.8)}
                      color={color.whiteColor}
                    />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>Second Half</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  halfDayContainer: {
    marginTop: windowHeight(2),
    backgroundColor: color.whiteColor,
    borderRadius: 12,
    padding: windowWidth(4),
    borderWidth: 1,
    borderColor: color.lightGray,
  },
  halfDayHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(2),
    marginBottom: windowHeight(2),
  },
  halfDayTitle: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.semiBold,
    color: color.titleText,
  },
  halfDayItem: {
    paddingVertical: windowHeight(1.5),
    borderBottomWidth: 1,
    borderBottomColor: color.lightGray,
  },
  halfDayDate: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.medium,
    color: color.titleText,
    marginBottom: windowHeight(1),
  },
  halfDayOptions: {
    flexDirection: "row",
    gap: windowWidth(6),
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(2),
  },
  checkbox: {
    width: windowWidth(5),
    height: windowWidth(5),
    borderRadius: windowWidth(1),
    borderWidth: 2,
    borderColor: color.appHeaderText,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.whiteColor,
  },
  checkboxChecked: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },
  checkboxLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: color.regularText,
  },
});

export default HalfDaySelection;
