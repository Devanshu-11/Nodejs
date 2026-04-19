import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import NavBar from "./NavBar";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

const App=()=>{
  return(
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>

            {/* children routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;