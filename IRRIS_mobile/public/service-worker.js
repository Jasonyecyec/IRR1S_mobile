importScripts("https://js.pusher.com/beams/service-worker.js");

console.log("Service worker public");

// Define an async function to open the IndexedDB database
async function openDatabase() {
  return new Promise(async (resolve, reject) => {
    try {
      const request = indexedDB.open("job_order_notification", 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create an object store if it doesn't exist
        if (!db.objectStoreNames.contains("notifications")) {
          db.createObjectStore("notifications", { keyPath: "id", autoIncrement: true });
        }
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    } catch (error) {
      reject(error);
    }
  });
}

PusherPushNotifications.onNotificationReceived = async ({ pushEvent, payload }) => {
  console.log("Push notification received. Payload data: ", JSON.parse(payload.data.content));
  console.log("Push notification received. Notification type: ", payload.data.type);

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

   // Store the notification in IndexedDB
 try {
    // Store the notification in IndexedDB
    const db = await openDatabase();
    const tx = db.transaction("notifications", "readwrite");
    const store = tx.objectStore("notifications");

    // Create an object with the content data only
    const notificationData = {
      content: JSON.parse(payload.data.content),
    };

    await store.add(notificationData);
    console.log("Notification stored in IndexedDB.");

    // Close the database
    tx.oncomplete = () => {
      db.close();
    };
  } catch (error) {
    console.error("Error opening IndexedDB or storing notification:", error);
  }
};
