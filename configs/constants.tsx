import { NavigationTabProps } from "@/@types/global";
import { TabItem } from "@/components/common/AnimatedTabs";

import Images from "@/utils/images";

export const DashBoardNavigationTab: NavigationTabProps[] = [
  {
    title: "Bookings",
    image: Images.Orders,
    route: "/(routes)/orders",
  },
  {
    title: "Payments",
    image: Images.payments,
    route: "/(routes)/commisonHistory",
  },
];

export const ORDERS_SCREEN_TABS: TabItem[] = [
  {
    iconType: "FontAwesome",
    iconName: "address-book",
    label: "ASSIGNED",
    status: [
      "ASSIGNED",
      "RESCHEDULED",
      "REASSIGNED",
      "ON_THE_WAY",
      "REACHED",
      "IN_PROGRESS",
    ],

    filterText: "",
  },
  {
    iconType: "Fontisto",
    iconName: "atom",
    label: "COMPLETED",
    status: ["COMPLETED"],
    filterText: "",
  },
];
export const IVR_NUMBER = "8697771777";
