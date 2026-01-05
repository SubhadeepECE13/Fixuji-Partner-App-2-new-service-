// import { AppDispatch, RootState } from "@/store/Store";
// import { ServiceBooking } from "@/store/actions/orders/orderDetailesAction";
// import {
//   loadInitialAddons,
//   removeAddon,
//   setFinalPayable,
// } from "@/store/reducers/services/orderPaymentSlice";
// import color from "@/themes/Colors.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";
// import fonts from "@/themes/Fonts.themes";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { router, useLocalSearchParams } from "expo-router";
// import React, { useEffect } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Divider } from "react-native-paper";
// import { useDispatch, useSelector } from "react-redux";
// import AddonSuggestionCard from "./VehicleCard";
// import Button from "../common/Button";
// import { IBookingResponse } from "@/store/actions/orders/orders.action";

// interface Props {
//   data: IBookingResponse;
// }

// const ServiceDetails: React.FC<Props> = ({ data }) => {
//   const dispatch = useDispatch<AppDispatch>();

//   const params = useLocalSearchParams<{ order_id: string }>();

//   const orderId = params.order_id;

//   const selectedAddons =
//     useSelector(
//       (state: RootState) => state.orderPayment.selectedAddons[orderId]
//     ) || [];

//   const basePrice = Number(data?.variant?.actual_price || 0);
//   const addonTotal = selectedAddons.reduce(
//     (sum, addon) => sum + addon.price,
//     0
//   );

//   const chargeTotal = Array.isArray(data?.charges)
//     ? data.charges.reduce((sum, c) => sum + Number(c.charge_amount || 0), 0)
//     : 0;

//   const discount = Number(data?.discount || 0);

//   const finalPrice = basePrice + addonTotal;
//   const grandTotal = finalPrice + chargeTotal - discount;

//   useEffect(() => {
//     if (!data?.addons) return;

//     const formatted = data.addons.map((addon) => ({
//       id: String(addon.id),
//       name: addon.addon_name,
//       price: addon.actual_price || 0,
//     }));

//     dispatch(loadInitialAddons({ orderId, addons: formatted }));
//   }, [orderId, data?.addons]);

//   useEffect(() => {
//     dispatch(setFinalPayable({ orderId, amount: finalPrice }));
//   }, [finalPrice]);

//   /** Cleanup when leaving screen */
//   useEffect(() => {
//     return () => {
//       dispatch(loadInitialAddons({ orderId, addons: [] }));
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//         style={{ flex: 1 }}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.card}>
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Text style={styles.title}>Package Summary</Text>
//               <View style={{ marginBottom: windowHeight(1.5) }}>
//                 <Button
//                   title="Convert"
//                   height={windowHeight(4)}
//                   width={windowWidth(24)}
//                   titleStyle={{ fontSize: fontSizes.rg }}
//                   onPress={() => router.replace(`/packageConvert/${orderId}`)}
//                 />
//               </View>
//             </View>
//             <View style={styles.row}>
//               <Text style={styles.label}>{data?.service?.name}</Text>
//               <Text style={styles.servicepriceText}>₹{basePrice}</Text>
//             </View>

//             {selectedAddons.length > 0 && (
//               <>
//                 <Text style={styles.sectionHeading}>Added Add-ons</Text>
//                 <Divider style={{ marginBottom: windowHeight(1.5) }} />

//                 {selectedAddons.map((item) => (
//                   <View key={item.id} style={styles.addedCard}>
//                     <Text style={styles.addonName}>{item.name}</Text>

//                     <View style={styles.addonRight}>
//                       <Text style={styles.priceText}>₹{item.price}</Text>

//                       <TouchableOpacity
//                         onPress={() =>
//                           dispatch(removeAddon({ orderId, addonId: item.id }))
//                         }
//                         style={styles.iconBox}
//                       >
//                         <Ionicons
//                           name="trash-outline"
//                           size={18}
//                           color="#ff4d4d"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ))}
//               </>
//             )}

//             <Divider style={{ marginBottom: windowHeight(1.5) }} />

//             <View style={styles.row}>
//               <Text style={styles.label}>Discount</Text>
//               <Text style={styles.discountText}>₹{discount}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.totalLabel}>Total</Text>
//               <Text style={styles.totalText}>₹{grandTotal}</Text>
//             </View>

