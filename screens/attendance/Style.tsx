import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: windowWidth(5),
    paddingTop: windowHeight(1),
    // height: windowHeight(93)
  },
  box1: {
    height: windowHeight(43),
    justifyContent: "space-between",
    // borderWidth: 1
  },
  image: {
    width: "100%",
    height: "100%",
    // borderWidth: 1,
    // borderRadius: 20
  },
  checkinImage: {
    width: "90%",
    height: "100%",
    resizeMode: "cover",
    // borderWidth: 1,
    borderRadius: 10,
  },
  box2: {
    // backgroundColor: 'blue',
    // borderWidth: 1,
    paddingTop: windowHeight(2),
    // justifyContent: 'space-evenly',
    rowGap: windowHeight(1.9),
  },
  TimeCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: windowHeight(3),
  },
  chipHeading: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.rg,
    color: color.regularText,
  },
  chipContainer: {
    flexDirection: "row",
    gap: windowWidth(1.5),
    alignItems: "center",
  },
  chip: {
    borderRadius: 15,
  },
  chipBox: {
    rowGap: windowHeight(0.5),
    height: windowHeight(7),
    // backgroundColor: "red",
    justifyContent: "center",
  },
  imageContainer: {
    width: "48%",
    alignItems: "center",
    // height: "100%"
  },
  imageBox: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
    flexDirection: "row",
  },
  btnContainer: {
    height: windowHeight(9),
    paddingHorizontal: windowWidth(5),
    justifyContent: "center",
  },
});

export default styles;
