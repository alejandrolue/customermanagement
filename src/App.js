import logo from './logo.svg';
import './App.css';
import { db } from './config/firebase'
import {getDocs, collection} from 'firebase/firestore'
import {useEffect, useState} from "react";

function App() {
  //Example for Firebase firestore
  const [movieList, setMovieList] = useState([])
  const moviesCollectionsRef = collection(db, "clients")
  useEffect(() => {
    const getClientsList = async () => {
      //READ THE DATA
      // SET THE CLIENTS DATA
      try {
        const data = await getDocs(moviesCollectionsRef);
        console.log(data);
      } catch (err) {
        console.log(err)
      }
    }
    getClientsList()
  }, []);
  return (
    <div className="App">
    </div>
  );
}

export default App;
