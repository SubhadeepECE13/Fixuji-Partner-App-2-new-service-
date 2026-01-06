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
  const showConvertButton = data.status !== "COMPLETED";
  const shouldShowBreakup =
    chargesTotal !== 0 ||
    discount !== 0 ||
    taxAmount !== 0 ||
    refundedAmount !== 0;

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
            <View style={styles.headerRow}>
              <Text style={styles.title}>Package Summary</Text>
              {showConvertButton && (
                <Button
                  title="Convert"
                  height={windowHeight(4)}
                  width={windowWidth(24)}
                  titleStyle={{ fontSize: fontSizes.rg }}
                  onPress={() => router.replace(`/packageConvert/${order_id}`)}
                />
              )}
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

            {shouldShowBreakup && (
              <>
                {chargesTotal > 0 && (
                  <View style={styles.row}>
                    <Text style={styles.label}>Charges</Text>
                    <Text style={styles.priceText}>₹{chargesTotal}</Text>
                  </View>
                )}

                {refundedAmount > 0 && (
                  <View style={styles.row}>
                    <Text style={styles.label}>Refund</Text>
                    <Text style={styles.priceText}>₹{refundedAmount}</Text>
                  </View>
                )}

                {taxAmount > 0 && (
                  <View style={styles.row}>
                    <Text style={styles.label}>Tax</Text>
                    <Text style={styles.priceText}>₹{taxAmount}</Text>
                  </View>
                )}
                {discount > 0 && (
                  <View style={styles.row}>
                    <Text style={styles.label}>Discount</Text>
                    <Text style={styles.discountText}>₹{discount}</Text>
                  </View>
                )}

                <Divider style={{ marginBottom: windowHeight(1.5) }} />
              </>
            )}

            {/* Final Total */}
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Payable</Text>
              <Text style={styles.totalText}>₹{payable}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Paid</Text>
              <Text style={styles.paidText}>₹{advancePaidAmount}</Text>
            </View>
            {showConvertButton && (
              <>
                <Divider style={{ marginBottom: windowHeight(1.5) }} />
                <View style={styles.row}>
                  <Text style={styles.totalLabel}>Final Payable</Text>
                  <Text style={styles.totalText}>₹{finalPayable}</Text>
                </View>
              </>
            )}
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
