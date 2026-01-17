
// import React, { useRef } from "react";
// import { DimensionValue, Platform, View } from "react-native";
// import MapView, {
//   Circle,
//   Marker,
//   PROVIDER_DEFAULT,
//   PROVIDER_GOOGLE,
// } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
// import Animated, { ZoomIn } from "react-native-reanimated";

// import CustomSkeletonLoader from "./CustomSkeletonLoader";
// import color from "@/themes/Colors.themes";
// import { useAppLocation } from "@/context/LocationContext";

// interface MyMapProps {
//   height: DimensionValue;
//   markerCoordinate?: {
//     latitude: number;
//     longitude: number;
//   };
//   radius?: number;
//   setDistance?: (distance: number) => void;
//   onMapReady: () => void;
// }

// const Map: React.FC<MyMapProps> = ({
//   height,
//   markerCoordinate,
//   radius,
//   setDistance,
//   onMapReady,
// }) => {
//   const mapRef = useRef<MapView>(null);
//   const { location, isLocationReady } = useAppLocation();

//   if (!isLocationReady || !location) {
//     return <CustomSkeletonLoader dWidth="100%" dHeight={height} radius={15} />;
//   }

//   return (
//     <View style={{ height, width: "100%" }}>
//       <Animated.View style={{ flex: 1 }} entering={ZoomIn.delay(250)}>
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1, borderRadius: 15 }}
//           initialRegion={location}
//           onMapReady={onMapReady}
//           provider={
//             Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
//           }
//           showsUserLocation
//         >
//           {markerCoordinate && (
//             <>
//               <Marker coordinate={markerCoordinate} />
//               {radius && (
//                 <Circle
//                   center={markerCoordinate}
//                   radius={radius}
//                   strokeColor={color.primary}
//                   fillColor={color.fadedPrimary}
//                 />
//               )}
//             </>
//           )}

//           {location && (
//             <Marker coordinate={location} title="My Location" />
//           )}

//           {location && markerCoordinate && (
//             <MapViewDirections
//               origin={location}
//               destination={markerCoordinate}
//               apikey={process.env.EXPO_PUBLIC_MAP_API_KEY!}
//               strokeWidth={4}
//               strokeColor="blue"
//             />
//           )}
//         </MapView>
//       </Animated.View>
//     </View>
//   );
// };

// export default Map;
import React, { useRef } from "react";
import { DimensionValue, Platform, View } from "react-native";
import MapView, {
  Circle,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import Animated, { ZoomIn } from "react-native-reanimated";

import CustomSkeletonLoader from "./CustomSkeletonLoader";
import color from "@/themes/Colors.themes";
import { useAppLocation } from "@/context/LocationContext";

interface MyMapProps {
  height: DimensionValue;
  radius?: number;
  onMapReady: () => void;
}

const Map: React.FC<MyMapProps> = ({ height, radius, onMapReady }) => {
  const mapRef = useRef<MapView>(null);
  const { location, isLocationReady } = useAppLocation();

  if (!isLocationReady || !location) {
    return <CustomSkeletonLoader dWidth="100%" dHeight={height} radius={15} />;
  }

  return (
    <View style={{ height, width: "100%" }}>
      <Animated.View style={{ flex: 1 }} entering={ZoomIn.delay(200)}>
        <MapView
          ref={mapRef}
          style={{ flex: 1, borderRadius: 15 }}
          initialRegion={location}
          onMapReady={onMapReady}
          showsUserLocation
          provider={
            Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
        >
          {radius && (
            <Circle
              center={location}
              radius={radius}
              strokeColor={color.primary}
              fillColor={color.fadedPrimary}
            />
          )}

          <Marker coordinate={location} title="Current Location" />
        </MapView>
      </Animated.View>
    </View>
  );
};

export default Map;
