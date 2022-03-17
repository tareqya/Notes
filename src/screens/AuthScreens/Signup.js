import React, { Component } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import * as Animatable from "react-native-animatable";

import { Button } from "react-native-paper";

import { MainContainer, Header, InputText, Title } from "../../components";
import { COLORS } from "../../../assets/colors";
import Database from "../../Classes/Database";
import User from "../../Classes/User";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
      loading: false,
    };

    this.db = new Database();
  }

  checkPasswordPolice = (password) => {
    if (password.length < 6) {
      return false;
    }
    var strength = 0;
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
      strength += 1;
    }

    return strength >= 3;
  };

  checkData = (email, password, confirmPassword, first_name, last_name) => {
    if (first_name.trim() == "") {
      alert("First name is require!");
      return false;
    }
    if (last_name.trim() == "") {
      alert("Last name is require!");
      return false;
    }
    if (email.trim() == "") {
      alert("Email is require!");
      return false;
    }
    if (password.trim() == "") {
      alert("Password is require!");
      return false;
    }

    if (confirmPassword != password) {
      alert("Confirm password mismatch!");
      return false;
    }
    if (!this.checkPasswordPolice(password)) {
      alert(
        "Password should contain at least 6 characters one alphabet and one number"
      );
      return false;
    }

    return true;
  };

  handleSignup = async (
    email,
    password,
    confirmPassword,
    first_name,
    last_name
  ) => {
    this.setState({ loading: true });
    if (
      !this.checkData(email, password, confirmPassword, first_name, last_name)
    ) {
      this.setState({ loading: false });
      return;
    }

    try {
      const res = await this.db.signup(email, password);
      if (res) {
        const uid = this.db.currentUser().uid;
        const user = new User(first_name, last_name, email, uid);
        console.log(user.toDict());
        const addInfoRes = await this.db.insertUserData(user.toDict());
        if (addInfoRes) {
          this.props.navigation.goBack();
        }
        // this.db.logout();
      }
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  };

  render() {
    const { email, password, confirmPassword, first_name, last_name, loading } =
      this.state;

    return (
      <MainContainer>
        <Header goBack={() => this.props.navigation.goBack()} />
        <Animatable.View style={styles.body} animation={"lightSpeedIn"}>
          <Title title={"Sign up"} titleWrapperStyle={styles.titleWrapper} />
          <KeyboardAvoidingView style={styles.inputWrapper}>
            <InputText
              autoCapitalize
              onTextChange={(text) => this.setState({ first_name: text })}
              text={first_name}
              placeholder="First Name"
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={styles.inputWrapper}>
            <InputText
              autoCapitalize
              onTextChange={(text) => this.setState({ last_name: text })}
              text={last_name}
              placeholder="Last Name"
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={styles.inputWrapper}>
            <InputText
              onTextChange={(text) => this.setState({ email: text })}
              text={email}
              placeholder="Email"
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={styles.inputWrapper}>
            <InputText
              onTextChange={(text) => this.setState({ password: text })}
              text={password}
              placeholder="Password"
              isPassword
            />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView>
            <InputText
              onTextChange={(text) => this.setState({ confirmPassword: text })}
              text={confirmPassword}
              placeholder="Confirm password"
              isPassword
            />
          </KeyboardAvoidingView>
        </Animatable.View>
        <Animatable.View style={styles.footer} animation={"fadeIn"}>
          <Button
            loading={loading}
            mode="contained"
            onPress={() =>
              this.handleSignup(
                email,
                password,
                confirmPassword,
                first_name,
                last_name
              )
            }
            style={styles.signupBtn}
          >
            Sign up
          </Button>
        </Animatable.View>
      </MainContainer>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  titleWrapper: {
    marginBottom: 50,
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
  inputWrapper: {
    marginBottom: 30,
  },
  passwordWrapper: {
    marginBottom: 20,
  },
  loginButtonWrapper: {
    marginTop: 50,
    alignItems: "flex-end",
    marginHorizontal: 20,
  },
  footer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  signupBtn: {
    width: 100,
    backgroundColor: COLORS.secondary,
  },
});

export { Signup };
