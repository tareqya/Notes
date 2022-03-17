import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

import { COLORS } from "../../assets/colors";

const CircleButton = ({ icon, buttonStyle, onPress = () => {} }) => {
  const animation = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.timing(animation, {
      timing: 100,
      toValue: 0.9,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        timing: 100,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <Animated.View style={{ transform: [{ scale: animation }] }}>
      <TouchableOpacity
        style={[styles.container, buttonStyle]}
        onPress={() => {
          startAnimation();
          onPress();
        }}
      >
        {icon}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
export { CircleButton };
