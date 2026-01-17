
// import * as Location from "expo-location";
// import React, { useEffect, useRef, useState } from "react";
// import { Alert, ScrollView, Text, View } from "react-native";

// import CheckInOut from "@/components/attendance/CheckInOut";
// import TimeCard from "@/components/attendance/TimeInOut";
// import Button from "@/components/common/Button";
// import Chip from "@/components/common/CommonChip";
// import Header from "@/components/common/Header";
// import Map from "@/components/common/Map";

// import { commonStyles } from "@/styles/common.style";
// import color from "@/themes/Colors.themes";
// import { windowHeight, windowWidth } from "@/themes/Constants.themes";
// import { router } from "expo-router";
// import styles from "./Style";

// import AttendancePunchCard from "@/components/attendance/AttendancePunchCard";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";

// import CaptureCamera from "@/components/common/CaptureCamera";
// import { useCameraPermissions } from "expo-camera";

// const STATIC_REGIONS = [
//   { id: "1", name: "Site A", radius: 300 },
//   { id: "2", name: "Site B", radius: 400 },
// ];

// export const STATIC_ATTENDANCE_PUNCHES = [
//   {
//     checkin: {
//       time: "10:00 AM",
//       image:
//         "https://scontent.fccu4-2.fna.fbcdn.net/v/t1.6435-9/129900655_417962905908963_9040196984544546132_n.jpg",
//       address:
//         "8C7W+2JX Ashram Road Jalpaiguri Division Cooch Behar, West Bengal 736101",
//     },
//     location: {
//       geolocation: {
//         lat: 23.899,
//         long: 23.56,
//       },
//     },
//   },
// ];

// const AttendanceScreen = () => {
//   const bottomSheetRef = useRef<BottomSheetModal>(null);

//   const [openCamera, setOpenCamera] = useState(false);
// const [cameraPermission, requestCameraPermission] =
//   useCameraPermissions();
//   const [isOn, setIsOn] = useState(false);
//   const [isCheckedIn, setIsCheckedIn] = useState(false);
//   const [isCheckedOut, setIsCheckedOut] = useState(false);
//   const [isDisabled, setIsDisabled] = useState(true);

//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");

//   const [checkInImage, setCheckInImage] = useState<string | null>(null);
//   const [checkOutImage, setCheckOutImage] = useState<string | null>(null);
//   const [currentAddress, setCurrentAddress] = useState<string | null>(null);

//   const [selectedRegion, setSelectedRegion] = useState<any>();
//   const [selectedRegionName, setSelectedRegionName] = useState<string>();

//   const [distance, setDistance] = useState<number>(120);
//   const [outOfRange, setOutOfRange] = useState(false);

//   const requestPermissions = async () => {
//     const location = await Location.requestForegroundPermissionsAsync();
//     if (location.status !== "granted") {
//       Alert.alert("Permission required", "Location permission is required");
//       return false;
//     }
//     return true;
//   };
//   useEffect(() => {
//   requestCameraPermission();
// }, []);

//   const openCameraForAttendance = async () => {
//     const allowed = await requestPermissions();
//     if (!allowed) return;

//     try {
//       const loc = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.High,
//       });

//       const { latitude, longitude } = loc.coords;
//       await getAddressFromCoords(latitude, longitude);

//       setOpenCamera(true);
//     } catch {
//       Alert.alert("Error", "Unable to fetch location");
//     }
//   };

//   const handleCapture = (uri: string) => {
//     setOpenCamera(false);

//     if (!isCheckedIn) {
//       setCheckInImage(uri);
//       setIsCheckedIn(true);
//       setIsOn(true);
//       setCheckIn(new Date().toLocaleTimeString());
//     } else if (!isCheckedOut) {
//       setCheckOutImage(uri);
//       setIsCheckedOut(true);
//       setIsOn(false);
//       setCheckOut(new Date().toLocaleTimeString());
//     }
//   };

