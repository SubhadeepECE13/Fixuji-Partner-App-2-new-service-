import { StyleSheet, Text, View } from "react-native";
import React from "react";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

interface HeaderCardItem {
  label: string;
  value: number | string;
  valueColor?: string;
}

interface Props {
  items: HeaderCardItem[];
}

const HeaderCard: React.FC<Props> = ({ items }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <View style={styles.item}>
              <Text style={styles.label}>{item.label}</Text>
              <Text
                style={[
                  styles.value,
                  { color: item.valueColor ?? color.amountGreen },
                ]}
              >
                {item.value}
              </Text>
            </View>

            {index !== items.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default HeaderCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: color.whiteColor,
    borderRadius: 12,
    padding: windowWidth(4),
    marginBottom: windowHeight(2),
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  item: {
    flex: 1,
    alignItems: "center",
  },

  label: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: color.appHeaderText,
    marginBottom: windowHeight(0.5),
  },

  value: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.semiBold,
  },

  divider: {
    width: 1,
    height: windowHeight(4),
    backgroundColor: color.primary,
  },
});
