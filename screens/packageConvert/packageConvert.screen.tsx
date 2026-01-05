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
// import { calculateSingleChild } from "av6-utils";

// export default function PackageConvert() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { order_id } = useLocalSearchParams<{ order_id: string }>();

//   const { data: serviceList } = useSelector((s: RootState) => s.services);
//   const { data: addonMapping, loading: addonLoading } = useSelector(
//     (s: RootState) => s.addons
//   );
//   const { orderDetails } = useSelector((s: RootState) => s.orderDetails);

//   const bookingId = orderDetails?.id ?? null;
//   const variantId = orderDetails?.customerVehicle?.model?.id ?? null;

//   const serviceAmount = Number(orderDetails?.serviceAmount ?? 0);
//   const discountValue = Number(orderDetails?.discountValue ?? 0);
//   const discountType = orderDetails?.discountType ?? "AMOUNT";
//   const taxMethod = orderDetails?.taxMethod ?? "EXCLUSIVE";
//   const taxValue = Number(orderDetails?.taxValue ?? 0);
//   const chargesTotal =
//     orderDetails?.bookingCharges?.reduce(
//       (sum, c) => sum + Number(c.chargeAmount ?? 0),
//       0
//     ) ?? 0;

//   const existingAddonIds = useMemo(
//     () => orderDetails?.bookingAddons?.map((a) => Number(a.addonId)) ?? [],
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

//     setService(orderDetails.service?.name ?? null);
//     originalService.current = orderDetails.service?.name ?? null;

//     setSelectedIds(existingAddonIds.map(Number));
//   }, [orderDetails, existingAddonIds]);

//   useEffect(() => {
//     if (!service || !variantId || !serviceList.length) return;

//     const selectedService = serviceList.find((s) => s.name === service);
//     if (!selectedService) return;

//     dispatch(fetchAddonServiceVariantMapping(selectedService.id, variantId));
//   }, [service, variantId, serviceList]);

//   const toggleSelection = (id: number) => {
//     const addonId = Number(id);

//     setSelectedIds((prev) =>
//       prev.includes(addonId)
//         ? prev.filter((x) => x !== addonId)
//         : [...prev, addonId]
//     );
//   };

//   const calculation = useMemo(() => {
//     if (!addonMapping) return null;

//     const addonActualPriceTotal = addonMapping.addons
//       .filter((a) => selectedIds.includes(a.addon.id))
//       .reduce((sum, a) => sum + a.actualPrice, 0);

//     return calculateSingleChild(
//       {
//         qty: 1,
//         rate: serviceAmount,
//         otherCharge: chargesTotal + addonActualPriceTotal,
//         discountMode: discountType === "PERCENTAGE" ? "PERCENTAGE" : "AMOUNT",
//         discountValue: discountValue,
//         taxMethod: taxMethod,
//         taxValue: taxValue,
//       },
//       "PERCENTAGE-AMOUNT",
//       {
//         calculationMethod: "STEP_WISE",
//         headerRound: "TO_FIXED",
//         lineRound: "TO_FIXED",
//         precision: 2,
//       }
//     );
//   }, [
//     addonMapping,
//     selectedIds,
//     serviceAmount,
//     chargesTotal,
//     discountType,
//     discountValue,
//     taxMethod,
//     taxValue,
//   ]);

//   const netPayable =
//     calculation?.netAmount ?? Number(orderDetails?.netAmount ?? 0);

//   const calculatedEta = addonMapping
//     ? addonMapping.duration +
//       addonMapping.addons
//         .filter((a) => selectedIds.includes(a.addon.id))
//         .reduce((sum, a) => sum + a.duration, 0)
//     : 0;
//   const addonTotalAmount = useMemo(() => {
//     if (!addonMapping) return 0;

//     return addonMapping.addons
//       .filter((a) => selectedIds.includes(a.addon.id))
//       .reduce((sum, a) => sum + a.actualPrice, 0);
//   }, [addonMapping, selectedIds]);
//   const roundHeader = (val: number) => Math.round(val);

//   const handleSave = async () => {
//     if (!bookingId || !calculation || !service) return;

//     const selectedService = serviceList.find((s) => s.name === service);
//     if (!selectedService) return;

