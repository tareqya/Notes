import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ListNotes, MapNotes, AddNote, ViewNote } from "../screens/MainScreens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../../assets/colors";
import Database from "../Classes/Database";
import { isRTL } from "expo-localization";

const db = new Database();

const Stack = createNativeStackNavigator();

const ListNotesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ListNotes" component={ListNotes} />
      <Stack.Screen name="ViewNote" component={ViewNote} />
      <Stack.Screen name="AddNote" component={AddNote} />
    </Stack.Navigator>
  );
};

const MapNotesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MapNotes" component={MapNotes} />
      <Stack.Screen name="ViewNote" component={ViewNote} />
      <Stack.Screen name="AddNote" component={AddNote} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  const animationBtn = useRef(new Animated.Value(1)).current;
  const startAnimation = () => {
    Animated.spring(animationBtn, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(animationBtn, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.secondary,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
        },
        tabBarIconStyle: { top: 10 },
        headerShown: true,
        title: "Notes",
        tabBarLabel: "",
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontWeight: "bold",
          color: COLORS.text,
          fontSize: 28,
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        headerRight: () => (
          <TouchableOpacity
            style={styles.logoutWrapper}
            onPress={() => db.logout()}
          >
            <Text style={styles.logoutText}>Logout</Text>
            <AntDesign name="logout" color={COLORS.danger} size={25} />
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name="ListNotesStack"
        component={ListNotesStack}
        options={() => {
          return {
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <View>
                  <View style={styles.iconTabBackground} />
                  <View style={styles.tabIconWrapper}>
                    <Feather name="list" color={color} size={size} />
                  </View>
                </View>
              ) : (
                <Feather name="list" color={color} size={size} />
              ),
          };
        }}
      />
      <Tab.Screen
        name="AddNote"
        component={AddNote}
        options={() => {
          return {
            unmountOnBlur: true,
            tabBarButton: (props) => (
              <Animated.View style={{ transform: [{ scale: animationBtn }] }}>
                <TouchableOpacity
                  style={[styles.addNoteBottom]}
                  onPress={() => {
                    startAnimation();
                    setTimeout(() => {
                      props.onPress();
                    }, 200);
                  }}
                >
                  <MaterialIcons name={"add"} color={COLORS.text} size={30} />
                </TouchableOpacity>
              </Animated.View>
            ),
          };
        }}
      />
      <Tab.Screen
        name="MapNotesStack"
        component={MapNotesStack}
        options={() => {
          return {
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <View>
                  <View style={styles.iconTabBackground} />
                  <View style={styles.tabIconWrapper}>
                    <Feather name="map" color={color} size={size} />
                  </View>
                </View>
              ) : (
                <Feather name="map" color={color} size={size} />
              ),
          };
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconTabBackground: {
    height: "100%",
    aspectRatio: 1,
    backgroundColor: COLORS.secondary,
    position: "absolute",
    opacity: 0.1,
    borderRadius: 4,
  },
  addNoteBottom: {
    flex: 1,
    width: 50,
    height: 50,
    top: -20,
    borderRadius: 25,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIconWrapper: {
    height: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutWrapper: {
    flexDirection: isRTL ? "row" : "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  logoutText: {
    marginHorizontal: 5,
    color: COLORS.danger,
    fontSize: 18,
  },
});
