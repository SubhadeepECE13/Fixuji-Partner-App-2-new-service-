// import React, { useState } from "react";
// import { StyleSheet, Text, View, TextInput } from "react-native";
// import { router } from "expo-router";

// import Header from "@/components/common/Header";
// import Button from "@/components/common/Button";
// import { commonStyles } from "@/styles/common.style";
// import color from "@/themes/Colors.themes";
// import {
//   fontSizes,
//   windowHeight,
//   windowWidth,
// } from "@/themes/Constants.themes";
// import fonts from "@/themes/Fonts.themes";
// import SwipeButton from "@/components/common/SwipeButton";
// import Input from "@/components/common/Input";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { useForm } from "react-hook-form";

// interface FormData {
//   reedemAmount: number;
// }
// const WITHDRAWABLE_BALANCE = 12450;
// const MAX_WITHDRAWN = 300;
// const validationSchema = Yup.object().shape({
//   reedemAmount: Yup.number()
//     .positive()
//     .integer()
//     .max(MAX_WITHDRAWN)
//     .required("Amount is required"),
// });

// const handleSubmit = () => {
//   () => router.push("/reedem/processing");
// };
// const RedeemAmountScreen = () => {
//   const { control, handleSubmit, reset } = useForm<FormData>({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       reedemAmount: 0,
//     },
//   });

//   return (
//     <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
//       <Header isBack title="Redeem Amount" />

//       <View style={styles.card}>
//         <Text style={styles.label}>Withdrawable Balance</Text>
//         <Text style={styles.balance}>₹{WITHDRAWABLE_BALANCE}</Text>

//         <Text style={styles.inputLabel}>Enter Amount</Text>

//         <Input
//           keyboardType="numeric"
//           name="amount"
//           placeholder="Enter amount"
//           control={control}
//           inputStyle={styles.input}
//         />

//         <SwipeButton
//           title="Swipe to Redeem"
//           onSwipeSuccess={handleSubmit}
//           style={styles.swipeButton}
//           backgroundColor={color.primary}
//         />
//       </View>
//     </View>
//   );
// };

// export default RedeemAmountScreen;
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Header from "@/components/common/Header";
import SwipeButton from "@/components/common/SwipeButton";
import Input from "@/components/common/Input";
import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";
import fonts from "@/themes/Fonts.themes";

interface FormData {
  reedemAmount: number;
}

const WITHDRAWABLE_BALANCE = 12450;
const MAX_WITHDRAWN = 500;

const validationSchema = Yup.object().shape({
  reedemAmount: Yup.number()
    .typeError("Enter a valid amount")
    .positive("Amount must be greater than 0")
    .integer("Amount must be a whole number")
    .max(MAX_WITHDRAWN, `Maximum ₹${MAX_WITHDRAWN} allowed`)
    .required("Amount is required"),
});

const RedeemAmountScreen = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      reedemAmount: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Redeem Amount:", data.reedemAmount);
    router.push("/reedem/processing");
  };

  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <Header isBack title="Redeem Amount" />

      <View style={styles.card}>
        <Text style={styles.label}>Withdrawable Balance</Text>
        <Text style={styles.balance}>₹{WITHDRAWABLE_BALANCE}</Text>

        <Text style={styles.inputLabel}>Enter Amount</Text>

        <Input
          name="reedemAmount"
          control={control}
          keyboardType="numeric"
          placeholder="Enter amount"
          inputStyle={styles.input}
        />

        <SwipeButton
          title="Swipe to Redeem"
          onSwipeSuccess={handleSubmit(onSubmit)}
          style={styles.swipeButton}
          backgroundColor={color.buttonPrimary}
        />
      </View>
    </View>
  );
};

export default RedeemAmountScreen;

const styles = StyleSheet.create({
  card: {
    margin: windowWidth(5),
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: windowHeight(3),
  },

  label: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    color: color.primary,
  },

  balance: {
    fontSize: fontSizes.xl,
    fontFamily: fonts.bold,
    color: color.amountGreen,
    marginBottom: windowHeight(3),
  },

  inputLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    marginBottom: windowHeight(1),
  },

  input: {
    height: windowHeight(6),
    paddingHorizontal: 14,
    fontSize: fontSizes.md,
    marginBottom: windowHeight(4),
  },

  swipeButton: {
    height: windowHeight(6),
    width: windowWidth(80),
    borderRadius: windowHeight(3),
    alignSelf: "center",
  },
});