//     setSaving(true);
//     try {
//       await dispatch(
//         upgradeBooking({
//           id: bookingId,
//           serviceId: selectedService.id,
//           addons: selectedIds,
//           serviceAmount,
//           addonTotalAmount: addonTotalAmount,
//           // discountAmount: calculation.discountAmount,
//           // taxAmount: calculation.taxAmount,
//           // grossAmount: calculation.grossAmount,
//           // netAmount: calculation.netAmount,
//           grossAmount: roundHeader(calculation.grossAmount),
//           netAmount: roundHeader(calculation.netAmount),
//           taxAmount: roundHeader(calculation.taxAmount),
//           discountAmount: roundHeader(calculation.discountAmount),

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
//             <Text style={styles.totalLabel}>Net Payable</Text>
//             <Text style={styles.totalValue}>₹{netPayable}</Text>
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
//   footer: { padding: windowWidth(5), backgroundColor: color.whiteColor },
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
// import React, { useEffect, useMemo, useState } from "react";
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
// import { calculateSingleChild } from "av6-utils";
// import { triggerOrderRefetch } from "@/store/actions/carImage/refetchActions";
// import CustomSkeletonLoader from "@/components/common/CustomSkeletonLoader";

// export default function PackageConvert() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { order_id } = useLocalSearchParams<{ order_id: string }>();

//   const { data: serviceList } = useSelector((s: RootState) => s.services);
//   const { data: addonMapping, loading: addonLoading } = useSelector(
//     (s: RootState) => s.addons
//   );
//   const { orderDetails } = useSelector((s: RootState) => s.orderDetails);
//   const { data: settings } = useSelector((s: RootState) => s.settings);

//   const bookingId = orderDetails?.id ?? null;
//   const variantId = orderDetails?.customerVehicle?.model?.id ?? null;

//   const serviceAmount = Number(orderDetails?.serviceAmount ?? 0);
//   const discountValue = Number(orderDetails?.discountValue ?? 0);
//   const discountType = orderDetails?.discountType ?? "AMOUNT";
//   const taxMethod = orderDetails?.taxMethod ?? "EXCLUSIVE";
//   const taxValue = Number(orderDetails?.taxValue ?? 0);
//   const orderId = String(orderDetails?.id ?? 0);

//   const chargesTotal =
//     orderDetails?.bookingCharges?.reduce(
//       (sum, c) => sum + Number(c.chargeAmount ?? 0),
//       0
//     ) ?? 0;

//   const existingAddonIds = useMemo(
//     () => orderDetails?.bookingAddons?.map((a) => Number(a.addonId)) ?? [],
//     [orderDetails]
//   );

//   const [service, setService] = useState<string | null>(null);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [saving, setSaving] = useState(false);

//   const calculationMethod =
//     settings?.calculationMethod === "FINAL" ? "FINAL_ONLY" : "STEP_WISE";

//   const roundingMethod =
//     settings?.roundingMethod === "ROUND" ? "ROUND" : "TO_FIXED";

//   const roundingPrecision = settings?.roundingPrecision ?? 2;

//   const roundValue = (v: number) =>
//     roundingMethod === "ROUND"
//       ? Math.round(v)
//       : Number(v.toFixed(roundingPrecision));

//   useEffect(() => {
//     dispatch(fetchServices());
//   }, []);

//   useEffect(() => {
//     if (!orderDetails) return;

//     setService(orderDetails.service?.name ?? null);
//     setSelectedIds(existingAddonIds);
//   }, [orderDetails, existingAddonIds]);

//   useEffect(() => {
//     if (!service || !variantId || !serviceList.length) return;

//     const selectedService = serviceList.find((s) => s.name === service);
//     if (!selectedService) return;

//     dispatch(fetchAddonServiceVariantMapping(selectedService.id, variantId));
//   }, [service, variantId, serviceList]);

//   const toggleSelection = (id: number) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const calculation = useMemo(() => {
//     if (!addonMapping || !settings) return null;

//     const addonActualPriceTotal = addonMapping.addons
//       .filter((a) => selectedIds.includes(a.addon.id))
//       .reduce((sum, a) => sum + a.actualPrice, 0);

