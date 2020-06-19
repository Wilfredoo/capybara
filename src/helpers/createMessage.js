import short from "short-uuid";
import firebaseConfig from "../../config/FirebaseConfig";
import * as firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const store = firebase.firestore();

const createMessage = (message, to, from, isReply, hasReply) => {
  const newShortUUID = short.generate();
  // create new message
  store.collection("chatRooms").doc(newShortUUID).set({
    id: newShortUUID,
    message,
    to,
    from,
    time: Date.now(),
    isReply,
    hasReply,
  });
};

export default createMessage;