//   const toggleCheckInOut = async () => {
//     if (!selectedRegion) return;
//     openCameraForAttendance();
//   };

//   const getAddressFromCoords = async (latitude: number, longitude: number) => {
//     try {
//       const address = await Location.reverseGeocodeAsync({
//         latitude,
//         longitude,
//       });

//       if (address.length > 0) {
//         const a = address[0];
//         const formattedAddress = `
//         ${a.name ?? ""} ${a.street ?? ""} ${a.city ?? ""}, ${a.region ?? ""}
//         ${a.postalCode ?? ""} ${a.country ?? ""}
//       `.trim();

//         setCurrentAddress(formattedAddress);
//         return formattedAddress;
//       }
//     } catch (error) {
//       console.log("Reverse geocode error:", error);
//     }
//     return null;
//   };

//   useEffect(() => {
//     if (selectedRegion && !outOfRange && !isCheckedOut) {
//       setIsDisabled(false);
//     } else {
//       setIsDisabled(true);
//     }
//   }, [selectedRegion, outOfRange, isCheckedOut]);

//   useEffect(() => {
//     if (!selectedRegion) return;
//     const limit =
//       selectedRegion === "office" ? 500 : Number(selectedRegion.radius);
//     setOutOfRange(distance > limit);
//   }, [distance, selectedRegion]);

//   return (
//     <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
//       <Header isBack title="Mark Attendance" isRightIcon={false} />

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.container}>
//           <View style={styles.box1}>
//             <Map
//               height={"100%"}
//               radius={
//                 selectedRegion === "office" ? 900 : selectedRegion?.radius
//               }
//               setDistance={(d) => setDistance(d || 120)}
//             />
//           </View>

//           <View style={styles.box2}>
//             <View style={styles.chipBox}>
//               <Text style={styles.chipHeading}>Select Region</Text>

//               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                 <View style={{ marginRight: windowHeight(0.5) }}>
//                   <Chip
//                     text="Office"
//                     activeColor={color.primary}
//                     isActive={selectedRegionName === "office"}
//                     onPress={() => {
//                       setSelectedRegionName("office");
//                       setSelectedRegion("office");
//                     }}
//                   />
//                 </View>

//                 {STATIC_REGIONS.map((item) => (
//                   <View key={item.id} style={{ marginRight: windowHeight(0.5) }}>
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

//             {STATIC_ATTENDANCE_PUNCHES.map((item, index) => (
//               <AttendancePunchCard key={index} index={index} punch={item} />
//             ))}

//             <View style={styles.TimeCardContainer}>
//               <TimeCard time={checkIn} title="Check In" width={"48%"} />
//               <TimeCard time={checkOut} title="Check Out" width={"48%"} />
//             </View>

//             {outOfRange && (
//               <Text style={{ color: "red", marginTop: 10 }}>
//                 You are out of allowed range
//               </Text>
//             )}
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

//       {openCamera && (
//         <CaptureCamera
//           onClose={() => setOpenCamera(false)}
//           onCapture={handleCapture}
//           visible={openCamera}
//         />
//       )}
//     </View>
//   );
// };

// export default AttendanceScreen;
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import CheckInOut from "@/components/attendance/CheckInOut";
import TimeCard from "@/components/attendance/TimeInOut";
import Button from "@/components/common/Button";
import Chip from "@/components/common/CommonChip";
import Header from "@/components/common/Header";
import Map from "@/components/common/Map";

import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import { windowHeight, windowWidth } from "@/themes/Constants.themes";
import { router } from "expo-router";
import styles from "./Style";

import AttendancePunchCard from "@/components/attendance/AttendancePunchCard";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import CaptureCamera from "@/components/common/CaptureCamera";
import { useCameraPermissions } from "expo-camera";

const STATIC_REGIONS = [
  { id: "1", name: "Site A", radius: 300 },
  { id: "2", name: "Site B", radius: 400 },
];

