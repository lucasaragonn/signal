// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDRr7x17dMxsISXLiK67kTsX_Iocopb86w',
  authDomain: 'signal-clone-yt-build-4be28.firebaseapp.com',
  projectId: 'signal-clone-yt-build-4be28',
  storageBucket: 'signal-clone-yt-build-4be28.appspot.com',
  messagingSenderId: '915506324362',
  appId: '1:915506324362:web:8da6f040fe9f8d0f415e73',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
