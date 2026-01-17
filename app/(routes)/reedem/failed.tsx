import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import Button from "@/components/common/Button";
import fonts from "@/themes/Fonts.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import Images from "@/utils/images";

const AMOUNT = "65.16";
const BANK = "SBI XX70";
const TXN_ID = "WTXN24071917510GZY85UJOBHBHQ";
const TICK_IMAGE = Images.failedPayment;

const RedeemFailedScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* FAILURE ICON */}
      <Animated.View
        style={[styles.tickContainer, { transform: [{ scale: scaleAnim }] }]}
      >
        <Animated.Image
          source={TICK_IMAGE}
          resizeMode="contain"
          style={styles.tickImage}
        />
      </Animated.View>

      {/* TEXT CONTENT */}
      <View style={styles.textBlock}>
        <Text style={styles.title}>Redemption Unsuccessful</Text>
        <Text style={styles.subTitle}>in {BANK}</Text>

        <Text style={styles.amount}>₹{AMOUNT}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.date}>7 January 2026 • 02:45 PM</Text>
          <Text style={styles.txn}>ID: {TXN_ID}</Text>
        </View>
      </View>

      {/* DONE BUTTON */}
      <Button
        title="Done"
        style={styles.doneButton}
        backgroundColor="#B7F397"
        titleStyle={{ color: "#1F2937", fontFamily: fonts.semiBold }}
        onPress={() => router.replace("/(routes)/wallet")}

      />
    </View>
  );
};

export default RedeemFailedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: windowWidth(6),
  },

  /* ICON */
  tickContainer: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
  },

  tickImage: {
    width: windowWidth(30),
    height: windowHeight(30),
  },

  /* TEXT BLOCK */
  textBlock: {
    alignItems: "center",
    marginTop: windowHeight(5), // 👈 MAIN SPACING FIX
  },

  title: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.bold,
    color: "#111827",
    marginBottom: windowHeight(0.8),
  },

  subTitle: {
    fontSize: fontSizes.sm,
    color: "#6B7280",
    marginBottom: windowHeight(2),
  },

  amount: {
    fontSize: 34,
    fontFamily: fonts.bold,
    color: "#111827",
    marginBottom: windowHeight(2),
  },

  infoBox: {
    alignItems: "center",
  },

  date: {
    fontSize: fontSizes.sm,
    color: "#4B5563",
  },

  txn: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 4,
  },

  /* BUTTON */
  doneButton: {
    width: "100%",
    height: windowHeight(8),
    borderRadius: windowHeight(3),
    position: "absolute",
    bottom: windowHeight(5),
  },
});
