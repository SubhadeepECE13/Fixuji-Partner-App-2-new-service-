// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Platform,
//   TouchableOpacity,
//   View,
//   Text,
//   StyleSheet,
//   InteractionManager,
// } from "react-native";
// import * as Linking from "expo-linking";
// import * as Location from "expo-location";
// import Toast from "react-native-toast-message";
// import Button from "@/components/common/Button";
// import { CustomIcon } from "@/components/common/Icon";
// import CustomModal from "@/components/common/CustomModal";
// import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
// import color from "@/themes/Colors.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";
// import { checkPermissions } from "@/utils/Permissions.utils";
// import { SettingsResponse } from "../settings/settings.types";
// import { IUser } from "../users/users.types";
// import { lockCall } from "./OrderAction";
// import VendorSelectModal from "@/components/order/VendorSelectionModal";
// import { fetchVendors } from "../vendors/vendorAction";
// import { Order } from "./orders.action";

// type Props = {
//   phone: string;
//   geolocation: string | null;
//   containerStyle?: any;
//   order: Order;
//   user: IUser;
//   navigateAddressLink: string | null;
//   settings: SettingsResponse;
//   iconStyle?: any;
//   refreshFilters: any;
// };

// const ContactActions: React.FC<Props> = ({
//   phone,
//   geolocation,
//   order,
//   user,
//   navigateAddressLink,
//   settings,
//   containerStyle = {},
//   iconStyle = {},
//   refreshFilters,
// }) => {
//   const [currentLocation, setCurrentLocation] = useState<{
//     latitude: number;
//     longitude: number;
//   } | null>(null);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const dispatch = useAppDispatch();
//   const { isLoactionPermission } = useAppSelector((state) => state.user);

//   const [callLoading, setCallLoading] = useState(false);
//   const [mapLoading, setMapLoading] = useState(false);
//   const canShowStartButton =
//     order.status === "ASSIGNED" ||
//     order.status === "REASSIGNED" ||
//     order.status === "RESCHEDULED";

//   useEffect(() => {
//     getCurrentLocation();
//   }, [isLoactionPermission]);

//   const getCurrentLocation = async () => {
//     try {
//       await checkPermissions(dispatch);
//       if (isLoactionPermission !== "granted") return;

//       const location = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.High,
//       });

//       setCurrentLocation({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       });
//     } catch (error) {
//       Toast.show({
//         type: "error",
//         text1: "Location Not Found!",
//       });
//     }
//   };

//   const openDialer = useCallback(async () => {
//     try {
//       setCallLoading(true);
//       const payload = buildCallLockPayload(order, user);
//       const result = await dispatch(lockCall(payload));

//       if (!result || !result.success) {
//         Toast.show({ type: "error", text1: "Call lock failed" });
//         return;
//       }

//       const staticNumber = settings.primaryIvrNumber;
//       const phoneURL =
//         Platform.OS === "android"
//           ? `tel:${staticNumber}`
//           : `telprompt:${staticNumber}`;

//       await Linking.openURL(phoneURL);
//     } catch (error) {
//       Toast.show({ type: "error", text1: "Failed to open the dialer" });
//     } finally {
//       setCallLoading(false);
//     }
//   }, [dispatch, order, user, settings]);

//   const openGoogleMaps = useCallback(async () => {
//     try {
//       // 🔹 1️⃣ First preference → redirect link
//       if (navigateAddressLink) {
//         const supported = await Linking.canOpenURL(navigateAddressLink);
//         if (supported) {
//           await Linking.openURL(navigateAddressLink);
//           return;
//         } else {
//           Toast.show({
//             type: "error",
//             text1: "Cannot open provided address link.",
//           });
//         }
//       }

//       // 🔹 2️⃣ Next → Use coordinates if available
//       if (!currentLocation) {
//         Toast.show({ type: "error", text1: "Current location not available." });
//         return;
//       }

//       if (!geolocation) {
//         Toast.show({
//           type: "error",
//           text1: "Location coordinate not available for this user.",
//         });
//         return;
//       }

//       const [destLat, destLng] = geolocation.split(",");
//       const { latitude: currentLat, longitude: currentLng } = currentLocation;

