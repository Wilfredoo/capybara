import React, { useState, useEffect } from "react";
import {
	Text,
	TextInput,
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";
import * as firebase from "firebase";
import Header from "./Header";
const short = require("short-uuid");
import moment from "moment";

export default function Reply({ navigation }) {
	const store = firebase.firestore();
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const { id } = navigation.state.params;
		const messageRef = store.collection("chatRooms").doc(id);
		messageRef
			.get()
			.then(function (doc) {
				if (doc.exists) {
					// console.log("Document data:", doc.data());
					setMessage(doc.data())
				} else {
					console.log("No such document!");
				}
			})
			.catch(function (error) {
				console.log("Error getting document:", error);
			});
	}, []);

	return (
		<View style={styles.container}>
			<Header />
			<Text>this message was sent to you</Text>
			{console.log("message in render", message)}
{message &&
<>
	<Text>From: {message.from}</Text>
	<Text>Says: {message.message}</Text>
	<Text>{moment(message.time).fromNow()}</Text>
	


	</>
}


		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
