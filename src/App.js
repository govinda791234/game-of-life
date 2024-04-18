import { useState } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import Playground from './pages/Playground/Playground';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from './Context';


function App() {
  const [gridList,setGridList]=useState([
    {
    rows:16,cols:16
    },
  ])
  return (
    <Context.Provider value={{gridList,setGridList}}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={< Home/>}></Route>
            <Route path="playground" element={ <Playground/> } />
          </Routes>
        </BrowserRouter>
      </div>
    </Context.Provider>

  );
}

export default App;
