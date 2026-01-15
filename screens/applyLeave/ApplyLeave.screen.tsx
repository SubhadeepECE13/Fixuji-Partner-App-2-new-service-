import { applyLeaveValidationSchema } from "@/components/applyLeave/applyLeave.validation";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import { CustomIcon } from "@/components/common/Icon";
import Input from "@/components/common/Input";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { calculateDays } from "@/utils/Helpers";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { getFormatedDate } from "react-native-modern-datepicker";
import Toast from "react-native-toast-message";

import DatePickerBottomSheet from "@/components/applyLeave/DatePickerBottomSheet";
import SelectBottomSheet from "@/components/applyLeave/SelectBottomSheet";
import HeaderCard from "@/components/common/HeaderCard";
import CustomSkeletonLoader from "@/components/common/CustomSkeletonLoader";
import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
import {
  applyLeaveApi,
  getLeaveBalanceByVendorIdAndFinancialYear,
  getLeaveType,
} from "@/store/actions/leave/leave.actions";
import { resetLeaveState } from "@/store/reducers/leave/leaveSlice";
import { useEffect } from "react";

interface FormData {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  halfDays?: string[];
}

const ApplyLeaveScreen = () => {
  const dispatch = useAppDispatch();
  const { loading, success, error, leaveTypes, leaveBalance } = useAppSelector(
    (state) => state.leave
  );
  const { user } = useAppSelector((state) => state.user);

  const leaveTypeSheetRef = useRef<BottomSheetModal>(null);
  const [activeDatePicker, setActiveDatePicker] = useState<
    "start" | "end" | null
  >(null);
  const [selectedLeaveType, setSelectedLeaveType] = useState<any>(null);
  const [halfDayDates, setHalfDayDates] = useState<{
    [key: string]: "first" | "second";
  }>({});
  const [loadingBalance, setLoadingBalance] = useState(false);

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
    setActiveDatePicker(null);
    if (endDate && dayjs(date).isAfter(dayjs(endDate))) {
      setValue("endDate", "");
    }
  };

  const handleEndDateChange = (date: string) => {
    setValue("endDate", date);
    setActiveDatePicker(null);
  };

  const handleLeaveTypeSelect = async (value: string) => {
    const selectedType = leaveTypes.find(
      (type) => type.id.toString() === value
    );
    setValue("leaveType", selectedType?.value || value);
    setSelectedLeaveType(selectedType);
    setHalfDayDates({});

    if (selectedType && user?.id) {
      setLoadingBalance(true);
      const currentYear = new Date().getFullYear();
      await dispatch(
        getLeaveBalanceByVendorIdAndFinancialYear(
          user.id,
          selectedType.id,
          currentYear
        )
      );
      setLoadingBalance(false);
    }

    leaveTypeSheetRef.current?.dismiss();
  };

  useEffect(() => {
    dispatch(getLeaveType());
  }, []);

  useEffect(() => {
    if (leaveTypes.length > 0 && !selectedLeaveType && user?.id) {
      const firstLeaveType = leaveTypes[0];
      setValue("leaveType", firstLeaveType.value);
      setSelectedLeaveType(firstLeaveType);

      setLoadingBalance(true);
      const currentYear = new Date().getFullYear();
      dispatch(
        getLeaveBalanceByVendorIdAndFinancialYear(
          user.id,
          firstLeaveType.id,
          currentYear
        )
      ).finally(() => setLoadingBalance(false));
    }
  }, [leaveTypes, user]);

  useEffect(() => {
    if (success) {
      Toast.show({ type: "success", text1: success });
      dispatch(resetLeaveState());
      setValue("leaveType", "");
      setValue("startDate", "");
      setValue("endDate", "");
      setValue("reason", "");
      setHalfDayDates({});

      if (leaveTypes.length > 0 && user?.id) {
        const firstLeaveType = leaveTypes[0];
        setValue("leaveType", firstLeaveType.value);
        setSelectedLeaveType(firstLeaveType);

        setLoadingBalance(true);
        const currentYear = new Date().getFullYear();
        dispatch(
          getLeaveBalanceByVendorIdAndFinancialYear(
            user.id,
            firstLeaveType.id,
            currentYear
          )
        ).finally(() => setLoadingBalance(false));
      }
    }
    if (error) {
      Toast.show({ type: "error", text1: error });
      dispatch(resetLeaveState());
    }
  }, [success, error]);

  const onSubmit = async (data: FormData) => {
    if (!user?.id) {
      Toast.show({ type: "error", text1: "User information not found" });
      return;
    }

    const leaveTypeValue = leaveTypes.find(
      (type) => type.value === data.leaveType
    )?.id;

    if (!leaveTypeValue) {
      Toast.show({ type: "error", text1: "Please select a valid leave type" });
      return;
    }

    const payload: any = {
      vendorId: user.id,
      leaveTypeId: leaveTypeValue,
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
    };

    if (
      selectedLeaveType?.allowHalfDay &&
      Object.keys(halfDayDates).length > 0
    ) {
      payload.halfDays = Object.keys(halfDayDates);
    }

    await dispatch(applyLeaveApi(payload));
  };

  const leaveBalanceData = leaveBalance[0] || null;
  const balanceInfo = {
    total: leaveBalanceData?.quantity || 0,
    used: 0,
    available: leaveBalanceData?.quantity || 0,
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
          {loadingBalance ? (
            <CustomSkeletonLoader
              dWidth={"100%"}
              dHeight={windowHeight(15)}
              radius={windowWidth(1)}
            />
          ) : (
            <HeaderCard
              items={[
                { label: "Total", value: balanceInfo.total },
                { label: "Used", value: balanceInfo.used },
                { label: "Available", value: balanceInfo.available },
              ]}
            />
          )}

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
              onSelectPress={() => setActiveDatePicker("start")}
            />
            <DatePickerBottomSheet
              title="Select Start Date"
              visible={activeDatePicker === "start"}
              selectedDate={startDate || today}
              minimumDate={today}
              onDateChange={handleStartDateChange}
              onClose={() => setActiveDatePicker(null)}
            />
            <Input
              control={control}
              name="endDate"
              title="End Date"
              placeholder="Select End Date"
              type="select"
              onSelectPress={() => setActiveDatePicker("end")}
            />
            <DatePickerBottomSheet
              title="Select End Date"
              visible={activeDatePicker === "end"}
              selectedDate={endDate || startDate || today}
              minimumDate={startDate || today}
              onDateChange={handleEndDateChange}
              onClose={() => setActiveDatePicker(null)}
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

            {selectedLeaveType?.allowHalfDay && startDate && endDate && (
              <View style={styles.halfDayContainer}>
                <View style={styles.halfDayHeader}>
                  <CustomIcon
                    type="MaterialCommunityIcons"
                    name="clock-outline"
                    size={windowHeight(2.2)}
                    color={color.primary}
                  />
                  <Text style={styles.halfDayTitle}>
                    Half Day Selection (Optional)
                  </Text>
                </View>
                {Array.from({ length: daysCount }, (_, i) => {
                  const date = dayjs(startDate)
                    .add(i, "day")
                    .format("YYYY-MM-DD");
                  const selectedHalf = halfDayDates[date];
                  return (
                    <View key={date} style={styles.halfDayItem}>
                      <Text style={styles.halfDayDate}>
                        {dayjs(date).format("DD MMM YYYY")}
                      </Text>
                      <View style={styles.halfDayOptions}>
                        <TouchableOpacity
                          style={styles.checkboxContainer}
                          onPress={() => {
                            if (selectedHalf === "first") {
                              const newDates = { ...halfDayDates };
                              delete newDates[date];
                              setHalfDayDates(newDates);
                            } else {
                              setHalfDayDates({
                                ...halfDayDates,
                                [date]: "first",
                              });
                            }
                          }}
                        >
                          <View
                            style={[
                              styles.checkbox,
                              selectedHalf === "first" &&
                                styles.checkboxChecked,
                            ]}
                          >
                            {selectedHalf === "first" && (
                              <CustomIcon
                                type="MaterialCommunityIcons"
                                name="check"
                                size={windowHeight(1.8)}
                                color={color.whiteColor}
                              />
                            )}
                          </View>
                          <Text style={styles.checkboxLabel}>First Half</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.checkboxContainer}
                          onPress={() => {
                            if (selectedHalf === "second") {
                              const newDates = { ...halfDayDates };
                              delete newDates[date];
                              setHalfDayDates(newDates);
                            } else {
                              setHalfDayDates({
                                ...halfDayDates,
                                [date]: "second",
                              });
                            }
                          }}
                        >
                          <View
                            style={[
                              styles.checkbox,
                              selectedHalf === "second" &&
                                styles.checkboxChecked,
                            ]}
                          >
                            {selectedHalf === "second" && (
                              <CustomIcon
                                type="MaterialCommunityIcons"
                                name="check"
                                size={windowHeight(1.8)}
                                color={color.whiteColor}
                              />
                            )}
                          </View>
                          <Text style={styles.checkboxLabel}>Second Half</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
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
            disabled={loading}
          />
        </View>
      </KeyboardAvoidingView>
      <SelectBottomSheet
        ref={leaveTypeSheetRef}
        data={leaveTypes.map((type) => ({
          label: type.value,
          value: type.id.toString(),
        }))}
        selectedLabel={leaveType}
        onSelect={handleLeaveTypeSelect}
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
    marginTop: windowHeight(2),
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
    borderRadius: 12,
    padding: windowWidth(4),
    marginTop: windowHeight(2),
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
  halfDayContainer: {
    marginTop: windowHeight(2),
    backgroundColor: color.whiteColor,
    borderRadius: 12,
    padding: windowWidth(4),
    borderWidth: 1,
    borderColor: color.lightGray,
  },
  halfDayHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(2),
    marginBottom: windowHeight(2),
  },
  halfDayTitle: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.semiBold,
    color: color.titleText,
  },
  halfDayItem: {
    paddingVertical: windowHeight(1.5),
    borderBottomWidth: 1,
    borderBottomColor: color.lightGray,
  },
  halfDayDate: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.medium,
    color: color.titleText,
    marginBottom: windowHeight(1),
  },
  halfDayOptions: {
    flexDirection: "row",
    gap: windowWidth(6),
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth(2),
  },
  checkbox: {
    width: windowWidth(5),
    height: windowWidth(5),
    borderRadius: windowWidth(1),
    borderWidth: 2,
    borderColor: color.appHeaderText,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.whiteColor,
  },
  checkboxChecked: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },
  checkboxLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: color.regularText,
  },
});
