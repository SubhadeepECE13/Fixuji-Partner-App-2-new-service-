// import React, { useEffect, useMemo, useState } from "react";
// import { ScrollView, Text, View } from "react-native";
// import { useDispatch } from "react-redux";

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

//   useEffect(() => {
//     const t = setTimeout(() => {
//       setHighAccuracy(true);
//     }, 100);

//     return () => {
//       clearTimeout(t);
//       setHighAccuracy(false);
//     };
//   }, []);

//   useEffect(() => {
//     if (!user?.id) return;
//     dispatch(getAttendance(user.id) as any);
//   }, [user?.id]);

//   const attendancePunches = useMemo(() => {
//     if (!todayAttendance?.attendanceSegments) return [];
//     return mapSegmentsToPunches(todayAttendance.attendanceSegments);
//   }, [todayAttendance]);

//   /* ---------------------------------- */
//   /* Sync UI state from API (SOURCE OF TRUTH) */
//   /* ---------------------------------- */
//   useEffect(() => {
//     if (!todayAttendance) {
//       // Fresh day
//       setIsCheckedOut(false);
//       setIsOn(false); // Check-In
//       return;
//     }

//     const segments = todayAttendance.attendanceSegments ?? [];
//     const lastSegment = segments.at(-1);

//     if (lastSegment?.checkOutTime) {
//       // Vendor already checked out
//       setIsCheckedOut(true);
//       setIsOn(false); // Only Check-In allowed
//     } else if (segments.length > 0) {
//       // Vendor checked in but not checked out
//       setIsCheckedOut(false);
//       setIsOn(true); // Show Check-Out
//     } else {
//       setIsCheckedOut(false);
//       setIsOn(false);
//     }
//   }, [todayAttendance]);

//   /* ---------------------------------- */
//   /* Disable logic (SINGLE EFFECT) */
//   /* ---------------------------------- */
//   useEffect(() => {
//     if (!isMapReady || !selectedRegion) {
//       setIsDisabled(true);
//       return;
//     }

//     // Prevent checkout if already checked out
//     if (isCheckedOut && isOn) {
//       setIsDisabled(true);
//       return;
//     }

//     setIsDisabled(false);
//   }, [isCheckedOut, isOn, isMapReady, selectedRegion]);

//   /* ---------------------------------- */
//   /* Toggle handler */
//   /* ---------------------------------- */
//   const toggleCheckInOut = () => {
//     if (isDisabled) return;
//     setOpenCamera(true);
//   };

//   /* ---------------------------------- */
//   /* Capture handler */
//   /* ---------------------------------- */
//   const handleCapture = async (imageUri: string) => {
//     setOpenCamera(false);

//     if (!location || !user) return;

//     const { latitude, longitude } = location;
//     const address = await reverseGeocode(latitude, longitude);

//     const payload = {
//       vendorId: String(user.id),
//       geoLocation: `${latitude},${longitude}`,
//       decodedAddress: address?.fullAddress || "",
//       imageUri,
//       isManager: false as const,
//     };

//     // REAL ACTION DECISION
//     const type = isOn ? "checkout" : "checkin";

//     dispatch(
//       submitAttendance({
//         type,
//         payload,
//       }) as any
//     );

//     // Refresh attendance after submit
//     dispatch(getAttendance(user.id) as any);
//   };

//   /* ---------------------------------- */
//   /* UI */
//   /* ---------------------------------- */
//   return (
//     <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
//       <Header isBack title="Mark Attendance" isRightIcon={false} />

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.container}>
//           {/* Map */}
//           <View style={styles.box1}>
//             <Map
//               height="100%"
//               radius={selectedRegion?.radius}
//               onMapReady={() => {
//                 setTimeout(() => setIsMapReady(true), 150);
//               }}
//             />
//           </View>

//           {/* Controls */}
//           <View style={styles.box2}>
//             <View style={styles.chipBox}>
//               <Text style={styles.chipHeading}>Select Region</Text>

//               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                 {STATIC_REGIONS.map((item) => (
//                   <View
//                     key={item.id}
//                     style={{ marginRight: windowHeight(0.5) }}
//                   >
//                     <Chip
//                       text={item.name}
//                       activeColor={color.primary}
//                       isActive={selectedRegionName === item.name}
//                       onPress={() => {
//                         setSelectedRegion(item);
//                         setSelectedRegionName(item.name);
//                       }}
//                     />
//                   </View>
//                 ))}
//               </ScrollView>
//             </View>

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
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";

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
  { id: "1", name: "Site A", radius: 30 },
  { id: "2", name: "Site B", radius: 40 },
];

