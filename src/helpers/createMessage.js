import short from "short-uuid";
import firebaseConfigDEV from "../../config/FirebaseConfigDEV";
import firebaseConfigPROD from "../../config/FirebaseConfigPROD";
import * as firebase from "firebase";

if (__DEV__) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfigDEV);
  }
} else {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfigPROD);
  }
}

const store = firebase.firestore();

const createMessage = (message, to, from, isReply, inReplyTo, hasReply) => {
  const newShortUUID = short.generate();
  store.collection("chatRooms").doc(newShortUUID).set({
    id: newShortUUID,
    message,
    to,
    from,
    time: Date.now(),
    isReply,
    inReplyTo,
    hasReply,
    forgotten: false,
    reported: false
  });
};

export default createMessage;
