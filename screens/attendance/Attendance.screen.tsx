// import React, { useCallback, useMemo, useState } from "react";
// import { ScrollView, Text, View } from "react-native";
// import { useDispatch } from "react-redux";
// import { useFocusEffect } from "expo-router";

// import CheckInOut from "@/components/attendance/CheckInOut";
// import AttendancePunchCard from "@/components/attendance/AttendancePunchCard";
// import CaptureCamera from "@/components/common/CaptureCamera";
// import Button from "@/components/common/Button";
// import Chip from "@/components/common/CommonChip";
// import Header from "@/components/common/Header";
// import Map from "@/components/common/Map";

// import { commonStyles } from "@/styles/common.style";
// import styles from "./Style";
// import color from "@/themes/Colors.themes";
// import { windowHeight, windowWidth } from "@/themes/Constants.themes";

// import { router } from "expo-router";
// import { useAppSelector } from "@/store/Reduxhook";
// import { submitAttendance } from "@/store/reducers/checkin-checkout/checkinCheckoutSlice";
// import { useAppLocation } from "@/context/LocationContext";
// import { reverseGeocode } from "@/utils/location/ReverseGeocode";
// import { mapSegmentsToPunches } from "@/store/actions/attendance/attendance.mapper";
// import { getAttendance } from "@/store/actions/attendance/attendance.actions";

// const STATIC_REGIONS = [
//   { id: "1", name: "Site A", radius: 30 },
//   { id: "2", name: "Site B", radius: 40 },
// ];

// // 🔥 Memoized Map (CRITICAL)
// const MemoMap = React.memo(Map);

// const AttendanceScreen = () => {
//   const dispatch = useDispatch();

//   const { user } = useAppSelector((state) => state.user);
//   const { todayAttendance } = useAppSelector((state) => state.attendance);

//   const { setHighAccuracy, location } = useAppLocation();

//   const [openCamera, setOpenCamera] = useState(false);
//   const [isOn, setIsOn] = useState(false);
//   const [isCheckedOut, setIsCheckedOut] = useState(false);
//   const [isDisabled, setIsDisabled] = useState(true);

//   const [selectedRegion, setSelectedRegion] = useState<any>();
//   const [selectedRegionName, setSelectedRegionName] = useState<string>();
//   const [isMapReady, setIsMapReady] = useState(false);
//   const [showMap, setShowMap] = useState(false);

//   /* ---------------------------------- */
//   /* 🔥 Navigation-safe API call */
//   /* ---------------------------------- */
//   useFocusEffect(
//     useCallback(() => {
//       if (!user?.id) return;
//       if (!todayAttendance) {
//         dispatch(getAttendance(user.id) as any);
//       }

//       // Delay map mount AFTER navigation completes
//       const t = setTimeout(() => setShowMap(true), 250);

//       return () => {
//         clearTimeout(t);
//         setHighAccuracy(false);
//       };
//     }, [user?.id])
//   );

//   /* ---------------------------------- */
//   /* Attendance cards */
//   /* ---------------------------------- */
//   const attendancePunches = useMemo(() => {
//     const segments = todayAttendance?.attendanceSegments;
//     return segments?.length ? mapSegmentsToPunches(segments) : [];
//   }, [todayAttendance?.attendanceSegments]);

//   /* ---------------------------------- */
//   /* Sync UI from API */
//   /* ---------------------------------- */
//   useMemo(() => {
//     if (!todayAttendance) {
//       setIsOn(false);
//       setIsCheckedOut(false);
//       return;
//     }

//     const segments = todayAttendance.attendanceSegments ?? [];
//     const last = segments.at(-1);

//     if (last?.checkOutTime) {
//       setIsCheckedOut(true);
//       setIsOn(false);
//     } else if (segments.length) {
//       setIsCheckedOut(false);
//       setIsOn(true);
//     } else {
//       setIsCheckedOut(false);
//       setIsOn(false);
//     }
//   }, [todayAttendance]);

//   /* ---------------------------------- */
//   /* Disable logic */
//   /* ---------------------------------- */
//   useMemo(() => {
//     if (!isMapReady || !selectedRegion) {
//       setIsDisabled(true);
//       return;
//     }

//     if (isCheckedOut && isOn) {
//       setIsDisabled(true);
//       return;
//     }

