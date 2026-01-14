import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Header from "@/components/common/Header";
import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import Chip from "@/components/common/CommonChip";

export type LoanHistory = {
  id: string;
  title: string;
  date: string;
  appliedAmount: number;
  approvedAount: number;
  type: "approved" | "rejected";
  status: string;
  time?: string;
};

const WALLET_BALANCE = 12450;

const LOAN_HISTORY: LoanHistory[] = [
  {
    id: "1",
    title: "OD-260105-00007",
    date: "04 Jan 2026",
    appliedAmount: 850,
    approvedAount: 500,
    type: "approved",
    status: "Completed",
    time: "10:20 AM",
  },
  {
    id: "2",
    title: "OD-260105-00006",
    date: "03 Jan 2026",
    appliedAmount: 1200,
    approvedAount: 900,
    type: "rejected",
    status: "Completed",
    time: "01:29 PM",
  },
];

const LoanDetailsScreen = () => {
  const renderItem = ({ item }: { item: LoanHistory }) => {
    const isCredit = item.type === "approved";

    return (
      <View style={styles.transactionCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.orderId}>{item.title}</Text>
          <Text style={styles.dateText}>
            {item.date}
            {item.time ? ` • ${item.time}` : ""}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={[
              styles.amount,
              { color: isCredit ? color.amountGreen : color.red },
            ]}
          >
            ₹{item.approvedAount}
          </Text>
          <Chip
            isActive
            activeColor={isCredit ? color.amountGreen : color.red}
            text={isCredit ? "Approved" : "Rejected"}
            style={{
              backgroundColor: isCredit ? color.lightGreen : color.lightRed,
              width: windowWidth(20),
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
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
        contentContainerStyle={{ paddingBottom: windowHeight(3) }}
      />
    </View>
  );
};

export default LoanDetailsScreen;

const styles = StyleSheet.create({
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
    padding: windowHeight(1.6),
    borderRadius: 16,
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
    marginTop: 4,
  },

  amount: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.bold,
  },
});

