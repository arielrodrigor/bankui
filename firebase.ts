import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let firebaseConfig;
if (process.env.NODE_ENV === 'test') {
    firebaseConfig =  {
        apiKey: "AIzaSyCXhtRmh2OYJTTy96DMb6xgLkfOboFyjyU",
        authDomain: "bankui-test.firebaseapp.com",
        projectId: "bankui-test",
        storageBucket: "bankui-test.appspot.com",
        messagingSenderId: "881843778509",
        appId: "1:881843778509:web:71cc2b5cfbcfda1c338a84"
    };
} else {
    firebaseConfig  = {
        apiKey: "AIzaSyAs7ZgdA3UxtQmauHENOBlLZA6dgFgwa2w",
        authDomain: "bankui-902c3.firebaseapp.com",
        projectId: "bankui-902c3",
        storageBucket: "bankui-902c3.appspot.com",
        messagingSenderId: "587365501764",
        appId: "1:587365501764:web:99847c83da1bd4a7e6a511"
    };
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};