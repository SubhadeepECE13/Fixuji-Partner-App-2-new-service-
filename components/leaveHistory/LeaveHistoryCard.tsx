import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CustomIcon } from "@/components/common/Icon";
import Chip from "@/components/common/CommonChip";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import dayjs from "dayjs";
import { LeaveHistoryResponse } from "@/store/actions/leave/leave.types";

interface LeaveHistoryCardProps {
  item: LeaveHistoryResponse;
}

const LeaveHistoryCard: React.FC<LeaveHistoryCardProps> = ({ item }) => {
  const isApproved = item.status.toLowerCase() === "approved";
  const isPending = item.status.toLowerCase() === "pending";
  const isRejected = item.status.toLowerCase() === "rejected";
const leaveDays = item.leaveRequestDays ?? [];
const halfDayDates = leaveDays
  .filter((day) => day.isHalfDay)
  .map((day) => dayjs(day.date).format("DD"));




  return (
    <View style={styles.leaveCard}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <CustomIcon
            type="MaterialCommunityIcons"
            name="calendar-check-outline"
            size={windowHeight(2)}
            color={color.primary}
          />

          <Text style={styles.leaveType}>
            {item.leaveType.value} - {String(item.totalDays)} Days
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Chip
            isActive
            text={item.status}
            activeColor={
              isApproved
                ? color.amountGreen
                : isRejected
                  ? color.red
                  : color.pendingText
            }
            style={{
              backgroundColor: isApproved
                ? color.lightGreen
                : isPending
                  ? color.pendingBg
                  : color.lightRed,
              alignSelf: "flex-start",
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.reasonText} numberOfLines={1}>
          {item.reason}
        </Text>
      </View>
      <View style={styles.dateRow}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateValue}>
            {dayjs(item.startDate).format("DD MMM")}
          </Text>
          <Text style={styles.dateLabel}>To</Text>
          <Text style={styles.dateValue}>
            {dayjs(item.endDate).format("DD MMM")}
          </Text>
          <View style={{alignSelf:'center'}}>
           {halfDayDates.length > 0 && (
            <Text style={styles.halfDayText}>(HD:   {halfDayDates.join(", ")})</Text>)}
            </View>
        </View>
        
        <View style={styles.cardFooter}>
          <CustomIcon
            type="MaterialCommunityIcons"
            name="clock-outline"
            size={windowHeight(1.6)}
            color={color.primary}
          />
          <Text style={styles.appliedText}>
            {dayjs(item.createdAt).format("DD MMM YYYY")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LeaveHistoryCard;

const styles = StyleSheet.create({
  leaveCard: {
    backgroundColor: color.whiteColor,
    borderRadius: 12,
    padding: windowWidth(3),
    marginBottom: windowHeight(1.5),
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: windowHeight(0.4),
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(1.5),
  },

  leaveType: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
    color: color.primary,
  },

  reasonText: {
    fontSize: fontSizes.xsm,
    fontFamily: fonts.regular,
    color: color.placeholderText,
    lineHeight: windowHeight(1.8),
    marginBottom: windowHeight(0.6),
  },

  statusContainer: {
    alignItems: "flex-end",
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dateContainer: {
    flexDirection: "row",
    gap: windowHeight(1),
  },

  dateLabel: {
    fontSize: fontSizes.xsm,
    fontFamily: fonts.regular,
    color: color.titleText,
    alignSelf: "center",
  },

  dateValue: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
    color: color.titleText,

  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(1.5),
  },

  appliedText: {
    fontSize: fontSizes.xsm,
    fontFamily: fonts.regular,
    color: color.primary,
  },
  halfDayText: {
  fontSize: fontSizes.xsm,
  fontFamily: fonts.medium,
  color: color.primary, 
  alignItems:'center',
},

});
