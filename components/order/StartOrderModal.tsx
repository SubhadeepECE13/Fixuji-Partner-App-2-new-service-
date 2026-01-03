// // // import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
// // // import { yupResolver } from "@hookform/resolvers/yup";
// // // import React, { useRef, useState } from "react";
// // // import { useForm } from "react-hook-form";
// // // import { StyleSheet, Text, View } from "react-native";
// // // import * as Yup from "yup";

// // // import Button from "@/components/common/Button";
// // // import CustomModal from "@/components/common/CustomModal";
// // // import Input from "@/components/common/Input";
// // // import { updateCarDetails } from "@/store/actions/orders/carUpdateActions";
// // // import color from "@/themes/Colors.themes";
// // // import {
// // //   fontSizes,
// // //   windowHeight,
// // //   windowWidth,
// // // } from "@/themes/Constants.themes";
// // // import fonts from "@/themes/Fonts.themes";
// // // import { BottomSheetModal } from "@gorhom/bottom-sheet";
// // // import BrandSelectSheet from "./BrandSelectionModal";

// // // type UpdateCarDetailsModalProps = {
// // //   isOpen: boolean;
// // //   setOpened: (val: boolean) => void;
// // //   orderId: string;
// // //   onSuccess?: () => void;
// // //   // handleSendLocation: () => void;
// // //   orderDocId: string;
// // // };

// // // interface VehicleUpdateFormData {
// // //   brand: string;
// // //   model: string;
// // //   numberPlate?: string;
// // //   capturedImage?: string;
// // // }

// // // const validationSchema = Yup.object().shape({
// // //   brand: Yup.string().required("Brand Name is required"),
// // //   model: Yup.string().required("Car Model is required"),
// // //   numberPlate: Yup.string().optional(),
// // //   capturedImage: Yup.string().optional(),
// // // });

// // // const UpdateCarDetailsModal: React.FC<UpdateCarDetailsModalProps> = ({
// // //   isOpen,
// // //   setOpened,
// // //   orderId,
// // //   onSuccess,
// // //   // handleSendLocation,
// // //   orderDocId,
// // // }) => {
// // //   const dispatch = useAppDispatch();
// // //   const { loading } = useAppSelector((state) => state.car);
// // //   const [disabled, setDisabled] = useState(false);
// // //   const brandSheetRef = useRef<BottomSheetModal>(null);

// // //   const { control, handleSubmit, reset, setValue, watch, formState } =
// // //     useForm<VehicleUpdateFormData>({
// // //       resolver: yupResolver(validationSchema),
// // //       defaultValues: {
// // //         brand: "",
// // //         model: "",
// // //         numberPlate: "",
// // //         capturedImage: "",
// // //       },
// // //     });

// // //   const handleUpdate = async (data: VehicleUpdateFormData) => {
// // //     setDisabled(true);
// // //     try {
// // //       if (!orderDocId) {
// // //         throw new Error("Order ID is required to update car details.");
// // //       }
// // //       await dispatch(updateCarDetails(orderDocId, data));
// // //       onSuccess?.();
// // //       // if (handleSendLocation) {
// // //       //   handleSendLocation();
// // //       // }
// // //       reset();
// // //       setOpened(false);
// // //     } catch (error) {
// // //       console.error("Error updating car details:", error);
// // //     } finally {
// // //       setDisabled(false);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <CustomModal
// // //         isOpen={isOpen}
// // //         setOpened={setOpened}
// // //         isBlur
// // //         blurTint="dark"
// // //         blurIntensity={25}
// // //       >
// // //         <View style={styles.modalBox}>
// // //           <Text style={styles.title}>Update Car Details</Text>

// // //           <View style={styles.formContainer}>
// // //             {/* Brand Field */}
// // //             <Input
// // //               control={control}
// // //               name="brand"
// // //               type="select"
// // //               placeholder="Select Car Brand"
// // //               onSelectPress={() => {
// // //                 setOpened(false);
// // //                 setTimeout(() => brandSheetRef.current?.present?.(), 100);
// // //               }}
// // //             />

