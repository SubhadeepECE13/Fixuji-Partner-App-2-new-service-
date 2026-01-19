// import React, { useEffect, useState } from "react";
// import { View } from "react-native";
// import Header from "@/components/common/Header";
// import AttendanceDayCard from "@/components/attendanceTimeline/AttendanceDayCard";
// import AttendanceDaySkeleton from "@/components/attendanceTimeline/AttendanceLoader";
// import CustomFlatList from "@/components/common/CustomFlatList";
// import { windowHeight, windowWidth } from "@/themes/Constants.themes";
// import { FlatList } from "react-native-gesture-handler";
// import AttendanceMonthDetails from "@/components/attendanceTimeline/AttendanceMonthDetails";

// const MONTHS = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// type AttendanceDay = {
//   id: string;
//   date: string;
//   day: string;
//   hours?: string;
//   status?: "PRESENT" | "ABSENT" | "HD" | "NOT_MARKED";
//   shift?: string;
//   image?: string;
// };

// const AttendanceTimelineScreen = () => {
//   const [monthIndex, setMonthIndex] = useState(0);
//   const [year, setYear] = useState(2026);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState<
//     { label: string; value: string | number; info?: boolean }[]
//   >([]);
//   const [days, setDays] = useState<AttendanceDay[]>([]);

//   const handlePrevMonth = () => {
//     // setLoading(true);
//     setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
//     if (monthIndex === 0) setYear((y) => y - 1);
//   };

