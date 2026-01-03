// import { RootState } from "@/store/Store";
// import { completeOrder } from "@/store/actions/orders/OrderAction";
// import { router, useLocalSearchParams } from "expo-router";
// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useDispatch, useSelector } from "react-redux";

// import Header from "@/components/common/Header";
// import color from "@/themes/Colors.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";
// import fonts from "@/themes/Fonts.themes";
// import Toast from "react-native-toast-message";

// import Button from "@/components/common/Button";
// import UPIQrCard from "@/components/order/UpiQrCard";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { ScrollView } from "react-native-gesture-handler";
// import * as Yup from "yup";

// const CompleteOrderScreen = () => {
//   const params = useLocalSearchParams<{ order_id: string }>();
//   const orderId = params.order_id;

//   const dispatch = useDispatch<any>();
//   const { loading } = useSelector((state: RootState) => state.completeOrder);

//   const finalAmount = useSelector(
//     (state: RootState) => state.orderDetails.orderDetails?.grossAmount
//   );

//   const ORDER_TOTAL = Number(finalAmount) || 0;

//   const UPI_ID = "paytmqr75i3nyiysp@paytm";
//   const BUSINESS_NAME = "Fixuji Domestic Service";

//   const validationSchema = Yup.object().shape({
//     recievePayment: Yup.number()
//       .typeError("Amount must be a number")
//       .required("Payment amount is required")
//       .test(
//         "within-range",
//         `Allowed range: ₹${ORDER_TOTAL - 10} - ₹${ORDER_TOTAL + 10}`,
//         (value) =>
//           value !== undefined &&
//           value >= ORDER_TOTAL - 10 &&
//           value <= ORDER_TOTAL + 10
//       ),
//     paymentMethod: Yup.string().oneOf(["CASH", "UPI"]).required(),
//   });

//   const {
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       recievePayment: 0,
//       paymentMethod: "CASH" as "CASH" | "UPI",
//     },
//   });

//   const paymentMethod = watch("paymentMethod");
//   const recievePayment = watch("recievePayment");

//   const onSubmit = async (values: any) => {
//     try {
//       await dispatch(
//         completeOrder(orderId, {
//           recievePayment: Number(values.recievePayment),
//           paymentMethod: values.paymentMethod,
//         })
//       );

//       Toast.show({
//         type: "success",
//         text1: "Order Completed",
//         text2: "Booking successfully finished.",
//       });

//       setTimeout(() => {
//         router.replace(`/orderDetailes/${orderId}`);
//       }, 300);
//     } catch {
//       Toast.show({
//         type: "error",
//         text1: "Failed",
//         text2: "Could not complete order.",
//       });
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "#f6f7fb" }}>
//       <Header title="Complete Order" isBack />
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.container}>
//           <View style={styles.card}>
//             <Text style={styles.heading}>Collect Payment </Text>

//             <View style={styles.amountSection}>
//               <Text style={styles.label}> Total</Text>
//               <Text style={styles.amountText}>₹{ORDER_TOTAL}</Text>
//             </View>

//             <Text style={styles.label}>Received Amount</Text>
//             <TextInput
//               style={[
//                 styles.input,
//                 errors.recievePayment && { borderColor: "#ff4b4b" },
//               ]}
//               value={recievePayment?.toString() ?? ""}
//               keyboardType="numeric"
//               onChangeText={(value) =>
//                 setValue("recievePayment", value === "" ? 0 : Number(value))
//               }
//               placeholder="Enter received amount"
//               placeholderTextColor="#9aa0b1"
//             />

//             {errors.recievePayment && (
//               <Text style={styles.errorMessage}>
//                 {errors.recievePayment.message}
//               </Text>
//             )}

//             <Text style={[styles.label, { marginTop: windowHeight(2) }]}>
//               Payment Method
//             </Text>

