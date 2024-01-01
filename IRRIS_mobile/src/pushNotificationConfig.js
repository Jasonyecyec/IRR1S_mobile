import * as PusherPushNotifications from "@pusher/push-notifications-web";
// importScripts("https://js.pusher.com/beams/service-worker.js");

// import Pusher from "pusher-js/types/src/core/pusher";
    
const pusherConfig = {  
    instanceId: '43454ca9-b7d3-4dd9-9584-f46b0cf329fa',
  };

const beamsClient = new PusherPushNotifications.Client({
  instanceId: pusherConfig.instanceId,
});  
  export default beamsClient;