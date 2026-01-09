import React from "react";
import { View, StyleSheet } from "react-native";
import CustomSkeletonLoader from "@/components/common/CustomSkeletonLoader";
import { windowHeight, windowWidth } from "@/themes/Constants.themes";

const AttendanceDaySkeleton = () => {
  return (
    <View style={styles.card}>
      <CustomSkeletonLoader
        dWidth={windowWidth(40)}
        dHeight={windowHeight(2)}
        radius={6}
      />

      <View style={{ height: windowHeight(1) }} />

      <CustomSkeletonLoader
        dWidth={windowWidth(60)}
        dHeight={windowHeight(2)}
        radius={6}
      />

      <View style={{ height: windowHeight(1.5) }} />

      <CustomSkeletonLoader
        dWidth={windowWidth(25)}
        dHeight={windowHeight(2)}
        radius={6}
      />
    </View>
  );
};

export default AttendanceDaySkeleton;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: windowWidth(4),
    marginBottom: windowHeight(1.5),
    padding: windowHeight(2),
    borderRadius: 14,
    backgroundColor: "#fff",
  },
});
