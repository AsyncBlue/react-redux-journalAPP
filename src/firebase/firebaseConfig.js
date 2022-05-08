// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCje5lpvF9QK38Iu0m7RHXrzTfm61bnhpc',
  authDomain: 'journal-react-redux-e0f3a.firebaseapp.com',
  projectId: 'journal-react-redux-e0f3a',
  storageBucket: 'journal-react-redux-e0f3a.appspot.com',
  messagingSenderId: '488622233526',
  appId: '1:488622233526:web:dff6cf5e015883e3301317'
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
  db,
  googleAuthProvider,
  firebase
}
