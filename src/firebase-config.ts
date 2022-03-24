
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
const googleProvider = new GoogleAuthProvider();



export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

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

export const sendPasswordReset = async (email: any) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Reset Mot de passe envoyé ");
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

export const logout = () => {
    signOut(auth);
};

