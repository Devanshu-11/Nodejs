import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.jsx';
import { useNavigate } from 'react-router-dom';

const Login=()=>{
    // We dispatch an action to add the data to redux store
    const dispatch=useDispatch();
    const Navigate=useNavigate();

    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:3000/login',{
                emailId,
                password,
            },{withCredentials:true});
            dispatch(addUser(res.data));
            toast.success("Login successful");
            return Navigate('/');
        }catch(error){
            console.log(error);
            toast.error("Login failed");
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={emailId}
                            onChange={(e)=>setEmailId(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;