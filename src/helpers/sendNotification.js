const sendNotification = (tokenToSend, messageBody = "default message") => {
  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      to: tokenToSend,
      sound: "default",
      title: "Capynotification!",
      body: messageBody, 
      data: { message: messageBody },
      channelId: "capynotifications"
    }),
  });
};

export default sendNotification;












