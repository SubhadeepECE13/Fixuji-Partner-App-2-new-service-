// import Header from "@/components/common/Header";
// import Loader from "@/components/common/Loader";
// import Map, { Coordinates } from "@/components/common/Map";
// import { setSuccess } from "@/store/reducers/orders/orderSlice";
// import { useAppDispatch, useAppSelector } from "@/store/Reduxhook";
// import { userStorage } from "@/store/Storage";
// import { commonStyles } from "@/styles/common.style";
// import * as ImagePicker from "expo-image-picker";
// import { ImagePickerAsset } from "expo-image-picker";
// import { router } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Text,
//   View,
// } from "react-native";
// import { getFormatedDate } from "react-native-modern-datepicker";
// import Toast from "react-native-toast-message";
// import styles from "./Style";
// import { windowHeight } from "@/themes/Constants.themes";
// import Chip from "@/components/order/OrderChip";
// import color from "@/themes/Colors.themes";
// import CheckInOut from "@/components/attendance/CheckInOut";
// import TimeCard from "@/components/attendance/TimeInOut";
// import Button from "@/components/common/Button";
// import AreYouSureModal from "@/components/common/AreYouSureModal";
// import {
//   checkInApi,
//   checkOutApi,
//   getAttendanceApi,
// } from "@/store/actions/attendance/attendance.actions";

// const AttendanceScreen = () => {
//   const userId = userStorage.getString("user_id");

//   const [isOn, setIsOn] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const [isCheckedIn, setIsCheckedIn] = useState(false);
//   const [isCheckedOut, setIsCheckedOut] = useState(false);
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [outOfRange, setOutOfRange] = useState(false);
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   // const [checkInPhoto, setCheckInPhoto] = useState<ImagePickerAsset | null>(
//   //   null
//   // )
//   // const [checkOutPhoto, setCheckOutPhoto] = useState<ImagePickerAsset | null>(
//   //   null
//   // )
//   const [selectedRegion, setSelectedRegion] = useState<Area | "office">();
//   const [selectedRegionName, setSelectedRegionName] = useState<string>();
//   const [error, setError] = useState<string | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [distance, setDistance] = useState<number>();
//   const [markerLocation, setMarkerLocation] = useState<Coordinates>();
//   const [myLocation, setMyLocation] = useState<Coordinates>();

//   const { area } = useAppSelector((state) => state.user);
//   //   const { success, todayAttendance } = useAppSelector(
//   //     (state) => state.attendance
//   //   );
//   const dispatch = useAppDispatch();

//   const requestCameraPermission = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== "granted") {
//       setError("Camera access is required to use this feature.");
//       setModalVisible(true);
//       return false;
//     }
//     return true;
//   };

//   const openCamera = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) return false;

//     try {
//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ["images"],
//         quality: 0.5,
//       });

//       if (!result.canceled && result?.assets[0]?.uri) {
//         return result.assets[0];
//       } else {
//         setError("No image selected.");
//         return false;
//       }
//     } catch (error) {
//       setError("Could not open the camera. Please try again.");
//       return false;
//     }
//   };

//   const checkInApiCall = async (image: ImagePickerAsset) => {
//     try {
//       setLoader(true);
//       let body: AttendanceCheckInReq = {
//         date: getFormatedDate(new Date(), "YYYY-MM-DD"),
//         clock_in: getFormatedDate(new Date(), "HH:mm"),
//         checkin_geolocation: JSON.stringify({
//           latitude: myLocation?.latitude,
//           longitude: myLocation?.longitude,
//         }),
//         checkin_distance: distance ? distance : null,
//         checkin_area:
//           selectedRegion === "office"
//             ? null
//             : selectedRegion
//               ? selectedRegion.id
//               : null,
//         checkin_attendance_place: selectedRegionName ? selectedRegionName : "",
//         checkin_attachment: {
//           uri: image.uri,
//           type: image?.mimeType || "image/jpeg",
//           name: image?.fileName || `image-${Date.now()}.jpg`,
//         },
//       };

//       // Step 2: Create a new FormData object
//       const formData = new FormData();

//       // Step 3: Loop through the JSON object and append the data to FormData
//       for (const [key, value] of Object.entries(body)) {
//         formData.append(key, value);
//       }

//       await dispatch(checkInApi(formData));
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoader(false);
//     }
//   };

