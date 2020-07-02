import React from "react";
import { Text, View, StyleSheet } from "react-native";
import moment from "moment";

export default function SentMessage({ data }) {
  return (
    <View>
      {data.data && data.type === "sent" && (
        <>
          {data.previousMessage && data.data.isReply && (
            <Text style={styles.previousMessage}>
              In reply to: {"\n"}
              {"\n"}
              <Text style={styles.highlight}>
                {" "}
                {data.previousMessage.message}
              </Text>
              {"\n"}-{" "}
              <Text style={{ fontStyle: "italic" }}>
                {data.sender.name},{" "}
                {moment(data.previousMessage.time).fromNow()}
              </Text>
            </Text>
          )}
          <Text style={styles.message}>
            You sent this message:{"\n"}
            {"\n"} <Text style={styles.highlight}>{data.data.message}</Text>
            {"\n"}-{" "}
            <Text style={{ fontStyle: "italic" }}>
              {moment(data.data.time).fromNow()}
            </Text>
          </Text>
          {!data.data.isReply && (
            <Text style={styles.noReplies}>
              Your message has no reply yet{"\n"}
              {"\n"} Maybe no one found it interesting?{"\n"}
            </Text>
          )}
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
  noReplies: {
    marginTop: 50,
    textAlign: "center",
  },
});
