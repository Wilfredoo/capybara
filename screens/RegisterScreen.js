import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

export default class RegisterScreen extends Component {

state = {
  name: "",
  email: "",
  password: "",
  errorMessage: null 
}

handleRegister = () => {

  firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(userCredentials => {
    return userCredentials.user.updateProfile({
      displayName: this.state.name
    })
  }).catch(error => this.setState({errorMessage: error.message}))
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}> 
        {`Ahoy Newcomer`}
         </Text>



         <View style={styles.errorMessage}>
          {this.state.errorMessage && 
          <Text style={styles.error}> 
            {this.state.errorMessage}
          </Text>}
         </View>

<View style={styles.form}>
<View>
      <Text style={styles.inputTitle}>Real Name or Nickname</Text>
      <TextInput style={styles.input} autoCapitalize="none" onChangeText={name => this.setState({name})} value={this.state.name}>
      </TextInput>
  </View>
  <View style={{marginTop: 32}}>
      <Text style={styles.inputTitle}>Email Address</Text>
      <TextInput style={styles.input} autoCapitalize="none" onChangeText={email => this.setState({email})} value={this.state.email}>
      </TextInput>
  </View>

  <View style={{marginTop: 32}}>
      <Text style={styles.inputTitle}> Password </Text>
      <TextInput style={styles.input} secureTextEntry autoCapitalize="none" onChangeText={password => this.setState({password})} value={this.state.password}>
      </TextInput>
  </View>

  <TouchableOpacity style={styles.button} onPress={this.handleRegister} >
      <Text style={{color: "#FFF", fontWeight: "500"}}> Sign Up </Text>
  </TouchableOpacity>

  <TouchableOpacity style={{alignSelf: "center", marginTop: 32}}>
      <Text style={{color: "#414959", fontSize: 13}}> Have an account?<Text style={{fontWeight: 500, color: "#E9446A"}}> Log In</Text> sister </Text>
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
error: {
  color: '#E9446A',
  fontSize: 13,
  fontWeight: "600",
  textAlign: "center"
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
