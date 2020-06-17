import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import Header from "./Header";

export default class Profile extends Component {
  state = {
    email: "",
    displayName: "",
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />

        <Text style={{ marginBottom: 15, fontSize: 24 }}>
          Hey {this.state.displayName}{" "}
        </Text>

        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={() => this.signOutUser()}
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
