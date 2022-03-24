
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,

} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_APP_FIREBASE_API_KEY}`,
    authDomain: `${import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN}`,
    projectId: `${import.meta.env.VITE_APP_FIREBASE_PROJECT_ID}`,
    storageBucket: `${import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${import.meta.env.VITE_APP_FIREBASE_APP_ID}`,
    measurementId: `${import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID}`
};

console.log(firebaseConfig)
console.log("test")


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth } 


export const registerWithEmailAndPassword = async (login: any, email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            login,
            authProvider: "local",
            email,
        });
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

export const logInWithEmailAndPassword = async (email: any, password: any) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};


