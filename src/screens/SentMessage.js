import React from "react";
import { Text, View, StyleSheet } from "react-native";
import moment from "moment";

export default function SentMessage({ data }) {
  return (
    <View style={styles.container}>
      {data.data && data.type === "sent" && (
        <>
          {!data.data.isReply && (
            <Text>
              Your message has no replies yet :({"\n"}
              {"\n"} maybe no one found it interesting?{"\n"}
            </Text>
          )}
          {data.previousMessage && data.data.isReply && (
            <Text>
              In reply to: {"\n"}
              {data.previousMessage.message}
              {"\n"}
            </Text>
          )}
          <Text>You sent this message: {data.data.message}</Text>
          <Text style={{ fontStyle: "italic" }}>
            {moment(data.data.time).fromNow()}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
