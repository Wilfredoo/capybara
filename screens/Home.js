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

export default function Home() {
	const [message, setMessage] = useState("");
	useEffect(() => console.log(message), [message]);
	const currentUser = firebase.auth().currentUser.uid;
	const store = firebase.firestore();

	const sendMessage = async () => {
		let users;
		let randomUser;
		let me;
		let indexe = "s";

		await store
			.collection("users")
			.get()
			.then(querySnapshot => {
				users = querySnapshot.docs;
				users.map((data, index) => {
					if (data.id === currentUser) {
						indexe = index
					} 
				})
				if (indexe !== -1) users.splice(indexe, 1);
				randomUser = users[Math.floor(Math.random() * users.length)].id;
			})
			.catch(function (error) {
				console.log("Error getting documents: ", error);
			});

		store
			.collection("chatRooms")
			.doc("chat_" + currentUser + "_" + randomUser)
			.set({
				message,
				to: randomUser,
				from: currentUser,
				time: Date.now()
			});
	};

	return (
		<View style={styles.container}>
			<Text style={{ marginBottom: 30 }}>Message in a bottle</Text>
			<Image
				style={{ width: 50, height: 50 }}
				source={require("../assets/splash.png")}
			/>
			<TextInput
				multiline={true}
				numberOfLines={4}
				style={{ height: 40 }}
				placeholder={
					"Be creative! \nOr just be yourself. \nDo whatever you want."
				}
				onChangeText={message => setMessage(message)}
				defaultValue={message}
				style={styles.input}
			/>
			<TouchableOpacity style={styles.button} onPress={() => sendMessage()}>
				<Text style={{ color: "#FFF", fontWeight: "500" }}> Send </Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		borderColor: "#8A8F9E",
		borderWidth: StyleSheet.hairlineWidth,
		height: 140,
		minWidth: 250,
		fontSize: 15,
		color: "#161F3D",
		borderRadius: 5,
		textAlignVertical: "top",
	},
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
});
