// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Animated, { ZoomIn } from "react-native-reanimated";
// import Checkbox from "expo-checkbox";
// import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
// import {
//   fetchVendors,
//   updateVendorDetails,
// } from "@/store/actions/vendors/vendorAction";
// import CustomModal from "@/components/common/CustomModal";
// import Button from "@/components/common/Button";
// import CustomSkeletonLoader from "@/components/common/CustomSkeletonLoader";
// import color from "@/themes/Colors.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";
// import { router } from "expo-router";

// type VendorSelectModalProps = {
//   isOpen: boolean;
//   setOpened: (val: boolean) => void;
//   onSelect: (selectedVendors: any[]) => void;
//   orderId: string;
//   refreshFilters: any;
// };

// const VendorSelectModal: React.FC<VendorSelectModalProps> = ({
//   isOpen,
//   setOpened,
//   onSelect,
//   orderId,
//   refreshFilters,
// }) => {
//   const dispatch = useAppDispatch();
//   const { vendors, loading } = useAppSelector((state) => state.vendor);

//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (isOpen) setSelectedIds([]);
//   }, [isOpen]);

//   const toggleSelection = (id: string) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const handleSelect = async () => {
//     const selectedVendors = vendors.filter((v) => selectedIds.includes(v.id));
//     if (selectedVendors.length === 0) return;

//     const payload = {
//       vendors: selectedVendors.map((vendor) => ({
//         name: vendor.vendor_name,
//         role: vendor.role,
//         vendor_id: vendor.id,
//       })),
//     };

//     setIsSubmitting(true);

//     try {
//       await dispatch(updateVendorDetails(orderId, payload, refreshFilters));

//       onSelect(selectedVendors);
//       setOpened(false);

//       setTimeout(() => {
//         router.replace(`/orderDetailes/${orderId}`);
//       }, 300);
//     } catch (error) {
//       console.error("Error updating vendors:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   console.log("in start ", orderId);

//   const renderItem = ({ item, index }: any) => (
//     <TouchableOpacity
//       style={styles.itemRow}
//       activeOpacity={0.8}
//       onPress={() => toggleSelection(item.id)}
//     >
//       <Checkbox
//         value={selectedIds.includes(item.id)}
//         onValueChange={() => toggleSelection(item.id)}
//         color={selectedIds.includes(item.id) ? color.primary : undefined}
//         style={styles.checkbox}
//       />
//       <Text style={styles.vendorName}>{item.vendor_name}</Text>
//     </TouchableOpacity>
//   );

//   const renderSkeletonLoader = () => (
//     <View style={styles.skeletonContainer}>
//       {[...Array(6)].map((_, index) => (
//         <View key={index} style={styles.skeletonRow}>
//           <CustomSkeletonLoader
//             dWidth={windowWidth(6)}
//             dHeight={windowWidth(6)}
//             radius={windowWidth(2)}
//           />
//           <CustomSkeletonLoader
//             dWidth={windowWidth(60)}
//             dHeight={windowHeight(2.5)}
//             radius={windowWidth(2)}
//           />
//         </View>
//       ))}
//     </View>
//   );

//   return (
//     <CustomModal
//       isOpen={isOpen}
//       setOpened={setOpened}
//       isBlur
//       blurTint="dark"
//       blurIntensity={25}
//     >
//       <View style={styles.modalBox}>
//         <Text style={styles.title}>Select Vendor</Text>

//         {loading ? (
//           renderSkeletonLoader()
//         ) : (
//           <FlatList
//             data={vendors || []}
//             keyExtractor={(item, index) => item?.id ?? index.toString()}
//             renderItem={renderItem}
//             contentContainerStyle={{ paddingBottom: windowHeight(2) }}
//             style={{
//               maxHeight: windowHeight(30),
//               width: "100%",
//             }}
//             showsVerticalScrollIndicator={false}
//           />
//         )}

//         <Button
//           width={windowWidth(50)}
//           height={windowHeight(5)}
//           title="Select"
//           backgroundColor={color.primary}
//           onPress={handleSelect}
//           disabled={selectedIds.length === 0 || isSubmitting}
//           titleStyle={{ fontSize: fontSizes.md }}
//           isLoading={isSubmitting}
//         />
//       </View>
//     </CustomModal>
//   );
// };

// export default VendorSelectModal;

