import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import app from "../../firebase.js";
import { backendUrl } from "../config.js";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // MongoDB user
  const [loading, setLoading] = useState(true);

  // ✅ Email/password sign-up
  const EmailAndPasswordSignUp = async (name, email, password) => {
    setLoading(true);

    // Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUser = userCredential.user;

    // ✅ Set display name in Firebase user profile
    await updateProfile(firebaseUser, {
      displayName: name,
    });

    // ✅ Get Firebase ID token
    const idToken = await firebaseUser.getIdToken();

    // ✅ Sync with backend
    const res = await axios.post(
      backendUrl + "api/auth/sync",
      {
        name: name,
        email: firebaseUser.email,
        firebaseUID: firebaseUser.uid,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    // ✅ Set user states
    setUser(firebaseUser);
    setUserData(res.data.user);
    setLoading(false);
    return firebaseUser;
  };

  // ✅ Login with email/password
  const logIn = async (email, password) => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUser = userCredential.user;

    const idToken = await firebaseUser.getIdToken();
    const res = await axios.get(backendUrl + "api/auth/me", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    setUser(firebaseUser);
    setUserData(res.data.user);
    setLoading(false);

    return firebaseUser;
  };

  // ✅ Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ✅ Observe Firebase Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();

        try {
          const res = await axios.get(backendUrl + "api/auth/me", {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          setUserData(res.data.user);
        } catch (err) {
          console.error("Failed to fetch user data from backend:", err.message);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    userData,
    loading,
    EmailAndPasswordSignUp,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
