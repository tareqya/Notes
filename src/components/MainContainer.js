import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { COLORS } from "../../assets/colors";
const MainContainer = ({ children, style = {} }) => {
  return (
    <View style={[styles.container, style]}>
      <SafeAreaView />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});

export { MainContainer };
