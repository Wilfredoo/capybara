import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}> 
        {`Hello again. \nWelcome back`}
         </Text>

         <View style={styles.errorMessage}>
          <Text> 
             Error
          </Text>
         </View>

<View style={styles.form}>
  <View>
      <Text style={styles.inputTitle}>Email Address</Text>
      <TextInput style={styles.input} autoCapitalize="none">
      </TextInput>
  </View>

  <View style={{marginTop: 32}}>
      <Text style={styles.inputTitle}> Password </Text>
      <TextInput style={styles.input} secureTextEntry autoCapitalize="none">
      </TextInput>
  </View>

  <TouchableOpacity style={styles.button}>
      <Text style={{color: "#FFF", fontWeight: "500"}}> Sign In </Text>
  </TouchableOpacity>

  <TouchableOpacity style={{alignSelf: "center", marginTop: 32}}>
      <Text style={{color: "#FFF", fontWeight: "500"}}> First Timer?<Text> sign up then</Text> </Text>
  </TouchableOpacity>


</View>
      </View>
      


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center"
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: "uppercase"
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D'
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  }
})
