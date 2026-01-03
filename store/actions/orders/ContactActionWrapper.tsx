// import React, { useMemo } from "react";
// import ContactActions from "./ContactActions";
// import { IUser } from "../users/users.types";
// import { View } from "react-native";
// import { SettingsResponse } from "../settings/settings.types";
// import dayjs from "dayjs";
// import { IBookingResponse, Order } from "./orders.action";

// type Props = {
//   phone: string;
//   geolocation: string | null;
//   containerStyle?: any;
//   iconStyle?: any;
//   order: IBookingResponse;
//   user: IUser;
//   settings: SettingsResponse;
//   // refreshFilters: any;
// };

// const ContactActionsWrapper: React.FC<Props> = ({
//   phone,
//   geolocation,
//   order,
//   user,
//   containerStyle,
//   iconStyle,
//   settings,
//   // refreshFilters,
// }) => {
//   const isManager = user.userType === "Manager";
//   const isSameVendor = order.bookingVendors?.some(
//     (bv) => bv.vendor?.id === user.id
//   );

//   console.log("user ID is :", user.id);
//   console.log("Vendor ID is :", isSameVendor);

//   const orderDateTime = useMemo(() => {
//     if (!order?.date?.full_date) return null;
//     return dayjs(order.date.full_date);
//   }, [order]);

//   const isWithin30Minutes = useMemo(() => {
//     if (!orderDateTime) return false;

//     const now = dayjs();
//     const threshold = orderDateTime.subtract(60, "minute");

//     return now.isAfter(threshold);
//   }, [orderDateTime]);

//   const shouldShow = (isManager || isSameVendor) && isWithin30Minutes;
//   console.log({
//     userId: user.id,
//     vendorId: order.vendorId,
//     isSameVendor: user.id === order.vendorId,
//     shouldShow,
//   });
//   if (!shouldShow) {
//     return <View style={[{ flexDirection: "row" }, containerStyle]} />;
//   }

//   return (
//     <ContactActions
//       phone={phone}
//       geolocation={geolocation}
//       order={order}
//       user={user}
//       containerStyle={containerStyle}
//       iconStyle={iconStyle}
//       navigateAddressLink={order.userData.navigateAddressLink}
//       settings={settings}
//       refreshFilters={refreshFilters}
//     />
//   );
// };

// export default ContactActionsWrapper;

import React, { useMemo } from "react";
import { View } from "react-native";
import dayjs from "dayjs";

import ContactActions from "./ContactActions";
import { IUser } from "../users/users.types";
import { SettingsResponse } from "../settings/settings.types";
import { IBookingResponse } from "./orders.action";

type Props = {
  phone: string;
  geolocation: string | null;
  containerStyle?: any;
  iconStyle?: any;
  order: IBookingResponse;
  user: IUser;
  settings: SettingsResponse;
};

const ACTION_WINDOW_BEFORE_MINUTES = 90;
const ACTION_WINDOW_AFTER_MINUTES = 15;

const ContactActionsWrapper: React.FC<Props> = ({
  phone,
  geolocation,
  order,
  user,
  containerStyle,
  iconStyle,
  settings,
}) => {
  const isManager = user.userType === "Manager";
  const isCaptain = order.captainId === user.userId;

  const orderDateTime = useMemo(() => {
    if (!order.bookingDate || !order.bookingTime) return null;

    const date = dayjs(order.bookingDate).format("YYYY-MM-DD");
    return dayjs(`${date} ${order.bookingTime}`, "YYYY-MM-DD HH:mm");
  }, [order.bookingDate, order.bookingTime]);

  const isWithinActionWindow = useMemo(() => {
    if (!orderDateTime) return false;

    const now = dayjs();

    const minutesBefore = orderDateTime.diff(now, "minute");
    const minutesAfter = now.diff(orderDateTime, "minute");

    return (
      (minutesBefore >= 0 && minutesBefore <= ACTION_WINDOW_BEFORE_MINUTES) ||
      (minutesAfter >= 0 && minutesAfter <= ACTION_WINDOW_AFTER_MINUTES)
    );
  }, [orderDateTime]);

  const shouldShowContactActions =
    isWithinActionWindow && (isManager || isCaptain);

  if (!shouldShowContactActions) {
    return <View style={[{ flexDirection: "row" }, containerStyle]} />;
  }

  return (
    <ContactActions
      phone={phone}
      geolocation={geolocation}
      order={order}
      user={user}
      containerStyle={containerStyle}
      iconStyle={iconStyle}
      settings={settings}
      navigateAddressLink={geolocation}
    />
  );
};

export default ContactActionsWrapper;
