import React, { Component } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Easing,
} from "react-native";
import * as Location from "expo-location";

import * as Animatable from "react-native-animatable";
import { Button } from "react-native-paper";
import Textarea from "react-native-textarea";

import { COLORS, COLORS_NOTES } from "../../../assets/colors";
import Note from "../../Classes/Note";
import Database from "../../Classes/Database";

import {
  MainContainer,
  Title,
  DatePicker,
  Header,
  InputText,
  ColorPicker,
  PickImage,
} from "../../components";

const convertDateToString = (date) => {
  if (date == null) return "";
  return (
    date.getFullYear() +
    "-" +
    `${date.getMonth() + 1}`.padStart(2, "0") +
    "-" +
    `${date.getDate()}`.padStart(2, "0")
  );
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.note = this.props.route.params?.note;
    this.parentName = this.props.route.params?.parent;
    this.state = {
      selectedDate:
        this.note == undefined ? new Date() : new Date(this.note.date),
      title: this.props.route.params?.note.title || "",
      note: this.props.route.params?.note.note || "",
      color: this.props.route.params?.note.color || COLORS_NOTES[0],
      image: this.props.route.params?.imageUrl || "",
      loading: false,
      editMode: this.props.route.params != undefined,
    };
    this.db = new Database();
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: false,
      tabBarStyle: { display: "none" },
    });
  }

  componentWillUnmount() {
    this.props.navigation.setOptions({
      headerShown: true,
      tabBarStyle: { display: "flex" },
    });
  }

  handleDeleteNote = async () => {
    try {
      await this.db.deleteNote(this.note);
      this.props.navigation.navigate(this.parentName || "ListNotes");
    } catch (err) {
      alert("Failed to remove note!");
    }
  };

  handleSaveNote = async (title, note, date, color, image) => {
    if (title.trim() == "") {
      alert("Title require!");
      return;
    }
    if (note.trim() == "") {
      alert("Note body reqiure!");
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location permission is require");
      return;
    }

    try {
      this.setState({ loading: true });
      let location = await Location.getCurrentPositionAsync({});
      const newNote = new Note(
        title,
        note,
        convertDateToString(date),
        location.coords.longitude,
        location.coords.latitude,
        this.db.currentUser().uid,
        color,
        image
      );
      if (this.state.editMode) {
        newNote.key = this.note.key;
        await this.db.updateNote(newNote.toDict());
      } else {
        await this.db.insertNewNote(newNote.toDict());
      }
      this.props.navigation.navigate(this.parentName || "ListNotes");
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  };

  handleGoBack = () => {
    const { editMode } = this.state;
    if (editMode) {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate(this.parentName || "ListNotes");
    }
  };

  render() {
    const { title, note, selectedDate, loading, color, editMode, image } =
      this.state;

    return (
      <MainContainer>
        <Header goBack={() => this.handleGoBack()} />
        <Animatable.View
          animation={"zoomIn"}
          easing={Easing.bounce}
          style={{ flex: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Title
              title={editMode ? "Edit Your Note" : "Add New Note"}
              titleWrapperStyle={styles.titleWrapper}
              titleStyle={styles.title}
            />
            <View style={styles.body}>
              <DatePicker
                onDaySelect={(date) => this.setState({ selectedDate: date })}
                selectCurrentDate
                initDate={selectedDate}
                labels={WEEK_DAYS}
                months={MONTHS}
              />

              <KeyboardAvoidingView>
                <InputText
                  wrapperStyle={styles.titleInputWrapper}
                  onTextChange={(text) => this.setState({ title: text })}
                  text={title}
                  autoCapitalize
                  placeholder="Title"
                />
              </KeyboardAvoidingView>
              <KeyboardAvoidingView>
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  onChangeText={(text) => this.setState({ note: text })}
                  defaultValue={note}
                  maxLength={1000}
                  placeholder={"Type something ..."}
                  placeholderTextColor={COLORS.lightText}
                  underlineColorAndroid={"transparent"}
                />
              </KeyboardAvoidingView>
              <View style={styles.imageWrapper}>
                <PickImage
                  imageUri={image}
                  onChoose={(uri) => this.setState({ image: uri })}
                />
              </View>
              <View style={styles.colorsWrapper}>
                <ColorPicker
                  value={color}
                  colors={COLORS_NOTES}
                  onSelect={(color) => this.setState({ color })}
                />
              </View>
            </View>
            <Button
              loading={loading}
              mode="outlined"
              onPress={() =>
                this.handleSaveNote(title, note, selectedDate, color, image)
              }
              color={COLORS.success}
              style={styles.saveBtn}
              labelStyle={{ color: COLORS.success }}
            >
              Save
            </Button>
            {editMode && (
              <Button
                mode="outlined"
                onPress={() => this.handleDeleteNote()}
                color={COLORS.danger}
                style={[styles.saveBtn, { borderColor: COLORS.danger }]}
                labelStyle={{ color: COLORS.danger }}
              >
                Delete
              </Button>
            )}
            <View style={{ height: 50 }} />
          </ScrollView>
        </Animatable.View>
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
    fontWeight: "bold",
  },
  body: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleInputWrapper: {
    marginTop: 10,
  },
  textareaContainer: {
    height: 180,
    marginTop: 10,
  },
  textarea: {
    height: 170,
    fontSize: 16,
    color: COLORS.text,
  },
  colorsWrapper: {
    marginTop: 10,
  },

  saveBtn: {
    borderColor: COLORS.success,
    alignSelf: "center",
    marginTop: 50,
    width: 150,
  },
  imageWrapper: {
    marginVertical: 10,
  },
});
export { AddNote };