// // //             <Input
// // //               control={control}
// // //               name="model"
// // //               placeholder="Enter Car Model"
// // //             />

// // //             <Input
// // //               control={control}
// // //               name="numberPlate"
// // //               placeholder="Enter Number Plate"
// // //             />

// // //             <Input
// // //               control={control}
// // //               name="capturedImage"
// // //               type="image"
// // //               placeholder="Add Car Image"
// // //               orderId={orderId}
// // //             />
// // //           </View>

// // //           <Button
// // //             width={windowWidth(50)}
// // //             height={windowHeight(5)}
// // //             title="Update"
// // //             backgroundColor={color.primary}
// // //             onPress={handleSubmit(handleUpdate)}
// // //             disabled={disabled || loading}
// // //             titleStyle={{ fontSize: fontSizes.md }}
// // //             isLoading={loading}
// // //           />
// // //         </View>
// // //       </CustomModal>

// // //       {/* Brand Sheet */}
// // //       <BrandSelectSheet
// // //         ref={brandSheetRef}
// // //         onSelect={(brand) => {
// // //           setValue("brand", brand, { shouldValidate: true });
// // //           brandSheetRef.current?.close();
// // //           setOpened(true);
// // //         }}
// // //       />
// // //     </>
// // //   );
// // // };

// // // export default UpdateCarDetailsModal;

// // // const styles = StyleSheet.create({
// // //   modalBox: {
// // //     width: windowWidth(85),
// // //     backgroundColor: color.whiteColor,
// // //     borderRadius: windowWidth(5),
// // //     paddingVertical: windowHeight(2),
// // //     paddingHorizontal: windowWidth(4),
// // //     alignItems: "center",
// // //   },
// // //   title: {
// // //     fontSize: fontSizes.md,
// // //     fontFamily: fonts.bold,
// // //     color: color.primary,
// // //     marginBottom: windowHeight(2),
// // //   },
// // //   formContainer: {
// // //     width: windowWidth(75),
// // //     marginBottom: windowHeight(2),
// // //   },
// // //   errorText: {
// // //     color: "red",
// // //     fontSize: fontSizes.sm,
// // //     marginTop: 4,
// // //     alignSelf: "flex-start",
// // //   },
// // // });

// // import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
// // import { yupResolver } from "@hookform/resolvers/yup";
// // import React, { useEffect, useRef, useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { StyleSheet, Text, View } from "react-native";
// // import * as Yup from "yup";

// // import Button from "@/components/common/Button";
// // import CustomModal from "@/components/common/CustomModal";
// // import Input from "@/components/common/Input";
// // import { updateCarDetails } from "@/store/actions/orders/carUpdateActions";
// // import color from "@/themes/Colors.themes";
// // import {
// //   fontSizes,
// //   windowHeight,
// //   windowWidth,
// // } from "@/themes/Constants.themes";
// // import fonts from "@/themes/Fonts.themes";
// // import { BottomSheetModal } from "@gorhom/bottom-sheet";
// // import BrandSelectSheet from "./BrandSelectionModal";

// // type UpdateCarDetailsModalProps = {
// //   isOpen: boolean;
// //   setOpened: (val: boolean) => void;
// //   orderId: string;
// //   orderDocId: string;
// //   onSuccess?: () => void;
// // };

// // interface VehicleUpdateFormData {
// //   brand: string;
// //   model: string;
// //   numberPlate?: string;
// //   capturedImage?: string;
// // }

// // const validationSchema = Yup.object().shape({
// //   brand: Yup.string().required("Brand Name is required"),
// //   model: Yup.string().required("Car Model is required"),
// //   numberPlate: Yup.string().optional(),
// //   capturedImage: Yup.string().optional(),
// // });

