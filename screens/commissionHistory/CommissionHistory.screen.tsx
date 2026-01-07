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
import Button from "@/components/common/Button";

export type PaymentHistory = {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: "credit" | "credit";
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
    type: "credit",
    status: "Processed",
    time: "01:29 PM",
  },
  {
    id: "4",
    title: "OD-260105-00005",
    date: "02 Jan 2026",
    amount: 3000,
    type: "credit",
    status: "Processed",
    time: "01:29 PM",
  },
  {
    id: "5",
    title: "OD-260105-00005",
    date: "02 Jan 2026",
    amount: 3000,
    type: "credit",
    status: "Processed",
    time: "01:29 PM",
  },
  {
    id: "6",
    title: "OD-260105-00005",
    date: "02 Jan 2026",
    amount: 3000,
    type: "credit",
    status: "Processed",
    time: "01:29 PM",
  },
  {
    id: "7",
    title: "OD-260105-00005",
    date: "02 Jan 2026",
    amount: 3000,
    type: "credit",
    status: "Processed",
    time: "01:29 PM",
  },
  {
    id: "8",
    title: "OD-260105-00005",
    date: "02 Jan 2026",
    amount: 3000,
    type: "credit",
    status: "Processed",
    time: "01:29 PM",
  },
  {
    id: "9",
    title: "OD-260105-00005",
    date: "02 Jan 2026",
    amount: 3000,
    type: "credit",
    status: "Processed",
    time: "01:29 PM",
  },
  {
    id: "10",
    title: "OD-260105-00005",
    date: "02 Jan 2026",
    amount: 3000,
    type: "credit",
    status: "Processed",
    time: "01:29 PM",
  },
  {
    id: "11",
    title: "OD-260105-00005",
    date: "02 Jan 2026",
    amount: 3000,
    type: "credit",
    status: "Processed",
    time: "01:29 PM",
  },
];

const CommissionHistoryScreen = () => {
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

          <Text
            style={[
              styles.amount,
              { color: isCredit ? color.amountGreen : color.red },
            ]}
          >
            {isCredit ? "+" : "-"}₹{item.amount}
          </Text>
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
        end={{ x: 1, y: 0 }}
        style={styles.walletCard}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.walletLabel}>November</Text>
            <Text style={styles.walletAmount}>₹{WALLET_BALANCE}</Text>
          </View>

          <View>
            <Text style={styles.walletLabel}>This Month</Text>
            <Text style={styles.walletAmount}>₹{WALLET_BALANCE}</Text>
          </View>

          <View>
            <Text style={styles.walletLabel}>Withdrawable</Text>
            <Text style={styles.walletAmount}>₹{WALLET_BALANCE}</Text>
          </View>
        </View>
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.walletLabel}>December</Text>
            <Text style={styles.walletAmount}>₹{WALLET_BALANCE}</Text>
          </View>

          <Button
            title="Redeem"
            backgroundColor={color.primary}
            titleStyle={{ fontSize: fontSizes.smMd }}
            style={styles.redeemButton}
            onPress={() => router.push("/(routes)/reedem")}
          />
        </View>
        ̦
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

export default CommissionHistoryScreen;

const styles = StyleSheet.create({
  walletCard: {
    marginHorizontal: windowWidth(5),
    marginTop: windowHeight(2),
    marginBottom: windowHeight(2.5),
    borderRadius: 20,
    padding: windowHeight(2.5),
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: windowHeight(2),
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  redeemButton: {
    height: windowHeight(5),
    width: windowWidth(55),
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
});
