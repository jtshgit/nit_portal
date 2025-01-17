import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'

import { getProtected } from './api/ApiAtd';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './comp/home/Home';

function App() {
  const [data, setData] = useState('');
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await getProtected();
        if (response.data) {
          console.log(response.data)
          setData(response.data);
        }
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    };
    verifyUser();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home data={data} />} />
      </Routes>
    </Router>
  );
}

export default App;