//             <View style={styles.toggleWrapper}>
//               {["CASH", "UPI"].map((method) => (
//                 <TouchableOpacity
//                   key={method}
//                   style={[
//                     styles.toggleButton,
//                     paymentMethod === method && styles.activeToggleButton,
//                   ]}
//                   onPress={() =>
//                     setValue("paymentMethod", method as "CASH" | "UPI")
//                   }
//                 >
//                   <Text
//                     style={[
//                       styles.toggleButtonText,
//                       paymentMethod === method && styles.activeToggleText,
//                     ]}
//                   >
//                     {method}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {paymentMethod === "UPI" && (
//               <View style={{ marginTop: windowHeight(2) }}>
//                 <UPIQrCard
//                   upiId={UPI_ID}
//                   businessName={BUSINESS_NAME}
//                   amount={ORDER_TOTAL}
//                 />
//               </View>
//             )}
//           </View>
//         </View>
//       </ScrollView>
//       <View style={styles.footer}>
//         <Button
//           title={loading ? "Processing..." : "Complete Order"}
//           disabled={loading}
//           onPress={handleSubmit(onSubmit)}
//           style={styles.button}
//           height={windowHeight(6.2)}
//           width={windowWidth(90)}
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
//   container: {
//     paddingHorizontal: windowWidth(5),
//     paddingTop: windowHeight(2),
//   },
//   card: {
//     backgroundColor: color.whiteColor,
//     borderRadius: 14,
//     padding: windowHeight(2.5),
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   heading: {
//     fontFamily: fonts.semiBold,
//     fontSize: fontSizes.lg + 2,
//     color: color.primary,
//     marginBottom: windowHeight(2),
//   },
//   label: {
//     fontFamily: fonts.medium,
//     fontSize: fontSizes.sm,
//     color: color.primary,
//     marginBottom: windowHeight(0.5),
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#d9dae1",
//     backgroundColor: "#fafbfc",
//     padding: windowHeight(1.4),
//     borderRadius: 8,
//     fontSize: fontSizes.md,
//     fontFamily: fonts.regular,
//     marginBottom: windowHeight(1),
//   },
//   amountSection: {
//     backgroundColor: "#eff4ff",
//     padding: windowHeight(1.5),
//     borderRadius: windowHeight(1),
//     marginBottom: windowHeight(2),
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   amountText: {
//     color: color.primary,
//     fontFamily: fonts.bold,
//     fontSize: fontSizes.xl,
//   },
//   toggleWrapper: {
//     flexDirection: "row",
//     gap: windowWidth(3),
//   },
//   toggleButton: {
//     flex: 1,
//     paddingVertical: windowHeight(1.3),
//     borderRadius: windowHeight(1),
//     borderWidth: 1,
//     borderColor: "#d1d6e0",
//     alignItems: "center",
//   },
//   activeToggleButton: {
//     backgroundColor: color.primary,
//     borderColor: color.primary,
//   },
//   toggleButtonText: {
//     fontFamily: fonts.medium,
//     fontSize: fontSizes.sm,
//     color: "#4b5563",
//   },
//   activeToggleText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   errorMessage: {
//     color: "#ff4b4b",
//     fontSize: fontSizes.xs,
//     marginBottom: windowHeight(1),
//   },
//   button: {
//     backgroundColor: color.primary,
//     marginTop: windowHeight(1),
//     alignSelf: "center",
//     borderRadius: 12,
//   },
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     backgroundColor: color.whiteColor,
//     paddingHorizontal: windowWidth(5),
//     paddingVertical: windowHeight(2),
//     borderTopLeftRadius: windowWidth(5),
//     borderTopRightRadius: windowWidth(5),
//     shadowColor: "#000",
//     shadowOpacity: 0.12,
//     elevation: 10,
//   },
//   scrollContent: {
//     paddingBottom: windowHeight(10),
//   },
// });

// app/completeOrder/[order_id].tsx

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
import Toast from "react-native-toast-message";
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

  const ORDER_TOTAL =
    Number(useAppSelector((s) => s.orderDetails.orderDetails?.grossAmount)) ||
    0;

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
    setPayments((prev) => [...prev, { paymentMode: "UPI", paymentAmount: 0 }]);
  };

  const removePayment = (index: number) => {
    setPayments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (paidTotal !== ORDER_TOTAL) {
      Toast.show({
        type: "error",
        text1: "Payment mismatch",
        text2: `Collected ₹${paidTotal}, required ₹${ORDER_TOTAL}`,
      });
      return;
    }

    try {
      await dispatch(
        completeOrder({
          bookingId: Number(order_id),
          payments,
          totalAmount: ORDER_TOTAL,
          collectorId: user?.userId ?? 0,
        })
      );

      router.replace(`/orderDetailes/${order_id}`);
    } catch {}
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f7fb" }}>
      <Header title="Complete Order" isBack />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
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
                        paymentMode: mode as any,
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        item.paymentMode === mode && styles.toggleTextActive,
                      ]}
                    >
                      {mode.replace("_", " ")}
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

              {item.paymentMode === "CREDIT_CARD" && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Card Number"
                    onChangeText={(v) => updatePayment(index, { cardNo: v })}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Card Holder Name"
                    onChangeText={(v) =>
                      updatePayment(index, {
                        cardHolderName: v,
                      })
                    }
                  />
                </>
              )}

              {item.paymentMode === "UPI" && (
                <UPIQrCard
                  upiId="paytmqr75i3nyiysp@paytm"
                  businessName="Fixuji Domestic Service"
                  amount={item.paymentAmount}
                />
              )}

              {payments.length > 1 && (
                <TouchableOpacity onPress={() => removePayment(index)}>
                  <Text style={styles.removeText}>Remove Payment</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <TouchableOpacity onPress={addPayment} style={styles.addBtn}>
            <Text style={styles.addText}>+ Add Payment Method</Text>
          </TouchableOpacity>

          <View style={styles.summary}>
            <Text style={styles.summaryText}>Collected: ₹{paidTotal}</Text>
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
  addBtn: {
    marginTop: windowHeight(1),
    alignItems: "center",
  },
  addText: {
    color: color.primary,
    fontFamily: fonts.medium,
  },
  summary: {
    marginTop: windowHeight(2),
    alignItems: "flex-end",
  },
  summaryText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSizes.md,
  },
  removeText: {
    color: "red",
    marginTop: 6,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: color.whiteColor,
    padding: windowHeight(2),
  },
});