//       let url = "";

//       if (Platform.OS === "ios") {
//         url = `http://maps.apple.com/?saddr=${currentLat},${currentLng}&daddr=${destLat},${destLng}`;
//         const googleMapsURL = `comgooglemaps://?saddr=${currentLat},${currentLng}&daddr=${destLat},${destLng}&directionsmode=driving`;
//         const canOpenGoogle = await Linking.canOpenURL(googleMapsURL);
//         if (canOpenGoogle) url = googleMapsURL;
//       } else {
//         url = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${destLat},${destLng}&travelmode=driving`;
//       }

//       const supported = await Linking.canOpenURL(url);
//       if (supported) {
//         await Linking.openURL(url);
//       } else {
//         Toast.show({ type: "error", text1: "Maps app not available." });
//       }
//     } catch (error) {
//       Toast.show({ type: "error", text1: "Failed to open maps." });
//     }
//   }, [navigateAddressLink, currentLocation, geolocation]);

//   //

//   const handleStartPress = () => {
//     setIsVendorModalOpen(true);

//     InteractionManager.runAfterInteractions(() => {
//       dispatch(fetchVendors());
//     });
//   };

//   const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);

//   const handleVendorSelect = (selectedVendors: any) => {
//     console.log("Selected vendors:", selectedVendors);
//     Toast.show({
//       type: "success",
//       text1: `${selectedVendors.length} vendor(s) selected.`,
//     });
//   };

//   return (
//     <>
//       <View
//         style={[
//           {
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center",
//             alignSelf: "center",
//           },
//           containerStyle,
//         ]}
//       >
//         <TouchableOpacity style={iconStyle} onPress={openDialer}>
//           <CustomIcon
//             type="SimpleLineIcons"
//             name="phone"
//             size={16}
//             color={color.lightGray}
//             isLoading={callLoading}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity style={iconStyle} onPress={openGoogleMaps}>
//           <CustomIcon
//             type="Feather"
//             name="map-pin"
//             size={16}
//             color={color.lightGray}
//             isLoading={mapLoading}
//           />
//         </TouchableOpacity>

//         {canShowStartButton && (
//           <Button
//             width={windowWidth(18)}
//             height={windowHeight(4.3)}
//             title="Start"
//             backgroundColor={color.primary}
//             iconType="MaterialIcons"
//             iconName="directions"
//             iconSize={16}
//             isIcon
//             titleStyle={{ fontSize: fontSizes.sm }}
//             onPress={handleStartPress}
//           />
//         )}

//         <VendorSelectModal
//           isOpen={isVendorModalOpen}
//           setOpened={setIsVendorModalOpen}
//           onSelect={handleVendorSelect}
//           orderId={order.orderDocId}
//           refreshFilters={refreshFilters}
//         />
//       </View>
//     </>
//   );
// };

// export default ContactActions;

// const styles = StyleSheet.create({
//   modalBox: {
//     width: windowWidth(80),
//     height: windowHeight(25),
//     backgroundColor: color.whiteColor,
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: windowWidth(5),
//   },
//   modalTitle: {
//     fontSize: fontSizes.lg,
//     fontWeight: "600",
//     color: color.blue,
//     marginBottom: windowHeight(1),
//   },
//   modalDesc: {
//     fontSize: fontSizes.md,
//     color: color.appHeaderText,
//     textAlign: "center",
//     marginBottom: windowHeight(2),
//   },
// });
import React, { useCallback, useEffect, useState } from "react";
import {
  Platform,
  TouchableOpacity,
  View,
  InteractionManager,
} from "react-native";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";

import Button from "@/components/common/Button";
import { CustomIcon } from "@/components/common/Icon";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import { checkPermissions } from "@/utils/Permissions.utils";
import { SettingsResponse } from "../settings/settings.types";
import { IUser } from "../users/users.types";
import { lockCall } from "./OrderAction";
import VendorSelectModal from "@/components/order/VendorSelectionModal";
import { IBookingResponse } from "./orders.action";

