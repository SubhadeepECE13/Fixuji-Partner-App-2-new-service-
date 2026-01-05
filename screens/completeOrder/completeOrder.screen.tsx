// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   ScrollView,
// } from "react-native";
// import { useLocalSearchParams, router } from "expo-router";
// import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";

// import Header from "@/components/common/Header";
// import Button from "@/components/common/Button";
// import Toast from "react-native-toast-message";
// import UPIQrCard from "@/components/order/UpiQrCard";
// import color from "@/themes/Colors.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";
// import fonts from "@/themes/Fonts.themes";
// import {
//   completeOrder,
//   PaymentItem,
// } from "@/store/actions/vendors/vendorAction";

// const CompleteOrderScreen = () => {
//   const { order_id } = useLocalSearchParams<{ order_id: string }>();
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((s) => s.user.user);
//   const orderId =
//     Number(useAppSelector((s) => s.orderDetails.orderDetails?.id)) || 0;
//   const ORDER_TOTAL =
//     Number(useAppSelector((s) => s.orderDetails.orderDetails?.grossAmount)) ||
//     0;

//   const [payments, setPayments] = useState<PaymentItem[]>([
//     { paymentMode: "CASH", paymentAmount: 0 },
//   ]);

//   const paidTotal = payments.reduce(
//     (sum, p) => sum + Number(p.paymentAmount || 0),
//     0
//   );

//   const updatePayment = (index: number, data: Partial<PaymentItem>) => {
//     setPayments((prev) =>
//       prev.map((p, i) => (i === index ? { ...p, ...data } : p))
//     );
//   };

//   const addPayment = () => {
//     setPayments((prev) => [...prev, { paymentMode: "UPI", paymentAmount: 0 }]);
//   };

//   const removePayment = (index: number) => {
//     setPayments((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     const payloadPayments = payments.map((p) => ({
//       paymentMode: p.paymentMode,
//       paymentAmount: Number(p.paymentAmount),
//     }));
//     try {
//       await dispatch(
//         completeOrder({
//           bookingId: Number(orderId),
//           payments: payloadPayments,
//           totalAmount: ORDER_TOTAL,
//           collectorId: user?.userId ?? 0,
//         })
//       );

//       router.replace(`/orderDetailes/${order_id}`);
//     } catch {}
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "#f6f7fb" }}>
//       <Header title="Complete Order" isBack />

//       <ScrollView
//         contentContainerStyle={styles.scroll}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.card}>
//           <Text style={styles.heading}>Collect Payment</Text>

//           <View style={styles.totalBox}>
//             <Text style={styles.label}>Total</Text>
//             <Text style={styles.totalText}>₹{ORDER_TOTAL}</Text>
//           </View>

//           {payments.map((item, index) => (
//             <View key={index} style={styles.paymentCard}>
//               <View style={styles.toggleRow}>
//                 {["CASH", "UPI"].map((mode) => (
//                   <TouchableOpacity
//                     key={mode}
//                     style={[
//                       styles.toggleBtn,
//                       item.paymentMode === mode && styles.toggleActive,
//                     ]}
//                     onPress={() =>
//                       updatePayment(index, {
//                         paymentMode: mode as any,
//                       })
//                     }
//                   >
//                     <Text
//                       style={[
//                         styles.toggleText,
//                         item.paymentMode === mode && styles.toggleTextActive,
//                       ]}
//                     >
//                       {mode.replace("_", " ")}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               <TextInput
//                 style={styles.input}
//                 keyboardType="numeric"
//                 placeholder="Amount"
//                 value={item.paymentAmount ? String(item.paymentAmount) : ""}
//                 onChangeText={(v) =>
//                   updatePayment(index, {
//                     paymentAmount: Number(v),
//                   })
//                 }
//               />
//               <View style={styles.collected}>
//                 <Text style={styles.collectedText}>
//                   Collected: ₹{paidTotal}
//                 </Text>
//               </View>

//               {item.paymentMode === "UPI" && (
//                 <UPIQrCard
//                   upiId="paytmqr75i3nyiysp@paytm"
//                   businessName="Fixuji Domestic Service"
//                   amount={item.paymentAmount}
//                 />
//               )}

