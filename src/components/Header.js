import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { isRTL } from "expo-localization";

import { COLORS } from "../../assets/colors";

const Header = ({ title = "", goBack = () => {} }) => {
  return (
    <View style={styles.continar}>
      <SafeAreaView />
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={() => goBack()}
        >
          <MaterialIcons
            name={isRTL ? "arrow-forward-ios" : "arrow-back-ios"}
            color={COLORS.text}
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.title}> {title} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  continar: {
    paddingVertical: Platform.OS == "ios" ? 10 : 20,
    backgroundColor: COLORS.primary,
  },
  headerWrapper: {
    paddingTop: Platform.OS == "ios" ? 10 : 20,
    flexDirection: "row",
    alignItems: "center",
    marginStart: 10,
  },
  backButtonWrapper: {
    borderColor: COLORS.text,
    borderWidth: 1.2,
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginStart: isRTL ? 0 : 5,
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
    marginStart: 5,
    fontWeight: "500",
  },
});

export { Header };
