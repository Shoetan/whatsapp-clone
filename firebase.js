import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyARQD3HJN1rVR20XA2Xl40j7j2bPQwsm-w",
    authDomain: "whatsapp-clone-2d235.firebaseapp.com",
    projectId: "whatsapp-clone-2d235",
    storageBucket: "whatsapp-clone-2d235.appspot.com",
    messagingSenderId: "806896583437",
    appId: "1:806896583437:web:c999dc4a50e0f1af396644"
  };

/* if the app is not already initialize a new one else use the existing app */
const app = initializeApp(firebaseConfig)

const dataBase = getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {dataBase, auth, provider}
