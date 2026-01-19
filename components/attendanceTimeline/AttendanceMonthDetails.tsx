import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomSkeletonLoader from "../common/CustomSkeletonLoader";

type StatItem = {
  label: string;
  value: string | number;
  info?: boolean;
};

type Props = {
  month: string;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  stats: StatItem[];
  loading?: boolean;
};

const AttendanceMonthDetails = ({
  month,
  year,
  onPrevMonth,
  onNextMonth,
  stats,
  loading = false,
}: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.monthRow}>
        <TouchableOpacity onPress={onPrevMonth}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={26}
            color={color.primary}
          />
        </TouchableOpacity>

        <Text style={styles.monthText}>
          {month}, {year}
        </Text>

        <TouchableOpacity onPress={onNextMonth}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            color={color.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailsTitle}>Details</Text>

        <TouchableOpacity style={styles.moreInfo}>
          <Text style={styles.moreInfoText}>More Info</Text>
          <MaterialCommunityIcons
            name="information-outline"
            size={16}
            color={color.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {loading ? (
          <>
            <CustomSkeletonLoader
              dWidth={windowWidth(25)}
              dHeight={windowHeight(7)}
              radius={windowWidth(2)}
            />
            <CustomSkeletonLoader
              dWidth={windowWidth(25)}
              dHeight={windowHeight(7)}
              radius={windowWidth(2)}
            />
            <CustomSkeletonLoader
              dWidth={windowWidth(25)}
              dHeight={windowHeight(7)}
              radius={windowWidth(2)}
            />
            <CustomSkeletonLoader
              dWidth={windowWidth(25)}
              dHeight={windowHeight(7)}
              radius={windowWidth(2)}
            />
            <CustomSkeletonLoader
              dWidth={windowWidth(25)}
              dHeight={windowHeight(7)}
              radius={windowWidth(2)}
            />
            <CustomSkeletonLoader
              dWidth={windowWidth(25)}
              dHeight={windowHeight(7)}
              radius={windowWidth(2)}
            />
            <CustomSkeletonLoader
              dWidth={windowWidth(25)}
              dHeight={windowHeight(7)}
              radius={windowWidth(2)}
            />
            <CustomSkeletonLoader
              dWidth={windowWidth(25)}
              dHeight={windowHeight(7)}
              radius={windowWidth(2)}
            />
          </>
        ) : (
          stats.map((item, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statLabel}>{item.label}</Text>

              <View style={styles.valueRow}>
                <Text style={styles.statValue}>{item.value}</Text>
                {item.info && (
                  <MaterialCommunityIcons
                    name="information-outline"
                    size={14}
                    color="#9ca3af"
                  />
                )}
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default React.memo(AttendanceMonthDetails);
const styles = StyleSheet.create({
  wrapper: {
    margin: windowWidth(4),
    backgroundColor: color.whiteColor,
    borderRadius: 14,
    paddingVertical: windowHeight(2),
    elevation: 4,
  },

  monthRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: windowWidth(6),
    marginBottom: windowHeight(2),
  },

  monthText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.lg,
    color: color.primary,
  },

  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: windowWidth(4),
    marginBottom: windowHeight(1.5),
  },

  detailsTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.md,
    color: "#374151",
  },

  moreInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  moreInfoText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
    color: color.primary,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: windowWidth(3),
    gap: windowWidth(2.5),
    alignSelf: "center",
    marginLeft: windowHeight(1.5),
  },

  statCard: {
    width: "30%",
    backgroundColor: "#fafbfc",
    borderRadius: 10,
    paddingVertical: windowHeight(1.3),
    paddingHorizontal: windowWidth(2),
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  statLabel: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.xs,
    color: color.appHeaderText,
  },

  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statValue: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.md,
    color: color.primary,
  },
});
