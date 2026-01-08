import React, { useEffect, useState } from "react";
import { View } from "react-native";

import AttendanceMonthDetails from "@/components/attendance/AttendanceMonthDetails";
import Header from "@/components/common/Header";

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

const AttendanceScreen = () => {
  const [monthIndex, setMonthIndex] = useState(0);
  const [year, setYear] = useState(2026);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<
    { label: string; value: string | number; info?: boolean }[]
  >([]);

  const handlePrevMonth = () => {
    setLoading(true);

    setMonthIndex((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setLoading(true);

    setMonthIndex((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      console.log("Fetch attendance for:", MONTHS[monthIndex], year);

      setTimeout(() => {
        setStats([
          { label: "Present", value: "1.0" },
          { label: "Absent", value: "6" },
          { label: "Half Day", value: "0" },
          { label: "Leave", value: "0" },
          { label: "Fine", value: "0:00" },
          { label: "Overtime", value: "0:00" },
          { label: "Punch In", value: "1.0", info: true },
          { label: "Punch Out", value: "1.0", info: true },
        ]);

        setLoading(false);
      }, 800);
    };

    fetchAttendance();
  }, [monthIndex, year]);

  return (
    <View style={{ flex: 1 }}>
      <Header isBack title="Your Attendance" isRightIcon />

      <AttendanceMonthDetails
        month={MONTHS[monthIndex]}
        year={year}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        stats={stats}
        loading={loading}
      />
    </View>
  );
};

export default AttendanceScreen;
