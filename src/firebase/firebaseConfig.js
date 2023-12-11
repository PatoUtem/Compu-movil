import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBtQN1Hw9p-FKxoDDAlcHZwsvSN0DOdmtI",
  authDomain: "proyecto-comp-movil.firebaseapp.com",
  databaseURL: "https://proyecto-comp-movil-default-rtdb.firebaseio.com",
  projectId: "proyecto-comp-movil",
  storageBucket: "proyecto-comp-movil.appspot.com",
  messagingSenderId: "567674582515",
  appId: "1:567674582515:web:e2735f6591f2dd9bca0e86",
  databaseURL: "https://proyecto-comp-movil-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const database = getDatabase(app);

export { auth, database };
