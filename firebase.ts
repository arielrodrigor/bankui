import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAs7ZgdA3UxtQmauHENOBlLZA6dgFgwa2w",
    authDomain: "bankui-902c3.firebaseapp.com",
    projectId: "bankui-902c3",
    storageBucket: "bankui-902c3.appspot.com",
    messagingSenderId: "587365501764",
    appId: "1:587365501764:web:99847c83da1bd4a7e6a511"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};