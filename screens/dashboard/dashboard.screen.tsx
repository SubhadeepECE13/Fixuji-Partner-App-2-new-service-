// import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
// import React, { useEffect, useMemo, useState } from "react";
// import { Image, ScrollView, Text, View } from "react-native";

// import { commonStyles } from "@/styles/common.style";
// import Header from "@/components/common/Header";
// import { RefreshControl } from "react-native-gesture-handler";
// import color from "@/themes/Colors.themes";
// import { DashBoardNavigationTab } from "@/configs/constants";
// import styles from "./style";
// import NavigationTab from "@/components/dashboard/NavigationTab";
// import { getUserData } from "@/store/actions/users/userAction";
// import { RootState } from "@/store/Store";
// import { getSettings } from "@/store/actions/settings/settingsActions";

// const DashboardScreen = () => {
//   const [refreshing, setRefreshing] = useState(false);

//   const dispatch = useAppDispatch();
//   const settings = useAppSelector((state: RootState) => state.settings.data);
//   const { user } = useAppSelector((state) => state.user);
//   const totalCommison = 3000;
//   const fetchUser = async () => {
//     try {
//       await dispatch(getUserData());
//     } catch (error) {
//       console.log("error fetching user data");
//     }
//   };

//   useEffect(() => {
//     dispatch(getSettings());
//   }, [dispatch]);

//   useEffect(() => {
//     if (user === null) {
//       fetchUser();
//     }
//   }, []);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await Promise.all([fetchUser(), dispatch(getSettings())]);
//     setRefreshing(false);
//   };
//   console.log("settingsResponse:", settings);

//   return (
//     <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
//       <Header
//         isBack={false}
//         isRightIcon={true}
//         isLeftIcon={true}
//         title="Dashboard"
//         rightIconName="user"
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[color.primary]}
//             progressBackgroundColor={color.whiteColor}
//           />
//         }
//       >
//         <View style={[styles.container]}>
//           <Image
//             style={[
//               styles.dashBox,
//               { backgroundImage: require("../../assets/images/icon.png") },
//             ]}
//           >
//             <Text style={{ color: color.green }}>Total Commison:</Text>
//             <Text>{totalCommison}</Text>
//           </Image>
//           <View style={styles.tabContainer}>
//             {DashBoardNavigationTab.map((tab) => {
//               return (
//                 <NavigationTab
//                   key={tab.title}
//                   image={tab.image}
//                   route={tab.route}
//                   title={tab.title}
//                 />
//               );
//             })}
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default DashboardScreen;

// import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
// import React, { useEffect, useState } from "react";
// import { ImageBackground, ScrollView, Text, View } from "react-native";

// import { commonStyles } from "@/styles/common.style";
// import Header from "@/components/common/Header";
// import { RefreshControl } from "react-native-gesture-handler";
// import color from "@/themes/Colors.themes";
// import { DashBoardNavigationTab } from "@/configs/constants";
// import styles from "./style";
// import NavigationTab from "@/components/dashboard/NavigationTab";
// import { getUserData } from "@/store/actions/users/userAction";
// import { RootState } from "@/store/Store";
// import { getSettings } from "@/store/actions/settings/settingsActions";

// const DashboardScreen = () => {
//   const [refreshing, setRefreshing] = useState(false);

//   const dispatch = useAppDispatch();
//   const settings = useAppSelector((state: RootState) => state.settings.data);
//   const { user } = useAppSelector((state) => state.user);

//   const totalCommison = 3000;

//   const fetchUser = async () => {
//     try {
//       await dispatch(getUserData());
//     } catch (error) {
//       console.log("error fetching user data");
//     }
//   };

//   useEffect(() => {
//     dispatch(getSettings());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!user) {
//       fetchUser();
//     }
//   }, []);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await Promise.all([fetchUser(), dispatch(getSettings())]);
//     setRefreshing(false);
//   };

