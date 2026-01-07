import { AnimationObject } from "lottie-react-native";
import { ImageSourcePropType } from "react-native";

export type images = {
  //   dashboardHero: ImageSourcePropType;
  //   calculator: ImageSourcePropType;
  //   location: ImageSourcePropType;
  //   logo: ImageSourcePropType;
  //   attendence: ImageSourcePropType;
  //   expenses: ImageSourcePropType;
  //   distributors: ImageSourcePropType;
  //   files: ImageSourcePropType;
  //   packageBox: ImageSourcePropType;
  //   people: ImageSourcePropType;
  //   receipt: ImageSourcePropType;
  //   return: ImageSourcePropType;
  //   sales: ImageSourcePropType;
  //   success: ImageSourcePropType;
  //   successTick: ImageSourcePropType;
  //   error: ImageSourcePropType;
  //   transaction: ImageSourcePropType;
  onBoarding: ImageSourcePropType;
  Orders: ImageSourcePropType;
  notFound: ImageSourcePropType;
  update: AnimationObject;
  profile: ImageSourcePropType;
  payments: ImageSourcePropType;
  carDetail: ImageSourcePropType;
  rupees: ImageSourcePropType;
  commison: ImageSourcePropType;
  successPayment: ImageSourcePropType;
  failedPayment: ImageSourcePropType;
  logo: ImageSourcePropType;
};

const Images: images = {
  //   dashboardHero: require("../../assets/images/dashboardHero.png"),
  //   calculator: require("../../assets/images/calculator.png"),
  //   location: require("../../assets/images/location.png"),
  //   logo: require("../../assets/images/logo.png"),
  //   attendence: require("../../assets/images/attendence.png"),
  //   expenses: require("../../assets/images/expenses.png"),
  //   distributors: require("../../assets/images/distributors.png"),
  //   files: require("../../assets/images/files.png"),
  //   packageBox: require("../../assets/images/package-box.png"),
  //   people: require("../../assets/images/people.png"),
  //   receipt: require("../../assets/images/receipt.png"),
  //   return: require("../../assets/images/return.png"),
  //   success: require("../../assets/images/success.png"),
  //   successTick: require("../../assets/images/success-tick.png"),
  //   error: require("../../assets/images/error.png"),
  //   transaction: require("../../assets/images/transaction.png"),

  onBoarding: require("../../assets/images/FixujiGo.jpg"),
  Orders: require("../../assets/images/carBooking.png"),
  notFound: require("../../assets/images/notFound.png"),
  update: require("../../assets/lottie/update.json"),
  profile: require("../../assets/images/profile.png"),
  payments: require("../../assets/images/payments.png"),
  carDetail: require("../../assets/images/cardetail.jpg"),
  rupees: require("../../assets/images/rupees.png"),
  commison: require("../../assets/images/commison.png"),
  successPayment: require("../../assets/images/successPayment.png"),
  logo: require("../../assets/images/fixuji-logo.png"),
  failedPayment: require("../../assets/images/failedPaid.png"),
};
export default Images;
