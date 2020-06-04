import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

export default {
  loginUser: (email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('logged in');
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  },
  signInUser: (email, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const { uid } = firebase.auth().currentUser;

        firestore()
          .collection('users')
          .doc(uid)
          .set({
            name: '',
            lastname: '',
            email: '',
            phoneNumber: '',
          })
          .then(() => {
            console.log(`User account created & signed in! ID ${uid}`);
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  },
  signOut: () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  },
};
