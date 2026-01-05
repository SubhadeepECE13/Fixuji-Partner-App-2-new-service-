// import React, { useState } from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import * as Location from "expo-location";
// import Toast from "react-native-toast-message";

// import CustomModal from "@/components/common/CustomModal";
// import Button from "@/components/common/Button";
// import color from "@/themes/Colors.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";
// import { useAppDispatch } from "@/store/Reduxhook";
// import { startOrder } from "@/store/actions/vendors/vendorAction";

// type Props = {
//   isOpen: boolean;
//   setOpened: (v: boolean) => void;
//   bookingId: number;
//   orderDocId: string;
// };

// const StartOrderModal: React.FC<Props> = ({
//   isOpen,
//   setOpened,
//   bookingId,
//   orderDocId,
// }) => {
//   const dispatch = useAppDispatch();
//   const [image, setImage] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const openCamera = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== "granted") {
//       Toast.show({ type: "error", text1: "Camera permission denied" });
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       quality: 0.7,
//       allowsEditing: true,
//     });

//     if (!result.canceled && result.assets?.length) {
//       const asset = result.assets[0];
//       setImage({
//         uri: asset.uri,
//         name: `start_order_${Date.now()}.jpg`,
//         type: "image/jpeg",
//       });
//     }
//   };

//   const handleStartOrder = async () => {
//     if (!image) {
//       Toast.show({ type: "error", text1: "Please capture image" });
//       return;
//     }

//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Toast.show({ type: "error", text1: "Location permission denied" });
//       return;
//     }

//     const location = await Location.getCurrentPositionAsync({
//       accuracy: Location.Accuracy.High,
//     });

//     setLoading(true);
//     try {
//       await dispatch(
//         startOrder(
//           {
//             bookingId,
//             lat: location.coords.latitude,
//             long: location.coords.longitude,
//             image,
//           },
//           orderDocId
//         )
//       );

//       setOpened(false);
//       setImage(null);
//     } catch {
//       // toast handled in thunk
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <CustomModal isOpen={isOpen} setOpened={setOpened} isBlur>
//       <View style={styles.modalBox}>
//         <Text style={styles.title}>Start Order</Text>

//         <TouchableOpacity
//           style={styles.imageBox}
//           onPress={openCamera}
//           activeOpacity={0.8}
//         >
//           {image ? (
//             <Image source={{ uri: image.uri }} style={styles.preview} />
//           ) : (
//             <Text style={styles.placeholder}>Tap to capture image</Text>
//           )}
//         </TouchableOpacity>

//         <Button
//           title="Start Order"
//           width={windowWidth(60)}
//           height={windowHeight(5)}
//           backgroundColor={color.primary}
//           onPress={handleStartOrder}
//           isLoading={loading}
//           disabled={loading}
//         />
//       </View>
//     </CustomModal>
//   );
// };

// export default StartOrderModal;

// const styles = StyleSheet.create({
//   modalBox: {
//     width: windowWidth(85),
//     backgroundColor: color.whiteColor,
//     borderRadius: 16,
//     padding: windowWidth(4),
//     alignItems: "center",

//   },
//   title: {
//     fontSize: fontSizes.lg,
//     marginBottom: windowHeight(2),
//     fontWeight: "600",
//   },
//   imageBox: {
//     width: windowWidth(60),
//     height: windowWidth(40),
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: color.primary,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: windowHeight(2),
//     backgroundColor: color.lightGray,
//   },
//   placeholder: {
//     color: color.placeholderText,
//     fontSize: fontSizes.md,
//   },
//   preview: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 12,
//   },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";

import CustomModal from "@/components/common/CustomModal";
import Button from "@/components/common/Button";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import { useAppDispatch } from "@/store/Reduxhook";
import { startOrder } from "@/store/actions/vendors/vendorAction";

type Props = {
  isOpen: boolean;
  setOpened: (v: boolean) => void;
  bookingId: number;
  orderDocId: string;
};

const StartOrderModal: React.FC<Props> = ({
  isOpen,
  setOpened,
  bookingId,
  orderDocId,
}) => {
  const dispatch = useAppDispatch();

  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const openCamera = async () => {
    if (loading) return;

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Toast.show({ type: "error", text1: "Camera permission denied" });
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets?.length) {
      const asset = result.assets[0];
      setImage({
        uri: asset.uri,
        name: `start_order_${Date.now()}.jpg`,
        type: "image/jpeg",
      });
    }
  };

  const handleStartOrder = async () => {
    if (loading) return;

    if (!image) {
      Toast.show({ type: "error", text1: "Please capture image" });
      return;
    }

    setLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({ type: "error", text1: "Location permission denied" });
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      await dispatch(
        startOrder(
          {
            bookingId,
            lat: location.coords.latitude,
            long: location.coords.longitude,
            image,
          },
          orderDocId
        )
      );

      setOpened(false);
      setImage(null);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal isOpen={isOpen} setOpened={setOpened} isBlur>
      <View style={styles.card}>
        <Text style={styles.title}>Start Order</Text>
        <Text style={styles.subtitle}>
          Capture vehicle image to begin service
        </Text>

        <TouchableOpacity
          style={styles.imageBox}
          onPress={openCamera}
          activeOpacity={0.85}
          disabled={loading}
        >
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.preview} />
          ) : (
            <Text style={styles.placeholder}>Tap to capture image</Text>
          )}
        </TouchableOpacity>

        <Button
          title={loading ? "Starting..." : "Start Order"}
          width={windowWidth(70)}
          height={windowHeight(5.5)}
          backgroundColor={color.primary}
          onPress={handleStartOrder}
          disabled={loading}
          isLoading={loading}
        />

        {loading && (
          <View style={styles.loaderRow}>
            <ActivityIndicator size="small" color={color.primary} />
            <Text style={styles.loadingText}>Processing order...</Text>
          </View>
        )}
      </View>
    </CustomModal>
  );
};

export default StartOrderModal;
const styles = StyleSheet.create({
  card: {
    width: windowWidth(88),
    backgroundColor: color.whiteColor,
    borderRadius: 20,
    padding: windowWidth(5),
    alignItems: "center",
    elevation: 6,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: "700",
    color: color.primary,
    marginBottom: windowHeight(0.5),
  },
  subtitle: {
    fontSize: fontSizes.sm,
    color: color.regularText,
    marginBottom: windowHeight(2),
    textAlign: "center",
  },
  imageBox: {
    width: windowWidth(70),
    height: windowWidth(42),
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: color.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: windowHeight(2.5),
    backgroundColor: color.lightGray,
    overflow: "hidden",
  },
  placeholder: {
    color: color.placeholderText,
    fontSize: fontSizes.md,
  },
  preview: {
    width: "100%",
    height: "100%",
  },
  loaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: windowHeight(1.5),
  },
  loadingText: {
    marginLeft: 8,
    fontSize: fontSizes.sm,
    color: color.regularText,
  },
});
