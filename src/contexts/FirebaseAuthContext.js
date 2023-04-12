import { createContext, useEffect, useReducer, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import { firebaseConfig } from "../config";
import { InviteMailBody } from "../libs/Mail/MailContent";
import { sendMail } from "../services/service";
import {
  setInviteMailStatus,
  setInvitedMail,
} from "../redux/slices/contactSlice";

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

  const sendLoginLink = async (email, name, dispatch, redirect) => {
    const { body, doc } = InviteMailBody(email, name);
    dispatch(setInvitedMail(email));
    try {
      await sendMail(body);
      firebase.firestore().collection("inviteTokens").doc(doc?.uuid).set(doc);
      dispatch(setInviteMailStatus(true));

      redirect("/auth/invite-user/status");
    } catch (err) {
      dispatch(setInviteMailStatus(false));
      redirect("/auth/invite-user/status");
    }
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
        checkInvitationDoc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
