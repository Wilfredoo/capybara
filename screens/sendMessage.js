// const reply = (senderId) => {
//     console.log("received message id", receivedMessage.id);
//     //update responded message

//     messageRef.update({foo: 'bar'}).then(res => {
//   console.log(`Document updated at ${res.updateTime}`);
// });

//     // create new message
//     const newShortUUID = short.generate();
//     store.collection("chatRooms").doc(newShortUUID).set({
//       id: newShortUUID,
//       message: message,
//       to: senderId.uuid,
//       from: currentUser,
//       time: Date.now(),
//       reply: true,
//     });
//   };

//   store.collection("chatRooms").doc(newShortUUID).set({
//     id: newShortUUID,
//     message,
//     to: randomUser,
//     from: currentUser,
//     hasReply: false,
//     time: Date.now(),
//   });
