import React, { useRef } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import { windowHeight, windowWidth } from "@/themes/Constants.themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SwipeButtonProps {
  title?: string;
  style?: ViewStyle;
  backgroundColor?: string;
  onSwipeSuccess: () => void;
}

const SwipeButton: React.FC<SwipeButtonProps> = ({
  title = "Swipe to Redeem",
  onSwipeSuccess,
  style,
  backgroundColor = color.primary,
}) => {
  const swipeX = useRef(new Animated.Value(0)).current;

  const BUTTON_WIDTH = windowWidth(90);
  const THUMB_SIZE = windowHeight(5);
  const MAX_SWIPE = BUTTON_WIDTH - THUMB_SIZE - 6;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > Math.abs(gesture.dy),

      onPanResponderMove: (_, gesture) => {
        if (gesture.dx >= 0 && gesture.dx <= MAX_SWIPE) {
          swipeX.setValue(gesture.dx);
        }
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > MAX_SWIPE * 0.8) {
          Animated.timing(swipeX, {
            toValue: MAX_SWIPE,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            onSwipeSuccess();
            swipeX.setValue(0);
          });
        } else {
          Animated.spring(swipeX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View
      style={[
        styles.container,
        { width: BUTTON_WIDTH, backgroundColor },
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.thumb,
          {
            transform: [{ translateX: swipeX }],
          },
        ]}
      >
        <MaterialCommunityIcons
          name="arrow-right"
          size={42}
          color={color.primary}
        />
      </Animated.View>
    </View>
  );
};

export default SwipeButton;

const styles = StyleSheet.create({
  container: {
    height: windowHeight(6),
    backgroundColor: color.primary,
    borderRadius: 30,
    justifyContent: "center",
    overflow: "hidden",
  },

  text: {
    position: "absolute",
    alignSelf: "center",
    color: "#fff",
    fontFamily: fonts.medium,
    fontSize: 16,
  },

  thumb: {
    height: windowHeight(5),
    width: windowHeight(5),
    borderRadius: 100,
    backgroundColor: "#fff",
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  arrow: {
    fontSize: 22,
    color: color.primary,
    fontWeight: "bold",
  },
});
