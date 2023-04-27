import { createContext, useContext, useState, useEffect } from "react";

// firebase imports
import { auth } from "../firebase";
// auth
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// context
export const FirebaseContext = createContext(null);

// provider
const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // sign in with google
  const googleProvider = new GoogleAuthProvider();
  const signinWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  // signup
  const createUser = async (email, password, name) => {
    try {
      console.log("creating user...");
      setLoading(true);
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      setLoading(false);
      console.log("Successfully created user", newUser);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // signin with email and password
  const signinWithEmailPassword = async (email, password) => {
    try {
      console.log("Login start");
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);

      console.log("successfully logged", res);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // signOut
  const loggingOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);

      console.log("successfully signedout");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // detecting user login or not
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    setLoading(false);
  }, [user]);

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        createUser,
        signinWithEmailPassword,
        signinWithGoogle,
        isLoggedIn,
        loggingOut,
        user,
        loading,
        setLoading,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

// custom hook for using context
export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export default FirebaseProvider;