// const styles = StyleSheet.create({
//   modalBox: {
//     width: windowWidth(85),
//     backgroundColor: color.whiteColor,
//     borderRadius: 16,
//     paddingVertical: windowHeight(2),
//     paddingHorizontal: windowWidth(4),
//     alignItems: "center",
//   },
//   title: {
//     fontSize: fontSizes.lg,
//     fontWeight: "600",
//     color: color.appHeaderText,
//     marginBottom: windowHeight(2),
//   },
//   itemRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: windowHeight(1.2),
//     paddingHorizontal: windowWidth(2),
//     borderRadius: windowHeight(1.2),
//   },
//   checkbox: {
//     marginRight: windowWidth(3),
//     borderRadius: windowWidth(3),
//   },
//   vendorName: {
//     fontSize: fontSizes.md,
//     color: color.appHeaderText,
//   },
//   skeletonContainer: {
//     width: "100%",
//     paddingVertical: windowHeight(1),
//   },
//   skeletonRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: windowWidth(3),
//     marginBottom: windowHeight(1.5),
//     paddingHorizontal: windowWidth(2),
//   },
// });
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";

import CustomModal from "@/components/common/CustomModal";
import Button from "@/components/common/Button";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import { useAppDispatch } from "@/store/Reduxhook";

import { IBookingResponse } from "@/store/actions/orders/orders.action";
import { router } from "expo-router";
import { startJourney } from "@/store/actions/vendors/vendorAction";
import Toast from "react-native-toast-message";

type Props = {
  isOpen: boolean;
  setOpened: (val: boolean) => void;
  order: IBookingResponse;
  refreshFilters?: any;
};

const VendorSelectModal: React.FC<Props> = ({
  isOpen,
  setOpened,
  order,
  refreshFilters,
}) => {
  const dispatch = useAppDispatch();

  const captainId = useMemo(() => {
    return order.bookingVendors?.[0]?.vendor?.id ?? null;
  }, [order.bookingVendors]);

  console.log("captain id isssss :::::::", captainId);

  const vendors = useMemo(
    () => order.bookingVendors.map((bv) => bv.vendor),
    [order.bookingVendors]
  );

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Captain always selected */
  useEffect(() => {
    if (!isOpen) return;

    if (captainId) {
      setSelectedIds([String(captainId)]);
    }
  }, [isOpen, captainId]);

  const toggleSelection = (id: string) => {
    if (Number(id) === captainId) return;

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!captainId) {
      Toast.show({
        type: "error",
        text1: "Captain not found. Cannot start journey.",
      });
      return;
    }

    // Ensure captain is included in staffs
    const staffs = Array.from(new Set([...selectedIds.map(Number), captainId]));

    const startJourneyPayload = {
      events: [
        {
          name: "START_JOURNEY" as const,
          payload: {
            bookingId: order.id,
            staffs,
            captainId,
          },
        },
      ],
    };

    setIsSubmitting(true);
    try {
      await dispatch(startJourney(startJourneyPayload, refreshFilters));
      setOpened(false);
      router.replace(`/orderDetailes/${order.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderItem = ({ item }: any) => {
    const isLocked = item.id === captainId;

    return (
      <TouchableOpacity
        style={[styles.itemRow, isLocked && { opacity: 0.5 }]}
        activeOpacity={isLocked ? 1 : 0.8}
        onPress={() => toggleSelection(String(item.id))}
        disabled={isLocked}
      >
        <Checkbox
          value={selectedIds.includes(String(item.id))}
          disabled={isLocked}
          onValueChange={() => toggleSelection(String(item.id))}
          color={isLocked ? "#BDBDBD" : color.primary}
          style={styles.checkbox}
        />
        <Text style={styles.vendorName}>
          {item.vendorName}
          {isLocked ? " (Captain)" : ""}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <CustomModal isOpen={isOpen} setOpened={setOpened} isBlur>
      <View style={styles.modalBox}>
        <Text style={styles.title}>Select Vendor</Text>

        <FlatList
          data={vendors}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          style={{ width: "100%", maxHeight: windowHeight(30) }}
        />

        <Button
          width={windowWidth(50)}
          height={windowHeight(5)}
          title="Update"
          backgroundColor={color.primary}
          onPress={handleSubmit}
          disabled={selectedIds.length === 0 || isSubmitting}
          isLoading={isSubmitting}
        />
      </View>
    </CustomModal>
  );
};

export default VendorSelectModal;

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
    fontWeight: "600",
    marginBottom: windowHeight(2),
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: windowHeight(1.2),
  },
  checkbox: {
    marginRight: windowWidth(3),
  },
  vendorName: {
    fontSize: fontSizes.md,
  },
});
