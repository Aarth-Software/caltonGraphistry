import { createContext, useEffect, useReducer, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import { firebaseConfig } from "../config";

const INITIALIZE = "INITIALIZE";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  firebase.database();
}
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === INITIALIZE) {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [profile, setProfile] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const docRef = firebase.firestore().collection("users").doc(user.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                setProfile(doc.data());
              }
            })
            .catch((error) => {
              console.error(error);
            });

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      }),
    [dispatch]
  );

  const signIn = (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const signInWithFaceBook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const signInWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const signUp = (email, password, firstName, lastName) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .firestore()
          .collection("loginUsers")
          .doc(res.user?.uid)
          .set({
            uid: res.user?.uid,
            email,
            displayName: `${firstName} ${lastName}`,
          });
        const db = firebase.database();
        db.ref("users").push({
          uid: res.user?.uid,
          firstname: firstName,
          lastname: lastName,
          email,
          displayName: `${firstName} ${lastName}`,
          timestamp: Date.now(),
        });
      })
      .catch((err) => console.log(err));
  // const signUp = (email, password, firstName, lastName) =>
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((res) => {
  //       res.user.sendEmailVerification(); // sends verification email
  //       firebase
  //         .firestore()
  //         .collection("loginUsers")
  //         .doc(res.user?.uid)
  //         .set({
  //           uid: res.user?.uid,
  //           email,
  //           displayName: `${firstName} ${lastName}`,
  //         });
  //       const db = firebase.database();
  //       db.ref("users").push({
  //         uid: res.user?.uid,
  //         firstname: firstName,
  //         lastname: lastName,
  //         email,
  //         displayName: `${firstName} ${lastName}`,
  //         timestamp: Date.now(),
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // const signUp = (email, password, firstName, lastName) =>
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((res) => {
  //       const actionCodeSettings = {
  //         url: "http://localhost:3000/auth/sign-in", // URL to redirect to after email verification is successful
  //         handleCodeInApp: true, // This must be true for the signInWithEmailLink() method to work
  //       };
  //       return res.user.sendEmailVerification(actionCodeSettings); // sends verification email with additional action code settings
  //     })
  //     .then(() => {
  //       // Prompt the user to click on the email verification link and return them to your app
  //       const emailVerificationLink = prompt(
  //         "Please check your email and enter the verification link here"
  //       );
  //       return firebase
  //         .auth()
  //         .signInWithEmailLink(email, emailVerificationLink);
  //     })
  //     .then((result) => {
  //       const user = result.user;
  //       // User is signed in only after clicking the email verification link
  //       firebase
  //         .firestore()
  //         .collection("loginUsers")
  //         .doc(user.uid)
  //         .set({
  //           uid: user.uid,
  //           email,
  //           displayName: `${firstName} ${lastName}`,
  //         });
  //       const db = firebase.database();
  //       db.ref("users").push({
  //         uid: user.uid,
  //         firstname: firstName,
  //         lastname: lastName,
  //         email,
  //         displayName: `${firstName} ${lastName}`,
  //         timestamp: Date.now(),
  //       });
  //     })
  //     .catch((err) => console.log(err));

  const signOut = async () => {
    await firebase.auth().signOut();
  };

  const resetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  const auth = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "firebase",
        user: {
          id: auth.uid,
          email: auth.email,
          avatar: auth.avatar || profile?.avatar,
          displayName: auth.displayName || profile?.displayName,
          role: "user",
        },
        signIn,
        signUp,
        signInWithGoogle,
        signInWithFaceBook,
        signInWithTwitter,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