//     return calculateSingleChild(
//       {
//         qty: 1,
//         rate: serviceAmount,
//         otherCharge: chargesTotal + addonActualPriceTotal,
//         discountMode: discountType === "PERCENTAGE" ? "PERCENTAGE" : "AMOUNT",
//         discountValue,
//         taxMethod,
//         taxValue,
//       },
//       "PERCENTAGE-AMOUNT",
//       {
//         calculationMethod,
//         headerRound: roundingMethod,
//         lineRound: roundingMethod,
//         precision: roundingPrecision,
//       }
//     );
//   }, [
//     addonMapping,
//     selectedIds,
//     serviceAmount,
//     chargesTotal,
//     discountType,
//     discountValue,
//     taxMethod,
//     taxValue,
//     settings,
//   ]);

//   const netPayable =
//     calculation?.netAmount ?? Number(orderDetails?.netAmount ?? 0);

//   const addonTotalAmount =
//     addonMapping?.addons
//       .filter((a) => selectedIds.includes(a.addon.id))
//       .reduce((sum, a) => sum + a.actualPrice, 0) ?? 0;

//   const calculatedEta =
//     (addonMapping?.duration ?? 0) +
//     (addonMapping?.addons
//       .filter((a) => selectedIds.includes(a.addon.id))
//       .reduce((sum, a) => sum + a.duration, 0) ?? 0);

//   const handleSave = async () => {
//     if (!bookingId || !calculation || !service) return;

//     const selectedService = serviceList.find((s) => s.name === service);
//     if (!selectedService) return;

//     setSaving(true);
//     try {
//       await dispatch(
//         upgradeBooking({
//           id: bookingId,
//           serviceId: selectedService.id,
//           addons: selectedIds,
//           serviceAmount,
//           addonTotalAmount,
//           discountAmount: calculation.discountAmount,
//           taxAmount: calculation.taxAmount,
//           grossAmount: calculation.grossAmount,
//           netAmount: calculation.netAmount,
//           calculatedEta,
//         })
//       );

//       Toast.show({ type: "success", text1: "Package upgraded" });
//       dispatch(triggerOrderRefetch(orderId));
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

//           {addonLoading ? (
//             <CustomSkeletonLoader
//               dWidth={windowWidth(95)}
//               dHeight={windowHeight(35)}
//               radius={windowWidth(5)}
//             />
//           ) : (
//             <AddonSection
//               addons={addonMapping?.addons ?? []}
//               isLoading={addonLoading}
//               selectedIds={selectedIds}
//               toggleSelection={toggleSelection}
//               service={service}
//             />
//           )}
//         </ScrollView>

//         <View style={styles.footer}>
//           <View style={styles.totalBox}>
//             <Text style={styles.totalLabel}>Net Payable</Text>
//             <Text style={styles.totalValue}>₹{roundValue(netPayable)}</Text>
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
//   footer: { padding: windowWidth(5), backgroundColor: color.whiteColor },
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
import { clearAddons } from "@/store/reducers/services/addOnsSlice";
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
import { triggerOrderRefetch } from "@/store/actions/carImage/refetchActions";

