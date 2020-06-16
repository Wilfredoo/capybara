import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import Header from "./Header";
import { NavigationEvents } from "react-navigation";

export default function History({ navigation }) {
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
		const receivedSnapshot = await chatRoomsRef
			.where("to", "==", currentUser)
			.get();

		const receivedArray = receivedSnapshot.docs;
		return receivedArray;
	}

	const reply = (id) => {
		navigation.navigate("Reply", {
			id,
		});
	};

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.historyView}>
				<ScrollView>
					{messagesArray &&
						messagesArray.map(data => {
							return (
								<TouchableOpacity onPress={() => reply(data.id)}>
									<View style={styles.historyUnit}>
										<Text>{data.message}</Text>
										<View style={styles.flex}>
											<Text style={{ color: "gray" }}>
												{moment(data.time).fromNow()}
											</Text>
											<Feather name="arrow-down-left" size={30} color="pink" />
										</View>
									</View>
								</TouchableOpacity>
							);
						})}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	historyView: {
		width: 300,
		marginTop: 10,
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