type Props = {
  phone: string;
  geolocation: string | null;
  order: IBookingResponse;
  user: IUser;
  navigateAddressLink: string | null;
  settings: SettingsResponse;
  containerStyle?: any;
  iconStyle?: any;
  refreshFilters?: any;
};

const ContactActions: React.FC<Props> = ({
  phone,
  geolocation,
  order,
  user,
  navigateAddressLink,
  settings,
  containerStyle = {},
  iconStyle = {},
  refreshFilters,
}) => {
  const dispatch = useAppDispatch();
  const { isLoactionPermission } = useAppSelector((state) => state.user);

  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [callLoading, setCallLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);

  const canShowStartButton =
    order.status === "ASSIGNED" ||
    order.status === "REASSIGNED" ||
    order.status === "RESCHEDULED";

  useEffect(() => {
    getCurrentLocation();
  }, [isLoactionPermission]);

  const getCurrentLocation = async () => {
    try {
      await checkPermissions(dispatch);
      if (isLoactionPermission !== "granted") return;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch {
      Toast.show({ type: "error", text1: "Location Not Found!" });
    }
  };

  // const openDialer = useCallback(async () => {
  //   try {
  //     setCallLoading(true);

  //     const payload = {
  //       orderId: order.id,
  //       userId: user.id,
  //     };

  //     const result = await dispatch(lockCall(payload));

  //     if (!result?.success) {
  //       Toast.show({ type: "error", text1: "Call lock failed" });
  //       return;
  //     }

  //     const staticNumber = settings.primaryIvrNumber;
  //     const phoneURL =
  //       Platform.OS === "android"
  //         ? `tel:${staticNumber}`
  //         : `telprompt:${staticNumber}`;

  //     await Linking.openURL(phoneURL);
  //   } catch {
  //     Toast.show({ type: "error", text1: "Failed to open dialer" });
  //   } finally {
  //     setCallLoading(false);
  //   }
  // }, [dispatch, order, user, settings]);

  const openGoogleMaps = useCallback(async () => {
    try {
      if (navigateAddressLink) {
        const supported = await Linking.canOpenURL(navigateAddressLink);
        if (supported) {
          await Linking.openURL(navigateAddressLink);
          return;
        }
      }

      if (!currentLocation || !geolocation) {
        Toast.show({ type: "error", text1: "Location unavailable" });
        return;
      }

      const [destLat, destLng] = geolocation.split(",");
      const { latitude, longitude } = currentLocation;

      const url =
        Platform.OS === "ios"
          ? `http://maps.apple.com/?saddr=${latitude},${longitude}&daddr=${destLat},${destLng}`
          : `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destLat},${destLng}`;

      await Linking.openURL(url);
    } catch {
      Toast.show({ type: "error", text1: "Failed to open maps" });
    }
  }, [navigateAddressLink, currentLocation, geolocation]);

  const handleStartPress = () => {
    setIsVendorModalOpen(true);
    InteractionManager.runAfterInteractions(() => {});
  };

  return (
    <>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          },
          containerStyle,
        ]}
      >
        {/* <TouchableOpacity style={iconStyle} onPress={openDialer}>
          <CustomIcon
            type="SimpleLineIcons"
            name="phone"
            size={16}
            color={color.lightGray}
            isLoading={callLoading}
          />
        </TouchableOpacity> */}

        <TouchableOpacity style={iconStyle} onPress={openGoogleMaps}>
          <CustomIcon
            type="Feather"
            name="map-pin"
            size={16}
            color={color.lightGray}
            isLoading={mapLoading}
          />
        </TouchableOpacity>

        {canShowStartButton && (
          <Button
            width={windowWidth(18)}
            height={windowHeight(4.3)}
            title="Start"
            backgroundColor={color.primary}
            iconType="MaterialIcons"
            iconName="directions"
            iconSize={16}
            isIcon
            titleStyle={{ fontSize: fontSizes.sm }}
            onPress={handleStartPress}
          />
        )}
      </View>

      <VendorSelectModal
        isOpen={isVendorModalOpen}
        setOpened={setIsVendorModalOpen}
        order={order}
        refreshFilters={refreshFilters}
      />
    </>
  );
};

export default ContactActions;
