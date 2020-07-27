import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import Header from "./Header";
import "firebase/firestore";
// import firebaseConfigDEV from "../../config/FirebaseConfigDEV";
// import firebaseConfigPROD from "../../config/FirebaseConfigPROD";

// if (!firebase.apps.length) {
//   if (__DEV__) {
//     firebase.initializeApp(firebaseConfigDEV);
//   } else {
//     firebase.initializeApp(firebaseConfigPROD);
//   }
// }

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
        console.log("query snapshot", querySnapshot.data());
        if (querySnapshot.data().inactive === true) {
          this.setState({ inactive: true }, () => {
            console.log("this state afterwrds", this.state);
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
              Your account is inactive so you are no longer receiving messages.
              Reply to some messages to it make active again. You can also
              forget them if you don't want to reply to them.
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
