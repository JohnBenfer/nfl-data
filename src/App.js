import './css/App.css';
import Home from './components/Home';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FIREBASE_API_KEY } from '../secret';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "nfl-data-6af24.firebaseapp.com",
  projectId: "nfl-data-6af24",
  storageBucket: "nfl-data-6af24.appspot.com",
  messagingSenderId: "841845406729",
  appId: "1:841845406729:web:eb6abeb8b77b528d7d4cd8",
  measurementId: "G-4SC1EG119W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