// // const UpdateCarDetailsModal: React.FC<UpdateCarDetailsModalProps> = ({
// //   isOpen,
// //   setOpened,
// //   orderId,
// //   orderDocId,
// //   onSuccess,
// // }) => {
// //   const dispatch = useAppDispatch();
// //   const { loading } = useAppSelector((state) => state.car);
// //   const carData = useAppSelector(
// //     (state) => state.orderDetails?.orderDetails?.data.vehicle
// //   );

// //   const [disabled, setDisabled] = useState(false);
// //   const brandSheetRef = useRef<BottomSheetModal>(null);
// //   const carBrand = carData?.brand;
// //   const carModel = carData?.model;
// //   const carNumberplate = carData?.numberPlate;
// //   const { control, handleSubmit, reset, setValue } =
// //     useForm<VehicleUpdateFormData>({
// //       resolver: yupResolver(validationSchema),
// //       defaultValues: {
// //         brand: carBrand,
// //         model: carModel,
// //         numberPlate: carNumberplate,
// //         capturedImage: "",
// //       },
// //     });

// //   const handleUpdate = async (data: VehicleUpdateFormData) => {
// //     setDisabled(true);
// //     try {
// //       await dispatch(updateCarDetails(orderDocId, data));
// //       onSuccess?.();
// //       reset();
// //       setOpened(false);
// //     } catch (error) {
// //       console.error("Error updating car details:", error);
// //     } finally {
// //       setDisabled(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <CustomModal
// //         isOpen={isOpen}
// //         setOpened={setOpened}
// //         isBlur
// //         blurTint="dark"
// //         blurIntensity={25}
// //       >
// //         <View style={styles.modalBox}>
// //           <Text style={styles.title}>Update Car Details</Text>

// //           <View style={styles.formContainer}>
// //             {/* Brand Field */}
// //             <Input
// //               control={control}
// //               name="brand"
// //               type="select"
// //               placeholder="Select Car Brand"
// //               onSelectPress={() => {
// //                 setOpened(false);
// //                 setTimeout(() => brandSheetRef.current?.present?.(), 100);
// //               }}
// //             />

// //             <Input
// //               control={control}
// //               name="model"
// //               placeholder="Enter Car Model"
// //             />

// //             <Input
// //               control={control}
// //               name="numberPlate"
// //               placeholder="Enter Number Plate"
// //             />

// //             <Input
// //               control={control}
// //               name="capturedImage"
// //               type="image"
// //               placeholder="Add Car Image"
// //               orderId={orderId}
// //             />
// //           </View>

// //           <Button
// //             width={windowWidth(50)}
// //             height={windowHeight(5)}
// //             title="Update"
// //             backgroundColor={color.primary}
// //             onPress={handleSubmit(handleUpdate)}
// //             disabled={disabled || loading}
// //             titleStyle={{ fontSize: fontSizes.md }}
// //             isLoading={loading}
// //           />
// //         </View>
// //       </CustomModal>

// //       {/* Brand Bottom Sheet */}
// //       <BrandSelectSheet
// //         ref={brandSheetRef}
// //         onSelect={(brand) => {
// //           setValue("brand", brand, { shouldValidate: true });
// //           brandSheetRef.current?.close();
// //           setOpened(true);
// //         }}
// //       />
// //     </>
// //   );
// // };

// // export default UpdateCarDetailsModal;

// // const styles = StyleSheet.create({
// //   modalBox: {
// //     width: windowWidth(85),
// //     backgroundColor: color.whiteColor,
// //     borderRadius: windowWidth(5),
// //     paddingVertical: windowHeight(2),
// //     paddingHorizontal: windowWidth(4),
// //     alignItems: "center",
// //   },
// //   title: {
// //     fontSize: fontSizes.md,
// //     fontFamily: fonts.bold,
// //     color: color.primary,
// //     marginBottom: windowHeight(2),
// //   },
// //   formContainer: {
// //     width: windowWidth(75),
// //     marginBottom: windowHeight(2),
// //   },
// // });

// // components/order/StartOrderModal.tsx

