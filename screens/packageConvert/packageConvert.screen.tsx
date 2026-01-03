// import Button from "@/components/common/Button";
// import Header from "@/components/common/Header";
// import AddonSection from "@/components/packageConvert/Addons";
// import PackageConfiguration from "@/components/packageConvert/PackageConfiguration";
// import {
//   fetchServices,
//   fetchAddonServiceVariantMapping,
//   upgradeBooking,
// } from "@/store/actions/services/ServiceAction";
// import { AppDispatch, RootState } from "@/store/Store";
// import color from "@/themes/Colors.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";
// import fonts from "@/themes/Fonts.themes";
// import { router, useLocalSearchParams } from "expo-router";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import Toast from "react-native-toast-message";
// import { useDispatch, useSelector } from "react-redux";

// export default function PackageConvert() {
//   const dispatch = useDispatch<AppDispatch>();

//   const { data: serviceList } = useSelector(
//     (state: RootState) => state.services
//   );

//   const { data: addonMapping, loading: addonLoading } = useSelector(
//     (state: RootState) => state.addons
//   );

//   const { orderDetails } = useSelector(
//     (state: RootState) => state.orderDetails
//   );

//   const { order_id } = useLocalSearchParams<{ order_id: string }>();

//   const bookingId = orderDetails?.id ?? null;
//   const variantId = orderDetails?.customerVehicle?.model?.id ?? null;

//   const baseNetAmount = Number(orderDetails?.netAmount || 0);
//   const baseServiceAmount = Number(orderDetails?.serviceAmount || 0);
//   const discountAmount = Number(orderDetails?.discountAmount || 0);

//   const existingAddonIds = useMemo(
//     () => orderDetails?.bookingAddons?.map((a) => a.id) || [],
//     [orderDetails]
//   );

//   const [service, setService] = useState<string | null>(null);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [saving, setSaving] = useState(false);

//   const originalService = useRef<string | null>(null);

//   useEffect(() => {
//     dispatch(fetchServices());
//   }, []);

//   useEffect(() => {
//     if (!orderDetails) return;

//     const defaultService = orderDetails.service?.name ?? null;
//     setService(defaultService);
//     originalService.current = defaultService;

//     setSelectedIds(existingAddonIds);
//   }, [orderDetails, existingAddonIds]);

//   useEffect(() => {
//     if (!service || !variantId) return;

//     const selectedService = serviceList.find((s) => s.name === service);
//     if (!selectedService) return;

//     dispatch(fetchAddonServiceVariantMapping(selectedService.id, variantId));
//   }, [service, variantId, serviceList]);

//   const toggleSelection = (id: number) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const addonTotalAmount = useMemo(() => {
//     if (!addonMapping) return 0;

//     return addonMapping.addons
//       .filter((a) => selectedIds.includes(a.id))
//       .reduce((sum, a) => sum + a.actualPrice, 0);
//   }, [addonMapping, selectedIds]);

//   const newlyAddedAddonAmount = useMemo(() => {
//     if (!addonMapping) return 0;

//     return addonMapping.addons
//       .filter(
//         (a) => selectedIds.includes(a.id) && !existingAddonIds.includes(a.id)
//       )
//       .reduce((sum, a) => sum + a.actualPrice, 0);
//   }, [addonMapping, selectedIds, existingAddonIds]);

//   const finalPayable = useMemo(() => {
//     if (newlyAddedAddonAmount === 0) return baseNetAmount;

//     return Number((baseNetAmount + newlyAddedAddonAmount).toFixed(2));
//   }, [baseNetAmount, newlyAddedAddonAmount]);
//   const serviceAmountTotal = finalPayable;
//   const calculatedEta = useMemo(() => {
//     if (!addonMapping) return 0;

//     const addonDuration = addonMapping.addons
//       .filter((a) => selectedIds.includes(a.id))
//       .reduce((sum, a) => sum + a.duration, 0);

//     return addonMapping.duration + addonDuration;
//   }, [addonMapping, selectedIds]);

