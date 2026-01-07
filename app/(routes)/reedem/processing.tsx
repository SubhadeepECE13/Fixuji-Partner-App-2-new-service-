import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { router } from "expo-router";

import LottieView from "lottie-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";

const RedeemProcessingScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/reedem/success");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Top Floating Icon */}
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons
            name="shield-check-outline"
            size={42}
            color={color.primary}
          />
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Lottie Animation */}
          <LottieView
            source={require("../../../assets/lottie/money.json")}
            autoPlay
            loop
            style={styles.lottie}
          />

          <Text style={styles.text}>Processing Withdrawal</Text>

          <Text style={styles.subText}>
            We're securely transferring your funds to your account.
          </Text>

          <View style={styles.divider} />

          <View style={styles.footerNote}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={16}
              color="#9CA3AF"
            />
            <Text style={styles.warningText}>
              Please do not close or refresh the app
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RedeemProcessingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bgGray,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: windowHeight(2),
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: color.lightGreen,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -40,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 24,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },

  lottie: {
    width: windowWidth(50),
    height: windowHeight(20),
    marginBottom: 10,
  },

  text: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.bold,
    color: "#111827",
    textAlign: "center",
  },

  subText: {
    marginTop: 10,
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },

  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    width: "100%",
    marginVertical: 25,
  },

  footerNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  warningText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontFamily: fonts.medium,
  },
});
