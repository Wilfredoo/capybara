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
  const [messagesArray, setMessagesArray] = useState([]);

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
    const receivedSnapshot = await chatRoomsRef
      .orderBy("time", "desc")
      .where("to", "==", currentUser)
      .get();
    const receivedArray = receivedSnapshot.docs;
    return receivedArray;
  }

  const seeMessage = (id) => {
    navigation.navigate("Messages", {
      id,
    });
  };

  return (
    <>
      <Header navigation={navigation} where={"History"} />
      <View style={styles.container}>
        {messagesArray.length === 0 && (
          <ActivityIndicator size="large"></ActivityIndicator>
        )}
        <View style={styles.historyView}>
          <ScrollView>
            {messagesArray &&
              messagesArray.map((data, i) => {
                return (
                  <TouchableOpacity onPress={() => seeMessage(data.id)}>
                    <View style={styles.historyUnit} key={i}>
                      <Text>{data.message}</Text>
                      <View style={styles.flex}>
                        <Text style={{ color: "gray" }}>
                          {moment(data.time).fromNow()}
                        </Text>
                        <Feather
                          name="arrow-down-left"
                          size={30}
                          color="pink"
                        />
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
