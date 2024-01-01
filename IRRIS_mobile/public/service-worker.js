importScripts("https://js.pusher.com/beams/service-worker.js");

console.log("service worker public")

PusherPushNotifications.onNotificationReceived = ({ pushEvent, payload }) => {
  // console.log("Push notification received. Payload data: ",JSON.parse(payload.notification.data) );

  // Log information about the event
  console.log("Push event:", pushEvent);
  // NOTE: Overriding this method will disable the default notification
  // handling logic offered by Pusher Beams. You MUST display a notification
  // in this callback unless your site is currently in focus
  // https://developers.google.com/web/fundamentals/push-notifications/subscribing-a-user#uservisibleonly_options

  // Your custom notification handling logic here 🛠️
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
  pushEvent.waitUntil(
    self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.icon,
      data: payload.data,
    })
  );
};