export const STATIC_ATTENDANCE_PUNCHES = [
  {
    checkin: {
      time: "10:00 AM",
      image:
        "https://scontent.fccu4-2.fna.fbcdn.net/v/t1.6435-9/129900655_417962905908963_9040196984544546132_n.jpg",
      address:
        "8C7W+2JX Ashram Road Jalpaiguri Division Cooch Behar, West Bengal 736101",
    },
    location: {
      geolocation: {
        lat: 23.899,
        long: 23.56,
      },
    },
  },
];

const AttendanceScreen = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [openCamera, setOpenCamera] = useState(false);

  const [cameraPermission, requestCameraPermission] =
    useCameraPermissions();

  const [isOn, setIsOn] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [selectedRegion, setSelectedRegion] = useState<any>();
  const [selectedRegionName, setSelectedRegionName] = useState<string>();
const [isMapReady, setIsMapReady] = useState(false);

  const [distance, setDistance] = useState<number>(120);
  const [outOfRange, setOutOfRange] = useState(false);

  //  PRE-REQUEST CAMERA PERMISSION
  useEffect(() => {
    requestCameraPermission();
  }, []);

  //  RESTORED DISABLE LOGIC (CRITICAL)
  useEffect(() => {
    if (selectedRegion && !outOfRange && !isCheckedOut) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [selectedRegion, outOfRange, isCheckedOut]);

  const requestPermissions = async () => {
    const location = await Location.requestForegroundPermissionsAsync();
    if (location.status !== "granted") {
      Alert.alert("Permission required", "Location permission is required");
      return false;
    }
    return true;
  };

  // TOGGLE NOW WORKS
  const toggleCheckInOut = async () => {
    if (!selectedRegion) return;

    const allowed = await requestPermissions();
    if (!allowed) return;

    setOpenCamera(true);
  };

  const handleCapture = async (uri: string) => {
    setOpenCamera(false);

    try {
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
    } catch {}

    if (!isCheckedIn) {
      setIsCheckedIn(true);
      setIsOn(true);
      setCheckIn(new Date().toLocaleTimeString());
    } else if (!isCheckedOut) {
      setIsCheckedOut(true);
      setIsOn(false);
      setCheckOut(new Date().toLocaleTimeString());
    }
  };

  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <Header isBack title="Mark Attendance" isRightIcon={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.box1}>
            <Map
              height={"100%"}
              radius={
                selectedRegion === "office" ? 900 : selectedRegion?.radius
              }
              setDistance={(d) => setDistance(d || 120)}
               onMapReady={() => setIsMapReady(true)}
            />
          </View>

          <View style={styles.box2}>
            <View style={styles.chipBox}>
              <Text style={styles.chipHeading}>Select Region</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ marginRight: windowHeight(0.5) }}>
                  <Chip
                    text="Office"
                    activeColor={color.primary}
                    isActive={selectedRegionName === "office"}
                    onPress={() => {
                      setSelectedRegionName("office");
                      setSelectedRegion("office");
                    }}
                     disabled={!isMapReady}
                  />
                </View>

                {STATIC_REGIONS.map((item) => (
                  <View key={item.id} style={{ marginRight: windowHeight(0.5) }}>
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

            {STATIC_ATTENDANCE_PUNCHES.map((item, index) => (
              <AttendancePunchCard key={index} index={index} punch={item} />
            ))}

            <View style={styles.TimeCardContainer}>
              <TimeCard time={checkIn} title="Check In" width={"48%"} />
              <TimeCard time={checkOut} title="Check Out" width={"48%"} />
            </View>
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

      {/* ✅ CAMERA OVERLAY */}
      <CaptureCamera
        visible={openCamera}
        onClose={() => setOpenCamera(false)}
        onCapture={handleCapture}
      />
    </View>
  );
};

export default AttendanceScreen;
