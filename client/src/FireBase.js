import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { UserContext } from "./UserContext";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCYA9axYtWTqYy8cyNdHM05JRwZo83Wnzs",
  authDomain: "eka-dashboard.firebaseapp.com",
  projectId: "eka-dashboard",
  storageBucket: "eka-dashboard.appspot.com",
  messagingSenderId: "467125809730",
  appId: "1:467125809730:web:d50bb1ff362b6fb713b3db",
  measurementId: "G-X6LZEHZ1MF",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const AuthStateProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setVerified(user.emailVerified);
      } else {
        setEmail(null);
        setVerified(false);
      }
    });
  }, []);

  const handleLogin = () => {
    signInWithGoogle().then((result) => {
      setEmail(result.user.email);
      setVerified(result.user.emailVerified);
    });
  };

  const handleLogout = async () => {
    const res = await signOut(auth);
    setEmail(null);
    setVerified(false);
    return res;
  };

  return (
    <UserContext.Provider
      value={{ email, verified, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