//               {payments.length > 1 && (
//                 <Button
//                   title="Remove Payment"
//                   onPress={() => removePayment(index)}
//                   width={windowWidth(60)}
//                   height={windowHeight(5)}
//                   iconType="MaterialCommunityIcons"
//                   iconName="minus-circle"
//                   iconSize={14}
//                   isIcon
//                 />
//               )}
//             </View>
//           ))}
//           <View style={{ alignSelf: "flex-end" }}>
//             <Button
//               title="Add Payment Method"
//               onPress={addPayment}
//               width={windowWidth(60)}
//               height={windowHeight(5)}
//               iconType="MaterialCommunityIcons"
//               iconName="plus-circle"
//               iconSize={14}
//               isIcon
//             />
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.footer}>
//         <Button
//           title="Complete Order"
//           onPress={handleSubmit}
//           width={windowWidth(90)}
//           height={windowHeight(6)}
//           iconType="MaterialCommunityIcons"
//           iconName="check-decagram"
//           iconSize={24}
//           isIcon
//         />
//       </View>
//     </View>
//   );
// };

// export default CompleteOrderScreen;
// const styles = StyleSheet.create({
//   scroll: {
//     paddingBottom: windowHeight(12),
//   },
//   card: {
//     margin: windowWidth(5),
//     backgroundColor: color.whiteColor,
//     borderRadius: 14,
//     padding: windowHeight(2.5),
//     elevation: 4,
//   },
//   heading: {
//     fontFamily: fonts.semiBold,
//     fontSize: fontSizes.lg + 2,
//     color: color.primary,
//     marginBottom: windowHeight(2),
//   },
//   totalBox: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#eff4ff",
//     padding: windowHeight(1.5),
//     borderRadius: 10,
//     marginBottom: windowHeight(2),
//   },
//   totalText: {
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.xl,
//     color: color.primary,
//   },
//   label: {
//     fontFamily: fonts.medium,
//     fontSize: fontSizes.sm,
//     color: color.primary,
//   },
//   paymentCard: {
//     marginBottom: windowHeight(2),
//   },
//   toggleRow: {
//     flexDirection: "row",
//     gap: windowWidth(2),
//     marginBottom: windowHeight(1),
//   },
//   toggleBtn: {
//     flex: 1,
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingVertical: windowHeight(1.2),
//     alignItems: "center",
//     borderColor: "#d1d6e0",
//   },
//   toggleActive: {
//     backgroundColor: color.primary,
//     borderColor: color.primary,
//   },
//   toggleText: {
//     fontFamily: fonts.medium,
//     fontSize: fontSizes.sm,
//     color: "#4b5563",
//   },
//   toggleTextActive: {
//     color: "#fff",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#d9dae1",
//     borderRadius: 8,
//     padding: windowHeight(1.4),
//     marginBottom: windowHeight(1),
//     backgroundColor: "#fafbfc",
//   },
//   addBtn: {
//     marginTop: windowHeight(1),
//     alignItems: "center",
//   },
//   addText: {
//     color: color.primary,
//     fontFamily: fonts.medium,
//   },
//   collected: {
//     marginTop: windowHeight(1),
//     alignItems: "flex-start",
//   },
//   collectedText: {
//     fontFamily: fonts.regular,
//     fontSize: fontSizes.rg,
//   },
//   removeText: {
//     color: "red",
//     marginTop: 6,
//   },
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     backgroundColor: color.whiteColor,
//     padding: windowHeight(2),
//   },
// });

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";

import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import UPIQrCard from "@/components/order/UpiQrCard";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import {
  completeOrder,
  PaymentItem,
} from "@/store/actions/vendors/vendorAction";

