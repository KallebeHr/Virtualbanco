// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
const options = {
  // You can set your default options here
};
// Composables
import { createApp } from 'vue'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXvS56T3XBP45-5P-rJwkUmXvoo1wL8-U",
    authDomain: "bancovirtual-ebc0e.firebaseapp.com",
    projectId: "bancovirtual-ebc0e",
    storageBucket: "bancovirtual-ebc0e.appspot.com",
    messagingSenderId: "26538451511",
    appId: "1:26538451511:web:d7ce7d684aa4ff3eba55b2",
    measurementId: "G-82D6077KRG"
  };


// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
const firestore = getFirestore(appFirebase);

const appVue = createApp(App)

registerPlugins(appVue)
appVue.mount('#app')