export default function PackageConvert() {
  const dispatch = useDispatch<AppDispatch>();
  const { order_id } = useLocalSearchParams<{ order_id: string }>();

  const { data: serviceList } = useSelector((s: RootState) => s.services);
  const { data: addonMapping, loading: addonLoading } = useSelector(
    (s: RootState) => s.addons
  );
  const { orderDetails } = useSelector((s: RootState) => s.orderDetails);
  const { data: settings } = useSelector((s: RootState) => s.settings);

  const bookingId = orderDetails?.id ?? null;
  const orderId = String(orderDetails?.id ?? null);
  const variantId = orderDetails?.customerVehicle?.variant.id ?? null;

  /* ---------------- SERVICE STATE ---------------- */
  const [service, setService] = useState<string | null>(null);
  const initialServiceRef = useRef<string | null>(null);

  /* ---------------- ADDON STATE ---------------- */
  const existingAddonIds = useMemo(
    () => orderDetails?.bookingAddons?.map((a) => Number(a.addonId)) ?? [],
    [orderDetails]
  );

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);

  /* ---------------- SETTINGS ---------------- */
  const calculationMethod =
    settings?.calculationMethod === "FINAL" ? "FINAL_ONLY" : "STEP_WISE";

  const roundingMethod =
    settings?.roundingMethod === "ROUND" ? "ROUND" : "TO_FIXED";

  const roundingPrecision = settings?.roundingPrecision ?? 2;

  /* ---------------- SERVICE PRICE (CRITICAL FIX) ---------------- */
  const selectedService = useMemo(() => {
    if (!service) return null;
    return serviceList.find((s) => s.name === service) ?? null;
  }, [service, serviceList]);

  const serviceAmount = Number(addonMapping?.actualPrice ?? 0);

  /* ---------------- ORDER META ---------------- */
  const discountValue = Number(orderDetails?.discountValue ?? 0);
  const discountType = orderDetails?.discountType ?? "AMOUNT";
  const taxMethod = orderDetails?.taxMethod ?? "EXCLUSIVE";
  const taxValue = Number(orderDetails?.taxValue ?? 0);

  const chargesTotal =
    orderDetails?.bookingCharges?.reduce(
      (sum, c) => sum + Number(c.chargeAmount ?? 0),
      0
    ) ?? 0;

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  useEffect(() => {
    if (!orderDetails) return;

    const svc = orderDetails.service?.name ?? null;
    setService(svc);
    setSelectedIds(existingAddonIds);
    initialServiceRef.current = svc;
  }, [orderDetails, existingAddonIds]);

  /* ---------------- SERVICE CHANGE FIX ---------------- */
  useEffect(() => {
    if (!service) return;

    if (service !== initialServiceRef.current) {
      setSelectedIds([]);
      dispatch(clearAddons());
    }
  }, [service]);

  /* ---------------- FETCH ADDONS ---------------- */
  useEffect(() => {
    if (!selectedService || !variantId) return;

    dispatch(fetchAddonServiceVariantMapping(selectedService.id, variantId));
  }, [selectedService, variantId]);

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ---------------- CALCULATION (100% BACKEND MATCH) ---------------- */
  const calculation = useMemo(() => {
    if (!addonMapping || !settings || !selectedService) return null;

    const addonActualPriceTotal = addonMapping.addons
      .filter((a) => selectedIds.includes(a.addon.id))
      .reduce((sum, a) => sum + a.actualPrice, 0);

    return calculateSingleChild(
      {
        qty: 1,
        rate: serviceAmount,
        otherCharge: chargesTotal + addonActualPriceTotal,
        discountMode: discountType === "PERCENTAGE" ? "PERCENTAGE" : "AMOUNT",
        discountValue,
        taxMethod,
        taxValue,
      },
      "PERCENTAGE-AMOUNT",
      {
        calculationMethod,
        headerRound: roundingMethod,
        lineRound: roundingMethod,
        precision: roundingPrecision,
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
    settings,
    selectedService,
  ]);

  const netPayable = calculation?.netAmount ?? 0;

  const addonTotalAmount =
    addonMapping?.addons
      .filter((a) => selectedIds.includes(a.addon.id))
      .reduce((sum, a) => sum + a.actualPrice, 0) ?? 0;

  const calculatedEta =
    (addonMapping?.duration ?? 0) +
    (addonMapping?.addons
      .filter((a) => selectedIds.includes(a.addon.id))
      .reduce((sum, a) => sum + a.duration, 0) ?? 0);

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    if (!bookingId || !calculation || !selectedService) return;

    setSaving(true);
    try {
      await dispatch(
        upgradeBooking({
          id: bookingId,
          serviceId: selectedService.id,
          addons: selectedIds,
          serviceAmount,
          addonTotalAmount,
          discountAmount: calculation.discountAmount,
          taxAmount: calculation.taxAmount,
          grossAmount: calculation.grossAmount,
          netAmount: calculation.netAmount,
          calculatedEta,
        })
      );

      Toast.show({ type: "success", text1: "Package upgraded" });
      dispatch(triggerOrderRefetch(orderId));
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

      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
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

/* ---------------- STYLES ---------------- */
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
