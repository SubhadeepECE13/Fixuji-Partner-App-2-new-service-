import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "@/components/common/Header";
import { CustomIcon } from "@/components/common/Icon";

import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import dayjs from "dayjs";
import Chip from "@/components/common/CommonChip";

const LeaveHistoryScreen = () => {
  const leaveHistory = [
    {
      id: 1,
      leaveType: "Casual Leave",
      startDate: "2024-01-15",
      endDate: "2024-01-17",
      days: 3,
      status: "Approved",
      reason: "Family function",
      appliedOn: "2024-01-10",
    },
    {
      id: 2,
      leaveType: "Sick Leave",
      startDate: "2024-01-20",
      endDate: "2024-01-20",
      days: 1,
      status: "Pending",
      reason: "Medical checkup",
      appliedOn: "2024-01-19",
    },
    {
      id: 3,
      leaveType: "Earned Leave",
      startDate: "2024-01-25",
      endDate: "2024-01-27",
      days: 3,
      status: "Rejected",
      reason: "Personal work",
      appliedOn: "2024-01-22",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return {
          textColor: color.green,
          bgColor: color.amountGreen,
          icon: "check-circle",
        };

      case "pending":
        return {
          textColor: color.lightYellow,
          bgColor: color.yellow,
          icon: "clock-outline",
        };

      case "rejected":
        return {
          textColor: color.red,
          bgColor: color.red,
          icon: "close-circle",
        };

      default:
        return {
          textColor: color.regularText,
          bgColor: color.lightGray,
          icon: "information",
        };
    }
  };

  const renderLeaveItem = ({ item }: any) => {
    const statusConfig = getStatusConfig(item.status);

    return (
      <TouchableOpacity activeOpacity={0.85} style={styles.leaveCard}>
        <View style={styles.cardHeader}>
          <View style={styles.leaveTypeContainer}>
            <CustomIcon
              type="MaterialCommunityIcons"
              name="calendar-month-outline"
              size={windowHeight(2.2)}
              color={color.primary}
            />
            <Text style={styles.leaveType}>{item.leaveType}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.dateText}>
              {dayjs(item.startDate).format("DD MMM")}
            </Text>

            <CustomIcon
              type="MaterialCommunityIcons"
              name="arrow-right"
              size={windowHeight(1.8)}
              color={color.placeholderText}
            />

            <Text style={styles.dateText}>
              {dayjs(item.endDate).format("DD MMM")}
            </Text>
          </View>

          <Chip
            text={item.status}
            isActive
            activeColor={statusConfig.bgColor}
            iconName={statusConfig.icon}
            iconType="MaterialCommunityIcons"
            disableFeedback
            iconPosition="right"
          />
        </View>

        <View style={styles.dateRow}>
          {/* <View style={styles.daysBadge}>
            <Text style={styles.daysText}>
              {item.days} {item.days === 1 ? "Day" : "Days"}
            </Text>
          </View> */}
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.appliedText}>
            Applied on {dayjs(item.appliedOn).format("DD MMM YYYY")}
          </Text>

          <View style={styles.reasonContainer}>
            <Text style={styles.reasonText}>{item.reason}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header isBack title="Leave History" isRightIcon />

      <FlatList
        data={leaveHistory}
        renderItem={renderLeaveItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <CustomIcon
              type="MaterialCommunityIcons"
              name="calendar-remove-outline"
              size={windowHeight(8)}
              color={color.appHeaderText}
            />
            <Text style={styles.emptyText}>No leave history found</Text>
          </View>
        }
      />
    </View>
  );
};

export default LeaveHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.lightBackground,
  },

  listContent: {
    padding: windowWidth(4),
    paddingBottom: windowHeight(2),
  },

  leaveCard: {
    backgroundColor: color.whiteColor,
    borderRadius: 14,
    padding: windowWidth(4),
    marginBottom: windowHeight(1.5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: windowHeight(1.2),
  },

  leaveTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(2),
  },

  leaveType: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.semiBold,
    color: color.titleText,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(2),
    marginBottom: windowHeight(1.2),
  },

  dateText: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    color: color.titleText,
  },

  cardFooter: {
    flexDirection: "row",
  },

  appliedText: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: color.placeholderText,
  },

  reasonContainer: {
    backgroundColor: color.lightGray,
    padding: windowWidth(3),
    borderRadius: windowWidth(2),
    alignSelf: "flex-start",
  },

  reasonLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
    color: color.titleText,
  },

  reasonText: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: color.regularText,
    lineHeight: windowHeight(2),
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: windowHeight(10),
  },

  emptyText: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.medium,
    color: color.placeholderText,
    marginTop: windowHeight(2),
  },
});
