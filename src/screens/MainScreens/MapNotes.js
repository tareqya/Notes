import React, { Component } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Database from "../../Classes/Database";
import { MainContainer, Loading, Title } from "../../components";

const { width, height } = Dimensions.get("screen");

class MapNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      notes: [],
      loading: true,
    };
    this.db = new Database();
    this.uid = this.db.currentUser()?.uid;
    this.notesUnsubscripRef = null;
  }

  componentDidMount() {
    this.db.getUserInfo(this.uid, (user) => this.setState({ user }));
    this.notesUnsubscripRef = this.db.getUserNotes(this.uid, (notes) =>
      this.setState({ notes, loading: false })
    );
  }

  componentWillUnmount() {
    if (this.notesUnsubscripRef != null) {
      this.notesUnsubscripRef();
    }
  }

  render() {
    const { user, notes, loading } = this.state;
    if (!user || loading) {
      return (
        <MainContainer style={styles.loadingContiner}>
          <View style={styles.loadingWrapper}>
            <Loading />
          </View>
        </MainContainer>
      );
    }
    return (
      <MainContainer>
        <Title
          title={`Welcome ${user.first_name},`}
          titleWrapperStyle={{ padding: 10 }}
          titleStyle={{ fontWeight: "bold" }}
        />
        <MapView style={styles.map}>
          {notes.map((note, index) => (
            <View key={index.toString()}>
              <Marker
                onPress={() =>
                  this.props.navigation.navigate("ViewNote", {
                    note: note.toDict(),
                    parent: "MapNotes",
                  })
                }
                coordinate={{
                  latitude: note.latitude,
                  longitude: note.longitude,
                }}
                title={note.title}
                description={note.note}
              />
            </View>
          ))}
        </MapView>
      </MainContainer>
    );
  }
}

const styles = StyleSheet.create({
  loadingContiner: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingWrapper: {
    width: "80%",
  },
  map: {
    flex: 1,
  },
});
export { MapNotes };
