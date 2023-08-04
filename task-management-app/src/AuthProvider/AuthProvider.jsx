/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import app from "./FirebaseAuth";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(user);


  // log in with google
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };


  //   to log out existing user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };



  // to observe auth state change
  useEffect(() => {
    const unmount = onAuthStateChanged(auth, (currentUser) => {
      console.log("auth state change:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unmount();
  }, []);

  //   to pass the data
  const AuthInfo = {
    user,
    setUser,
    googleSignIn,
    logOut,
    loading,
  };


  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
