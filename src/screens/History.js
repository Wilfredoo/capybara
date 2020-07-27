import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import Header from "./Header";
import sendNotification from "../helpers/sendNotification.js";


export default function History({ navigation }) {
  const currentUser = firebase.auth().currentUser.uid;
  const store = firebase.firestore();
  const [messagesArray, setMessagesArray] = useState(["one element"]);
  const chatRoomsRef = store.collection("chatRooms");
  const usersRef = store.collection("users");

  useEffect(() => {
    getAllMessages().then((result) => {
      let messagesResult = [];
      result.forEach((docSnapshot) => {
        messagesResult.push(docSnapshot.data());
      });
      const sortedMessages = messagesResult.sort(compare);
      setMessagesArray(sortedMessages);
    });
  }, [navigation]);

  async function getAllMessages() {
    const unrepliedReceivedMessages = []
    const lastWeek = new Date().getTime() - 24 * 7 * 60 * 60 * 1000;
    const sentSnapshot = await chatRoomsRef
      .limit(10)
      .orderBy("time", "desc")
      .where("from", "==", currentUser)
      .where("hasReply", "==", false)
      .where("time", ">", lastWeek)
      .get();

    const receivedSnapshot = await chatRoomsRef
      .orderBy("time", "desc")
      .where("to", "==", currentUser)
      .where("hasReply", "==", false)
      .where("forgotten", "==", false)
      .where("reported", "==", false)
      .where("time", ">", lastWeek)
      .get();

    const sentArray = sentSnapshot.docs;
    const receivedArray = receivedSnapshot.docs;
    receivedArray.forEach(received => {
      console.log("received", received.data())
      if (!received.data().hasReply && !received.data().isReply) unrepliedReceivedMessages.push(received.data())
    })

    if (unrepliedReceivedMessages.length < 3) resumeActivity()
    const messagesArray = sentArray.concat(receivedArray);
    return messagesArray;
  }

  const seeMessage = (id) => {
    navigation.navigate("MessageThread", {
      id,
    });
  };

  function compare(a, b) {
    if (a.time > b.time) {
      return -1;
    }
    if (a.time < b.time) {
      return 1;
    }
    return 0;
  }

  const resumeActivity = async () => {
    console.log("hells angels")
    const myUserInfo = await usersRef.doc(currentUser).get()
    const myPushToken = await myUserInfo.data().pushToken
    console.log("myss", myUserInfo.data().inactive)
    if (myUserInfo.data().inactive) {
      console.log("shhai labeauf")
      sendNotification(myPushToken, "Your account is active again!");
      usersRef.doc(currentUser).set(
        {
          inactive: false,
        },
        { merge: true }
      );
    }

  
  };


  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <View>
          {messagesArray.length === 0 && (
            <Text>You have received no messages yet</Text>
          )}
        </View>
        {messagesArray.length === 1 && messagesArray[0] === "one element" && (
          <ActivityIndicator size="large"></ActivityIndicator>
        )}
        <ScrollView
          style={styles.historyView}
          showsHorizontalScrollIndicator={false}
        >
          {messagesArray &&
            messagesArray[0] !== "one element" &&
            messagesArray.map((data, i) => {
              return (
                <TouchableOpacity key={i} onPress={() => seeMessage(data.id)}>
                  <View style={styles.historyUnit}>
                    <Text numberOfLines={1} style={styles.message}>
                      {data.message}
                    </Text>
                    <View style={styles.flex}>
                      <Text style={{ color: "gray" }}>
                        {moment(data.time).fromNow()}
                      </Text>
                      <View style={styles.flex}>
                        {/* it was sent to me as a reply */}
                        {data.to === currentUser && data.isReply && (
                          <Text style={styles.tag}>Someone replied!</Text>
                        )}
                        {/* it was sent from me as a reply */}
                        {data.from === currentUser && data.isReply && (
                          <Text style={styles.tag}>Well said!</Text>
                        )}
                        {/* it was sent from me to the ether */}
                        {data.from === currentUser && !data.isReply && (
                          <Text style={styles.tag}>Waiting for a reply...</Text>
                        )}
                        {/* it was sent to me and is waiting for reply */}
                        {data.to === currentUser && !data.isReply && (
                          <Text style={styles.specialTag}>
                            Say something back!
                          </Text>
                        )}

                        {data.from === currentUser ? (
                          <Feather
                            name="arrow-up-right"
                            size={30}
                            color="#E9446A"
                          />
                        ) : (
                          <Feather
                            name="arrow-down-left"
                            size={30}
                            color="#E9446A"
                          />
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    alignItems: "baseline",
  },
  message: { width: 350, marginBottom: -2 },
  historyUnit: {
    marginTop: 15,
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#7d90a0",
  },
  tag: {
    fontSize: 10,
    backgroundColor: "#e3dfc8",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 6,
    textAlign: "left",
    marginRight: 12,
  },
  specialTag: {
    fontSize: 10,
    backgroundColor: "#E9446A",
    color: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 6,
    marginRight: 12,
  },
});
