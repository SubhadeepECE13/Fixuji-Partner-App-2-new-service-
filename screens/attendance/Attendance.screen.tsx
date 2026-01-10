import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import CheckInOut from "@/components/attendance/CheckInOut";
import TimeCard from "@/components/attendance/TimeInOut";
import Button from "@/components/common/Button";
import Chip from "@/components/common/CommonChip";
import Header from "@/components/common/Header";
import Map from "@/components/common/Map";

import FullscreenLoader from "@/components/common/FullScreenLoader";
import { commonStyles } from "@/styles/common.style";
import color from "@/themes/Colors.themes";
import { windowHeight, windowWidth } from "@/themes/Constants.themes";
import { router } from "expo-router";
import styles from "./Style";

import AttendancePunchCard from "@/components/attendance/AttendancePunchCard";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const STATIC_REGIONS = [
  { id: "1", name: "Site A", radius: 300 },
  { id: "2", name: "Site B", radius: 400 },
];
export const STATIC_ATTENDANCE_PUNCHES = [
  {
    checkin: {
      time: "10:00 AM",
      image:
        "https://scontent.fccu4-2.fna.fbcdn.net/v/t1.6435-9/129900655_417962905908963_9040196984544546132_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=DE7Uh0Nq69kQ7kNvwG50M6S&_nc_oc=AdkvlGsqb_df8A2feZJs2fQHtZGbfRReXvNcAN0unlqaqKrESUs6vBY4wwZKX4pKMi29KI01ly3RuKFAyrhI5dEk&_nc_zt=23&_nc_ht=scontent.fccu4-2.fna&_nc_gid=38XlZz84I7omJuYpZfIukQ&oh=00_AfqZfEH02Nz7DXIUaAkfqVoCZi8fjmWUuUaeFchVFC14WQ&oe=6989A937",
      address:
        "8C7W+2JX Ashram Road Jalpaiguri Division Cooch Behar, West Bengal 736101",
    },
    // checkout: {
    //   time: "12:00 PM",
    //   image:
    //     "https://scontent.fccu25-1.fna.fbcdn.net/v/t39.30808-6/605754015_1573556913682884_5048807935786339510_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=bYNvfy9krkgQ7kNvwElHPFs&_nc_oc=AdnSORC7w4H7hJkkkv2oQBv54Utht9ddCyq3FaJdmWGUEhqsCmDYaAUtLtl_I1Tax4lPlDke3EB-ekT6ScpbPCJS&_nc_zt=23&_nc_ht=scontent.fccu25-1.fna&_nc_gid=CHObJA1HUhiT6YK4x3Z7MA&oh=00_AfrXDFap7ipPbfWJqRVdDDPG28uSyv_oYRLmVSrsxExotw&oe=696814B7",
    //   address:
    //     "8C7W+2JX Ashram Road Jalpaiguri Division Cooch Behar, West Bengal 736102",
    // },
    location: {
      geolocation: {
        lat: 23.899,
        long: 23.56,
      },
    },
  },
  {
    checkin: {
      time: "09:15 AM",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      address:
        "8C7W+2JX Ashram Road Jalpaiguri Division Cooch Behar, West Bengal 736101",
    },
    checkout: {
      time: "01:00 PM",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      address:
        "8C7W+2JX Ashram Road Jalpaiguri Division Cooch Behar, West Bengal 736101",
    },
    location: {
      geolocation: {
        lat: 99.899,
        long: 11.56,
      },
    },
  },
];

const AttendanceScreen = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedPunch, setSelectedPunch] = useState<any | null>(null);

  const [isOn, setIsOn] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [checkInImage, setCheckInImage] = useState<string | null>(null);
  const [checkOutImage, setCheckOutImage] = useState<string | null>(null);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);

  const [selectedRegion, setSelectedRegion] = useState<any>();
  const [selectedRegionName, setSelectedRegionName] = useState<string>();

  const [distance, setDistance] = useState<number>(120);
  const [outOfRange, setOutOfRange] = useState(false);

  const [isCameraLoading, setIsCameraLoading] = useState(false);

  const requestPermissions = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const location = await Location.requestForegroundPermissionsAsync();

    if (camera.status !== "granted" || location.status !== "granted") {
      Alert.alert(
        "Permission required",
        "Camera and Location permission is required"
      );
      return false;
    }
    return true;
  };

  const takePhotoAndLogLocation = async () => {
    const allowed = await requestPermissions();
    if (!allowed) return null;

    try {
      setIsCameraLoading(true);

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      console.log("CURRENT LOCATION");
      const { latitude, longitude } = loc.coords;

      await getAddressFromCoords(latitude, longitude);

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.6,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        return result.assets[0].uri;
      }
      return null;
    } catch (err) {
      Alert.alert("Error", "Unable to open camera");
      return null;
    } finally {
      setIsCameraLoading(false);
    }
  };

  const toggleCheckInOut = async () => {
    if (!isCheckedIn && selectedRegion) {
      const photoUri = await takePhotoAndLogLocation();
      if (!photoUri) return;

      setCheckInImage(photoUri);
      setIsCheckedIn(true);
      setIsOn(true);
      setCheckIn(new Date().toLocaleTimeString());
    } else if (isCheckedIn && !isCheckedOut && selectedRegion) {
      const photoUri = await takePhotoAndLogLocation();
      if (!photoUri) return;

      setCheckOutImage(photoUri);
      setIsCheckedOut(true);
      setIsOn(false);
      setCheckOut(new Date().toLocaleTimeString());
    }
  };
  const getAddressFromCoords = async (latitude: number, longitude: number) => {
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (address.length > 0) {
        const a = address[0];

        const formattedAddress = `
        ${a.name ?? ""} ${a.street ?? ""} ${a.streetNumber ?? ""}${a.subregion ?? ""}
        ${a.city ?? ""}, ${a.region ?? ""}
        ${a.postalCode ?? ""}
        ${a.country ?? ""}  
      `.trim();

        console.log(" ADDRESS:", formattedAddress);
        setCurrentAddress(formattedAddress);

        return formattedAddress;
      }
    } catch (error) {
      console.log("Reverse geocode error:", error);
    }
    return null;
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
                  />
                </View>

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

            {STATIC_ATTENDANCE_PUNCHES.map((item, index) => (
              <AttendancePunchCard key={index} index={index} punch={item} />
            ))}

            <View style={styles.TimeCardContainer}>
              <TimeCard time={checkIn} title="Check In" width={"48%"} />
              <TimeCard time={checkOut} title="Check Out" width={"48%"} />
            </View>

            {outOfRange && (
              <Text style={{ color: "red", marginTop: 10 }}>
                You are out of allowed range
              </Text>
            )}
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

      {isCameraLoading && (
        <FullscreenLoader visible={isCameraLoading} text="Opening Camera" />
      )}
    </View>
  );
};

export default AttendanceScreen;
