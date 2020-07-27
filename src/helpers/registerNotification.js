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

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('capynotifications', {
      name: 'capynotifications',
      sound: true,
      priority: 'high',
      vibrate: [0, 250, 250, 250],
    }).then(() => {
    });
  }
};

export default registerToken;
