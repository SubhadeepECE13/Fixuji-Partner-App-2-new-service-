// import * as Location from "expo-location";
// import React, { createContext, useContext, useEffect, useRef, useState } from "react";

// type Coordinates = {
//   latitude: number;
//   longitude: number;
//   latitudeDelta: number;
//   longitudeDelta: number;
// };

// type LocationContextType = {
//   location: Coordinates | null;
//   isLocationReady: boolean;
// };

// const LocationContext = createContext<LocationContextType>({
//   location: null,
//   isLocationReady: false,
// });

// export const useAppLocation = () => useContext(LocationContext);

// export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [location, setLocation] = useState<Coordinates | null>(null);
//   const [isLocationReady, setIsLocationReady] = useState(false);

//   const lastUpdateRef = useRef<number>(0); // ⏱ throttle

//   useEffect(() => {
//     let subscription: Location.LocationSubscription | null = null;

//     const startLocation = async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") return;

//       subscription = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High,
//           timeInterval: 5000,     
//           distanceInterval: 10,   
//         },
//         (loc) => {
//           const now = Date.now();
//           if (now - lastUpdateRef.current < 4000) return; 
//           lastUpdateRef.current = now;

//           const coords = {
//             latitude: loc.coords.latitude,
//             longitude: loc.coords.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           };

//           setLocation(coords);
//           setIsLocationReady(true);
//         }
//       );
//     };

//     startLocation();
//     return () => subscription?.remove();
//   }, []);

//   return (
//     <LocationContext.Provider value={{ location, isLocationReady }}>
//       {children}
//     </LocationContext.Provider>
//   );
// };
import * as Location from "expo-location";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Coordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type LocationContextType = {
  location: Coordinates | null;
  isLocationReady: boolean;
  setHighAccuracy: (v: boolean) => void;
};

const LocationContext = createContext<LocationContextType>({
  location: null,
  isLocationReady: false,
  setHighAccuracy: () => {},
});

export const useAppLocation = () => useContext(LocationContext);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [isLocationReady, setIsLocationReady] = useState(false);
  const [highAccuracy, setHighAccuracy] = useState(false);

  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  const startWatcher = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    subscriptionRef.current?.remove();

    subscriptionRef.current = await Location.watchPositionAsync(
      {
        accuracy: highAccuracy
          ? Location.Accuracy.Highest
          : Location.Accuracy.Balanced,
        timeInterval: highAccuracy ? 1000 : 5000, // ⏱
        distanceInterval: highAccuracy ? 1 : 15,  // 📍
      },
      (loc) => {
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setIsLocationReady(true);
      }
    );
  };

  useEffect(() => {
    startWatcher();
    return () => subscriptionRef.current?.remove();
  }, [highAccuracy]);

  return (
    <LocationContext.Provider
      value={{ location, isLocationReady, setHighAccuracy }}
    >
      {children}
    </LocationContext.Provider>
  );
};
