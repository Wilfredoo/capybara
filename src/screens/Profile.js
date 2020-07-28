import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import Header from "./Header";
import "firebase/firestore";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.store = firebase.firestore();
    this.currentUser = firebase.auth().currentUser.uid;
  }
  state = {
    email: "",
    displayName: "",
    userIsPaused: false,
  };

  async componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });
    this.checkForInactivity();
  }

  checkForInactivity = async () => {
    await this.store
      .collection("users")
      .doc(this.currentUser)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.data().inactive === true) {
          this.setState({ inactive: true }, () => {
          });
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  signOutUser = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <>
        <Header navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text style={{ marginBottom: 15, fontSize: 24 }}>
            Hey {this.state.displayName}{" "}
          </Text>
          {this.state.inactive && (
            <Text style={{ textAlign: "center", maxWidth: "90%" }}>
              Your account is inactive cuz you have 3 or more unreplied messages during the last week. This means that you are no longer receiving messages.
              Reply to some messages to it make active again. You can also
              forget them or report them if you don't want to reply to them.
            </Text>
          )}
          <TouchableOpacity
            style={{ marginTop: 32 }}
            onPress={() => this.signOutUser()}
          >
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </>
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
