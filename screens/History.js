import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

export default function History() {
	const currentUser = firebase.auth().currentUser;
	const store = firebase.firestore();
	const [messagesArray, setMessagesArray] = useState([]);

	useEffect(() => {
		getAllMessages().then(result => {
			result.forEach(docSnapshot => {
				setMessagesArray(oldMessagesArray => [...oldMessagesArray, docSnapshot.data()]);

			});
		});
	}, []);

	const chatRoomsRef = store.collection("chatRooms");

	async function getAllMessages() {
		const sentMessages = chatRoomsRef
			.where("from", "==", currentUser.uid)
			.get();
		const receivedMessages = chatRoomsRef
			.where("to", "==", currentUser.uid)
			.get();

		const [sentSnapshot, receivedSnapshot] = await Promise.all([
			sentMessages,
			receivedMessages,
		]);

		const sentArray = sentSnapshot.docs;
		const receivedArray = receivedSnapshot.docs;
		const messagesArray = sentArray.concat(receivedArray);
		return messagesArray;
	}


	return (
		<View style={styles.container}>
			{console.log("the array", messagesArray)}

			<Text style={{ marginBottom: 30 }}>Your History here</Text>
			<ScrollView>
			</ScrollView>
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
