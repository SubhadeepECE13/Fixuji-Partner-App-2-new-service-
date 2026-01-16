import CustomSkeletonLoader from "@/components/common/CustomSkeletonLoader";
import Header from "@/components/common/Header";
import { CustomIcon } from "@/components/common/Icon";
import LeaveHistoryCard from "@/components/leaveHistory/LeaveHistoryCard";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import { getLeaveHistory } from "@/store/actions/leave/leave.actions";
import { LeaveHistoryResponse } from "@/store/actions/leave/leave.types";
import { setIsLeaveHistoryEnd } from "@/store/reducers/leave/leaveSlice";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

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

  const renderLeaveItem = ({ item }: { item: LeaveHistoryResponse }) => (
    <LeaveHistoryCard item={item} />
  );

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
