import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import AttendanceScreen from "@/screens/attendance/Attendance.screen";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

function index() {
  return (
    // <View>
    //   <Header isBack title="Atendance" isRightIcon />
    //   <Text>This is your attendance screen</Text>
    //   <Button
    //     title="View Timeline"
    //     onPress={() => router.push("/(routes)/attendanceTimeline")}
    //   />
    // </View>
    <AttendanceScreen />
  );
}

export default index;
