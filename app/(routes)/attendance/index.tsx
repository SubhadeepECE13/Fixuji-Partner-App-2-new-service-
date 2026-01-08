// import React, { useEffect, useState } from "react";
// import { View } from "react-native";

// import Header from "@/components/common/Header";
// import AttendanceMonthDetails from "@/components/attendance/AttendanceMonthDetails";
// import AttendanceDayCard from "@/components/attendance/AttendanceDayCard";
// import CustomFlatList from "@/components/common/CustomFlatList";

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
// };

// const AttendanceScreen = () => {
//   const [monthIndex, setMonthIndex] = useState(0);
//   const [year, setYear] = useState(2026);
//   const [loading, setLoading] = useState(false);
//   const [stats, setStats] = useState<
//     { label: string; value: string | number; info?: boolean }[]
//   >([]);
//   const [days, setDays] = useState<AttendanceDay[]>([]);

//   const handlePrevMonth = () => {
//     setLoading(true);
//     setMonthIndex((prev) => {
//       if (prev === 0) {
//         setYear((y) => y - 1);
//         return 11;
//       }
//       return prev - 1;
//     });
//   };

//   const handleNextMonth = () => {
//     setLoading(true);
//     setMonthIndex((prev) => {
//       if (prev === 11) {
//         setYear((y) => y + 1);
//         return 0;
//       }
//       return prev + 1;
//     });
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
//           },
//           {
//             id: "2026-01-09",
//             date: "9 Jan",
//             day: "Fri",
//             hours: "8:40 Hrs",
//             status: "HD",
//             shift: "Kolkata Shift | 08:00 am - 04:30 pm",
//           },
//           {
//             id: "2026-01-10",
//             date: "10 Jan",
//             day: "Sat",
//             status: "ABSENT",
//           },
//         ]);

//         setLoading(false);
//       }, 800);
//     };

//     fetchAttendance();
//   }, [monthIndex, year]);

//   return (
//     <View style={{ flex: 1 }}>
//       <Header isBack title="Your Attendance" isRightIcon />

//       <CustomFlatList
//         data={days}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         StickyElementComponent={
//           <AttendanceMonthDetails
//             month={MONTHS[monthIndex]}
//             year={year}
//             onPrevMonth={handlePrevMonth}
//             onNextMonth={handleNextMonth}
//             stats={stats}
//             loading={loading}
//           />
//         }
//         TopListElementComponent={<View />}
//         renderItem={({ item }) => (
//           <AttendanceDayCard
//             date={item.date}
//             day={item.day}
//             hours={item.hours}
//             status={item.status}
//             shift={item.shift}
//           />
//         )}
//       />
//     </View>
//   );
// };

// export default AttendanceScreen;
import React, { useEffect, useState } from "react";
import { View } from "react-native";

import Header from "@/components/common/Header";
import AttendanceMonthDetails from "@/components/attendance/AttendanceMonthDetails";
import AttendanceDayCard from "@/components/attendance/AttendanceDayCard";

import CustomFlatList from "@/components/common/CustomFlatList";
import AttendanceDaySkeleton from "@/components/attendance/AttendanceLoader";

/* ---------- Constants ---------- */
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type AttendanceDay = {
  id: string;
  date: string;
  day: string;
  hours?: string;
  status?: "PRESENT" | "ABSENT" | "HD" | "NOT_MARKED";
  shift?: string;
};

const AttendanceScreen = () => {
  const [monthIndex, setMonthIndex] = useState(0);
  const [year, setYear] = useState(2026);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<
    { label: string; value: string | number; info?: boolean }[]
  >([]);
  const [days, setDays] = useState<AttendanceDay[]>([]);

  const handlePrevMonth = () => {
    setLoading(true);
    setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
    if (monthIndex === 0) setYear((y) => y - 1);
  };

  const handleNextMonth = () => {
    setLoading(true);
    setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
    if (monthIndex === 11) setYear((y) => y + 1);
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      setTimeout(() => {
        setStats([
          { label: "Present", value: "18" },
          { label: "Absent", value: "2" },
          { label: "Half Day", value: "1" },
          { label: "Leave", value: "0" },
          { label: "Fine", value: "0:00" },
          { label: "Overtime", value: "3:20" },
          { label: "Punch In", value: "21", info: true },
          { label: "Punch Out", value: "21", info: true },
        ]);

        setDays([
          {
            id: "2026-01-08",
            date: "8 Jan",
            day: "Thu",
            hours: "9:58 Hrs",
            status: "PRESENT",
            shift: "Kolkata Shift | 07:36 am - 05:34 pm",
          },
          {
            id: "2026-01-09",
            date: "9 Jan",
            day: "Fri",
            hours: "8:40 Hrs",
            status: "HD",
          },
        ]);

        setLoading(false);
      }, 1000);
    };

    fetchAttendance();
  }, [monthIndex, year]);

  return (
    <View style={{ flex: 1 }}>
      <Header isBack title="Your Attendance" isRightIcon />

      <CustomFlatList
        data={loading ? Array.from({ length: 6 }) : days}
        keyExtractor={(item, index) =>
          loading ? `skeleton-${index}` : (item as AttendanceDay).id
        }
        showsVerticalScrollIndicator={false}
        StickyElementComponent={
          <AttendanceMonthDetails
            month={MONTHS[monthIndex]}
            year={year}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            stats={stats}
            loading={loading}
          />
        }
        TopListElementComponent={<View />}
        renderItem={({ item }) =>
          loading ? (
            <AttendanceDaySkeleton />
          ) : (
            <AttendanceDayCard
              date={(item as AttendanceDay).date}
              day={(item as AttendanceDay).day}
              hours={(item as AttendanceDay).hours}
              status={(item as AttendanceDay).status}
              shift={(item as AttendanceDay).shift}
            />
          )
        }
      />
    </View>
  );
};

export default AttendanceScreen;