//   const handleSave = async () => {
//     if (!bookingId || !service) {
//       Toast.show({ type: "error", text1: "Invalid booking data" });
//       return;
//     }

//     const selectedService = serviceList.find((s) => s.name === service);
//     if (!selectedService) return;

//     setSaving(true);
//     try {
//       await dispatch(
//         upgradeBooking({
//           id: bookingId,
//           serviceId: selectedService.id,
//           addons: selectedIds,

//           serviceAmount: serviceAmountTotal,
//           addonTotalAmount,
//           discountAmount,

//           grossAmount: finalPayable - discountAmount,
//           netAmount: finalPayable,
//           taxAmount: 0,
//           calculatedEta,
//         })
//       );

//       Toast.show({ type: "success", text1: "Package upgraded" });
//       router.replace(`/orderDetailes/${order_id}`);
//     } catch {
//       Toast.show({ type: "error", text1: "Upgrade failed" });
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <Header title="Package Convert" isBack />

//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={{ flex: 1 }}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           <PackageConfiguration
//             service={service}
//             services={serviceList.map((s) => ({
//               label: s.name,
//               value: s.name,
//             }))}
//             setService={setService}
//           />

//           <AddonSection
//             addons={addonMapping?.addons ?? []}
//             isLoading={addonLoading}
//             selectedIds={selectedIds}
//             toggleSelection={toggleSelection}
//             service={service}
//           />
//         </ScrollView>

//         <View style={styles.footer}>
//           <View style={styles.totalBox}>
//             <Text style={styles.totalLabel}>Total Payable</Text>
//             <Text style={styles.totalValue}>₹{finalPayable}</Text>
//           </View>

//           <Button
//             title="SAVE PACKAGE"
//             backgroundColor={color.primary}
//             onPress={handleSave}
//             isLoading={saving}
//           />
//         </View>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: { flex: 1, backgroundColor: color.bgGray },
//   scrollContent: { padding: windowWidth(4) },
//   footer: {
//     padding: windowWidth(5),
//     backgroundColor: color.whiteColor,
//   },
//   totalBox: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: windowHeight(2),
//   },
//   totalLabel: {
//     fontSize: fontSizes.md,
//     fontFamily: fonts.bold,
//     color: color.primary,
//   },
//   totalValue: {
//     fontSize: fontSizes.xl,
//     fontFamily: fonts.bold,
//     color: color.primary,
//   },
// });

import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import AddonSection from "@/components/packageConvert/Addons";
import PackageConfiguration from "@/components/packageConvert/PackageConfiguration";
import {
  fetchServices,
  fetchAddonServiceVariantMapping,
  upgradeBooking,
} from "@/store/actions/services/ServiceAction";
import { AppDispatch, RootState } from "@/store/Store";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { calculateSingleChild } from "av6-utils";

