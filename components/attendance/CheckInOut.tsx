import { commonStyles } from "@/styles/common.style";

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFormatedDate } from "react-native-modern-datepicker";
import { CustomIcon } from "../common/Icon";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { Switch } from "react-native-paper";

type CheckInOutProps = {
  isOn: boolean;
  onToggle: () => void;
  isDisabled?: boolean;
};

const CheckInOut = ({
  isOn,
  onToggle,
  isDisabled = false,
}: CheckInOutProps) => {
  const currentDate = getFormatedDate(new Date(Date.now()), "YYYY-MM-DD");

  return (
    <View
      style={[
        styles.container,
        commonStyles.deepShadowContainer,
        commonStyles.whiteContainer,
      ]}
    >
      <View style={styles.left}>
        <CustomIcon
          type="FontAwesome5"
          name={"calendar-alt"}
          color={color.primary}
          size={26}
        />
        <Text style={styles.textColor}>{currentDate}</Text>
      </View>
      <View style={styles.right}>
        <View style={styles.toggle}>
          <Text
            style={[
              styles.textstyle,
              { color: isOn ? color.primary : color.gray },
            ]}
          >
            OUT
          </Text>
          <View
            style={[
              styles.switch,
              {
                borderColor: isDisabled ? color.fadedPrimary : color.primary,
              },
            ]}
          >
            <Switch
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              trackColor={{
                false: color.whiteColor,
                true: color.whiteColor,
              }}
              thumbColor={isDisabled ? color.fadedPrimary : color.primary}
              onValueChange={onToggle}
              value={isOn}
              disabled={isDisabled}
            />
          </View>
          <Text
            style={[
              styles.textstyle,
              { color: isOn ? color.primary : color.gray },
            ]}
          >
            IN
          </Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(CheckInOut);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: windowHeight(6),
    paddingHorizontal: windowWidth(4.5),
    borderRadius: 10,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(2),
  },
  textColor: {
    color: color.primary,
    fontSize: fontSizes.smMd,
    fontFamily: fonts.medium,
    marginTop: windowHeight(0.5),
  },
  right: {
    width: "50%",
  },
  textstyle: {
    fontSize: fontSizes.smMd,
    fontFamily: fonts.medium,
    marginTop: windowHeight(0.5),
  },
  toggle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  switch: {
    width: "40%",
    height: "87%",
    justifyContent: "center",
    alignItems: "center",
    padding: windowHeight(0.5),
    backgroundColor: color.whiteColor,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: color.primary,
  },
});
