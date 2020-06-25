import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import moment from "moment";
import * as firebase from "firebase";

export default function ReceivedMessage({ data, reply }) {
  const [message, setMessage] = useState(null);
  const store = firebase.firestore();

  return (
    <View>
      {data.data && data.type === "received" && (
        <>
          {data.previousMessage && data.data.isReply && (
            <>
              <Text style={styles.previousMessage}>
                In reply to your message: {"\n"}
                {"\n"}
                <Text style={styles.highlight}>
                  {" "}
                  {data.previousMessage.message}
                </Text>
                {"\n"} -
                <Text style={{ fontStyle: "italic" }}>
                  , {moment(data.previousMessage.time).fromNow()}
                </Text>
              </Text>
            </>
          )}
          <Text style={styles.message}>
            You received this message: {"\n"}
            {"\n"}
            <Text style={styles.highlight}> {data.data.message}</Text> {"\n"}-{" "}
            {data.sender && data.sender.name && (
              <Text style={{ fontStyle: "italic" }}>
                {data.sender.name}, {moment(data.data.time).fromNow()}
              </Text>
            )}
          </Text>

          {!data.data.isReply && (
            <>
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder={
                  "You can say, for example: Our life is frittered away by detail... simplify, simplify."
                }
                onChangeText={(text) => setMessage(text)}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => reply(data.data.from, data.data.id, message)}
              >
                <Text style={{ color: "#FFF", fontWeight: "500" }}>Reply</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  input: {
    borderColor: "#8A8F9E",
    borderWidth: StyleSheet.hairlineWidth,
    height: 140,
    maxWidth: 350,
    fontSize: 15,
    color: "#161F3D",
    borderRadius: 5,
    textAlignVertical: "top",
    paddingLeft: 10,
    paddingTop: 10,
    marginTop: 40,
  },
  previousMessage: {
    marginBottom: 30,
    textAlign: "center",
  },
  message: {
    marginTop: 30,
    textAlign: "center",
  },
  highlight: {
    fontSize: 20,
  },
});