//   const checkOutApiCall = async (image: ImagePickerAsset) => {
//     try {
//       let body: AttendanceCheckOutReq = {
//         date: getFormatedDate(new Date(), "YYYY-MM-DD"),
//         clock_out: getFormatedDate(new Date(), "HH:mm"),
//         checkout_geolocation: JSON.stringify({
//           latitude: myLocation?.latitude,
//           longitude: myLocation?.longitude,
//         }),
//         checkout_distance: distance ? distance : null,
//         checkout_area:
//           selectedRegion === "office"
//             ? null
//             : selectedRegion
//               ? selectedRegion.id
//               : null,
//         checkout_attendance_place: selectedRegionName ? selectedRegionName : "",
//         checkout_attachment: {
//           uri: image.uri,
//           type: image?.mimeType || "image/jpeg",
//           name: image?.fileName || `image-${Date.now()}.jpg`,
//         },
//       };

//       // Step 2: Create a new FormData object
//       const formData = new FormData();

//       // Step 3: Loop through the JSON object and append the data to FormData
//       for (const [key, value] of Object.entries(body)) {
//         formData.append(key, value);
//       }

//       await dispatch(checkOutApi(formData));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const onPressModal = async () => {
//     try {
//       setLoader(true);
//       setIsModalVisible(false);
//       const image: ImagePickerAsset | false = await openCamera();

//       if (image !== false && image.uri !== undefined) {
//         console.log("start checking out");
//         await checkOutApiCall(image);
//         // setCheckOutPhoto(image)
//       }
//     } catch (error) {
//       console.log("Error in checkout ", error);
//     } finally {
//       setLoader(false);
//     }
//   };

//   const getTodaysAttendance = async () => {
//     try {
//       setLoader(true);
//       if (userId) {
//         dispatch(
//           getAttendanceApi({
//             isToday: true,
//             body: {
//               user_id: userId,
//               start_date: getFormatedDate(new Date(), "YYYY-MM-DD"),
//               end_date: getFormatedDate(new Date(), "YYYY-MM-DD"),
//             },
//           })
//         );
//       }
//     } catch (error) {
//       console.log("error in getAttendance");
//     } finally {
//       setLoader(false);
//     }
//   };

//   const toggleCheckInOut = async () => {
//     // setIsOn(!isOn)
//     if (!isCheckedIn && selectedRegion) {
//       const image: ImagePickerAsset | false = await openCamera();

//       if (image !== false && image.uri !== undefined) {
//         console.log("start checking in");
//         await checkInApiCall(image);
//         // setCheckInPhoto(image)
//       }
//     } else if (isCheckedIn && !isCheckedOut && selectedRegion) {
//       setIsModalVisible(true);
//     }
//   };

//   const gotoTimeSheet = () => {
//     router.push("/(routes)/attendanceTimeline");
//   };

//   useEffect(() => {
//     getTodaysAttendance();
//   }, [dispatch, isCheckedIn, isCheckedOut]);

//   //   useEffect(() => {
//   //     if (success) {
//   //       if (!isCheckedIn) {
//   //         setIsCheckedIn(true);
//   //         setIsOn(true);
//   //         setCheckIn(getFormatedDate(new Date(Date.now()), "HH:mm"));
//   //       }
//   //       if (isCheckedIn && !isCheckedOut) {
//   //         setIsCheckedOut(true);
//   //         setIsOn(false);
//   //         setCheckOut(getFormatedDate(new Date(Date.now()), "HH:mm"));
//   //       }
//   //       Toast.show({
//   //         type: "success",
//   //         text1: success,
//   //       });
//   //       dispatch(setSuccess(null));
//   //     }
//   //   }, [success]);

//   useEffect(() => {
//     if (selectedRegion && !outOfRange) {
//       setIsDisabled(false);
//     }
//     if (isCheckedOut || outOfRange) {
//       setIsDisabled(true);
//     }
//   }, [isCheckedOut, selectedRegion, outOfRange]);

//   useEffect(() => {
//     if (distance) {
//       if (selectedRegion === "office") {
//         if (distance > 500) {
//           setOutOfRange(true);
//         } else {
//           setOutOfRange(false);
//         }
//       } else {
//         if (
//           selectedRegion?.radius &&
//           distance - Number(selectedRegion?.radius) > 0
//         ) {
//           setOutOfRange(true);
//         } else {
//           setOutOfRange(false);
//         }
//       }
//     }
//   }, [distance, selectedRegion]);

