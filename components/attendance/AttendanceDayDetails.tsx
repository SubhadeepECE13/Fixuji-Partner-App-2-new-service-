// import React, { forwardRef, useMemo } from "react";
// import { View, StyleSheet, ScrollView } from "react-native";
// import { Text } from "react-native-paper";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";

// import color from "@/themes/Colors.themes";
// import fonts from "@/themes/Fonts.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";
// import CustomImage from "../common/CustomImage";
// import CustomBottomSheetModal from "../common/CustomBottomSheetModal";
// import AttendanceImage from "./AttendanceImage";
// // import AttendanceImage from "./AttendanceImage";

// type Props = {
//   index: number;
//   punch: {
//     checkin?: {
//       time?: string;
//       image?: string;
//       address?: string;
//     };
//     checkout?: {
//       time?: string;
//       image?: string;
//       address?: string;
//     };
//   };
// };

// const AttendanceDayDetails = forwardRef<BottomSheetModal, Props>(
//   ({ index, punch }, ref) => {
//     const snapPoints = useMemo(() => ["65%"], []);

//     return (
//       <CustomBottomSheetModal
//         ref={ref}
//         snapPoints={snapPoints}
//         initialSnapPoint={0}
//         enablePanDownToClose
//         enableDynamicSizing={false}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.container}>
//             <Text style={styles.title}>Punch {index + 1} Details</Text>

//             <View style={styles.card}>
//               <View style={styles.row}>
//                 <View style={styles.left}>
//                   <Text style={styles.sectionTitle}>Check In</Text>

//                   <Text style={styles.time}>
//                     {punch.checkin?.time || "N/A"}
//                   </Text>

//                   <Text style={styles.address}>
//                     {punch.checkin?.address || "Address not available"}
//                   </Text>
//                 </View>

//                 {punch.checkin?.image && (
//                   <View style={styles.imageWrapper}>
//                     {/* <AttendanceImage
//                       imageUrl={punch.checkin.image}
//                       resizeMode="cover"
//                     /> */}
//                     <AttendanceImage
//                       imageUrl={punch.checkin.image}
//                       blurhash="LKO2?U%2Tw=w]~RBVZRi};RPxuwH"
//                       borderRadius={10}
//                     />
//                   </View>
//                 )}
//               </View>
//             </View>

//             <View style={styles.card}>
//               <View style={styles.row}>
//                 <View style={styles.left}>
//                   <Text style={styles.sectionTitle}>Check Out</Text>

//                   <Text style={styles.time}>
//                     {punch.checkout?.time || "N/A"}
//                   </Text>

//                   <Text style={styles.address}>
//                     {punch.checkout?.address || "Address not available"}
//                   </Text>
//                 </View>

//                 {punch.checkout?.image && (
//                   <View style={styles.imageWrapper}>
//                     {/* <AttendanceImage
//                       imageUrl={punch.checkout.image}
//                       resizeMode="cover"
//                     /> */}
//                     <AttendanceImage
//                       imageUrl={punch.checkout.image}
//                       blurhash="LKO2?U%2Tw=w]~RBVZRi};RPxuwH"
//                       borderRadius={10}
//                     />
//                   </View>
//                 )}
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </CustomBottomSheetModal>
//     );
//   }
// );

// export default AttendanceDayDetails;
import React, { forwardRef, useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import CustomBottomSheetModal from "../common/CustomBottomSheetModal";
import AttendanceImage from "./AttendanceImage";

type Props = {
  index: number;
  punch: {
    checkin?: {
      time?: string;
      image?: string;
      address?: string;
    };
    checkout?: {
      time?: string;
      image?: string;
      address?: string;
    };
  };
  onDismiss?: () => void;
};

const AttendanceDayDetails = forwardRef<BottomSheetModal, Props>(
  ({ index, punch, onDismiss }, ref) => {
    const snapPoints = useMemo(() => ["65%"], []);

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        initialSnapPoint={0}
        enablePanDownToClose
        enableDynamicSizing={false}
        onDismiss={onDismiss}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Punch {index + 1} Details</Text>

            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.left}>
                  <Text style={styles.sectionTitle}>Check In</Text>
                  <Text style={styles.time}>
                    {punch.checkin?.time || "N/A"}
                  </Text>
                  <Text style={styles.address}>
                    {punch.checkin?.address || "Address not available"}
                  </Text>
                </View>

                {punch.checkin?.image && (
                  <View style={styles.imageWrapper}>
                    <AttendanceImage
                      imageUrl={punch.checkin.image}
                      blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
                      borderRadius={10}
                    />
                  </View>
                )}
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.left}>
                  <Text style={styles.sectionTitle}>Check Out</Text>
                  <Text style={styles.time}>
                    {punch.checkout?.time || "N/A"}
                  </Text>
                  <Text style={styles.address}>
                    {punch.checkout?.address || "Address not available"}
                  </Text>
                </View>

                {punch.checkout?.image && (
                  <View style={styles.imageWrapper}>
                    <AttendanceImage
                      imageUrl={punch.checkout.image}
                      blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
                      borderRadius={10}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </CustomBottomSheetModal>
    );
  }
);

export default AttendanceDayDetails;

const styles = StyleSheet.create({
  container: {
    padding: windowHeight(2),
    paddingBottom: windowHeight(4),
  },

  title: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.lg,
    color: color.primary,
    marginBottom: windowHeight(2),
  },

  card: {
    backgroundColor: color.bgGray,
    borderRadius: 14,
    padding: windowHeight(1.8),
    marginBottom: windowHeight(2),
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  left: {
    flex: 1,
    paddingRight: windowWidth(4),
  },

  sectionTitle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
    color: color.titleText,
    marginBottom: windowHeight(0.4),
  },

  time: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.md,
    color: color.primary,
  },

  address: {
    marginTop: windowHeight(0.6),
    fontFamily: fonts.regular,
    fontSize: fontSizes.sm,
    color: color.regularText,
    lineHeight: 20,
  },

  imageWrapper: {
    width: windowWidth(30),
    height: windowWidth(30),
  },

  scrollContent: {
    paddingBottom: windowHeight(10),
  },
});