const CompleteOrderScreen = () => {
  const { order_id } = useLocalSearchParams<{ order_id: string }>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user.user);

  const orderId =
    Number(useAppSelector((s) => s.orderDetails.orderDetails?.id)) || 0;

  const netAmount =
    Number(useAppSelector((s) => s.orderDetails.orderDetails?.netAmount)) || 0;
  const paidAmount =
    Number(useAppSelector((s) => s.orderDetails.orderDetails?.paidAmount)) || 0;

  const ORDER_TOTAL = netAmount - paidAmount;

  const [payments, setPayments] = useState<PaymentItem[]>([
    { paymentMode: "CASH", paymentAmount: 0 },
  ]);

  const paidTotal = payments.reduce(
    (sum, p) => sum + Number(p.paymentAmount || 0),
    0
  );

  const updatePayment = (index: number, data: Partial<PaymentItem>) => {
    setPayments((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...data } : p))
    );
  };

  const addPayment = () => {
    setPayments((prev) => [...prev, { paymentMode: "CASH", paymentAmount: 0 }]);
  };

  const removeLastPayment = () => {
    setPayments((prev) => prev.slice(0, -1));
  };

  const handleSubmit = async () => {
    const payloadPayments = payments.map((p) => ({
      paymentMode: p.paymentMode,
      paymentAmount: Number(p.paymentAmount),
    }));

    try {
      await dispatch(
        completeOrder({
          bookingId: orderId,
          payments: payloadPayments,
          totalAmount: paidTotal,
          collectorId: user?.userId ?? 0,
        })
      );

      router.replace(`/orderDetailes/${order_id}`);
    } catch {}
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f7fb" }}>
      <Header title="Complete Order" isBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.heading}>Collect Payment</Text>

          <View style={styles.totalBox}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.totalText}>₹{ORDER_TOTAL}</Text>
          </View>

          {payments.map((item, index) => (
            <View key={index} style={styles.paymentCard}>
              <View style={styles.toggleRow}>
                {["CASH", "UPI"].map((mode) => (
                  <TouchableOpacity
                    key={mode}
                    style={[
                      styles.toggleBtn,
                      item.paymentMode === mode && styles.toggleActive,
                    ]}
                    onPress={() =>
                      updatePayment(index, {
                        paymentMode: mode as "CASH" | "UPI",
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        item.paymentMode === mode && styles.toggleTextActive,
                      ]}
                    >
                      {mode}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Amount"
                value={item.paymentAmount ? String(item.paymentAmount) : ""}
                onChangeText={(v) =>
                  updatePayment(index, {
                    paymentAmount: Number(v),
                  })
                }
              />

              <Text style={styles.collectedText}>Collected: ₹{paidTotal}</Text>

              {item.paymentMode === "UPI" && (
                <UPIQrCard
                  upiId="paytmqr75i3nyiysp@paytm"
                  businessName="Fixuji Domestic Service"
                  amount={item.paymentAmount}
                />
              )}
            </View>
          ))}

          {payments.length > 1 && (
            <View style={styles.actionRow}>
              <Button
                title="Remove"
                onPress={removeLastPayment}
                width={windowWidth(30)}
                height={windowHeight(4.2)}
                iconType="MaterialCommunityIcons"
                iconName="minus-circle-outline"
                iconSize={14}
                isIcon
              />
            </View>
          )}

          <View style={styles.actionRow}>
            <Button
              title="Add"
              onPress={addPayment}
              width={windowWidth(30)}
              height={windowHeight(4.2)}
              iconType="MaterialCommunityIcons"
              iconName="plus-circle-outline"
              iconSize={14}
              isIcon
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Complete Order"
          onPress={handleSubmit}
          width={windowWidth(90)}
          height={windowHeight(6)}
          iconType="MaterialCommunityIcons"
          iconName="check-decagram"
          iconSize={24}
          isIcon
        />
      </View>
    </View>
  );
};

export default CompleteOrderScreen;
const styles = StyleSheet.create({
  scroll: {
    paddingBottom: windowHeight(12),
  },
  card: {
    margin: windowWidth(5),
    backgroundColor: color.whiteColor,
    borderRadius: 14,
    padding: windowHeight(2.5),
    elevation: 4,
  },
  heading: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.lg + 2,
    color: color.primary,
    marginBottom: windowHeight(2),
  },
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#eff4ff",
    padding: windowHeight(1.5),
    borderRadius: 10,
    marginBottom: windowHeight(2),
  },
  totalText: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.xl,
    color: color.primary,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
    color: color.primary,
  },
  paymentCard: {
    marginBottom: windowHeight(2),
  },
  toggleRow: {
    flexDirection: "row",
    gap: windowWidth(2),
    marginBottom: windowHeight(1),
  },
  toggleBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: windowHeight(1.2),
    alignItems: "center",
    borderColor: "#d1d6e0",
  },
  toggleActive: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },
  toggleText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.sm,
    color: "#4b5563",
  },
  toggleTextActive: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9dae1",
    borderRadius: 8,
    padding: windowHeight(1.4),
    marginBottom: windowHeight(1),
    backgroundColor: "#fafbfc",
  },
  collectedText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.rg,
    marginBottom: windowHeight(1),
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: windowHeight(1),
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: color.whiteColor,
    padding: windowHeight(2),
  },
});
