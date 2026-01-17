
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { CustomIcon } from "@/components/common/Icon";

type ChipProps = {
  activeColor: string;
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  isActive: boolean;
  disableFeedback?: boolean;
  iconName?: React.ComponentProps<typeof CustomIcon>["name"];
  iconType?: "MaterialCommunityIcons" | "Ionicons" | "FontAwesome";
  iconPosition?: "left" | "right";
  iconSize?: number;
};

const Chip = ({
  activeColor,
  text,
  style,
  textStyle,
  onPress,
  isActive,
  disableFeedback = false,
  iconName,
  iconType = "MaterialCommunityIcons",
  iconPosition = "left",
  iconSize = windowHeight(1.6),
}: ChipProps) => {
  const { colors } = useTheme();
  const iconColor = isActive ? activeColor : color.regularText;

  const renderIcon = () =>
    iconName ? (
      <CustomIcon
        type={iconType}
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
    ) : null;

  return (
    <TouchableOpacity
      activeOpacity={disableFeedback ? 1 : 0.7}
      onPress={onPress}
      style={[
        styles.chip,
        {
          borderColor: isActive ? activeColor : colors.border,
        },
        style,
      ]}
    >
      {iconPosition === "left" && renderIcon()}

      <Text
        style={[
          styles.text,
          { color: isActive ? activeColor : color.regularText },
          textStyle,
        ]}
      >
        {text}
      </Text>

      {iconPosition === "right" && renderIcon()}
    </TouchableOpacity>
  );
};

export default Chip;

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: windowWidth(3),
    paddingVertical: windowHeight(0.5),
    borderRadius: windowWidth(2),
    borderWidth: 1,
    backgroundColor: color.whiteColor,
  },
  text: {
    fontSize: fontSizes.xxs,
    fontFamily: fonts.regular,
    alignSelf:'center',
      textAlignVertical: "center",  
  includeFontPadding: false,
  },
});