//     setIsDisabled(false);
//   }, [isCheckedOut, isOn, isMapReady, selectedRegion]);

//   /* ---------------------------------- */
//   /* Check-In / Check-Out */
//   /* ---------------------------------- */
//   const toggleCheckInOut = () => {
//     if (isDisabled) return;

//     // 🔥 Immediate UI response
//     setOpenCamera(true);

//     // GPS runs in background
//     setTimeout(() => setHighAccuracy(true), 0);
//   };

//   /* ---------------------------------- */
//   /* Capture */
//   /* ---------------------------------- */
//   const handleCapture = async (imageUri: string) => {
//     setOpenCamera(false);

//     // 🔥 UI already closed → user not blocked
//     setTimeout(() => setHighAccuracy(false), 0);

//     if (!location || !user) return;

//     const payload = {
//       vendorId: String(user.id),
//       geoLocation: `${location.latitude},${location.longitude}`,
//       decodedAddress: await reverseGeocode(
//         location.latitude,
//         location.longitude
//       ).then((r) => r?.fullAddress || ""),
//       imageUri,
//       isManager: false as const,
//     };

//     dispatch(
//       submitAttendance({
//         type: isOn ? "checkout" : "checkin",
//         payload,
//       }) as any
//     );
//   };

//   /* ---------------------------------- */
//   /* UI */
//   /* ---------------------------------- */
//   return (
//     <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
//       <Header isBack title="Mark Attendance" isRightIcon={false} />

//       <ScrollView>
//         <View style={styles.container}>
//           <View style={styles.box1}>
//             {showMap && (
//               <MemoMap
//                 height="100%"
//                 radius={selectedRegion?.radius}
//                 onMapReady={() => setIsMapReady(true)}
//               />
//             )}
//           </View>

//           <View style={styles.box2}>
//             <Text style={styles.chipHeading}>Select Region</Text>

//             <ScrollView horizontal>
//               {STATIC_REGIONS.map((item) => (
//                 <Chip
//                   key={item.id}
//                   text={item.name}
//                   activeColor={color.primary}
//                   isActive={selectedRegionName === item.name}
//                   onPress={() => {
//                     setSelectedRegion(item);
//                     setSelectedRegionName(item.name);
//                   }}
//                 />
//               ))}
//             </ScrollView>

//             <CheckInOut
//               isOn={isOn}
//               onToggle={toggleCheckInOut}
//               isDisabled={isDisabled}
//             />

//             {attendancePunches.map((item, index) => (
//               <AttendancePunchCard key={index} index={index} punch={item} />
//             ))}
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.btnContainer}>
//         <Button
//           backgroundColor={color.primary}
//           title="View Timesheet"
//           onPress={() => router.push("/(routes)/attendanceTimeline")}
//           style={{ width: windowWidth(90) }}
//         />
//       </View>

//       <CaptureCamera
//         visible={openCamera}
//         onClose={() => setOpenCamera(false)}
//         onCapture={handleCapture}
//         facing="front"
//         showFlipButton
//       />
//     </View>
//   );
// };

// export default AttendanceScreen;
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "expo-router";

import CheckInOut from "@/components/attendance/CheckInOut";
import AttendancePunchCard from "@/components/attendance/AttendancePunchCard";
import CaptureCamera from "@/components/common/CaptureCamera";
import Button from "@/components/common/Button";
import Chip from "@/components/common/CommonChip";
import Header from "@/components/common/Header";
import Map from "@/components/common/Map";

import { commonStyles } from "@/styles/common.style";
import styles from "./Style";
import color from "@/themes/Colors.themes";
import { windowHeight, windowWidth } from "@/themes/Constants.themes";

import { router } from "expo-router";
import { useAppSelector } from "@/store/Reduxhook";
import { submitAttendance } from "@/store/reducers/checkin-checkout/checkinCheckoutSlice";
import { useAppLocation } from "@/context/LocationContext";
import { reverseGeocode } from "@/utils/location/ReverseGeocode";
import { mapSegmentsToPunches } from "@/store/actions/attendance/attendance.mapper";
import { getAttendance } from "@/store/actions/attendance/attendance.actions";

