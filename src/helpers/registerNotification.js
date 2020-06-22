import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";

const store = firebase.firestore();
const usersRef = store.collection("users");

const registerToken = async (currentUser) => {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    return;
  }
  const token = await Notifications.getExpoPushTokenAsync();
  usersRef.doc(currentUser).update({ pushToken: token });
};

export default registerToken;
