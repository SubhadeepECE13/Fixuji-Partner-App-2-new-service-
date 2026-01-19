
// import React, { useEffect, useRef, useState } from "react";
// import { ScrollView, Text, View } from "react-native";

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

//   const [, requestCameraPermission] = useCameraPermissions();

//   const [isOn, setIsOn] = useState(false);
//   const [isCheckedIn, setIsCheckedIn] = useState(false);
//   const [isCheckedOut, setIsCheckedOut] = useState(false);
//   const [isDisabled, setIsDisabled] = useState(true);

//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");

//   const [selectedRegion, setSelectedRegion] = useState<any>();
//   const [selectedRegionName, setSelectedRegionName] = useState<string>();

//   const [distance, setDistance] = useState<number>(120);
//   const [outOfRange, setOutOfRange] = useState(false);

//   const [isMapReady, setIsMapReady] = useState(false);

//   // PRE-REQUEST CAMERA PERMISSION
//   useEffect(() => {
//     requestCameraPermission();
//   }, []);

//   // RESTORED DISABLE LOGIC
//   useEffect(() => {
//     if (selectedRegion && !outOfRange && !isCheckedOut) {
//       setIsDisabled(false);
//     } else {
//       setIsDisabled(true);
//     }
//   }, [selectedRegion, outOfRange, isCheckedOut]);

//   // CAMERA OPEN — NO LOCATION WORK HERE
//   const toggleCheckInOut = () => {
//     if (!selectedRegion) return;
//     if (!isMapReady) return;

//     setOpenCamera(true);
//   };

//   const handleCapture = (uri: string) => {
//     setOpenCamera(false);

//     if (!isCheckedIn) {
//       setIsCheckedIn(true);
//       setIsOn(true);
//       setCheckIn(new Date().toLocaleTimeString());
//     } else if (!isCheckedOut) {
//       setIsCheckedOut(true);
//       setIsOn(false);
//       setCheckOut(new Date().toLocaleTimeString());
//     }
//   };

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
//               onMapReady={() => setIsMapReady(true)}
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
//                     disabled={!isMapReady}
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
//                       disabled={!isMapReady}
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
//       />
//     </View>
//   );
// };

// export default AttendanceScreen;
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";

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
import { useAppLocation } from "@/context/LocationContext";
import { reverseGeocode } from "@/utils/location/ReverseGeocode";

const STATIC_REGIONS = [
  { id: "1", name: "Site A", radius: 30 },
  { id: "2", name: "Site B", radius: 40 },
];

const AttendanceScreen = () => {
  const [openCamera, setOpenCamera] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [selectedRegion, setSelectedRegion] = useState<any>();
  const [selectedRegionName, setSelectedRegionName] = useState<string>();
  const [isMapReady, setIsMapReady] = useState(false);

  const { setHighAccuracy, location } = useAppLocation();
  useEffect(() => {
  const t = setTimeout(() => {
    setHighAccuracy(true);
  }, 300);

  return () => {
    clearTimeout(t);
    setHighAccuracy(false);
  };
}, []);


  useEffect(() => {
    if (selectedRegion && !isCheckedOut) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [selectedRegion, isCheckedOut]);

const toggleCheckInOut = React.useCallback(() => {
  if (!selectedRegion || !isMapReady) return;
  setOpenCamera(true);
}, [selectedRegion, isMapReady]);


  // const handleCapture = () => {
  //   setOpenCamera(false);

  //   if (!isCheckedIn) {
  //     setIsCheckedIn(true);
  //     setIsOn(true);
  //     setCheckIn(new Date().toLocaleTimeString());
  //   } else {
  //     setIsCheckedOut(true);
  //     setIsOn(false);
  //     setCheckOut(new Date().toLocaleTimeString());
  //   }
  // };
  const handleCapture = async () => {
  setOpenCamera(false);

  if (!location) return;
  const { latitude, longitude } = location;
  const address = await reverseGeocode(latitude, longitude);

  const payload = {
    latitude,
    longitude,
    address: address?.fullAddress || "",
    timestamp: new Date().toISOString(),
    type: !isCheckedIn ? "CHECK_IN" : "CHECK_OUT",
  };

  console.log("Attendance Payload:", payload);

  if (!isCheckedIn) {
    setIsCheckedIn(true);
    setIsOn(true);
    setCheckIn(new Date().toLocaleTimeString());
  } else {
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
              radius={selectedRegion?.radius}
              onMapReady={() => {
          setTimeout(() => setIsMapReady(true), 150);
             }}
              
            />
          </View>

          <View style={styles.box2}>
            <View style={styles.chipBox}>
              <Text style={styles.chipHeading}>Select Region</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {STATIC_REGIONS.map((item) => (
                  <View key={item.id} style={{ marginRight: windowHeight(0.5) }}>
                    <Chip
                      text={item.name}
                      activeColor={color.primary}
                      // disabled={!isMapReady}
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
