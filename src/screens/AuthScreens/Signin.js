import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
import { isRTL } from "expo-localization";
import {
  InputText,
  MainContainer,
  Title,
  CircleButton,
} from "../../components";
import { COLORS } from "../../../assets/colors";
import Database from "../../Classes/Database";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
    this.db = new Database();
  }

  checkData = (email, password) => {
    if (email.trim() == "") {
      alert("Email require!");
      return false;
    }
    if (password.trim() == "") {
      alert("Password require!");
      return false;
    }

    return true;
  };

  handleLogin = async (email, password) => {
    this.setState({ loading: true });
    if (this.checkData(email, password)) {
      this.db.login(email, password);
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    const { email, password, loading } = this.state;

    return (
      <MainContainer>
        <Animatable.View style={styles.body} animation={"lightSpeedIn"}>
          <Title title={"Sign in"} titleWrapperStyle={styles.titleWrapper} />
          <KeyboardAvoidingView style={styles.emailWrapper}>
            <InputText
              onTextChange={(text) => this.setState({ email: text })}
              text={email}
              placeholder="Email"
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView>
            <InputText
              onTextChange={(text) => this.setState({ password: text })}
              text={password}
              placeholder="Password"
              isPassword
            />
          </KeyboardAvoidingView>

          <View style={styles.loginButtonWrapper}>
            <CircleButton
              onPress={() => this.handleLogin(email, password)}
              buttonStyle={{ backgroundColor: COLORS.secondary }}
              icon={
                <AntDesign name="arrowright" color={COLORS.text} size={25} />
              }
            />
          </View>
          {loading && <ActivityIndicator size={"large"} color={COLORS.text} />}
        </Animatable.View>
        <Animatable.View style={styles.footer} animation={"fadeIn"}>
          <Text style={styles.footerText}>Don't have an account ? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            <Text style={styles.signupBtn}>SIGN UP</Text>
          </TouchableOpacity>
        </Animatable.View>
      </MainContainer>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  titleWrapper: {
    marginBottom: 100,
  },
  textInput: {
    color: COLORS.text,
    fontSize: 18,
  },
  textInputWrapper: {
    borderBottomColor: COLORS.text,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  emailWrapper: {
    marginBottom: 50,
  },
  passwordWrapper: {
    marginBottom: 20,
  },
  loginButtonWrapper: {
    marginTop: 50,
    alignItems: isRTL ? "flex-start" : "flex-end",
    marginHorizontal: 20,
  },
  footer: {
    flexDirection: isRTL ? "row-reverse" : "row",
    marginBottom: 50,
    justifyContent: "center",
  },
  footerText: {
    color: COLORS.text,
    fontSize: 15,
  },
  signupBtn: {
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export { Signin };
