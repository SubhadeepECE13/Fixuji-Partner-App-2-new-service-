import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import HeaderCard from "@/components/common/HeaderCard";
import Input from "@/components/common/Input";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Yup from "yup";

interface FormData {
  amount: number;
  reason: string;
}

export type PaymentHistory = {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: string;
  time?: string;
};

const PAYMENT_HISTORY: PaymentHistory[] = [
  {
    id: "1",
    title: "OD-260105-00007",
    date: "04 Jan 2026",
    amount: 850,
    status: "Completed",
    time: "10:20 AM",
  },
  {
    id: "2",
    title: "OD-260105-00006",
    date: "03 Jan 2026",
    amount: 1200,
    status: "Completed",
    time: "01:29 PM",
  },
  {
    id: "3",
    title: "OD-260105-00005",
    date: "02 Jan 2026",
    amount: 3000,
    status: "Processed",
    time: "01:29 PM",
  },
  {
    id: "4",
    title: "OD-260105-00005",
    date: "02 Jan 2026",
    amount: 3000,
    status: "Processed",
    time: "01:29 PM",
  },
  {
    id: "5",
    title: "OD-260105-00005",
    date: "02 Jan 2026",
    amount: 3000,
    status: "Processed",
    time: "01:29 PM",
  },
];

const leaveBalance = {
  total: 2000,
  used: 1200,
  available: 200,
};

const maxLoanAmount = 200;

const applyLoanValidationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .min(1, "Amount must be at least 1")
    .max(
      maxLoanAmount,
      ({ max }) => `You cannot apply more than ${max} rupees`
    ),
  reason: Yup.string()
    .required("Reason is required")
    .min(10, "Reason must be at least 10 characters"),
});

const ApplyLoanScreen = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(applyLoanValidationSchema),
    defaultValues: {
      amount: 0,
      reason: "",
    },
  });

  const onSubmit = () => {
    router.push("/(routes)/reedem");
  };

  const renderItem = ({ item }: { item: PaymentHistory }) => (
    <View style={styles.historyItem}>
      <View>
        <Text style={styles.historyTitle}>{item.title}</Text>
        <Text style={styles.historySub}>
          {item.date} • {item.time}
        </Text>
      </View>

      <Text style={styles.historyAmount}>₹{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Apply Loan" isBack isRightIcon />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <HeaderCard
          items={[
            { label: "Total", value: leaveBalance.total },
            { label: "Used", value: leaveBalance.used },
            { label: "Available", value: leaveBalance.available },
          ]}
        />

        <View style={styles.listWrapper}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.sectionTitle}>Loan History</Text>
            <Button
              title="Details"
              onPress={() => router.push("/(routes)/loanDetails")}
              width={windowWidth(20)}
              height={windowHeight(4)}
              titleStyle={{ fontSize: fontSizes.rg }}
            />
          </View>
          <FlatList
            data={PAYMENT_HISTORY}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.listContent}
          />
        </View>

        <View style={styles.formCard}>
          <Input
            control={control}
            name="amount"
            placeholder="Enter Amount"
            title="Amount"
            keyboardType="decimal-pad"
            titleStyle={{ fontSize: fontSizes.sm }}
          />

          <Input
            control={control}
            name="reason"
            placeholder="Enter reason for loan"
            title="Reason"
            titleStyle={{ fontSize: fontSizes.sm }}
          />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <Button
          title="Submit Loan Application"
          backgroundColor={color.primary}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default ApplyLoanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  keyboardView: {
    flex: 1,
    padding: windowWidth(4),
  },

  listWrapper: {
    flex: 1,
    marginVertical: windowHeight(1),
  },

  listContent: {
    paddingBottom: windowHeight(1),
  },

  historyItem: {
    backgroundColor: color.whiteColor,
    borderRadius: 10,
    padding: windowWidth(4),
    marginBottom: windowHeight(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  historyTitle: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.semiBold,
    color: color.titleText,
  },

  historySub: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: color.placeholderText,
    marginTop: windowHeight(0.3),
  },

  historyAmount: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.semiBold,
    color: color.warningText,
  },

  formCard: {
    backgroundColor: color.whiteColor,
    borderRadius: 12,
    padding: windowWidth(3),
    flexShrink: 0,
    marginBottom: windowHeight(1),
  },

  sectionTitle: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.semiBold,
    color: color.primary,
    marginBottom: windowHeight(2),
  },

  buttonContainer: {
    padding: windowWidth(4),
    borderTopWidth: 1,
    borderTopColor: color.lightGray,
    backgroundColor: color.whiteColor,
  },
});
