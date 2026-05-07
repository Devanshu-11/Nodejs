import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/NavBar.jsx";
import Body from "./components/Body.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import appStore from "./utils/appStore.jsx";
import Feed from "./components/Feed.jsx";

const App=()=>{
  return(
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>

              {/* children routes */}
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer />
    </>
  );
};

export default App;