//   return (
//     <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
//       <Header
//         isBack={false}
//         isRightIcon={true}
//         isLeftIcon={true}
//         title="Dashboard"
//         rightIconName="user"
//       />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[color.primary]}
//             progressBackgroundColor={color.whiteColor}
//           />
//         }
//       >
//         <View style={styles.container}>
//           <ImageBackground
//             source={require("../../assets/images/payments.png")}
//             style={styles.dashBox}
//             imageStyle={{ borderRadius: 12 }}
//             resizeMode="center"
//           >
//             <Text style={{ color: color.green, fontSize: 14 }}>
//               Total Commission
//             </Text>
//             <Text
//               style={{
//                 color: color.whiteColor,
//                 fontSize: 22,
//                 fontWeight: "bold",
//                 marginTop: 6,
//               }}
//             >
//               ₹ {totalCommison}
//             </Text>
//           </ImageBackground>

//           {/* Tabs */}
//           <View style={styles.tabContainer}>
//             {DashBoardNavigationTab.map((tab) => (
//               <NavigationTab
//                 key={tab.title}
//                 image={tab.image}
//                 route={tab.route}
//                 title={tab.title}
//               />
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default DashboardScreen;
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";

import Header from "@/components/common/Header";
import NavigationTab from "@/components/dashboard/NavigationTab";
import { RefreshControl } from "react-native-gesture-handler";

import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

import { DashBoardNavigationTab } from "@/configs/constants";
import { getUserData } from "@/store/actions/users/userAction";
import { getSettings } from "@/store/actions/settings/settingsActions";
import { RootState } from "@/store/Store";
import Images from "@/utils/images";

const DashboardScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const totalCommison = 3000;
  const rating = 4.5;
  const todayBookings = 12;

  const fetchUser = async () => {
    try {
      await dispatch(getUserData());
    } catch (error) {
      console.log("error fetching user data");
    }
  };

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchUser(), dispatch(getSettings())]);
    setRefreshing(false);
  };

  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <Header
        isBack={false}
        isRightIcon
        isLeftIcon
        title="Dashboard"
        rightIconName="user"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[color.primary]}
            progressBackgroundColor={color.whiteColor}
          />
        }
      >
        <View style={styles.container}>
          <ImageBackground
            source={Images.carImage}
            style={styles.dashBox}
            imageStyle={styles.imageStyle}
            resizeMode="cover"
          >
            <View style={styles.overlay}>
              <Text style={styles.cardTitle}>Today Summary</Text>

              <View style={styles.glassStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>₹{totalCommison}</Text>
                  <Text style={styles.statLabel}>Commission</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.statItem}>
                  <Text style={styles.statValue}>⭐ {rating}</Text>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{todayBookings}</Text>
                  <Text style={styles.statLabel}>Bookings</Text>
                </View>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.tabContainer}>
            {DashBoardNavigationTab.map((tab) => (
              <NavigationTab
                key={tab.title}
                image={tab.image}
                route={tab.route}
                title={tab.title}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
const styles = StyleSheet.create({
  container: {
    paddingVertical: windowHeight(2),
    paddingHorizontal: windowWidth(5),
  },

  dashBox: {
    width: "100%",
    height: windowHeight(22),
    marginBottom: windowHeight(2.5),
    borderRadius: windowHeight(2.5),
    overflow: "hidden",
    elevation: 6,
  },

  imageStyle: {
    borderRadius: windowHeight(2.5),
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: windowHeight(1.5),
    justifyContent: "space-between",
  },

  cardTitle: {
    color: color.whiteColor,
    fontSize: fontSizes.md,
    fontFamily: fonts.semiBold,
  },

  glassStats: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: windowHeight(1.6),
    paddingVertical: windowHeight(1.5),
    paddingHorizontal: windowWidth(3),
    alignItems: "center",
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    color: color.whiteColor,
    fontSize: fontSizes.smMd,
    fontFamily: fonts.bold,
  },

  statLabel: {
    color: "#E0E0E0",
    fontSize: fontSizes.xm,
    fontFamily: fonts.regular,
    marginTop: 2,
  },

  divider: {
    width: 1,
    height: "60%",
    backgroundColor: "rgba(255,255,255,0.35)",
  },

  tabContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: windowHeight(1.5),
    columnGap: windowHeight(1.5),
    justifyContent: "center",
    alignItems: "center",
  },
});
