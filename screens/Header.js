import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
} from "react-native";

export default function Header() {
	return (
			<View style={styles.row}>
				<Image
					style={{ width: 40, height: 40, bottom: 18 }}
					source={require("../assets/splash.png")}
				/>
				<Text style={{ marginBottom: 30 }}>Message in a bottle</Text>
				<Image
					style={{ width: 40, height: 40, bottom: 18 }}
					source={require("../assets/splash.png")}
				/>
			</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		position: "absolute",
		top: 50,
	},
});
