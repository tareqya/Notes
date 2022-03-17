import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigations/AuthNavigation";
import MainNavigation from "./src/navigations/MainNavigation";
import Database from "./src/Classes/Database";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Loading, MainContainer } from "./src/components";

const db = new Database();
const auth = getAuth();

export default function App() {
  const [user, setUser] = useState(db.currentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <MainContainer style={styles.continer}>
        <View style={styles.loadingWrapper}>
          <Loading />
        </View>
      </MainContainer>
    );
  }

  if (user) {
    return (
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  continer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingWrapper: {
    width: "80%",
  },
});
