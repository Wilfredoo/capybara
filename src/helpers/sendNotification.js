const sendNotification = (tokenToSend, messageBody = "") => {
  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      to: tokenToSend,
      sound: "default",
      title: "Someone sent you a message. Lucky you.",
      body: messageBody,
      data: { message: messageBody },
    }),
  });
};

export default sendNotification;
