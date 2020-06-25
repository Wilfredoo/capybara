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

  useEffect(() => {
    getAllMessages().then((result) => {
      let messagesResult = [];
      result.forEach((docSnapshot) => {
        messagesResult.push(docSnapshot.data());
      });
      setMessagesArray(messagesResult);
    });
  }, []);

  const chatRoomsRef = store.collection("chatRooms");

  async function getAllMessages() {
    const sentSnapshot = await chatRoomsRef
      .orderBy("time", "desc")
      .where("from", "==", currentUser)
      .where("hasReply", "==", false)
      .get();

    const receivedSnapshot = await chatRoomsRef
      .orderBy("time", "desc")
      .where("to", "==", currentUser)
      .where("hasReply", "==", false)
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

  return (
    <>
      <Header navigation={navigation} where={"History"} />
      <View style={styles.container}>
        {messagesArray.length === 0 && (
          <Text>You have received no messages yet</Text>
        )}
        {messagesArray.length === 1 && messagesArray[0] === "one element" && (
          <ActivityIndicator size="large"></ActivityIndicator>
        )}
        <View style={styles.historyView}>
          <ScrollView>
            {messagesArray &&
              messagesArray[0] !== "one element" &&
              messagesArray.map((data, i) => {
                return (
                  <TouchableOpacity onPress={() => seeMessage(data.id)}>
                    <View style={styles.historyUnit} key={i}>
                      <Text style={{ width: 350 }}>{data.message}</Text>
                      <View style={styles.flex}>
                        <Text style={{ color: "gray" }}>
                          {moment(data.time).fromNow()}
                        </Text>
                        {data.from === currentUser ? (
                          <Feather
                            name="arrow-up-right"
                            size={30}
                            color="pink"
                          />
                        ) : (
                          <Feather
                            name="arrow-down-left"
                            size={30}
                            color="pink"
                          />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  historyView: {
    width: 350,
    marginTop: 40,
    position: "absolute",
    top: 80,
  },

  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  historyUnit: {
    marginTop: 15,
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#7d90a0",
  },
});
