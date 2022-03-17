import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { COLORS } from "../../assets/colors";

const InputText = ({
  placeholder = "",
  wrapperStyle = {},
  textInputStyle = {},
  text,
  onTextChange,
  isPassword = false,
  autoCapitalize = false,
}) => {
  return (
    <View style={[styles.textInputWrapper, wrapperStyle]}>
      <TextInput
        secureTextEntry={isPassword}
        autoCapitalize={autoCapitalize ? "sentences" : "none"}
        autoCorrect={false}
        placeholder={placeholder}
        style={[styles.textInput, textInputStyle]}
        placeholderTextColor={COLORS.lightText}
        onChangeText={onTextChange}
        value={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: COLORS.text,
    fontSize: 18,
  },
  textInputWrapper: {
    borderBottomColor: COLORS.text,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});

export { InputText };
