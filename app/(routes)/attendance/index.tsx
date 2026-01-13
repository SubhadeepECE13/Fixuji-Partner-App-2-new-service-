import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import AttendanceScreen from "@/screens/attendance/Attendance.screen";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

function index() {
  return <AttendanceScreen />;
}

export default index;
