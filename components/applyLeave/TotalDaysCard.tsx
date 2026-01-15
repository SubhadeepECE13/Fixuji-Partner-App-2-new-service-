import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomIcon } from "@/components/common/Icon";
import color from "@/themes/Colors.themes";
import { fontSizes, windowHeight, windowWidth } from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

interface TotalDaysCardProps {
  daysCount: number;
}

const TotalDaysCard: React.FC<TotalDaysCardProps> = ({ daysCount }) => {
  return (
    <View style={styles.daysCard}>
      <View style={styles.daysContent}>
        <CustomIcon
          type="Ionicons"
          name="time-outline"
          size={windowHeight(2.8)}
          color={color.primary}
        />
        <View style={styles.daysTextContainer}>
          <Text style={styles.daysLabel}>Total Days</Text>
          <Text style={styles.daysValue}>
            {daysCount} {daysCount === 1 ? "day" : "days"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  daysCard: {
    backgroundColor: color.lightGreen,
    borderRadius: 12,
    padding: windowWidth(4),
    marginTop: windowHeight(2),
    borderWidth: 1,
    borderColor: color.primary,
  },
  daysContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(3),
  },
  daysTextContainer: {
    flex: 1,
  },
  daysLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: color.placeholderText,
  },
  daysValue: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.semiBold,
    color: color.primary,
    marginTop: windowHeight(0.2),
  },
});

export default TotalDaysCard;
