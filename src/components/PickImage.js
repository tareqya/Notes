import React, { useState } from "react";
import { Button, Image, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { add_image } from "../../assets/images";

const PickImage = ({ imageUri = "", onChoose }) => {
  const [image, setImage] = useState(imageUri);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      onChoose(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={pickImage}>
        {image != "" ? (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        ) : (
          <Image source={add_image} style={{ width: 200, height: 200 }} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export { PickImage };
