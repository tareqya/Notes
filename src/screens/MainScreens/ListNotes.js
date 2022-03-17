import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { COLORS } from "../../../assets/colors";
import { empty_list } from "../../../assets/images";

import Database from "../../Classes/Database";
import { Loading, MainContainer, Title } from "../../components";

const { width, height } = Dimensions.get("screen");

class ListNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      notes: [],
      loading: true,
      refresh: false,
    };
    this.db = new Database();
    this.uid = this.db.currentUser()?.uid;
    this.notesUnsubscripRef = null;
  }

  componentDidMount() {
    this.db.getUserInfo(this.uid, (user) => this.setState({ user }));
    this.notesUnsubscripRef = this.db.getUserNotes(
      this.uid,
      this.handleNotesFetch
    );
  }

  componentWillUnmount() {
    if (this.notesUnsubscripRef != null) {
      this.notesUnsubscripRef();
    }
  }

  handleNotesFetch = (notes) => {
    if (notes) {
      const sortedNotes = notes.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      this.setState({ notes: sortedNotes, loading: false });
    } else {
      alert("Failed to fetch notes, check your internet connections!");
      this.setState({ loading: false });
    }
  };

  render() {
    const { user, notes, refresh, loading } = this.state;
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
        <View style={{ flex: 1 }}>
          {notes && (
            <FlatList
              numColumns={2}
              data={notes}
              keyExtractor={(item, index) => index.toString()}
              refreshing={refresh}
              onRefresh={() => {
                this.notesUnsubscripRef = this.db.getUserNotes(
                  this.uid,
                  this.handleNotesFetch
                );
              }}
              ListEmptyComponent={() => (
                <View>
                  <Image source={empty_list} style={styles.emptyListImage} />
                  <Text style={styles.emptyListText}>
                    You don't have any notes!
                  </Text>
                </View>
              )}
              ListHeaderComponent={() => (
                <Title
                  title={`Welcome ${user.first_name},`}
                  titleWrapperStyle={{ padding: 10 }}
                  titleStyle={{ fontWeight: "bold" }}
                />
              )}
              renderItem={({ item, index }) => (
                <Animatable.View
                  animation={"slideInRight"}
                  duration={(index + 1) * 100}
                >
                  <TouchableOpacity
                    style={[
                      styles.noteWrapper,
                      { backgroundColor: item.color },
                    ]}
                    onPress={() =>
                      this.props.navigation.navigate("ViewNote", {
                        note: item.toDict(),
                        parent: "ListNotes",
                      })
                    }
                  >
                    <View>
                      <Text style={styles.noteTitle}>
                        {item.title.slice(0, 20)}
                        {item.title.length < 20 ? "" : "..."}
                      </Text>
                      <Text style={styles.note}>
                        {item.note.slice(0, 50)}
                        {item.note.length < 50 ? "" : "..."}
                      </Text>
                    </View>

                    <Text style={styles.noteDate}>
                      {new Date(item.date).toDateString()}
                    </Text>
                  </TouchableOpacity>
                </Animatable.View>
              )}
            />
          )}
        </View>
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
  noteTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  noteWrapper: {
    flex: 1,
    padding: 10,
    height: 200,
    width: width / 2 - 20,
    margin: 10,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  noteDate: {
    color: COLORS.lightPrimary,
    fontSize: 16,
  },
  note: {
    fontSize: 16,
    marginTop: 10,
  },
  emptyListImage: {
    height: 300,
    aspectRatio: 1,
    alignSelf: "center",
  },
  emptyListText: {
    fontSize: 18,
    color: COLORS.warning,
    alignSelf: "center",
  },
});
export { ListNotes };