export default function PackageConvert() {
  const dispatch = useDispatch<AppDispatch>();
  const { order_id } = useLocalSearchParams<{ order_id: string }>();

  const { data: serviceList } = useSelector((s: RootState) => s.services);
  const { data: addonMapping, loading: addonLoading } = useSelector(
    (s: RootState) => s.addons
  );
  const { orderDetails } = useSelector((s: RootState) => s.orderDetails);

  const bookingId = orderDetails?.id ?? null;
  const variantId = orderDetails?.customerVehicle?.model?.id ?? null;

  const serviceAmount = Number(orderDetails?.serviceAmount ?? 0);
  const discountValue = Number(orderDetails?.discountValue ?? 0);
  const discountType = orderDetails?.discountType ?? "AMOUNT";
  const taxMethod = orderDetails?.taxMethod ?? "EXCLUSIVE";
  const taxValue = Number(orderDetails?.taxValue ?? 0);
  const chargesTotal =
    orderDetails?.bookingCharges?.reduce(
      (sum, c) => sum + Number(c.chargeAmount ?? 0),
      0
    ) ?? 0;

  const existingAddonIds = useMemo(
    () => orderDetails?.bookingAddons?.map((a) => a.id) ?? [],
    [orderDetails]
  );

  const [service, setService] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const originalService = useRef<string | null>(null);

  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  useEffect(() => {
    if (!orderDetails) return;

    setService(orderDetails.service?.name ?? null);
    originalService.current = orderDetails.service?.name ?? null;

    setSelectedIds(existingAddonIds);
  }, [orderDetails, existingAddonIds]);

  useEffect(() => {
    if (!service || !variantId) return;

    const selectedService = serviceList.find((s) => s.name === service);
    if (!selectedService) return;

    dispatch(fetchAddonServiceVariantMapping(selectedService.id, variantId));
  }, [service, variantId]);

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    if (!addonMapping) return null;

    const addonActualPriceTotal = addonMapping.addons
      .filter((a) => selectedIds.includes(a.id))
      .reduce((sum, a) => sum + a.actualPrice, 0);

    return calculateSingleChild(
      {
        qty: 1,
        rate: serviceAmount,
        otherCharge: chargesTotal + addonActualPriceTotal,
        discountMode: discountType === "PERCENTAGE" ? "PERCENTAGE" : "AMOUNT",
        discountValue: discountValue,
        taxMethod: taxMethod,
        taxValue: taxValue,
      },
      "PERCENTAGE-AMOUNT",
      {
        calculationMethod: "STEP_WISE",
        headerRound: "TO_FIXED",
        lineRound: "TO_FIXED",
        precision: 2,
      }
    );
  }, [
    addonMapping,
    selectedIds,
    serviceAmount,
    chargesTotal,
    discountType,
    discountValue,
    taxMethod,
    taxValue,
  ]);

  const netPayable =
    calculation?.netAmount ?? Number(orderDetails?.netAmount ?? 0);

  const calculatedEta = addonMapping
    ? addonMapping.duration +
      addonMapping.addons
        .filter((a) => selectedIds.includes(a.id))
        .reduce((sum, a) => sum + a.duration, 0)
    : 0;
  const addonTotalAmount = useMemo(() => {
    if (!addonMapping) return 0;

    return addonMapping.addons
      .filter((a) => selectedIds.includes(a.id))
      .reduce((sum, a) => sum + a.actualPrice, 0);
  }, [addonMapping, selectedIds]);

  const handleSave = async () => {
    if (!bookingId || !calculation || !service) return;

    const selectedService = serviceList.find((s) => s.name === service);
    if (!selectedService) return;

    setSaving(true);
    try {
      await dispatch(
        upgradeBooking({
          id: bookingId,
          serviceId: selectedService.id,
          addons: selectedIds,
          serviceAmount,
          addonTotalAmount: addonTotalAmount,
          discountAmount: calculation.discountAmount,
          taxAmount: calculation.taxAmount,
          grossAmount: calculation.grossAmount,
          netAmount: calculation.netAmount,
          calculatedEta,
        })
      );

      Toast.show({ type: "success", text1: "Package upgraded" });
      router.replace(`/orderDetailes/${order_id}`);
    } catch {
      Toast.show({ type: "error", text1: "Upgrade failed" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header title="Package Convert" isBack />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <PackageConfiguration
            service={service}
            services={serviceList.map((s) => ({
              label: s.name,
              value: s.name,
            }))}
            setService={setService}
          />

          <AddonSection
            addons={addonMapping?.addons ?? []}
            isLoading={addonLoading}
            selectedIds={selectedIds}
            toggleSelection={toggleSelection}
            service={service}
          />
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Net Payable</Text>
            <Text style={styles.totalValue}>₹{netPayable}</Text>
          </View>

          <Button
            title="SAVE PACKAGE"
            backgroundColor={color.primary}
            onPress={handleSave}
            isLoading={saving}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: color.bgGray },
  scrollContent: { padding: windowWidth(4) },
  footer: { padding: windowWidth(5), backgroundColor: color.whiteColor },
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: windowHeight(2),
  },
  totalLabel: {
    fontSize: fontSizes.md,
    fontFamily: fonts.bold,
    color: color.primary,
  },
  totalValue: {
    fontSize: fontSizes.xl,
    fontFamily: fonts.bold,
    color: color.primary,
  },
});
