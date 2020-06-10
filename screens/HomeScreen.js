import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';


export default class HomeScreen extends Component {
state = {
  email: "",
  displayName: ""
}

componentDidMount() {
  const {email, displayName} = firebase.auth().currentUser
  this.setState({email, displayName})
}

signOutUser = () => {
  firebase.auth().signOut()
}

  render() {
    return (
      <View style={styles.container}>
        <Text>Hi... {this.state.displayName}?  </Text>

        <TouchableOpacity style={{marginTop: 32}}><Text>Log Out</Text></TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
