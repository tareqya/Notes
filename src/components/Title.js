import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { COLORS } from "../../assets/colors";

const Title = ({ title, titleStyle = {}, titleWrapperStyle = {} }) => {
  return (
    <View style={[styles.wrapper, titleWrapperStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: COLORS.text,
  },
  wrapper: {},
});

export { Title };
