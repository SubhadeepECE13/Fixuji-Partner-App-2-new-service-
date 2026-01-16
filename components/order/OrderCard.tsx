import ContactActionsWrapper from "@/store/actions/orders/ContactActionWrapper";
import { IBookingResponse } from "@/store/actions/orders/orders.action";
import { SettingsResponse } from "@/store/actions/settings/settings.types";
import { IUser } from "@/store/actions/users/users.types";
import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Chip from "./OrderChip";
import CustomImage from "../common/CustomImage";

interface Props {
  booking: IBookingResponse;
  user: IUser;
  settings: SettingsResponse;
}

const OrderCard: React.FC<Props> = ({ booking, settings, user }) => {
  const bookingDate = new Date(booking.bookingDate);
  const isToday = bookingDate.toDateString() === new Date().toDateString();
  const formatTime12Hour = (time?: string) => {
    if (!time) return "";

    const [hourStr, minuteStr] = time.split(":");

    let hour = Number(hourStr);
    const minute = minuteStr ?? "00";

    if (isNaN(hour)) return time;

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;

    return `${hour}:${minute} ${ampm}`;
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => router.push(`/orderDetailes/${booking.id}`)}
      >
        <View style={[styles.container, commonStyles.shadowContainer]}>
          <View style={styles.topRow}>
            <View style={styles.leftSection}>
              <Text style={styles.titleText}>
                {booking.customer?.customerName}
              </Text>
              <Text style={styles.orderId}>{booking.orderId}</Text>

              <View style={styles.chipgaps}>
                <View style={styles.chips}>
                  <Chip
                    label={booking.service?.name ?? ""}
                    backgroundColor={booking.service?.color}
                  />
                  <Chip
                    label={
                      typeof booking?.customerVehicle?.variant.value ===
                      "string"
                        ? booking.customerVehicle.variant.value
                        : "Variant Not Found"
                    }
                    backgroundColor={booking?.service?.color}
                  />

                  <Text style={styles.status}>
                    {booking.bookingAddress?.buildingName}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.rightBox}>
              <CustomImage
                imageUrl={booking.bookingVendors[0]?.vendor.vendorImg ?? ""}
                style={styles.avatar}
              />
              <Text style={styles.technicianName}>{booking.area?.value}</Text>
              <Text style={styles.priceText}>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                }).format(Number(booking.netAmount || 0))}
              </Text>
            </View>
          </View>

          <View style={styles.middleRow}>
            <ContactActionsWrapper
              phone={booking.customer?.phoneNumber ?? ""}
              geolocation={booking.bookingAddress?.googleMapsLink ?? ""}
              containerStyle={styles.contact}
              iconStyle={styles.icon}
              order={booking}
              user={user}
              settings={settings}
            />

            <View style={styles.datetime}>
              <Text style={styles.timeText}>
                {formatTime12Hour(booking.bookingTime)}
              </Text>
              <Text style={styles.dateText}>
                {isToday
                  ? "Today"
                  : bookingDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
              </Text>
            </View>
          </View>

          <Text style={styles.addressText}>
            {booking.bookingAddress?.landmark}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default React.memo(OrderCard);
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.whiteColor,
    padding: windowWidth(4),
    borderRadius: windowWidth(4),
    marginBottom: windowHeight(1),
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftSection: {
    flex: 1,
    paddingRight: windowWidth(1),
  },
  titleText: {
    fontSize: fontSizes.md,
    fontFamily: fonts.semiBold,
    color: color.appHeaderText,
  },
  orderId: {
    fontSize: fontSizes.smMd,
    color: color.primary,
  },
  chips: {
    gap: windowHeight(1),
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  rightBox: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  avatar: {
    width: windowWidth(14),
    height: windowWidth(14),
    borderRadius: windowWidth(7),
    resizeMode: "cover",
    backgroundColor: color.gray,
  },
  technicianName: {
    fontSize: fontSizes.sm,
    color: color.placeholderText,
    textAlign: "right",
    width: windowWidth(30),
  },
  middleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: windowHeight(1),
  },
  contact: {
    flexDirection: "row",
    gap: windowWidth(2),
  },
  icon: {
    width: windowWidth(8),
    height: windowWidth(8),
    borderRadius: windowWidth(2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.primary,
  },
  datetime: {
    alignItems: "flex-end",
  },
  timeText: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.bold,
    color: color.primary,
  },
  dateText: {
    fontSize: fontSizes.sm,
    color: color.placeholderText,
  },
  addressText: {
    fontSize: fontSizes.sm,
    color: color.placeholderText,
    marginTop: windowHeight(1),
  },
  chipgaps: {
    marginTop: windowHeight(1),
  },
  priceText: {
    fontSize: fontSizes.lg,
    color: color.primary,
    textAlign: "right",
    marginTop: windowHeight(0.5),
  },
  status: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.bold,
    color: color.primary,
    alignSelf: "flex-start",
  },
  chipTextStyle: {
    fontSize: fontSizes.sm,
  },
});