const AttendanceScreen = () => {
  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { todayAttendance } = useAppSelector((state) => state.attendance);

  const { setHighAccuracy, location } = useAppLocation();

  const [openCamera, setOpenCamera] = useState(false);

  /**
   * isOn = true  → CHECK-OUT
   * isOn = false → CHECK-IN
   */
  const [isOn, setIsOn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [selectedRegion, setSelectedRegion] = useState<any>();
  const [selectedRegionName, setSelectedRegionName] = useState<string>();
  const [isMapReady, setIsMapReady] = useState(false);

  /* 🔥 PERF: Delay map rendering */
  const [renderMap, setRenderMap] = useState(false);

  /* ---------------------------------- */
  /* Fetch attendance ONLY if not present */
  /* ---------------------------------- */
  useEffect(() => {
    if (!user?.id) return;
    if (todayAttendance) return;

    dispatch(getAttendance(user.id) as any);
  }, [user?.id]);

  /* ---------------------------------- */
  /* Delay Map mount slightly */
  /* ---------------------------------- */
  useEffect(() => {
    const t = setTimeout(() => setRenderMap(true), 150);
    return () => clearTimeout(t);
  }, []);

  /* ---------------------------------- */
  /* Map attendance segments → cards */
  /* ---------------------------------- */
  const attendancePunches = useMemo(() => {
    const segments = todayAttendance?.attendanceSegments;
    return segments?.length ? mapSegmentsToPunches(segments) : [];
  }, [todayAttendance?.attendanceSegments]);

  /* ---------------------------------- */
  /* Sync UI state from API (SOURCE OF TRUTH) */
  /* ---------------------------------- */
  useEffect(() => {
    if (!todayAttendance) {
      setIsCheckedOut(false);
      setIsOn(false);
      return;
    }

    const segments = todayAttendance.attendanceSegments ?? [];
    const lastSegment = segments.at(-1);

    if (lastSegment?.checkOutTime) {
      setIsCheckedOut(true);
      setIsOn(false);
    } else if (segments.length > 0) {
      setIsCheckedOut(false);
      setIsOn(true);
    } else {
      setIsCheckedOut(false);
      setIsOn(false);
    }
  }, [todayAttendance]);

  /* ---------------------------------- */
  /* Disable logic (UNCHANGED) */
  /* ---------------------------------- */
  useEffect(() => {
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

  /* ---------------------------------- */
  /* Toggle handler (GPS enabled HERE) */
  /* ---------------------------------- */
  const toggleCheckInOut = () => {
    if (isDisabled) return;

    // 🔥 PERF: Enable GPS only when needed
    setHighAccuracy(true);

    setOpenCamera(true);
  };

  /* ---------------------------------- */
  /* Capture handler */
  /* ---------------------------------- */
  const handleCapture = async (imageUri: string) => {
    setOpenCamera(false);

    // 🔥 PERF: Turn off GPS after capture
    setHighAccuracy(false);

    if (!location || !user) return;

    const { latitude, longitude } = location;
    const address = await reverseGeocode(latitude, longitude);

    const payload = {
      vendorId: String(user.id),
      geoLocation: `${latitude},${longitude}`,
      decodedAddress: address?.fullAddress || "",
      imageUri,
      isManager: false as const,
    };

    const type = isOn ? "checkout" : "checkin";

    dispatch(
      submitAttendance({
        type,
        payload,
      }) as any
    );
  };

  /* ---------------------------------- */
  /* UI */
  /* ---------------------------------- */
  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <Header isBack title="Mark Attendance" isRightIcon={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Map */}
          <View style={styles.box1}>
            {renderMap && (
              <Map
                height="100%"
                radius={selectedRegion?.radius}
                onMapReady={() => {
                  setTimeout(() => setIsMapReady(true), 150);
                }}
              />
            )}
          </View>

          {/* Controls */}
          <View style={styles.box2}>
            <View style={styles.chipBox}>
              <Text style={styles.chipHeading}>Select Region</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {STATIC_REGIONS.map((item) => (
                  <View
                    key={item.id}
                    style={{ marginRight: windowHeight(0.5) }}
                  >
                    <Chip
                      text={item.name}
                      activeColor={color.primary}
                      isActive={selectedRegionName === item.name}
                      onPress={() => {
                        setSelectedRegion(item);
                        setSelectedRegionName(item.name);
                      }}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>

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

      <View style={styles.btnContainer}>
        <Button
          backgroundColor={color.primary}
          title="View Timesheet"
          onPress={() => router.push("/(routes)/attendanceTimeline")}
          style={{ width: windowWidth(90) }}
        />
      </View>

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