//             {/* <AddonSuggestionCard
//               orderId={orderId}
//               suggestedAddons={data?.suggestedAddons || []}
//             /> */}
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// export default ServiceDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: color.bgGray,
//   },

//   scrollContent: {
//     paddingBottom: windowHeight(10),
//   },

//   card: {
//     backgroundColor: "white",
//     borderRadius: windowWidth(4),
//     padding: windowWidth(4),
//     margin: windowWidth(3),
//     elevation: 3,
//   },

//   title: {
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.sm,
//     color: color.primary,
//     marginBottom: windowHeight(2),
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: windowHeight(2),
//   },

//   sectionHeading: {
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.sm,
//     marginBottom: windowHeight(1),
//   },

//   addedCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: windowHeight(1),
//   },

//   addonName: { fontFamily: fonts.medium, fontSize: fontSizes.sm },

//   addonRight: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: windowWidth(3),
//   },

//   priceText: {
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.rg,
//     color: color.primary,
//   },
//   servicepriceText: {
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.md,
//     color: color.primary,
//   },
//   discountText: {
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.rg,
//     color: color.red,
//   },
//   totalText: {
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.md,
//     color: color.primary,
//   },

//   iconBox: {
//     borderRadius: windowHeight(2),
//     width: windowWidth(10),
//     // borderWidth: 0.8,
//     //borderColor: "#ff4d4d",
//     //backgroundColor: "#ffecec",
//     alignItems: "center",
//   },

//   label: { fontFamily: fonts.medium, fontSize: fontSizes.md },
//   totalLabel: {
//     fontFamily: fonts.medium,
//     fontSize: fontSizes.md,
//   },
// });

///////////////////////////////////////////////////

// import { AppDispatch, RootState } from "@/store/Store";
// import {
//   loadInitialAddons,
//   removeAddon,
//   setFinalPayable,
// } from "@/store/reducers/services/orderPaymentSlice";
// import color from "@/themes/Colors.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";
// import fonts from "@/themes/Fonts.themes";
// import { Ionicons } from "@expo/vector-icons";
// import { router, useLocalSearchParams } from "expo-router";
// import React, { useEffect } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Divider } from "react-native-paper";
// import { useDispatch, useSelector } from "react-redux";
// import Button from "../common/Button";
// import { IBookingResponse } from "@/store/actions/orders/orders.action";

// interface Props {
//   data: IBookingResponse;
// }

// const ServiceDetails: React.FC<Props> = ({ data }) => {
//   const dispatch = useDispatch<AppDispatch>();

//   const params = useLocalSearchParams<{ order_id: string }>();
//   const orderId = params.order_id;

//   const selectedAddons =
//     useSelector(
//       (state: RootState) => state.orderPayment.selectedAddons[orderId]
//     ) || [];

//   const basePrice = Number(data.serviceAmount || 0);

//   const addonTotal = selectedAddons.reduce(
//     (sum, addon) => sum + addon.price,
//     0
//   );

//   const chargeTotal = Array.isArray(data.bookingCharges)
//     ? data.bookingCharges.reduce(
//         (sum, c) => sum + Number(c.chargeAmount || 0),
//         0
//       )
//     : 0;

//   const discount = Number(data.discountAmount || 0);

//   const finalPrice = basePrice + addonTotal;
//   const grandTotal = finalPrice + chargeTotal - discount;

//   useEffect(() => {
//     if (!data.bookingAddons) return;

//     const formatted = data.bookingAddons.map((addon) => ({
//       id: String(addon.id),
//       name: addon.addonName,
//       price: addon.actualPrice || 0,
//     }));

//     dispatch(loadInitialAddons({ orderId, addons: formatted }));
//   }, [orderId, data.bookingAddons]);

//   useEffect(() => {
//     dispatch(setFinalPayable({ orderId, amount: finalPrice }));
//   }, [finalPrice]);

