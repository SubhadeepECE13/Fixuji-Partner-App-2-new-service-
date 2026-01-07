import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { router } from "expo-router";

import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

const WITHDRAWABLE_BALANCE = 12450;

const RedeemAmountScreen = () => {
  const [amount, setAmount] = useState("500");

  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <Header isBack title="Redeem Amount" />

      <View style={styles.card}>
        <Text style={styles.label}>Withdrawable Balance</Text>
        <Text style={styles.balance}>₹{WITHDRAWABLE_BALANCE}</Text>

        <Text style={styles.inputLabel}>Enter Amount</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Enter amount"
        />

        <Button
          title="Swipe to Redeem"
          style={styles.swipeButton}
          backgroundColor={color.primary}
          onPress={() => router.push("/reedem/processing")}
        />
      </View>
    </View>
  );
};

export default RedeemAmountScreen;

const styles = StyleSheet.create({
  card: {
    margin: windowWidth(5),
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: windowHeight(3),
  },

  label: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    color: "#6B7280",
  },

  balance: {
    fontSize: fontSizes.xl,
    fontFamily: fonts.bold,
    color: color.amountGreen,
    marginBottom: windowHeight(3),
  },

  inputLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    marginBottom: 6,
  },

  input: {
    height: windowHeight(6),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: fontSizes.md,
    marginBottom: windowHeight(4),
  },

  swipeButton: {
    height: windowHeight(6),
    borderRadius: 30,
  },
});
