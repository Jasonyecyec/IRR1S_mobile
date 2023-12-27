import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "d435836a9dccb68b244f",
  cluster: "ap1",
  encrypted: true,
  forceTLS: true

});