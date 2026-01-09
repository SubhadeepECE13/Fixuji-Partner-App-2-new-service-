import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import { fontSizes, windowHeight } from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

import React from "react";
import { DimensionValue, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  time: string;
  width: DimensionValue;
};

const TimeCard = ({ time, title, width }: Props) => {
  return (
    <View
      style={[
        styles.container,
        commonStyles.whiteContainer,
        commonStyles.deepShadowContainer,
        { width: width ? width : "50%" },
      ]}
    >
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.time}>{time ? time : "--:--"}</Text>
    </View>
  );
};

export default TimeCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: windowHeight(2),
    borderRadius: 10,
  },
  text: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    color: color.placeholderText,
    width: "50%",
    borderRightColor: color.gray,
    borderRightWidth: 1.2,
    borderStyle: "dashed",
    textAlign: "center",
  },
  time: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
    color: color.primary,
    width: "50%",
    textAlign: "center",
  },
});
