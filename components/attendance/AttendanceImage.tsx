// import { windowWidth } from "@/themes/Constants.themes";
// import Images from "@/utils/images";
// import React, { memo, useMemo, useState } from "react";
// import { Image, ImageProps, Text, View } from "react-native";

// interface CustomeImageProps extends Omit<ImageProps, "source" | "onError"> {
//   imageUrl: string;
//   onErrorHandler?: () => unknown;
// }

// const AttendanceImage = ({
//   imageUrl,
//   onErrorHandler,
//   height = windowWidth(30),
//   width = windowWidth(30),
//   borderRadius = 5,
//   style,
//   ...rest
// }: CustomeImageProps) => {
//   const [error, setError] = useState<boolean>(false);
//   const [loading, setloading] = useState<boolean>(true);

//   const normalizedUrl = useMemo(
//     () =>
//       imageUrl?.startsWith("gs://")
//         ? imageUrl.replace("gs://", "https://")
//         : imageUrl,
//     [imageUrl]
//   );

//   return (
//     <View style={{ height, width, borderRadius: borderRadius }}>
//       <Image
//         source={error || loading ? Images.profile : { uri: normalizedUrl }}
//         style={[{ height, width, borderRadius: borderRadius }, style]}
//         onError={() => {
//           setError(true);
//           onErrorHandler?.();
//         }}
//         onLoadEnd={() => {
//           setloading(false);
//         }}
//         {...rest}
//       />
//     </View>
//   );
// };

// export default memo(AttendanceImage);
import { windowWidth } from "@/themes/Constants.themes";
import Images from "@/utils/images";
import { Image, ImageErrorEventData } from "expo-image";
import React, { memo, useEffect, useMemo, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface AttendanceImageProps {
  imageUrl?: string | null;
  height?: number;
  width?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  blurhash?: string;
  fallbackImage?: any;
  onErrorHandler?: () => void;
}

const DEFAULT_BLURHASH = "LEHV6nWB2yk8pyo0adR*.7kCMdnj";

const AttendanceImage = ({
  imageUrl,
  height = windowWidth(30),
  width = windowWidth(30),
  borderRadius = 5,
  style,
  blurhash = DEFAULT_BLURHASH,
  fallbackImage = Images.profile,
  onErrorHandler,
}: AttendanceImageProps) => {
  const [failed, setFailed] = useState(false);

  const normalizedUri = useMemo(() => {
    if (!imageUrl) return null;
    return imageUrl.startsWith("gs://")
      ? imageUrl.replace("gs://", "https://")
      : imageUrl;
  }, [imageUrl]);

  const source = useMemo(() => {
    if (!normalizedUri || failed) {
      return fallbackImage;
    }
    return { uri: normalizedUri };
  }, [normalizedUri, failed, fallbackImage]);

  useEffect(() => {
    setFailed(false);
  }, [imageUrl]);

  const handleError = (_e: ImageErrorEventData) => {
    if (!failed) {
      setFailed(true);
      onErrorHandler?.();
    }
  };

  return (
    <View
      style={[
        {
          height,
          width,
          borderRadius,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Image
        source={source}
        style={{ width: "100%", height: "100%" }}
        placeholder={{ blurhash }}
        cachePolicy="memory-disk"
        contentFit="cover"
        transition={200}
        onError={handleError}
      />
    </View>
  );
};

export default memo(AttendanceImage);
