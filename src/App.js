import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/home';
import Card from './components/card';
 // Adjust the path based on your directory structure

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/card/' element={<Card />} />
    </Routes>
  );
}

export default App;
