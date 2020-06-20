const sendNotification = async (tokenToSend) => {
  let response = fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      to: userPushToken,
      sound: "default",
      title: "Cool notification",
      body:
        "Someone sent you a notification while your phone was in your pocket",
    }),
  });
};

export default sendNotification;