//   /** Cleanup */
//   useEffect(() => {
//     return () => {
//       dispatch(loadInitialAddons({ orderId, addons: [] }));
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//         style={{ flex: 1 }}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.card}>
//             <View style={styles.headerRow}>
//               <Text style={styles.title}>Package Summary</Text>
//               <Button
//                 title="Convert"
//                 height={windowHeight(4)}
//                 width={windowWidth(24)}
//                 titleStyle={{ fontSize: fontSizes.rg }}
//                 onPress={() => router.replace(`/packageConvert/${orderId}`)}
//               />
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>{data.service?.name}</Text>
//               <Text style={styles.servicepriceText}>₹{basePrice}</Text>
//             </View>

//             {selectedAddons.length > 0 && (
//               <>
//                 <Text style={styles.sectionHeading}>Added Add-ons</Text>
//                 <Divider style={{ marginBottom: windowHeight(1.5) }} />

//                 {selectedAddons.map((item) => (
//                   <View key={item.id} style={styles.addedCard}>
//                     <Text style={styles.addonName}>{item.name}</Text>

//                     <View style={styles.addonRight}>
//                       <Text style={styles.priceText}>₹{item.price}</Text>

//                       <TouchableOpacity
//                         onPress={() =>
//                           dispatch(removeAddon({ orderId, addonId: item.id }))
//                         }
//                         style={styles.iconBox}
//                       >
//                         <Ionicons
//                           name="trash-outline"
//                           size={18}
//                           color="#ff4d4d"
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ))}
//               </>
//             )}

//             <Divider style={{ marginBottom: windowHeight(1.5) }} />

//             <View style={styles.row}>
//               <Text style={styles.label}>Discount</Text>
//               <Text style={styles.discountText}>₹{discount}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.totalLabel}>Total</Text>
//               <Text style={styles.totalText}>₹{grandTotal}</Text>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// export default ServiceDetails;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: color.bgGray },
//   scrollContent: { paddingBottom: windowHeight(10) },
//   card: {
//     backgroundColor: "white",
//     borderRadius: windowWidth(4),
//     padding: windowWidth(4),
//     margin: windowWidth(3),
//     elevation: 3,
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: windowHeight(2),
//   },
//   title: {
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.sm,
//     color: color.primary,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: windowHeight(2),
//   },
//   sectionHeading: {
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.sm,
//     marginBottom: windowHeight(1),
//   },
//   addedCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: windowHeight(1),
//   },
//   addonName: { fontFamily: fonts.medium, fontSize: fontSizes.sm },
//   addonRight: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: windowWidth(3),
//   },
//   priceText: {
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.rg,
//     color: color.primary,
//   },
//   servicepriceText: {
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.md,
//     color: color.primary,
//   },
//   discountText: {
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.rg,
//     color: color.red,
//   },
//   totalText: {
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.md,
//     color: color.primary,
//   },
//   iconBox: {
//     borderRadius: windowHeight(2),
//     width: windowWidth(10),
//     alignItems: "center",
//   },
//   label: { fontFamily: fonts.medium, fontSize: fontSizes.md },
//   totalLabel: { fontFamily: fonts.medium, fontSize: fontSizes.md },
// });
import { AppDispatch, RootState } from "@/store/Store";
import {
  loadInitialAddons,
  removeAddon,
} from "@/store/reducers/services/orderPaymentSlice";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Button from "../common/Button";
import { IBookingResponse } from "@/store/actions/orders/orders.action";

interface Props {
  data: IBookingResponse;
}

