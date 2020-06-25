import React from "react";
import { Text, View, StyleSheet } from "react-native";
import moment from "moment";

export default function SentMessage({ data }) {
  return (
    <View>
      {data.data && data.type === "sent" && (
        <>
          {!data.data.isReply && (
            <Text>
              Your message has no replies yet :({"\n"}
              {"\n"} maybe no one found it interesting?{"\n"}
            </Text>
          )}
          {data.previousMessage && data.data.isReply && (
            <Text style={styles.previousMessage}>
              In reply to: {"\n"}
              {"\n"}
              <Text style={styles.highlight}>
                {" "}
                {data.previousMessage.message}
              </Text>
              -{" "}
              <Text style={{ fontStyle: "italic" }}>
                {moment(data.previousMessage.time).fromNow()}
              </Text>
            </Text>
          )}
          <Text style={styles.message}>
            You sent this message:{"\n"}
            {"\n"} <Text style={styles.highlight}>{data.data.message}</Text>-{" "}
            <Text style={{ fontStyle: "italic" }}>
              {moment(data.data.time).fromNow()}
            </Text>
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
