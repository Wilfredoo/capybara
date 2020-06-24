import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function SentMessage({ props }) {
  return (
    <View style={styles.container}>
      {this.props.data && this.props.type === "sent" && (
        <>
          <Text>
            Your message has no replies yet :({"\n"} maybe no one found it
            interesting?{"\n"}
          </Text>
          <Text>{this.props.data.message}</Text>
          <Text style={{ fontStyle: "italic" }}>
            {moment(this.props.data.time).fromNow()}
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