const ServiceDetails: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { order_id } = useLocalSearchParams<{ order_id: string }>();

  const selectedAddons =
    useSelector(
      (state: RootState) => state.orderPayment.selectedAddons[order_id]
    ) || [];

  const basePrice = Number(data.serviceAmount || 0);
  const addonTotal = Number(data.addonTotalAmount || 0);
  const chargesTotal = Number(data.chargesTotalAmount || 0);
  const discount = Number(data.discountAmount || 0);
  const taxAmount = Number(data.taxAmount || 0);
  const advancePaidAmount = Number(data.paidAmount || 0);
  const refundedAmount = Number(data.refundedAmount || 0);
  const payable = Number(data.netAmount || 0);
  const finalPayable = payable - advancePaidAmount;

  /** Load initial addons (UI only, no price logic) */
  useEffect(() => {
    if (!data.bookingAddons) return;

    dispatch(
      loadInitialAddons({
        orderId: order_id,
        addons: data.bookingAddons.map((a) => ({
          id: String(a.id),
          name: a.addonName,
          price: a.actualPrice,
        })),
      })
    );
  }, [order_id, data.bookingAddons]);

  useEffect(() => {
    return () => {
      dispatch(loadInitialAddons({ orderId: order_id, addons: [] }));
    };
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.headerRow}>
              <Text style={styles.title}>Package Summary</Text>
              <Button
                title="Convert"
                height={windowHeight(4)}
                width={windowWidth(24)}
                titleStyle={{ fontSize: fontSizes.rg }}
                onPress={() => router.replace(`/packageConvert/${order_id}`)}
              />
            </View>

            {/* Base Service */}
            <View style={styles.row}>
              <Text style={styles.label}>{data.service?.name}</Text>
              <Text style={styles.servicepriceText}>₹{basePrice}</Text>
            </View>

            {/* Addons */}
            {selectedAddons.length > 0 && (
              <>
                <Text style={styles.sectionHeading}>Added Add-ons</Text>
                <Divider style={{ marginBottom: windowHeight(1.5) }} />

                {selectedAddons.map((item) => (
                  <View key={item.id} style={styles.addedCard}>
                    <Text style={styles.addonName}>{item.name}</Text>

                    <View style={styles.addonRight}>
                      <Text style={styles.priceText}>₹{item.price}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          dispatch(
                            removeAddon({
                              orderId: order_id,
                              addonId: item.id,
                            })
                          )
                        }
                        // style={styles.iconBox}
                      >
                        {/* <Ionicons
                          name="trash-outline"
                          size={18}
                          color="#ff4d4d"
                        /> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </>
            )}

            <Divider style={{ marginBottom: windowHeight(1.5) }} />

            {/* Charges */}
            <View style={styles.row}>
              <Text style={styles.label}>Charges</Text>
              <Text style={styles.priceText}>₹{chargesTotal}</Text>
            </View>

            {/* Refund */}
            <View style={styles.row}>
              <Text style={styles.label}>Refund </Text>
              <Text style={styles.priceText}>₹{refundedAmount}</Text>
            </View>

            {/* Discount */}
            <View style={styles.row}>
              <Text style={styles.label}>Discount</Text>
              <Text style={styles.discountText}>₹{discount}</Text>
            </View>

            {/* Tax */}
            <View style={styles.row}>
              <Text style={styles.label}>Tax</Text>
              <Text style={styles.priceText}>₹{taxAmount}</Text>
            </View>

            {/* Paid */}
            {/* <View style={styles.row}>
              <Text style={styles.label}>Paid </Text>
              <Text style={styles.paidText}>₹{advancePaidAmount}</Text>
            </View> */}

            <Divider style={{ marginBottom: windowHeight(1.5) }} />

            {/* Final Total */}
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Payable</Text>
              <Text style={styles.totalText}>₹{payable}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Paid</Text>
              <Text style={styles.paidText}>₹{advancePaidAmount}</Text>
            </View>
            <Divider style={{ marginBottom: windowHeight(1.5) }} />
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Final Payable</Text>
              <Text style={styles.totalText}>₹{finalPayable}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color.bgGray },
  scrollContent: { paddingBottom: windowHeight(10) },
  card: {
    backgroundColor: "white",
    borderRadius: windowWidth(4),
    padding: windowWidth(4),
    margin: windowWidth(3),
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: windowHeight(2),
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.sm,
    color: color.primary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: windowHeight(2),
  },
  sectionHeading: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.sm,
    marginBottom: windowHeight(1),
  },
  addedCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: windowHeight(1),
  },
  addonName: { fontFamily: fonts.medium, fontSize: fontSizes.sm },
  addonRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(3),
  },
  priceText: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.rg,
    color: color.primary,
  },
  paidText: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.md,
    color: color.green,
  },
  servicepriceText: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.md,
    color: color.primary,
  },
  discountText: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.rg,
    color: color.red,
  },
  totalText: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.md,
    color: color.primary,
  },
  // iconBox: {
  //   borderRadius: windowHeight(2),
  //   width: windowWidth(10),
  //   alignItems: "center",
  // },
  label: { fontFamily: fonts.medium, fontSize: fontSizes.md },
  totalLabel: { fontFamily: fonts.medium, fontSize: fontSizes.md },
});
