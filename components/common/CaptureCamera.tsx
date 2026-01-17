
// import { CameraView } from "expo-camera";
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   Text,
// } from "react-native";
// import { useRef, useState } from "react";
// import { windowHeight, windowWidth } from "@/themes/Constants.themes";
// import color from "@/themes/Colors.themes";
// import Button from "./Button";
// import { CustomIcon } from "./Icon";

// type Props = {
//   visible: boolean;
//   onClose: () => void;
//   onCapture: (uri: string) => void;
//   facing?: "front" | "back";
//   showFlipButton?: boolean;
// };

// export default function CaptureCamera({
//   visible,
//   onClose,
//   onCapture,
//   facing = "front",            
//   showFlipButton = false,     
// }: Props) {
//   const cameraRef = useRef<CameraView>(null);
//   const [cameraFacing, setCameraFacing] =
//     useState<"front" | "back">(facing);

//   const capture = async () => {
//     if (!cameraRef.current) return;

//     const photo = await cameraRef.current.takePictureAsync({
//       quality: 0.6,
//       skipProcessing: true,
//     });

//     if (photo?.uri) onCapture(photo.uri);
//   };

//   const toggleCamera = () => {
//     setCameraFacing((prev) => (prev === "front" ? "back" : "front"));
//   };

//   return (
//     <View
//       pointerEvents={visible ? "auto" : "none"}
//       style={[
//         styles.overlay,
//         { opacity: visible ? 1 : 0 },
//       ]}
//     >
//       <CameraView
//         ref={cameraRef}
//         style={{ flex: 1 }}
//         facing={cameraFacing}
//       />

//       <View style={styles.controls}>
//        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
//   <CustomIcon
//     type="MaterialCommunityIcons"
//     name="close"
//     color="#fff"
//     size={26}
//   />
// </TouchableOpacity>

// <TouchableOpacity style={styles.captureBtn} onPress={capture}>
//   <CustomIcon
//     type="MaterialCommunityIcons"
//     name="camera"
//     color="#fff"
//     size={42}
//   />
// </TouchableOpacity>

// {showFlipButton ? (
//   <TouchableOpacity style={styles.flipBtn} onPress={toggleCamera}>
//     <CustomIcon
//       type="MaterialCommunityIcons"
//       name="camera-flip"
//       color="#fff"
//       size={26}
//     />
//   </TouchableOpacity>
// ) : (
//   <View style={{ width: 50 }} />
// )}

//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "black",
//     zIndex: 9999,
//   },
//   controls: {
//     position: "absolute",
//     bottom: 40,
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },
// captureBtn: {
//   width: windowWidth(20),
//   height: windowHeight(10),
//   borderRadius: windowHeight(25),
//   backgroundColor: color.primary, 
//   justifyContent: "center",
//   alignItems: "center",
// },

// flipBtn: {
//   width: windowWidth(10),
//   height: windowHeight(5),
//   borderRadius: windowHeight(25),
//   backgroundColor: "rgba(255,255,255,0.25)", 
//   justifyContent: "center",
//   alignItems: "center",
// },

// cancelBtn: {
//   width: windowWidth(10),
//   height: windowHeight(5),
//   borderRadius: windowHeight(25),
//   backgroundColor: color.red, 
//   justifyContent: "center",
//   alignItems: "center",
// },


//   text: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });
import { CameraView } from "expo-camera";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRef, useState } from "react";
import { windowHeight, windowWidth } from "@/themes/Constants.themes";
import color from "@/themes/Colors.themes";
import { CustomIcon } from "./Icon";

type Props = {
  visible: boolean;
  onClose: () => void;
  onCapture: (uri: string) => void;
  facing?: "front" | "back";
  showFlipButton?: boolean;
};

export default function CaptureCamera({
  visible,
  onClose,
  onCapture,
  facing = "front",
  showFlipButton = false,
}: Props) {
  const cameraRef = useRef<CameraView>(null);
  const [cameraFacing, setCameraFacing] =
    useState<"front" | "back">(facing);

  const [previewUri, setPreviewUri] = useState<string | null>(null);

  const capture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.6,
      skipProcessing: true,
    });

    if (photo?.uri) {
      setPreviewUri(photo.uri); // 🔥 show preview
    }
  };

  const confirmPhoto = () => {
    if (previewUri) {
      onCapture(previewUri);
      setPreviewUri(null);
    }
  };

  const retakePhoto = () => {
    setPreviewUri(null);
  };

  const toggleCamera = () => {
    setCameraFacing((prev) => (prev === "front" ? "back" : "front"));
  };

  return (
    <View
      pointerEvents={visible ? "auto" : "none"}
      style={[
        styles.overlay,
        { opacity: visible ? 1 : 0 },
      ]}
    >
      {/* 📸 CAMERA */}
      {!previewUri && (
        <>
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing={cameraFacing}
          />

          <View style={styles.controls}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <CustomIcon
                type="MaterialCommunityIcons"
                name="close"
                color="#fff"
                size={26}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureBtn} onPress={capture}>
              <CustomIcon
                type="MaterialCommunityIcons"
                name="camera"
                color="#fff"
                size={42}
              />
            </TouchableOpacity>

            {showFlipButton ? (
              <TouchableOpacity style={styles.flipBtn} onPress={toggleCamera}>
                <CustomIcon
                  type="MaterialCommunityIcons"
                  name="camera-flip"
                  color="#fff"
                  size={26}
                />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 50 }} />
            )}
          </View>
        </>
      )}

      {/* 🖼️ PREVIEW */}
 {previewUri && (
  <>
    <Image
      source={{ uri: previewUri }}
      style={[
        styles.preview,
        cameraFacing === "front" && styles.mirroredPreview,
      ]}
    />

    <View style={styles.controls}>
      <TouchableOpacity style={styles.cancelBtn} onPress={retakePhoto}>
        <CustomIcon
          type="MaterialCommunityIcons"
          name="refresh"
          color="#fff"
          size={26}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.captureBtn} onPress={confirmPhoto}>
        <CustomIcon
          type="MaterialCommunityIcons"
          name="check"
          color="#fff"
          size={36}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.flipBtn} onPress={onClose}>
        <CustomIcon
          type="MaterialCommunityIcons"
          name="close"
          color="#fff"
          size={26}
        />
      </TouchableOpacity>
    </View>
  </>
)}

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
  preview: {
    flex: 1,
    resizeMode: "cover",
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
    backgroundColor: color.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  flipBtn: {
    width: windowWidth(10),
    height: windowHeight(5),
    borderRadius: windowHeight(25),
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtn: {
    width: windowWidth(10),
    height: windowHeight(5),
    borderRadius: windowHeight(25),
    backgroundColor: color.red,
    justifyContent: "center",
    alignItems: "center",
  },
  mirroredPreview: {
  transform: [{ scaleX: -1 }],
},

});
