import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { COLORS } from "../../assets/colors";

const ColorPicker = ({ colors, value, onSelect = () => {} }) => {
  const [color, setColor] = useState(value);

  return (
    <View>
      <FlatList
        horizontal
        data={colors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              marginHorizontal: 5,
            }}
            onPress={() => {
              setColor(item);
              onSelect(item);
            }}
          >
            <View
              style={{
                backgroundColor: item,
                height: 50,
                aspectRatio: 1,
                borderRadius: 5,
                borderWidth: item == color ? 3 : 0,
                borderColor: COLORS.danger,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export { ColorPicker };
