
//ORIGINAL
// if('serviceWorker' in navigator) navigator.serviceWorker.register('/dev-sw.js?dev-sw', { scope: '/', type: 'classic' })

//PUSH NOTIFICATIONS WORKS ON THIS ONE 
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Error registering Service Worker:', error);
      });
  }

// if ('serviceWorker' in navigator) {
//    // Register the VitePWA service worker
//    navigator.serviceWorker.register('/dev-sw.js?dev-sw', { scope: '/', type: 'classic' })
//    .then((registration) => {
//      console.log('VitePWA Service Worker registered with scope:', registration.scope);
//    })
//    .catch((error) => {
//      console.error('Error registering VitePWA Service Worker:', error);
//    });


//       // Register your custom service worker
//       navigator.serviceWorker.register('/service-worker.js', { scope: '/src/pages/' })
//       .then((registration) => {
//         console.log('Custom Service Worker registered with scope:', registration.scope);
//       })
//       .catch((error) => {
//         console.error('Error registering Custom Service Worker:', error);
//       });

   

//   }
  