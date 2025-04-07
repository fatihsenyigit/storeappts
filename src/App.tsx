import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="bg-slate-500 min-h-screen text-center">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favorites' element={<FavoritesPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
