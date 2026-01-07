import { SoundObject } from "expo-av/build/Audio";
import { ImageSourcePropType } from "react-native";

export type sounds = {
  paymentSuccess: SoundObject;
};

const Sounds: sounds = {
  paymentSuccess: require("../../assets/sounds/paymentSuccess.mp3"),
};
export default Sounds;
