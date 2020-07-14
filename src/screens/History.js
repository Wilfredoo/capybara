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

export default function History({ navigation }) {
  const currentUser = firebase.auth().currentUser.uid;
  const store = firebase.firestore();
  const [messagesArray, setMessagesArray] = useState(["one element"]);
  const chatRoomsRef = store.collection("chatRooms");

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
    const sentSnapshot = await chatRoomsRef
      .limit(20)
      .orderBy("time", "desc")
      .where("from", "==", currentUser)
      .where("hasReply", "==", false)
      .get();

    const receivedSnapshot = await chatRoomsRef
      .limit(20)
      .orderBy("time", "desc")
      .where("to", "==", currentUser)
      .where("hasReply", "==", false)
      .where("forgotten", "==", false)
      .where("reported", "==", false)
      .get();

    const sentArray = sentSnapshot.docs;
    const receivedArray = receivedSnapshot.docs;
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
        <ScrollView style={styles.historyView} showsHorizontalScrollIndicator={false}>
          {messagesArray &&
            messagesArray[0] !== "one element" &&
            messagesArray.map((data, i) => {
              return (
                <TouchableOpacity key={i} onPress={() => seeMessage(data.id)}>
                  <View style={styles.historyUnit}>
                    <Text style={{ width: 350, marginBottom:-2 }}>{data.message}</Text>
                    <View style={styles.flex}>
                      <Text style={{ color: "gray" }}>
                        {moment(data.time).fromNow()}
                      </Text>
                      {data.from !== currentUser && data.isReply && <Text style={styles.tag}>Someone replied!</Text>}
                      {data.from === currentUser && data.isReply && <Text style={styles.tag}>Well said!</Text>}
                      {data.from === currentUser && !data.isReply && <Text style={styles.tag}>Waiting for a reply...</Text>}
                      {data.from !== currentUser && !data.isReply && <Text style={styles.tag}>Say something back!</Text>}

                      {data.from === currentUser ? (
                        <Feather name="arrow-up-right" size={30} color="#E9446A" />
                      ) : (
                        <Feather
                          name="arrow-down-left"
                          size={30}
                          color="#E9446A"
                        />
                      )}
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
    alignItems: "center"
  },
  historyUnit: {
    marginTop: 15,
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#7d90a0",
  }
  ,
  tag:
  {fontSize: 10, backgroundColor: "#7d5a5a", color:"#fff", paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, marginBottom: 10}
});