//   const handleNextMonth = () => {
//     // setLoading(true);
//     setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
//     if (monthIndex === 11) setYear((y) => y + 1);
//   };

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       setTimeout(() => {
//         setStats([
//           { label: "Present", value: "18" },
//           { label: "Absent", value: "2" },
//           { label: "Half Day", value: "1" },
//           { label: "Leave", value: "0" },
//           { label: "Fine", value: "0:00" },
//           { label: "Overtime", value: "3:20" },
//           { label: "Punch In", value: "21", info: true },
//           { label: "Punch Out", value: "21", info: true },
//         ]);

//         setDays([
//           {
//             id: "2026-01-08",
//             date: "8 Jan",
//             day: "Thu",
//             hours: "9:58 Hrs",
//             status: "PRESENT",
//             shift: "Kolkata Shift | 07:36 am - 05:34 pm",
//             image:
//               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX-zvTFx8Q-MFBl2cODEEGijN9_9qGuZZqfw&s",
//           },
//           {
//             id: "2026-01-09",
//             date: "9 Jan",
//             day: "Fri",
//             hours: "8:40 Hrs",
//             status: "HD",
//             image:
//               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOcMhaDYFs7fgKXp0EbLr7eleZa7dUrXq2tg&s",
//           },
//           {
//             id: "2026-01-10",
//             date: "10 Jan",
//             day: "Sun",
//             status: "ABSENT",
//           },
//           {
//             id: "2026-01-11",
//             date: "11 Jan",
//             day: "Sun",
//             status: "PRESENT",
//             shift: "Siliguri Shift | 07:36 am - 05:34 pm",
//             image:
//               "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWKMXhd-6DnIYIxm91QsefAaxV466rE1jxzw&s",
//           },
//           {
//             id: "2026-01-12",
//             date: "12 Jan",
//             day: "Sun",
//             status: "ABSENT",
//           },
//         ]);

//         setLoading(false);
//       }, 100);
//     };

//     fetchAttendance();
//   }, [monthIndex, year]);

//   return (
//     <View style={{ flex: 1 }}>
//       <Header isBack title="Attendance Timeline" isRightIcon />

//       <AttendanceMonthDetails
//         month={MONTHS[monthIndex]}
//         year={year}
//         onPrevMonth={handlePrevMonth}
//         onNextMonth={handleNextMonth}
//         stats={stats}
//         loading={loading}
//       />

//       <FlatList
//         data={loading ? Array.from({ length: 6 }) : days}
//         keyExtractor={(item, index) =>
//           loading ? `skeleton-${index}` : (item as AttendanceDay).id
//         }
//         contentContainerStyle={{ paddingBottom: windowWidth(2) }}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item }) =>
//           loading ? (
//             <AttendanceDaySkeleton />
//           ) : (
//             <AttendanceDayCard
//               date={(item as AttendanceDay).date}
//               day={(item as AttendanceDay).day}
//               hours={(item as AttendanceDay).hours}
//               status={(item as AttendanceDay).status}
//               shift={(item as AttendanceDay).shift}
//               image={(item as AttendanceDay).image}
//             />
//           )
//         }
//       />
//     </View>
//   );
// };

// export default AttendanceTimelineScreen;

import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";

import Header from "@/components/common/Header";
import AttendanceDayCard from "@/components/attendanceTimeline/AttendanceDayCard";
import AttendanceDaySkeleton from "@/components/attendanceTimeline/AttendanceLoader";
import AttendanceMonthDetails from "@/components/attendanceTimeline/AttendanceMonthDetails";
import { windowWidth } from "@/themes/Constants.themes";
import color from "@/themes/Colors.themes";

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];


type AttendanceDay = {
  id: string;
  date: string;
  day: string;
  hours?: string;
  status?: "PRESENT" | "ABSENT" | "HD" | "NOT_MARKED";
  shift?: string;
  image?: string;
};

type StatItem = {
  label: string;
  value: string | number;
  info?: boolean;
};

type MonthAttendanceData = {
  stats: StatItem[];
  days: AttendanceDay[];
};

type MonthKey = `${number}-${number}`;



const fetchAttendanceAPI = async (
  month: number,
  year: number
): Promise<MonthAttendanceData> => {
  await new Promise((r) => setTimeout(r, 400));

  return {
    stats: [
      { label: "Present", value: 19 },
      { label: "Absent", value: 2 },
      { label: "Half Day", value: 1 },
      { label: "Leave", value: 0 },
      { label: "Fine", value: "0:00" },
      { label: "Overtime", value: "3:20" },
      { label: "Punch In", value: 21, info: true },
      { label: "Punch Out", value: 21, info: true },
    ],
    days: [
      {
        id: `${year}-${month}-08`,
        date: "8 Jan",
        day: "Thu",
        hours: "9:58 Hrs",
        status: "PRESENT",
        shift: "Kolkata Shift | 07:36 am - 05:34 pm",
        image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWKMXhd-6DnIYIxm91QsefAaxV466rE1jxzw&s",
      },
      {
        id: `${year}-${month}-09`,
        date: "9 Jan",
        day: "Fri",
        hours: "8:40 Hrs",
        status: "HD",
      },
      {
        id: `${year}-${month}-10`,
        date: "10 Jan",
        day: "Sun",
        status: "ABSENT",
      },
    ],
  };
};



const AttendanceTimelineScreen = () => {
  const [monthIndex, setMonthIndex] = useState(0);
  const [year, setYear] = useState(2026);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [stats, setStats] = useState<StatItem[]>([]);
  const [days, setDays] = useState<AttendanceDay[]>([]);


  const [attendanceCache, setAttendanceCache] = useState<
    Record<MonthKey, MonthAttendanceData>
  >({});



  const handlePrevMonth = () => {
    setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
    if (monthIndex === 0) setYear((y) => y - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
    if (monthIndex === 11) setYear((y) => y + 1);
  };



const fetchMonthData = async (
  mIndex: number,
  y: number,
  forceRefresh = false
) => {
  const key: MonthKey = `${y}-${mIndex}`;


  if (!forceRefresh && attendanceCache[key]) {
    setStats(attendanceCache[key].stats);
    setDays(attendanceCache[key].days);
    return;
  }


  forceRefresh ? setRefreshing(true) : setLoading(true);

  try {
    const data = await fetchAttendanceAPI(mIndex + 1, y);


    setAttendanceCache((prev) => ({
      ...prev,
      [key]: data,
    }));


    setStats(data.stats);
    setDays(data.days);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};




  useEffect(() => {
    fetchMonthData(monthIndex, year);
  }, [monthIndex, year]);


const onRefresh = useCallback(() => {
  fetchMonthData(monthIndex, year, true);
}, [monthIndex, year]);




  const renderItem = useCallback(
    ({ item }: { item: AttendanceDay }) => (
      <AttendanceDayCard
        date={item.date}
        day={item.day}
        hours={item.hours}
        status={item.status}
        shift={item.shift}
        image={item.image}
      />
    ),
    []
  );



  return (
    <View style={{ flex: 1 }}>
      <Header isBack title="Attendance Timeline" isRightIcon />

      <AttendanceMonthDetails
        month={MONTHS[monthIndex]}
        year={year}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        stats={stats}
        loading={loading}
      />

      <FlatList
        data={loading ? [] : days}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={loading ? <AttendanceDaySkeleton /> : null}
        contentContainerStyle={{ paddingBottom: windowWidth(2) }}
        initialNumToRender={8}
        maxToRenderPerBatch={6}
        // windowSize={7}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[color.primary]}
            progressBackgroundColor={color.whiteColor}
          />
        }
      />
    </View>
  );
};

export default AttendanceTimelineScreen;
