import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
const short = require("short-uuid");
import * as firebase from "firebase";

import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Your username is required"),

  email: Yup.string()
    .required("Email is required")
    .email("Please enter valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 character"),
});
export default class Register extends Component {
  state = {
    errorMessage: null,
    isProgressing: null,
  };

  handleRegister = async ({ name, email, password }) => {
    this.setState({ inProgress: true });
    try {
      const credentials = await this.createUser(email, password);
      await this.saveUser(name, email, credentials.user.uid);
      this.updateProfile(credentials, name);
      this.setState({ inProgress: false });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  createUser = async (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  saveUser = async (name, email, uid) => {
    return firebase.firestore().collection("users").doc(uid).set({
      email,
      name,
      uuid: uid,
    });
  };

  updateProfile = (userCredentials, displayName) => {
    return userCredentials.user.updateProfile({
      displayName,
    });
  };

  render() {
    return (
      <KeyboardAvoidingScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>{`Ahoy Newcomer`}</Text>
        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            this.handleRegister(values);
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            return (
              <View style={styles.form}>
                <View>
                  <Text style={styles.inputTitle}>Real Name or Nickname</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange("name")}
                    value={values.name}
                  ></TextInput>
                  <Text style={styles.errorText}>
                    {touched.name && errors.name}
                  </Text>
                </View>
                <View style={{ marginTop: 32 }}>
                  <Text style={styles.inputTitle}>Email Address</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange("email")}
                    value={values.email}
                  ></TextInput>
                  <Text style={styles.errorText}>
                    {touched.email && errors.email}
                  </Text>
                </View>

                <View style={{ marginTop: 32 }}>
                  <Text style={styles.inputTitle}> Password </Text>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={handleChange("password")}
                    value={values.password}
                  ></TextInput>
                  <Text style={styles.errorText}>
                    {touched.password && errors.password}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={this.state.isProgressing}
                >
                  <Text style={{ color: "#FFF", fontWeight: "500" }}>
                    {" "}
                    Sign Up{" "}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ alignSelf: "center", marginTop: 32 }}
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  <Text style={{ color: "#414959", fontSize: 13 }}>
                    {" "}
                    Have an account? Then
                    <Text style={{ fontWeight: "500", color: "#E9446A" }}>
                      {" "}
                      log in
                    </Text>{" "}
                    pumpkin{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </KeyboardAvoidingScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