//   useEffect(() => {
//     if (selectedRegion === "office") {
//       setMarkerLocation({
//         latitude: 22.6532,
//         longitude: 88.3832,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       });
//     } else if (selectedRegion) {
//       if (selectedRegion.geolocation) {
//         const lat = selectedRegion.geolocation.split(",")[0];
//         const long = selectedRegion.geolocation.split(",")[1];

//         if (Number(lat) && Number(long)) {
//           setMarkerLocation({
//             latitude: Number(lat),
//             longitude: Number(long),
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           });
//         }
//       }
//     }
//   }, [selectedRegion]);

//   //   useEffect(() => {
//   //     if (todayAttendance) {
//   //       setCheckIn(todayAttendance.clock_in);
//   //       setCheckOut(todayAttendance.clock_out);
//   //       setIsCheckedIn(todayAttendance.clock_in ? true : false);
//   //       setIsCheckedOut(todayAttendance.clock_out ? true : false);
//   //       setIsOn(
//   //         todayAttendance.clock_in && !todayAttendance.clock_out ? true : false
//   //       );
//   //     }
//   //   }, [todayAttendance]);

//   return (
//     <>
//       {loader ?? <Loader />}
//       <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
//         <Header isBack={true} title="Mark Attendance" isRightIcon={false} />
//         <ScrollView
//           contentContainerStyle={{}}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={[styles.container]}>
//             <View style={[styles.box1]}>
//               <View style={styles.image}>
//                 <Map
//                   height={"100%"}
//                   markerCoordinate={markerLocation}
//                   radius={
//                     selectedRegion === "office"
//                       ? 500
//                       : selectedRegion?.radius
//                         ? Number(selectedRegion.radius)
//                         : 500
//                   }
//                   setDistance={(distance) => setDistance(distance)}
//                   setLocation={(loc) => setMyLocation(loc)}
//                 />
//               </View>
//             </View>
//             <View
//               style={[
//                 styles.box2,
//                 {
//                   height: windowHeight(40),
//                 },
//               ]}
//             >
//               <View style={styles.chipBox}>
//                 <Text style={styles.chipHeading}>Select Region</Text>
//                 <ScrollView
//                   horizontal
//                   contentContainerStyle={styles.chipContainer}
//                   showsHorizontalScrollIndicator={false}
//                 >
//                   <Chip
//                     text={"Office"}
//                     activeColor={color.primary}
//                     style={styles.chip}
//                     isActive={selectedRegionName === "office"}
//                     onPress={() => {
//                       setSelectedRegionName("office");
//                       setSelectedRegion("office");
//                     }}
//                   />
//                   {area &&
//                     area.map((item, index) => (
//                       <Chip
//                         key={index}
//                         text={item.name}
//                         activeColor={color.primary}
//                         style={styles.chip}
//                         isActive={selectedRegionName === item.name}
//                         onPress={() => {
//                           setSelectedRegion(item);
//                           setSelectedRegionName(item.name);
//                         }}
//                       />
//                     ))}
//                 </ScrollView>
//               </View>
//               <CheckInOut
//                 isOn={isOn}
//                 onToggle={toggleCheckInOut}
//                 isDisabled={isDisabled}
//               />
//               <View style={styles.TimeCardContainer}>
//                 <TimeCard time={checkIn} title="Check In" width={"48%"} />
//                 <TimeCard time={checkOut} title="Check Out" width={"48%"} />
//               </View>
//               {/*
//             <View
//               style={[
//                 styles.imageBox,
//                 { height: checkInPhoto || checkOutPhoto ? '44%' : 0 }
//               ]}
//             >
//               <View style={styles.imageContainer}>
//                 {checkInPhoto && (
//                   <Image
//                     source={{ uri: checkInPhoto.uri }}
//                     style={styles.checkinImage}
//                   />
//                 )}
//               </View>
//               <View style={styles.imageContainer}>
//                 {checkOutPhoto && (
//                   <Image
//                     source={{ uri: checkOutPhoto.uri }}
//                     style={styles.checkinImage}
//                   />
//                 )}
//               </View>
//             </View>

