import { StyleSheet, Text, View } from "react-native";
import React from "react";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
interface LeaveBalanceResponse {
  total: Number;
  used: Number;
  available: Number;
}
interface Props {
  data: LeaveBalanceResponse;
}

const ApplyLeaveHeaderCard: React.FC<Props> = ({ data }) => {
  return (
    <View style={styles.balanceCard}>
      <View style={styles.balanceRow}>
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>Available</Text>
          <Text style={styles.balanceValue}>{Number(data.available)}</Text>
        </View>
        <View style={styles.balanceDivider} />
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>Used</Text>
          <Text style={styles.balanceValue}>{Number(data.used)}</Text>
        </View>
        <View style={styles.balanceDivider} />
        <View style={styles.balanceItem}>
          <Text style={styles.balanceLabel}>Total</Text>
          <Text style={styles.balanceValue}>{Number(data.used)}</Text>
        </View>
      </View>
    </View>
  );
};

export default ApplyLeaveHeaderCard;

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: color.whiteColor,
    borderRadius: 12,
    padding: windowWidth(4),
    marginBottom: windowHeight(2),
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  balanceItem: {
    alignItems: "center",
    flex: 1,
  },
  balanceLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: color.placeholderText,
    marginBottom: windowHeight(0.5),
  },
  balanceValue: {
    fontSize: fontSizes["2xl"],
    fontFamily: fonts.semiBold,
    color: color.primary,
  },
  balanceDivider: {
    width: 1,
    height: windowHeight(4),
    backgroundColor: color.lightGray,
  },
});
