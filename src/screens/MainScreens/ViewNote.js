import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { COLORS } from "../../../assets/colors";
import { Header, MainContainer, Title } from "../../components";
import Database from "../../Classes/Database";

const { width, height } = Dimensions.get("screen");

class ViewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
    };

    this.note = this.props.route.params.note;
    this.parentName = this.props.route.params.parent;
    this.db = new Database();
  }

  componentDidMount() {
    this.props.navigation.getParent().setOptions({
      headerShown: false,
      tabBarStyle: { display: "none" },
    });

    if (this.note.image != "") {
      this.db.getImageUri(this.note.image, (url) => {
        this.setState({ imageUrl: url });
      });
    }
  }

  componentWillUnmount() {
    this.props.navigation.getParent().setOptions({
      headerShown: true,
      tabBarStyle: { backgroundColor: COLORS.primary, display: "flex" },
    });
  }

  render() {
    const { imageUrl } = this.state;
    return (
      <MainContainer>
        <Header goBack={() => this.props.navigation.goBack()} />
        <TouchableOpacity
          style={styles.editWrapper}
          onPress={() =>
            this.props.navigation.navigate("AddNote", {
              note: this.note,
              parent: this.parentName,
              imageUrl,
            })
          }
        >
          <Feather name="edit" color={COLORS.text} size={25} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          {imageUrl && (
            <Image
              style={styles.image}
              source={{ uri: imageUrl }}
              resizeMode="contain"
            />
          )}
          <Title
            title={this.note.title}
            titleStyle={styles.title}
            titleWrapperStyle={styles.titleWrapper}
          />
          <View style={styles.noteWrapper}>
            <Text style={styles.note}>{this.note.note}</Text>
          </View>
        </ScrollView>
      </MainContainer>
    );
  }
}

const styles = StyleSheet.create({
  titleWrapper: {
    padding: 10,
  },
  title: {
    fontSize: 24,
  },
  note: {
    fontSize: 20,
    color: COLORS.lightText,
  },
  noteWrapper: {
    padding: 10,
  },
  editWrapper: {
    backgroundColor: "rgb(57, 57, 57)",
    height: 50,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
    position: "absolute",
    end: 20,
    top: 50,
  },
  image: {
    width,
    height: 200,
  },
});
export { ViewNote };
