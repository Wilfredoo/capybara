import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { Feather } from "@expo/vector-icons";

export default function History() {
	const currentUser = firebase.auth().currentUser.uid;
	const store = firebase.firestore();
	const [messagesArray, setMessagesArray] = useState([]);

	useEffect(() => {
		getAllMessages().then(result => {
			result.forEach(docSnapshot => {
				setMessagesArray(oldMessagesArray => [
					...oldMessagesArray,
					docSnapshot.data(),
				]);
			});
		});
	}, []);

	const chatRoomsRef = store.collection("chatRooms");

	async function getAllMessages() {
		const sentMessages = chatRoomsRef.where("from", "==", currentUser).get();
		const receivedMessages = chatRoomsRef.where("to", "==", currentUser).get();

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
			<Text style={{ marginBottom: 30 }}>Your History here</Text>
			{messagesArray &&
				messagesArray.map(data => {
					{
						console.log("data from", data.from);
					}
					{
						console.log("currentuser", currentUser);
					}

					return (
						<>

							<Text>{data.message}</Text>
							<Text>{moment(data.time).fromNow()}</Text>
							{data.from === currentUser ? (
								<Feather name="arrow-up-right" size={30} color="pink" />
							) : (
								<Feather name="arrow-down-left" size={30} color="pink" />
							)}
						
						</>
					);
				})}
			<ScrollView></ScrollView>
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