const STATIC_REGIONS = [
  { id: "1", name: "Siliguri", radius: 30 },
  // { id: "2", name: "Site B", radius: 40 },
];
const DEFAULT_REGION = STATIC_REGIONS[0];

const MemoMap = React.memo(Map);

const AttendanceScreen = () => {
  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { todayAttendance } = useAppSelector((state) => state.attendance);
  const { setHighAccuracy, location } = useAppLocation();
  const [openCamera, setOpenCamera] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  // const [selectedRegion, setSelectedRegion] = useState<any>();
  // const [selectedRegionName, setSelectedRegionName] = useState<string>();
  const [selectedRegion, setSelectedRegion] = useState(DEFAULT_REGION);
  const [selectedRegionName, setSelectedRegionName] = useState(
    DEFAULT_REGION.name
  );

  const [isMapReady, setIsMapReady] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!user?.id) return;
      if (!todayAttendance) {
        dispatch(getAttendance(user.id) as any);
      }
      const t = setTimeout(() => setShowMap(true), 250);
      return () => {
        clearTimeout(t);
        setHighAccuracy(false);
      };
    }, [user?.id])
  );

  const attendancePunches = useMemo(() => {
    const segments = todayAttendance?.attendanceSegments;
    return segments?.length ? mapSegmentsToPunches(segments) : [];
  }, [todayAttendance?.attendanceSegments]);

  useEffect(() => {
    if (!todayAttendance) {
      setIsOn(false);
      setIsCheckedOut(false);
      return;
    }

    if (todayAttendance.isCheckedIn) {
      setIsOn(true);
      setIsCheckedOut(false);
    } else {
      setIsOn(false);
      setIsCheckedOut(true);
    }
  }, [todayAttendance]);

  useMemo(() => {
    if (!isMapReady || !selectedRegion) {
      setIsDisabled(true);
      return;
    }

    if (isCheckedOut && isOn) {
      setIsDisabled(true);
      return;
    }

    setIsDisabled(false);
  }, [isCheckedOut, isOn, isMapReady, selectedRegion]);

  const toggleCheckInOut = () => {
    if (isDisabled) return;

    setOpenCamera(true);
    setTimeout(() => setHighAccuracy(true), 0);
  };

  const handleCapture = async (imageUri: string) => {
    setOpenCamera(false);
    setTimeout(() => setHighAccuracy(false), 0);

    if (!location || !user) return;

    const payload = {
      vendorId: String(user.id),
      geoLocation: `${location.latitude},${location.longitude}`,
      decodedAddress: await reverseGeocode(
        location.latitude,
        location.longitude
      ).then((r) => r?.fullAddress || ""),
      imageUri,
      isManager: false as const,
    };

    dispatch(
      submitAttendance({
        type: isOn ? "checkout" : "checkin",
        payload,
      }) as any
    );
  };

  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <Header isBack title="Mark Attendance" isRightIcon={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.box1}>
            {showMap && (
              <MemoMap
                height="100%"
                radius={selectedRegion?.radius}
                onMapReady={() => setIsMapReady(true)}
              />
            )}
          </View>

          <View style={styles.box2}>
            <Text style={styles.chipHeading}>Select Region</Text>

            <ScrollView horizontal>
              {STATIC_REGIONS.map((item) => (
                <Chip
                  key={item.id}
                  text={item.name}
                  activeColor={color.primary}
                  isActive={selectedRegionName === item.name}
                  onPress={() => {
                    setSelectedRegion(item);
                    setSelectedRegionName(item.name);
                  }}
                />
              ))}
            </ScrollView>

            <CheckInOut
              isOn={isOn}
              onToggle={toggleCheckInOut}
              isDisabled={isDisabled}
            />

            {attendancePunches.map((item, index) => (
              <AttendancePunchCard key={index} index={index} punch={item} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* <View style={styles.btnContainer}>
        <Button
          backgroundColor={color.primary}
          title="View Timesheet"
          onPress={() => router.push("/(routes)/attendanceTimeline")}
          style={{ width: windowWidth(90) }}
        />
      </View> */}

      <CaptureCamera
        visible={openCamera}
        onClose={() => setOpenCamera(false)}
        onCapture={handleCapture}
        facing="front"
        showFlipButton
      />
    </View>
  );
};

export default AttendanceScreen;
