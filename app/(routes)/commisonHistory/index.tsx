import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import Header from "@/components/common/Header";
import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

export type PaymentHistory = {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  status: string;
  time?: string;
};

const WALLET_BALANCE = 12450;

const PAYMENT_HISTORY: PaymentHistory[] = [
  {
    id: "1",
    title: "OD-260105-00007",
    date: "04 Jan 2026",
    amount: 850,
    type: "credit",
    status: "Completed",
    time: "10:20 AM",
  },
  {
    id: "2",
    title: "OD-260105-00006",
    date: "03 Jan 2026",
    amount: 1200,
    type: "credit",
    status: "Completed",
    time: "01:29 PM",
  },
  {
    id: "3",
    title: "OD-260105-00005",
    date: "02 Jan 2026",
    amount: 3000,
    type: "debit",
    status: "Processed",
    time: "01:29 PM",
  },
  {
    id: "4",
    title: "OD-260105-00004",
    date: "01 Jan 2026",
    amount: 950,
    type: "credit",
    status: "Completed",
    time: "12:29 PM",
  },
  {
    id: "5",
    title: "OD-260105-00003",
    date: "01 Jan 2026",
    amount: 950,
    type: "credit",
    status: "Completed",
    time: "04:29 PM",
  },
  {
    id: "6",
    title: "OD-260105-00002",
    date: "01 Jan 2026",
    amount: 950,
    type: "credit",
    status: "Completed",
  },
  {
    id: "7",
    title: "OD-260105-00001",
    date: "01 Jan 2026",
    amount: 950,
    type: "credit",
    status: "Completed",
    time: "06:29 PM",
  },
];

const PaymentDetailsScreen = () => {
  const renderItem = ({ item }: { item: PaymentHistory }) => {
    const isCredit = item.type === "credit";

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push(`/orderDetailes/31`)}
      >
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
              {isCredit ? "+" : "-"}₹{item.amount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <Header isBack title="Commission Wallet" />

      <LinearGradient
        colors={[color.amountGreen, color.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.walletCard}
      >
        <View style={{ flexDirection: "row", columnGap: windowHeight(23) }}>
          <View style={{ columnGap: windowHeight(7) }}>
            <View>
              <Text style={styles.walletLabel}>November</Text>
              <Text style={styles.walletAmount}>₹{WALLET_BALANCE}</Text>
            </View>
            <View>
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
        data={PAYMENT_HISTORY}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: windowHeight(3) }}
      />
    </View>
  );
};

export default PaymentDetailsScreen;

const styles = StyleSheet.create({
  walletCard: {
    marginHorizontal: windowWidth(5),
    marginTop: windowHeight(2),
    marginBottom: windowHeight(2.5),
    borderRadius: 20,
    padding: windowHeight(2.5),
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
    marginVertical: windowHeight(1),
  },

  redeemBtn: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 999,
    marginTop: 6,
  },

  redeemText: {
    color: "#FFFFFF",
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
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
    fontSize: fontSizes.md,
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
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
  },

  typeBadge: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  typeText: {
    fontSize: 10,
    fontFamily: fonts.semiBold,
    letterSpacing: 0.6,
  },
});
