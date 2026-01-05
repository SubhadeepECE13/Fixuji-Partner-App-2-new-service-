// import TabView from "@/components/common/TabView";
// import OrderCard from "@/components/order/OrderCard";
// import { ORDERS_SCREEN_TABS } from "@/configs/constants";
// import useDebounce from "@/hooks/useDebounce";
// import { getAllOrders } from "@/store/actions/orders/OrderAction";
// import { IBookingResponse } from "@/store/actions/orders/orders.action";
// import { setIsOrderEnd } from "@/store/reducers/orders/orderSlice";
// import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
// import { RootState } from "@/store/Store";
// import { windowHeight } from "@/themes/Constants.themes";
// import React, { useCallback, useEffect, useState } from "react";

// export default function OrdersScreen() {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [page, setPage] = useState(1);

//   const [initialLoading, setInitialLoading] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const dispatch = useAppDispatch();
//   const debouncedSearchText = useDebounce("", 500);

//   const { orders, isOrderEnd } = useAppSelector(
//     (state: RootState) => state.order
//   );

//   const user = useAppSelector((state) => state.user.user);
//   const settings = useAppSelector((state) => state.settings.data);

//   /**
//    * 🔹 Fetch orders (DO NOT memoize with loading states)
//    */
//   const fetchOrders = async (pageNo = 1) => {
//     if (pageNo !== 1) {
//       if (loadingMore || isOrderEnd) return;
//       setLoadingMore(true);
//     } else {
//       setInitialLoading(true);
//     }

//     await dispatch(
//       getAllOrders({
//         limit: 10,
//         page: pageNo,
//         search: debouncedSearchText,
//         status: ORDERS_SCREEN_TABS[selectedIndex].status,
//       })
//     );

//     setPage(pageNo + 1);

//     setInitialLoading(false);
//     setLoadingMore(false);
//   };

//   /**
//    * 🔹 Reset + first page fetch
//    */
//   useEffect(() => {
//     dispatch(setIsOrderEnd(false));
//     setPage(1);
//     fetchOrders(1);
//   }, [selectedIndex, debouncedSearchText]);

//   /**
//    * 🔹 Render item
//    */
//   const renderOrderItem = useCallback(
//     ({ item }: { item: IBookingResponse }) => {
//       if (!user || !settings) return null;
//       return <OrderCard booking={item} user={user} settings={settings} />;
//     },
//     [user, settings]
//   );

//   return (
//     <TabView
//       headerProps={{
//         isBack: true,
//         title: "Bookings",
//         isRightIcon: false,
//       }}
//       selectedIndex={selectedIndex}
//       handleTabChange={setSelectedIndex}
//       tabItems={ORDERS_SCREEN_TABS}
//       loader={initialLoading}
//       refresh={false}
//       onRefresh={() => fetchOrders(1)}
//       items={orders ?? []}
//       renderItem={renderOrderItem}
//       skeletonDHeight={windowHeight(30)}
//       skeletonLength={3}
//       fetchMoreData={() => fetchOrders(page)}
//       isListEnd={isOrderEnd}
//     />
//   );
// }
import TabView from "@/components/common/TabView";
import OrderCard from "@/components/order/OrderCard";
import { ORDERS_SCREEN_TABS } from "@/configs/constants";
import useDebounce from "@/hooks/useDebounce";
import { getAllOrders } from "@/store/actions/orders/OrderAction";
import { IBookingResponse } from "@/store/actions/orders/orders.action";
import { setIsOrderEnd } from "@/store/reducers/orders/orderSlice";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import { RootState } from "@/store/Store";
import { windowHeight } from "@/themes/Constants.themes";
import React, { useCallback, useEffect, useState } from "react";

export default function OrdersScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, setPage] = useState(1);

  const [initialLoading, setInitialLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const dispatch = useAppDispatch();
  const debouncedSearchText = useDebounce("", 500);

  const { orders, isOrderEnd } = useAppSelector(
    (state: RootState) => state.order
  );

  const user = useAppSelector((state) => state.user.user);
  const settings = useAppSelector((state) => state.settings.data);

  const fetchOrders = async (pageNo = 1) => {
    if (pageNo !== 1) {
      if (loadingMore || isOrderEnd) return;
      setLoadingMore(true);
    } else {
      setInitialLoading(true);
    }

    await dispatch(
      getAllOrders({
        limit: 10,
        page: pageNo,
        search: debouncedSearchText,
        status: ORDERS_SCREEN_TABS[selectedIndex].status,
      })
    );

    setPage(pageNo + 1);
    setInitialLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    dispatch(setIsOrderEnd(false));
    setPage(1);
    fetchOrders(1);
  }, [selectedIndex, debouncedSearchText]);

  const renderOrderItem = useCallback(
    ({ item }: { item: IBookingResponse }) => {
      if (!user || !settings) return null;
      return <OrderCard booking={item} user={user} settings={settings} />;
    },
    [user, settings]
  );

  return (
    <TabView
      headerProps={{
        isBack: true,
        title: "Bookings",
        isRightIcon: false,
      }}
      selectedIndex={selectedIndex}
      handleTabChange={setSelectedIndex}
      tabItems={ORDERS_SCREEN_TABS}
      loader={initialLoading || loadingMore}
      refresh={false}
      onRefresh={() => fetchOrders(1)}
      items={orders ?? []}
      renderItem={renderOrderItem}
      skeletonDHeight={windowHeight(30)}
      skeletonLength={3}
      fetchMoreData={() => fetchOrders(page)}
      isListEnd={isOrderEnd}
    />
  );
}
