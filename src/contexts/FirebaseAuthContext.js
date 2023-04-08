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
  isAdmin: null,
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
  const [admin, setAdmin] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const docRef = firebase
            .firestore()
            .collection("loginUsers")
            .doc(user.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                setAdmin(doc.data().isAdmin);
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

  const signUp = (
    email,
    password,
    firstName,
    lastName,
    affiliation,
    organisation,
    token
  ) =>
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
            isAdmin: "user",
            affiliation,
            organisation,
          });
        const db = firebase.database();
        db.ref("users").push({
          uid: res.user?.uid,
          firstname: firstName,
          lastname: lastName,
          email,
          displayName: `${firstName} ${lastName}`,
          timestamp: Date.now(),
          affiliation,
          organisation,
        });
        firebase
          .firestore()
          .collection("inviteTokens")
          .doc(token)
          .get()
          .then((doc) => {
            if (doc.exists && doc.data().activeLink) {
              firebase
                .firestore()
                .collection("inviteTokens")
                .doc(token)
                // .update({
                //   activeLink: false,
                // });
                .delete() // use delete() instead of update()
                .then(() => {
                  console.log("Document successfully deleted!");
                })
                .catch((error) => {
                  console.error("Error removing document: ", error);
                });
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));

  const signOut = async () => {
    await firebase.auth().signOut();
  };

  const resetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  // const sendLoginLink = (email) => {
  //   const actionCodeSettings = {
  //     url: "http://localhost:3000/auth/sign-in",
  //     handleCodeInApp: true,
  //     // Expire the link after 5 minutes
  //     // expireAfterSeconds: 300,
  //     singleUse: true,
  //     oneTimeCode: true,
  //   };

  //   firebase
  //     .auth()
  //     .sendSignInLinkToEmail(email, actionCodeSettings)
  //     .then(() => {
  //       // The link was successfully sent
  //       console.log("link send successfully");
  //     })
  //     .catch((error) => {
  //       // Handle the error
  //       console.log(`link send unsuccessfully ${error}`);
  //     });
  // };

  const sendLoginLink = (email) => {
    const actionCodeSettings = {
      url:
        "http://localhost:3000/auth/sign-up?email=" + encodeURIComponent(email),
      handleCodeInApp: true,
      // Expire the link after first use
      // This is achieved by setting the singleUse and oneTimeCode options to true
      singleUse: true,
      oneTimeCode: true,
      // Set the email subject
      // This is optional
      emailSubject: "invitation from litdig",
      // Set the email body
      // This is optional
      emailBody: "please click the this link to sign up into the account",
    };

    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent
        console.log("link send successfully");
      })
      .catch((error) => {
        // Handle the error
        console.log(`link send unsuccessfully ${error}`);
      });
  };

  const checkEmailLoginMethod = () => {
    // if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    //   // Step 6: Sign in with email link
    //   firebase
    //     .auth()
    //     .signInWithEmailLink(
    //       "srinivasa.chary066@gmail.com",
    //       window.location.href
    //     )
    //     .then((userCredential) => {
    //       // Signed in successfully, get user data
    //       const user = userCredential.user;
    //       const idToken = user.getIdToken();
    //       const accessToken = user.getIdToken(true);
    //       // Do something with the user data and authentication tokens
    //       console.log([`User email:`, user.email]);
    //       console.log([`ID token:`, idToken]);
    //       console.log([`Access token:`, accessToken]);
    //     })
    //     .catch((error) => {
    //       // Handle sign-in errors
    //       console.log(`Sign-in error: ${error}`);
    //     });
    // }
  };

  const checkInvitationDoc = (setActiveLink, token) => {
    setActiveLink(null);
    const docRef = firebase.firestore().collection("inviteTokens").doc(token);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setActiveLink(doc.data().activeLink);
        } else {
          console.log("No such document!");
          setActiveLink(false);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
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
          isAdmin: admin,
        },

        signIn,
        signUp,
        signInWithGoogle,
        signInWithFaceBook,
        signInWithTwitter,
        signOut,
        resetPassword,
        sendLoginLink,
        checkEmailLoginMethod,
        checkInvitationDoc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
