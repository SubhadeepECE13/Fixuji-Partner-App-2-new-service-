
import { CameraView } from "expo-camera";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { useRef } from "react";
import { windowHeight, windowWidth } from "@/themes/Constants.themes";
import color from "@/themes/Colors.themes";

type Props = {
  visible: boolean;
  onClose: () => void;
  onCapture: (uri: string) => void;

};

export default function CaptureCamera({
  visible,
  onClose,
  onCapture,

}: Props) {
  const cameraRef = useRef<CameraView>(null);

  const capture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.6,
      skipProcessing: true,
    });

    if (photo?.uri) onCapture(photo.uri);
  };

  return (
    <View
      pointerEvents={visible ? "auto" : "none"}
      style={[
        styles.overlay,
        { opacity: visible ? 1 : 0 },
      ]}
    >
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="front"
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={capture} style={styles.captureBtn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    zIndex: 9999,
  },
  controls: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  captureBtn: {
    width: windowWidth(20),
    height: windowHeight(10),
    borderRadius: windowHeight(25),
    backgroundColor:color.primary,

  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
