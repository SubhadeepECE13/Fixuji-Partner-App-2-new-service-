import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View, Easing } from "react-native";
import { router } from "expo-router";
import { Audio } from "expo-av";
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
const TICK_IMAGE = Images.successPayment;

const CONFETTI_COUNT = 25;
const COLORS = [
  "#FF50CF",
  "#8B5CF6",
  "#FFC700",
  "#00D1FF",
  "#4ADE80",
  "#FF3D3D",
];

const RedeemSuccessScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const soundRef = useRef(null);

  const playSuccessSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/sounds/paymentSuccess.mp3"),
        { shouldPlay: true }
      );
      soundRef.current = sound as any;
    } catch (error) {
      console.log("Sound error:", error);
    }
  };
  const confetti = useRef(
    [...Array(CONFETTI_COUNT)].map(() => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      rotate: new Animated.Value(0),
      opacity: new Animated.Value(1),

      // SHAPE LOGIC: Irregular sizes & aspect ratios
      width: Math.random() * 12 + 6,
      height: Math.random() * 8 + 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],

      // Irregular corners for "torn paper" look
      borderRadius: {
        borderTopLeftRadius: Math.random() * 8,
        borderBottomRightRadius: Math.random() * 8,
        borderTopRightRadius: Math.random() * 2,
      },

      // Physics
      targetX: (Math.random() - 0.5) * 320,
      targetY: (Math.random() - 0.5) * 320,
      targetRotate: Math.random() * 1080, // More spinning
      skew: `${Math.random() * 20 - 10}deg`, // Random skew for irregularity
    }))
  ).current;

  useEffect(() => {
    playSuccessSound();
    // 1. Tick Pop
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // 2. Irregular Burst
    const animations = confetti.map((item) => {
      return Animated.parallel([
        Animated.spring(item.x, {
          toValue: item.targetX,
          friction: 9,
          tension: 35,
          useNativeDriver: true,
        }),
        Animated.spring(item.y, {
          toValue: item.targetY,
          friction: 9,
          tension: 35,
          useNativeDriver: true,
        }),
        Animated.timing(item.rotate, {
          toValue: item.targetRotate,
          duration: 1500,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(800),
          Animated.timing(item.opacity, {
            toValue: 0.7,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]);
    });

    Animated.stagger(10, animations).start();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* CONFETTI LAYER */}
      <View style={styles.confettiWrapper}>
        {confetti.map((item, index) => (
          <Animated.View
            key={index}
            style={[
              styles.confettiPiece,
              {
                width: item.width,
                height: item.height,
                backgroundColor: item.color,
                ...item.borderRadius,
                opacity: item.opacity,
                transform: [
                  { translateX: item.x },
                  { translateY: item.y },
                  { skewX: item.skew },
                  {
                    rotate: item.rotate.interpolate({
                      inputRange: [0, 360],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>

      <Animated.View
        style={[styles.tickContainer, { transform: [{ scale: scaleAnim }] }]}
      >
        <Animated.Image
          source={TICK_IMAGE}
          resizeMode="contain"
          style={styles.tickImage}
        />
      </Animated.View>

      <Text style={styles.title}>Redemption successful</Text>
      <Text style={styles.subTitle}>in {BANK}</Text>

      <Text style={styles.amount}>₹{AMOUNT}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.date}>7 January 2026 • 02:45 PM</Text>
        <Text style={styles.txn}>ID: {TXN_ID}</Text>
      </View>

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

export default RedeemSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: windowWidth(6),
  },
  confettiWrapper: {
    position: "absolute",
    top: "35%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  confettiPiece: {
    position: "absolute",
  },
  tickContainer: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    marginBottom: 10,
  },
  tickImage: {
    width: windowWidth(30),
    height: windowHeight(30),
  },
  title: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.bold,
    color: "#111827",
    marginTop: 10,
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
    marginVertical: windowHeight(2),
  },
  infoBox: {
    alignItems: "center",
    marginTop: 10,
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
  doneButton: {
    width: "100%",
    height: windowHeight(8),
    borderRadius: windowHeight(3),
    position: "absolute",
    bottom: windowHeight(5),
  },
});
