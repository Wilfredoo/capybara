import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import * as firebase from "firebase";
import Header from "./Header";
import "firebase/firestore";
import createMessage from "../helpers/createMessage.js";
import registerToken from "../helpers/registerNotification.js";
import sendNotification from "../helpers/sendNotification.js";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";

export default function Home({ navigation }) {
  const [message, setMessage] = useState("");
  const [isProgressing, setProgressing] = useState(null);
  const [lastSent, setLastSent] = useState(null);
  const [error, setError] = useState(null);
  const currentUser = firebase.auth().currentUser.uid;
  const store = firebase.firestore();
  const chatRoomsRef = store.collection("chatRooms");

  const showToast = () => {
    ToastAndroid.show(
      "Message sent, maybe someone will reply, maybe not ¯_(ツ)_/¯",
      ToastAndroid.SHORT
    );
  };

  useEffect(() => {
    getSentMessages().then((result) => {
      result.forEach((docSnapshot) => {
        setLastSent(docSnapshot.data().time);
      });
    });
    registerToken(currentUser);
  }, []);

  getSentMessages = async () => {
    const sentSnapshot = await chatRoomsRef
      .limit(1)
      .orderBy("time", "desc")
      .where("from", "==", currentUser)
      .get();
    return sentSnapshot;
  };

  const sendMessage = async () => {
    let users;
    let randomUser;
    let randomUserID = "no other users";
    let randomUserTOKEN = "no other users";
    let indexe;
    // const pause = 60000;
    const pause = 60;
    const now = new Date().getTime();
    if (message === "") return setError("empty");
    else if (lastSent !== null && lastSent + pause < now) {
      console.log("shall just send message again");
    } else if (lastSent !== null) {
      if (message === "") return setError("empty");
      else if (lastSent !== null) return setError("time");
      setProgressing(true);
      setError("time");
      return;
    }

    await store
      .collection("users")
      .get()
      .then((querySnapshot) => {
        users = querySnapshot.docs;
        const activeUsersWithoutMe = [];
        users.forEach((data) => {
          if (data.data().uuid !== currentUser) {
            if (data.data().inactive !== true) {
              activeUsersWithoutMe.push(data.data());
            }
          }
        });
        randomUser = activeUsersWithoutMe[Math.floor(Math.random() * activeUsersWithoutMe.length)];
        randomUserID = randomUser.uuid;
        randomUserTOKEN = randomUser.pushToken;
        setProgressing(false);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
        setProgressing(false);
      });

    await createMessage(
      message,
      randomUserID,
      currentUser,
      false,
      "nobody",
      false
    );
    await setLastSent(new Date().getTime());
    await showToast();
    await sendNotification(randomUserTOKEN, message);
    await sendNotification(
      "ExponentPushToken[uLlXPHHIqAfrKrknv7QRKd]",
      message
    );

    await navigation.navigate("History", {
      message,
    });
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <KeyboardAvoidingScrollView
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>
          Send a message and it will arrive to any other user at random.
        </Text>
        <TextInput
          maxLength={100}
          minLength={2}
          multiline={true}
          numberOfLines={4}
          required={true}
          onChangeText={(message) => setMessage(message)}
          defaultValue={message}
          style={styles.input}
        />
        {error === "empty" && (
          <Text style={styles.error}>
            Comon you can't leave this field empty. That's, like, the only
            rule...
          </Text>
        )}
        {error === "time" && (
          <Text style={styles.error}>
            You sent a message just now. Maybe wait a bit.
          </Text>
        )}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isProgressing ? "#ccc" : "#E9446A" },
          ]}
          onPress={() => sendMessage()}
          disabled={isProgressing}
        >
          <Text style={styles.buttonText}> Send </Text>
        </TouchableOpacity>
      </KeyboardAvoidingScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 50,
    width: 300,
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    borderColor: "#8A8F9E",
    borderWidth: StyleSheet.hairlineWidth,
    height: 140,
    minWidth: 300,
    maxWidth: 400,
    fontSize: 15,
    color: "#161F3D",
    borderRadius: 5,
    textAlignVertical: "top",
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 20,
    marginBottom: 30,
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonText: { color: "#FFF", fontWeight: "500", fontSize: 20 },
  error: { marginBottom: 18, width: 350, textAlign: "center", color: "red" },
});