// import React, { useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import CustomModal from "@/components/common/CustomModal";
// import Input from "@/components/common/Input";
// import Button from "@/components/common/Button";
// import color from "@/themes/Colors.themes";
// import {
//   windowHeight,
//   windowWidth,
//   fontSizes,
// } from "@/themes/Constants.themes";
// import * as ExpoLocation from "expo-location";
// import Toast from "react-native-toast-message";
// import { useAppDispatch } from "@/store/Reduxhook";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
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

//   const validationSchema = Yup.object().shape({
//     image: Yup.string().optional(),
//   });
//   const { control, reset, setValue } = useForm<{ image?: string }>({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       image: "",
//     },
//   });
//   const handleSubmit = async () => {
//     if (!image) {
//       Toast.show({
//         type: "error",
//         text1: "Please capture an image",
//       });
//       return;
//     }

//     const { status } = await ExpoLocation.requestForegroundPermissionsAsync();

//     if (status !== "granted") {
//       Toast.show({
//         type: "error",
//         text1: "Location permission denied",
//       });
//       return;
//     }

//     const location = await ExpoLocation.getCurrentPositionAsync({
//       accuracy: ExpoLocation.Accuracy.High,
//     });

//     setLoading(true);
//     try {
//       await dispatch(
//         startOrder(
//           {
//             bookingId,
//             lat: location.coords.latitude,
//             long: location.coords.longitude,
//             image: {
//               uri: image.uri,
//               name: "start_order.jpg",
//               type: "image/jpeg",
//             },
//           },
//           orderDocId
//         )
//       );

//       setOpened(false);
//       setImage(null);
//     } catch {
//       // toast already handled
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <CustomModal isOpen={isOpen} setOpened={setOpened} isBlur>
//       <View style={styles.modalBox}>
//         <Text style={styles.title}>Start Order</Text>

//         {/* <Input
//           name="startOrderImage"
//           type="image"
//           placeholder="Capture Vehicle Image"
//           onImageSelected={(img) => setImage(img)}
//         /> */}
//         <Input
//           control={control}
//           name="capturedImage"
//           type="image"
//           placeholder="Add Car Image"
//         />

//         <Button
//           title="Start Order"
//           width={windowWidth(60)}
//           height={windowHeight(5)}
//           backgroundColor={color.primary}
//           onPress={handleSubmit}
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
// });

import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
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
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Toast.show({ type: "error", text1: "Camera permission denied" });
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
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
    if (!image) {
      Toast.show({ type: "error", text1: "Please capture image" });
      return;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.show({ type: "error", text1: "Location permission denied" });
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setLoading(true);
    try {
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
      // toast handled in thunk
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal isOpen={isOpen} setOpened={setOpened} isBlur>
      <View style={styles.modalBox}>
        <Text style={styles.title}>Start Order</Text>

        <TouchableOpacity
          style={styles.imageBox}
          onPress={openCamera}
          activeOpacity={0.8}
        >
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.preview} />
          ) : (
            <Text style={styles.placeholder}>Tap to capture image</Text>
          )}
        </TouchableOpacity>

        <Button
          title="Start Order"
          width={windowWidth(60)}
          height={windowHeight(5)}
          backgroundColor={color.primary}
          onPress={handleStartOrder}
          isLoading={loading}
          disabled={loading}
        />
      </View>
    </CustomModal>
  );
};

export default StartOrderModal;

const styles = StyleSheet.create({
  modalBox: {
    width: windowWidth(85),
    backgroundColor: color.whiteColor,
    borderRadius: 16,
    padding: windowWidth(4),
    alignItems: "center",
  },
  title: {
    fontSize: fontSizes.lg,
    marginBottom: windowHeight(2),
    fontWeight: "600",
  },
  imageBox: {
    width: windowWidth(60),
    height: windowWidth(40),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: color.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: windowHeight(2),
    backgroundColor: color.lightGray,
  },
  placeholder: {
    color: color.placeholderText,
    fontSize: fontSizes.md,
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
