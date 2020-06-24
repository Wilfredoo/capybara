import React from "react";
import { Text, View, StyleSheet } from "react-native";
import moment from "moment";

export default function SentMessage({ data }) {
  console.log("data props", data.type);
  return (
    <View style={styles.container}>
      {data.data && data.type === "sent" && (
        <>
          <Text>
            Your message has no replies yet :({"\n"}
            {"\n"} maybe no one found it interesting?{"\n"}
          </Text>
          <Text>{data.data.message}</Text>
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
    top: 60,
    alignItems: "center",
  },
});
