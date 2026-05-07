import React from 'react';
import { useSelector } from 'react-redux';

const NavBar=()=>{
  const user=useSelector((store)=>store.user);
  console.log(user);

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8">

      {/* Left - Brand */}
      <div className="flex-1">
        <a className="text-2xl font-bold tracking-wide cursor-pointer">
          DevTinder
        </a>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            
          {user&& (
            <>
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  alt="User avatar"
                  src={user.photoUrl}
                />
              </div>
            </>
          )}
            
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow-lg bg-base-100 rounded-box border border-base-200"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge badge-primary badge-sm">New</span>
              </a>
            </li>
            
            <li><a>Settings</a></li>
            <li><a className="text-error">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;