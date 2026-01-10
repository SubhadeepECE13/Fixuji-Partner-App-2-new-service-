// import Images from "@/utils/images";
// import { MaterialIcons } from "@expo/vector-icons";
// import * as Location from "expo-location";
// import haversine from "haversine-distance";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   DimensionValue,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import MapView, {
//   Circle,
//   Marker,
//   PROVIDER_GOOGLE,
//   Region,
// } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
// import Animated, { ZoomIn } from "react-native-reanimated";
// import CustomSkeletonLoader from "./CustomSkeletonLoader";
// import { CustomIcon } from "./Icon";
// import color from "@/themes/Colors.themes";
// export type Coordinates = {
//   latitude: number;
//   longitude: number;
//   latitudeDelta: number;
//   longitudeDelta: number;
// };
// interface MyMapProps {
//   height: DimensionValue;
//   markerCoordinate?: Coordinates;
//   radius?: number;
//   setDistance?: (distance: number) => void;
//   setLocation?: (laction: Coordinates) => void;
// }

// const Map: React.FC<MyMapProps> = ({
//   height,
//   markerCoordinate,
//   radius,
//   setDistance,
//   setLocation,
// }) => {
//   const mapRef = useRef<MapView>(null);
//   const [currentLocation, setCurrentLocation] = useState<
//     Coordinates | undefined
//   >(undefined);
//   const [isLocationLoaded, setIsLocationLoaded] = useState(false);

//   useEffect(() => {
//     let subscription: Location.LocationSubscription | null = null;

//     const startWatchingLocation = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       subscription = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High,
//           timeInterval: 5000, // Update every 10 seconds
//           distanceInterval: 2, // Update when moved 50 meters
//         },
//         (location) => {
//           const newLocation = {
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           };
//           setCurrentLocation(newLocation);
//           if (setLocation) {
//             setLocation(newLocation);
//           }
//           setIsLocationLoaded(true);
//         }
//       );
//     };

//     startWatchingLocation();

//     return () => {
//       if (subscription) {
//         subscription.remove();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (mapRef.current && currentLocation && markerCoordinate) {
//       mapRef.current.fitToCoordinates([currentLocation, markerCoordinate], {
//         edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
//         animated: true,
//       });
//     }
//   }, [markerCoordinate, currentLocation]);

//   useEffect(() => {
//     if (currentLocation && markerCoordinate && setDistance) {
//       const distance = haversine(currentLocation, markerCoordinate);
//       setDistance(distance);
//     }
//   }, [currentLocation, markerCoordinate]);

//   return (
//     <View style={{ height: height, width: "100%" }}>
//       {isLocationLoaded ? (
//         <Animated.View
//           style={{ height: "100%", width: "100%" }}
//           entering={ZoomIn.delay(250).damping(10).stiffness(200)}
//         >
//           <MapView
//             ref={mapRef}
//             pitchEnabled={false}
//             style={{ flex: 1, borderRadius: 15 }}
//             initialRegion={currentLocation}
//             provider={PROVIDER_GOOGLE}
//             showsMyLocationButton={true}
//             showsCompass={false}
//             showsIndoors={false}
//             showsIndoorLevelPicker={false}
//             showsTraffic={false}
//             showsScale={false}
//             showsBuildings={false}
//             showsPointsOfInterest={false}
//             showsUserLocation={true}
//           >
//             {markerCoordinate && radius && (
//               <>
//                 <Marker
//                   coordinate={markerCoordinate}
//                   title="Selected Location"
//                 />
//                 <Circle
//                   center={markerCoordinate}
//                   radius={radius}
//                   strokeColor={color.primary}
//                   fillColor={color.fadedPrimary}
//                 />
//               </>
//             )}

//             {currentLocation && (
//               <Marker coordinate={currentLocation} title="My Location" />
//             )}

//             {currentLocation && markerCoordinate && (
//               <MapViewDirections
//                 origin={currentLocation}
//                 destination={markerCoordinate}
//                 apikey={process.env.EXPO_PUBLIC_MAP_API_KEY as string}
//                 strokeWidth={4}
//                 strokeColor="blue"
//                 optimizeWaypoints={true}
//               />
//             )}
//           </MapView>
//         </Animated.View>
//       ) : (
//         <CustomSkeletonLoader dWidth={"100%"} dHeight={height} radius={15} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   gpsButton: {
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//     backgroundColor: "white",
//     padding: 10,
//     borderRadius: 50,
//     elevation: 5,
//   },
// });

// export default Map;

import * as Location from "expo-location";
import haversine from "haversine-distance";
import React, { useEffect, useRef, useState } from "react";
import { DimensionValue, Platform, StyleSheet, View } from "react-native";
import MapView, {
  Circle,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Animated, { ZoomIn } from "react-native-reanimated";
import CustomSkeletonLoader from "./CustomSkeletonLoader";
import color from "@/themes/Colors.themes";

export type Coordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

interface MyMapProps {
  height: DimensionValue;
  markerCoordinate?: Coordinates;
  radius?: number;
  setDistance?: (distance: number) => void;
  setLocation?: (location: Coordinates) => void;
}

const Map: React.FC<MyMapProps> = ({
  height,
  markerCoordinate,
  radius,
  setDistance,
  setLocation,
}) => {
  const mapRef = useRef<MapView>(null);
  const [currentLocation, setCurrentLocation] = useState<Coordinates>();
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startWatchingLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 2,
        },
        (location) => {
          const loc = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setCurrentLocation(loc);
          setLocation?.(loc);
          setIsLocationLoaded(true);
        }
      );
    };

    startWatchingLocation();
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (currentLocation && markerCoordinate && setDistance) {
      setDistance(haversine(currentLocation, markerCoordinate));
    }
  }, [currentLocation, markerCoordinate]);

  return (
    <View style={{ height, width: "100%" }}>
      {isLocationLoaded ? (
        <Animated.View style={{ flex: 1 }} entering={ZoomIn.delay(250)}>
          <MapView
            ref={mapRef}
            style={{ flex: 1, borderRadius: 15 }}
            initialRegion={currentLocation}
            provider={
              Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
            }
            showsUserLocation
          >
            {markerCoordinate && (
              <>
                <Marker coordinate={markerCoordinate} />
                {radius && (
                  <Circle
                    center={markerCoordinate}
                    radius={radius}
                    strokeColor={color.primary}
                    fillColor={color.fadedPrimary}
                  />
                )}
              </>
            )}
            {currentLocation && (
              <Marker coordinate={currentLocation} title="My Location" />
            )}

            {currentLocation && markerCoordinate && (
              <MapViewDirections
                origin={currentLocation}
                destination={markerCoordinate}
                apikey={process.env.EXPO_PUBLIC_MAP_API_KEY!}
                strokeWidth={4}
                strokeColor="blue"
              />
            )}
          </MapView>
        </Animated.View>
      ) : (
        <CustomSkeletonLoader dWidth="100%" dHeight={height} radius={15} />
      )}
    </View>
  );
};

export default Map;
const styles = StyleSheet.create({
  gpsButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
});