//           */}
//             </View>
//           </View>
//         </ScrollView>
//         <View style={styles.btnContainer}>
//           <Button
//             backgroundColor={color.primary}
//             title="View Timesheet"
//             onPress={gotoTimeSheet}
//           />
//         </View>

//         <AreYouSureModal
//           isOpen={isModalVisible}
//           setOpened={setIsModalVisible}
//           onPress={onPressModal}
//           title="Are you sure you want to check out"
//         />
//       </View>
//     </>
//   );
// };

// export default AttendanceScreen;
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import Header from "@/components/common/Header";
import Button from "@/components/common/Button";

import CheckInOut from "@/components/attendance/CheckInOut";
import TimeCard from "@/components/attendance/TimeInOut";
import Map from "@/components/common/Map";

import color from "@/themes/Colors.themes";
import { windowHeight } from "@/themes/Constants.themes";
import { commonStyles } from "@/styles/common.style";
import styles from "./Style";
import { router } from "expo-router";
import Chip from "@/components/common/CommonChip";

/* ------------------ STATIC DATA ------------------ */

const STATIC_REGIONS = [
  {
    id: "1",
    name: "Site A",
    radius: 300,
    geolocation: "22.5726,88.3639",
  },
  {
    id: "2",
    name: "Site B",
    radius: 400,
    geolocation: "22.5800,88.3700",
  },
];

/* ------------------ SCREEN ------------------ */

const AttendanceScreen = () => {
  const [isOn, setIsOn] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [selectedRegion, setSelectedRegion] = useState<any>();
  const [selectedRegionName, setSelectedRegionName] = useState<string>();

  const [distance, setDistance] = useState<number>(120); // fake distance
  const [outOfRange, setOutOfRange] = useState(false);

  /* ------------------ LOGIC ------------------ */

  const toggleCheckInOut = () => {
    if (!isCheckedIn && !outOfRange) {
      setIsCheckedIn(true);
      setIsOn(true);
      setCheckIn(new Date().toLocaleTimeString());
    } else if (isCheckedIn && !isCheckedOut) {
      setIsCheckedOut(true);
      setIsOn(false);
      setCheckOut(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    if (selectedRegion && !outOfRange && !isCheckedOut) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [selectedRegion, outOfRange, isCheckedOut]);

  useEffect(() => {
    if (!selectedRegion) return;

    const limit =
      selectedRegion === "office" ? 500 : Number(selectedRegion.radius);

    setOutOfRange(distance > limit);
  }, [distance, selectedRegion]);
  const gotoTimeSheet = () => {
    router.push("/(routes)/attendanceTimeline");
  };

  /* ------------------ UI ------------------ */

  return (
    <View style={[{ flex: 1 }, commonStyles.grayContainer]}>
      <Header isBack title="Mark Attendance" isRightIcon={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* MAP */}
          <View style={styles.box1}>
            <Map
              height={"100%"}
              radius={
                selectedRegion === "office" ? 500 : selectedRegion?.radius
              }
              setDistance={(d) => setDistance(d || 120)}
            />
          </View>

          {/* CONTENT */}
          <View style={[styles.box2, { height: windowHeight(40) }]}>
            {/* REGION SELECT */}
            <View style={styles.chipBox}>
              <Text style={styles.chipHeading}>Select Region</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipContainer}
              >
                <Chip
                  text="Office"
                  activeColor={color.primary}
                  isActive={selectedRegionName === "office"}
                  onPress={() => {
                    setSelectedRegionName("office");
                    setSelectedRegion("office");
                  }}
                />

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
            </View>

            {/* CHECK IN / OUT */}
            <CheckInOut
              isOn={isOn}
              onToggle={toggleCheckInOut}
              isDisabled={isDisabled}
            />

            {/* TIME CARDS */}
            <View style={styles.TimeCardContainer}>
              <TimeCard time={checkIn} title="Check In" width={"48%"} />
              <TimeCard time={checkOut} title="Check Out" width={"48%"} />
            </View>

            {/* RANGE WARNING */}
            {outOfRange && (
              <Text style={{ color: "red", marginTop: 10 }}>
                You are out of allowed range
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.btnContainer}>
        <Button
          backgroundColor={color.primary}
          title="View Timesheet"
          onPress={() => router.push("/(routes)/attendanceTimeline")}
        />
      </View>
    </View>
  );
};

export default AttendanceScreen;
