import React, { forwardRef, useMemo } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "@/components/common/CustomBottomSheetModal";
import { CustomIcon } from "@/components/common/Icon";
import color from "@/themes/Colors.themes";
import fonts from "@/themes/Fonts.themes";
import {
  fontSizes,
  windowHeight,
  windowWidth,
} from "@/themes/Constants.themes";

interface Option {
  label: string;
  value: string;
}

interface Props {
  data: Option[];
  selectedLabel?: string;
  onSelect: (value: string) => void;
}

const SelectBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ data, selectedLabel, onSelect }, ref) => {
    const snapPoints = useMemo(() => ["50%"], []);

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        initialSnapPoint={0}
        enablePanDownToClose
      >
        <BottomSheetFlatList
          data={data}
          keyExtractor={(item) => item.value}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isSelected = selectedLabel === item.label;

            return (
              <TouchableOpacity
                style={[styles.item, isSelected && styles.itemSelected]}
                onPress={() => onSelect(item.value)}
              >
                <Text style={[styles.text, isSelected && styles.textSelected]}>
                  {item.label}
                </Text>

                {isSelected && (
                  <CustomIcon
                    type="Ionicons"
                    name="checkmark-circle"
                    size={windowHeight(2.5)}
                    color={color.primary}
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />
      </CustomBottomSheetModal>
    );
  }
);

export default SelectBottomSheet;

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: windowWidth(4),
    paddingBottom: windowHeight(2),
    paddingTop: windowHeight(1),
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: windowWidth(4),
    borderRadius: 10,
    marginBottom: windowHeight(1),
    backgroundColor: color.lightGray,
  },
  itemSelected: {
    backgroundColor: color.lightGreen,
    borderWidth: 1,
    borderColor: color.primary,
  },
  text: {
    fontSize: fontSizes.rg,
    fontFamily: fonts.regular,
    color: color.regularText,
  },
  textSelected: {
    fontFamily: fonts.semiBold,
    color: color.primary,
  },
});
