import React from 'react'
import NavBar from './NavBar.jsx';
import { Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';

const Body=()=>{
    return(
        <div>
            <NavBar />
            {/* Outlet is a placeholder component used for nested routing */}
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body;