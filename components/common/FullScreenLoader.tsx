import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import color from "@/themes/Colors.themes";

interface FullscreenLoaderProps {
  visible: boolean;
  text?: string;
}

const FullscreenLoader: React.FC<FullscreenLoaderProps> = ({
  visible,
  text = "Please wait...",
}) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color={color.primary} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default FullscreenLoader;

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)", // softer dim
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  card: {
    width: 180,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#fff",
    alignItems: "center",

    // subtle shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },

    // elevation (Android)
    elevation: 6,
  },
  text: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
    textAlign: "center",
  },
});
