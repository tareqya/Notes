import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  push,
  equalTo,
  query,
  child,
  orderByChild,
  remove,
  get,
  set,
  update,
} from "firebase/database";

import * as StorageDB from "firebase/storage";
import Note from "./Note";

import User from "./User";

const firebaseConfig = {
  apiKey: "AIzaSyAPRPmYYw8SY_Ktt6hPpcUb-DlEKQXgOpg",
  authDomain: "noteapp-33a4b.firebaseapp.com",
  databaseURL: "https://noteapp-33a4b-default-rtdb.firebaseio.com",
  projectId: "noteapp-33a4b",
  storageBucket: "noteapp-33a4b.appspot.com",
  messagingSenderId: "967412755540",
  appId: "1:967412755540:web:7895524d0b5b14d3abd1c1",
};

try {
  initializeApp(firebaseConfig);
} catch (err) {}
class Database {
  constructor() {
    this.auth = getAuth();
    this.db = getDatabase();
    this.storage = StorageDB.getStorage();
  }

  signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (err) {
      alert(err);
      return false;
    }
  };

  login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (err) {
      console.log(err);
      alert("Email or Password not correct!");
      return false;
    }
  };

  logout = () => {
    try {
      this.auth.signOut();
    } catch (err) {}
  };

  currentUser = () => {
    return this.auth.currentUser;
  };

  insertUserData = async (user) => {
    try {
      const reference = ref(this.db, `Users/${user.uid}`);
      await set(reference, user);
      return true;
    } catch (err) {
      alert(err);
      return false;
    }
  };

  getImageUri = async (path, callBack) => {
    try {
      const storageRef = StorageDB.ref(this.storage, path);
      const url = await StorageDB.getDownloadURL(storageRef);
      callBack(url);
    } catch (err) {
      alert("Failed to get image uri!");
      callBack(null);
      console.log(err);
    }
  };

  uploadImage = async (image, uid) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const ex_file = image.split(".").pop();
      const randomNumber = Math.floor(Math.random() * 1000000);
      const path = `NotesImages/${uid}/${randomNumber}.${ex_file}`;
      const storageRef = StorageDB.ref(this.storage, path);
      const metadata = {
        contentType: `image/${ex_file}`,
      };
      await StorageDB.uploadBytes(storageRef, blob, metadata);
      return path;
    } catch (err) {
      console.log(err);
      return "";
    }
  };

  insertNewNote = async (note) => {
    if (note.image != "") {
      note.image = await this.uploadImage(note.image, note.uid);
    }
    const reference = ref(this.db, "Notes");
    push(reference, note);
  };

  getUserInfo = (uid, callBack) => {
    const reference = ref(this.db, `Users/${uid}`);
    onValue(
      reference,
      (snapshot) => {
        if (snapshot.val() == null) {
          callBack(null);
          return;
        }
        const user = new User();
        user.fillData(snapshot.val());
        callBack(user);
      },
      {
        onlyOnce: true,
      }
    );
  };

  getUserNotes = (uid, callBack = () => {}) => {
    try {
      const reference = ref(this.db, "Notes");
      const notesRef = query(reference, orderByChild("uid"), equalTo(uid));

      return onValue(notesRef, async (snapshot) => {
        const notes = [];
        for (var key in snapshot.val()) {
          const note = new Note();
          note.fillData(snapshot.val()[key], key);
          notes.push(note);
        }
        callBack(notes);
      });
    } catch (err) {
      callBack(null);
      return null;
    }
  };

  deleteNote = async (note) => {
    const reference = ref(this.db, `Notes/${note.key}`);
    await remove(reference);
  };

  updateNote = async (note) => {
    if (note.image != "" && !note.image.startsWith("NotesImages")) {
      note.image = await this.uploadImage(note.image, note.uid);
    }

    const reference = ref(this.db, `Notes/${note.key}`);
    await update(reference, note);
  };
}

export default Database;
