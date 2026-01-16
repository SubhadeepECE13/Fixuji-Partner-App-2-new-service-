import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Header from "@/components/common/Header";
import { CustomIcon } from "@/components/common/Icon";
import CustomSkeletonLoader from "@/components/common/CustomSkeletonLoader";

import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import dayjs from "dayjs";
import Chip from "@/components/common/CommonChip";
import { useAppSelector, useAppDispatch } from "@/store/Reduxhook";
import { getLeaveHistory } from "@/store/actions/leave/leave.actions";
import { setIsLeaveHistoryEnd } from "@/store/reducers/leave/leaveSlice";
import {
  FixedSearchLeaveHistoryResponse,
  LeaveHistoryResponse,
} from "@/store/actions/leave/leave.types";

const LeaveHistoryScreen = () => {
  const dispatch = useAppDispatch();
  const { leaveHistory, isLeaveHistoryEnd } = useAppSelector(
    (state) => state.leave
  );
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const fetchLeaveHistory = async (pageNo = 1) => {
    if (pageNo !== 1) {
      if (loadingMore || isLeaveHistoryEnd) return;
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    if (user?.id) {
      await dispatch(getLeaveHistory(user.id, pageNo, 10));
    }

    setPage(pageNo + 1);
    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    dispatch(setIsLeaveHistoryEnd(false));
    setPage(1);
    fetchLeaveHistory(1);
  }, [user]);

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
          textColor: color.yellow,
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

  const renderLeaveItem = ({ item }: { item: LeaveHistoryResponse }) => {
    const statusConfig = getStatusConfig(item.status);
    const isApproved = item.status.toLowerCase() === "approved";
    const isPending = item.status.toLowerCase() === "pending";
    const isRejected = item.status.toLowerCase() === "rejected";

    return (
      <TouchableOpacity activeOpacity={0.85} style={styles.leaveCard}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <CustomIcon
              type="MaterialCommunityIcons"
              name="calendar-blank"
              size={windowHeight(2)}
              color={color.primary}
            />
            <Text style={styles.leaveType}>{item.leaveType.value}</Text>
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
                    : color.yellow
              }
              style={{
                backgroundColor: isApproved
                  ? color.lightGreen
                  : isPending
                    ? color.lightYellow
                    : isRejected
                      ? color.lightRed
                      : color.lightGreen,
                alignSelf: "flex-start",
              }}
            />
          </View>
        </View>
        <Text style={styles.reasonText} numberOfLines={1}>
          {item.reason}
        </Text>

        <View style={styles.dateRow}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>From</Text>
            <Text style={styles.dateValue}>
              {dayjs(item.startDate).format("DD MMM")}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>To</Text>
            <Text style={styles.dateValue}>
              {dayjs(item.endDate).format("DD MMM")}
            </Text>
          </View>
          <View style={styles.cardFooter}>
            <CustomIcon
              type="MaterialCommunityIcons"
              name="clock-outline"
              size={windowHeight(1.6)}
              color={color.placeholderText}
            />
            <Text style={styles.appliedText}>
              {dayjs(item.createdAt).format("DD MMM YYYY")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header isBack title="Leave History" isRightIcon />

      {loading ? (
        <View style={styles.loaderContainer}>
          {Array.from({ length: 3 }).map((_, index) => (
            <CustomSkeletonLoader
              key={index}
              dWidth={"100%"}
              dHeight={windowHeight(15)}
              radius={windowWidth(3)}
            />
          ))}
        </View>
      ) : (
        <FlatList
          data={leaveHistory}
          renderItem={renderLeaveItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          onEndReached={() => fetchLeaveHistory(page)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={color.primary} />
              </View>
            ) : null
          }
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
      )}
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

  loaderContainer: {
    padding: windowWidth(4),
    gap: windowHeight(2),
  },

  leaveCard: {
    backgroundColor: color.whiteColor,
    borderRadius: 12,
    padding: windowWidth(3),
    marginBottom: windowHeight(1.5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: windowHeight(0.5),
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(1.5),
    flex: 1,
  },

  leaveType: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
    color: color.titleText,
  },

  statusContainer: {
    alignItems: "flex-end",
    gap: windowHeight(0.5),
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(2),
  },

  dateContainer: {
    // flex: 1,
  },

  dateLabel: {
    fontSize: fontSizes.xsm,
    fontFamily: fonts.regular,
    color: color.placeholderText,
    marginBottom: windowHeight(0.2),
  },

  dateValue: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
    color: color.titleText,
  },

  daysBadge: {
    backgroundColor: color.lightGreen,
    paddingHorizontal: windowWidth(2),
    paddingVertical: windowHeight(0.4),
    borderRadius: windowWidth(1.5),
  },

  daysText: {
    fontSize: fontSizes.xsm,
    fontFamily: fonts.medium,
    color: color.primary,
  },

  divider: {
    height: 1,
    backgroundColor: color.lightGray,
    marginBottom: windowHeight(1),
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(1.5),
    marginTop: windowHeight(2.2),
  },

  appliedText: {
    fontSize: fontSizes.xsm,
    fontFamily: fonts.regular,
    color: color.placeholderText,
  },

  separator: {
    fontSize: fontSizes.xsm,
    color: color.appHeaderText,
  },

  reasonText: {
    fontSize: fontSizes.xsm,
    fontFamily: fonts.regular,
    color: color.regularText,
    marginBottom: windowHeight(0.5),
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

  footerLoader: {
    paddingVertical: windowHeight(2),
    alignItems: "center",
  },
});
