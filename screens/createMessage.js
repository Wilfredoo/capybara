import short from "short-uuid";
import * as firebase from "firebase";
const store = firebase.firestore();

const createMessage = (message, to, from, isReply, hasReply) => {
  console.log("lets create this message", message, to, from, isReply, hasReply);
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
