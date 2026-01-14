import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import Header from "@/components/common/Header";
import Chip from "@/components/common/CommonChip";
import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

export type LoanHistory = {
  id: string;
  title: string;
  date: string;
  appliedAmount: number;
  approvedAount?: number;
  type: "pending" | "approved" | "rejected";
  status: string;
  time?: string;
};

const WALLET_BALANCE = 12450;

const LOAN_HISTORY: LoanHistory[] = [
  {
    id: "1",
    title: "LID-001",
    date: "04 Jan 2026",
    appliedAmount: 850,
    approvedAount: 500,
    type: "approved",
    status: "Completed",
    time: "10:20 AM",
  },
  {
    id: "2",
    title: "LID-002",
    date: "03 Jan 2026",
    appliedAmount: 1200,
    type: "rejected",
    status: "Completed",
    time: "01:29 PM",
  },
];

const LoanDetailsScreen = () => {
  const renderItem = ({ item }: { item: LoanHistory }) => {
    const isApproved = item.type === "approved";
    const isRejected = item.type === "rejected";
    const isPending = item.type === "pending";

    return (
      <View style={styles.transactionCard}>
        <View style={{ flex: 1 }}>
          <View style={styles.topRow}>
            <Text style={styles.orderId}>{item.title}</Text>
            <Text style={styles.dateText}>
              {item.date}
              {item.time ? ` • ${item.time}` : ""}
            </Text>
          </View>

          <Chip
            isActive
            text={isApproved ? "Approved" : isRejected ? "Rejected" : "Pending"}
            activeColor={
              isApproved
                ? color.amountGreen
                : isRejected
                  ? color.red
                  : color.primary
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
              marginTop: windowHeight(0.8),
            }}
          />
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.appliedAmount}>₹{item.appliedAmount}</Text>

          <Text
            style={[
              styles.approvedAmount,
              {
                color: isApproved
                  ? color.amountGreen
                  : isPending
                    ? color.lightYellow
                    : isRejected
                      ? color.red
                      : color.amountGreen,
              },
            ]}
          >
            ₹{item.approvedAount ?? 0}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, commonStyles.grayContainer]}>
      <Header isBack title="Loan Details" isRightIcon={false} />

      <LinearGradient
        colors={[color.amountGreen, color.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.walletCard}
      >
        <View style={styles.walletRow}>
          <View style={styles.leftWalletColumn}>
            <View style={styles.walletBlock}>
              <Text style={styles.walletLabel}>November</Text>
              <Text style={styles.walletAmount}>₹{WALLET_BALANCE}</Text>
            </View>

            <View style={styles.walletBlock}>
              <Text style={styles.walletLabel}>December</Text>
              <Text style={styles.walletAmount}>₹{WALLET_BALANCE}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.walletLabel}>This Month</Text>
            <Text style={styles.walletAmount}>₹{WALLET_BALANCE}</Text>
          </View>
        </View>
      </LinearGradient>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      <FlatList
        data={LOAN_HISTORY}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: windowHeight(3),
        }}
      />
    </View>
  );
};

export default LoanDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  walletCard: {
    marginHorizontal: windowWidth(5),
    marginTop: windowHeight(2),
    marginBottom: windowHeight(2.5),
    borderRadius: 20,
    padding: windowHeight(2.5),
  },

  walletRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  leftWalletColumn: {
    marginRight: windowWidth(8),
  },

  walletBlock: {
    marginBottom: windowHeight(1),
  },

  walletLabel: {
    color: "#E5E7EB",
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
  },

  walletAmount: {
    color: "#FFFFFF",
    fontSize: fontSizes.rg,
    fontFamily: fonts.bold,
    marginTop: windowHeight(0.5),
  },

  sectionTitle: {
    marginHorizontal: windowWidth(5),
    marginBottom: windowHeight(1),
    fontSize: fontSizes.md,
    fontFamily: fonts.semiBold,
    color: color.appHeaderText,
  },

  transactionCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: windowWidth(5),
    marginBottom: windowHeight(1.4),
    paddingVertical: windowHeight(1.6),
    paddingHorizontal: windowWidth(4),
    borderRadius: 16,
    alignItems: "center",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: windowWidth(2),
  },

  orderId: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.semiBold,
    color: "#111827",
  },

  dateText: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: "#6B7280",
  },

  amountContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: windowWidth(3),
  },

  appliedAmount: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: color.appHeaderText,
    textDecorationLine: "line-through",
    textDecorationColor: color.red,
  },

  approvedAmount: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.bold,
    marginTop: 4,
  },
});
