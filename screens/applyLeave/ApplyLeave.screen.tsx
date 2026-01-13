import React, { useRef, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import ModernDatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetView, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import CustomBottomSheetModal from "@/components/common/CustomBottomSheetModal";
import { CustomIcon } from "@/components/common/Icon";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { calculateDays } from "@/utils/Helpers";
import { applyLeaveValidationSchema } from "@/components/applyLeave/applyLeave.validation";

import SelectBottomSheet from "@/components/applyLeave/SelectBottomSheet";
import DatePickerBottomSheet from "@/components/applyLeave/DatePickerBottomSheet";
import ApplyLeaveHeaderCard from "@/components/applyLeave/ApplyLeaveHeaderCard";

interface FormData {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

const LEAVE_TYPES = [
  { label: "Sick Leave", value: "sick" },
  { label: "Casual Leave", value: "casual" },
  { label: "Earned Leave", value: "earned" },
  { label: "Personal Leave", value: "personal" },
  { label: "Emergency Leave", value: "emergency" },
];

const ApplyLeaveScreen = () => {
  const leaveTypeSheetRef = useRef<BottomSheetModal>(null);
  const startDateSheetRef = useRef<BottomSheetModal>(null);
  const endDateSheetRef = useRef<BottomSheetModal>(null);

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    resolver: yupResolver(applyLeaveValidationSchema),
    defaultValues: {
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const leaveType = watch("leaveType");
  const daysCount = calculateDays(startDate, endDate);
  const today = getFormatedDate(new Date(), "YYYY-MM-DD");

  const handleStartDateChange = (date: string) => {
    setValue("startDate", date);
    startDateSheetRef.current?.dismiss();
    if (endDate && dayjs(date).isAfter(dayjs(endDate))) {
      setValue("endDate", "");
    }
  };

  const handleEndDateChange = (date: string) => {
    setValue("endDate", date);
    endDateSheetRef.current?.dismiss();
  };

  const handleLeaveTypeSelect = (value: string) => {
    const selectedType = LEAVE_TYPES.find((type) => type.value === value);
    setValue("leaveType", selectedType?.label || value);
    leaveTypeSheetRef.current?.dismiss();
  };

  const onSubmit = async (data: FormData) => {
    try {
      const leaveTypeValue =
        LEAVE_TYPES.find((type) => type.label === data.leaveType)?.value ||
        data.leaveType;

      console.log("Leave Application Data:", {
        ...data,
        leaveType: leaveTypeValue,
        days: daysCount,
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert(
        "Success",
        "Your leave application has been submitted successfully!",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to submit leave application. Please try again."
      );
    }
  };

  const leaveBalance = {
    total: 15,
    used: 3,
    available: 12,
  };
  return (
    <View style={styles.container}>
      <Header title="Apply Leave" isBack isRightIcon />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ApplyLeaveHeaderCard data={leaveBalance} />

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Leave Details</Text>

            <Input
              control={control}
              name="leaveType"
              title="Leave Type"
              placeholder="Select leave type"
              type="select"
              onSelectPress={() => leaveTypeSheetRef.current?.present()}
            />

            <Input
              control={control}
              name="startDate"
              title="Start Date"
              placeholder="Select Start Date"
              type="select"
              onSelectPress={() => startDateSheetRef.current?.present()}
            />
            <Input
              control={control}
              name="endDate"
              title="End Date"
              placeholder="Select End Date"
              type="select"
              onSelectPress={() => endDateSheetRef.current?.present()}
            />

            {daysCount > 0 && (
              <View style={styles.daysCard}>
                <View style={styles.daysContent}>
                  <CustomIcon
                    type="Ionicons"
                    name="time-outline"
                    size={windowHeight(2.8)}
                    color={color.primary}
                  />
                  <View style={styles.daysTextContainer}>
                    <Text style={styles.daysLabel}>Total Days</Text>
                    <Text style={styles.daysValue}>
                      {daysCount} {daysCount === 1 ? "day" : "days"}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <Input
              control={control}
              name="reason"
              placeholder="Enter reason for leave"
              title="Reason"
              keyboardType="default"
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            title="Submit Leave Application"
            backgroundColor={color.primary}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </KeyboardAvoidingView>
      <SelectBottomSheet
        ref={leaveTypeSheetRef}
        data={LEAVE_TYPES}
        selectedLabel={leaveType}
        onSelect={handleLeaveTypeSelect}
      />

      <DatePickerBottomSheet
        ref={startDateSheetRef}
        title="Select Start Date"
        selectedDate={startDate || today}
        minimumDate={today}
        onDateChange={handleStartDateChange}
      />

      <DatePickerBottomSheet
        ref={endDateSheetRef}
        title="Select End Date"
        selectedDate={endDate || startDate || today}
        minimumDate={startDate || today}
        onDateChange={handleEndDateChange}
      />
    </View>
  );
};

export default ApplyLeaveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: windowWidth(4),
    paddingBottom: windowHeight(2),
  },

  formCard: {
    backgroundColor: color.whiteColor,
    borderRadius: 12,
    padding: windowWidth(4),
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.semiBold,
    color: color.titleText,
    marginBottom: windowHeight(2),
  },
  inputContainer: {
    marginBottom: windowHeight(2),
  },
  label: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.semiBold,
    color: color.titleText,
    marginBottom: windowHeight(0.8),
    marginLeft: windowWidth(0.8),
  },
  selectInput: {
    borderWidth: 1,
    borderRadius: 10,
    height: windowHeight(5.2),
    paddingHorizontal: windowWidth(3),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: color.lightGray,
    borderColor: color.appHeaderText,
  },
  selectInputEmpty: {
    borderColor: color.appHeaderText,
  },
  selectText: {
    color: color.regularText,
    fontFamily: fonts.regular,
    fontSize: fontSizes.rg,
  },
  selectTextPlaceholder: {
    color: color.placeholderText,
  },
  dateInputContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(2.5),
    flex: 1,
  },
  dateText: {
    flex: 1,
  },
  daysCard: {
    backgroundColor: color.lightGreen,
    borderRadius: 10,
    padding: windowWidth(3.5),
    marginTop: windowHeight(1),
    borderWidth: 1,
    borderColor: color.primary,
  },
  daysContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(3),
  },
  daysTextContainer: {
    flex: 1,
  },
  daysLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: color.placeholderText,
  },
  daysValue: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.semiBold,
    color: color.primary,
    marginTop: windowHeight(0.2),
  },

  buttonContainer: {
    padding: windowWidth(4),
    paddingTop: windowHeight(1),
    backgroundColor: color.whiteColor,
    borderTopWidth: 1,
    borderTopColor: color.lightGray,
  },
});
