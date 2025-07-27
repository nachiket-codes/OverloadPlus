import Header from "./Header"
import figurine from '../assets/images/figurine.png'
import { btnStyle, inputStyle } from "../data/constants"
import { motion } from "framer-motion"
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { loginUser } from "../features/authenticateSlice";
import { toast } from "react-toastify";
import GoogleLoginButton from "./GoogleLoginButton";

const Login = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        if (!username || !password) {
            toast.error("All fields are required!")
            return
        }
        try{
            await dispatch(loginUser({username, password})).unwrap()
        } catch (error) {
            console.log(error)
            toast.error("Logging in failed!");
        } finally {
            setLoading(false);
        }
        
    }
      
    return (
        <div className="w-full h-screen flex flex-col">
            <Header/>
            <div className="p-4 flex-1 flex justify-center">
                <div className="w-[80%] py-10 font-sans flex">
                    <div className="p-6 min-w-[55%] hidden sm:block">
                        <div className="flex p-6 gap-6 flex-col">
                            <h1 className="text-6xl font-bold">Sign in to </h1>
                            <h1 className="text-4xl font-semibold">Overload Plus </h1>
                        </div>
                        <div className="flex p-6">
                            <div className="text-xl w-[50%]">
                                <p>If you don't have an account</p>
                                <p>You can <span className="font-semibold text-primary cursor-pointer"><Link to="/register">Register here!</Link></span></p>
                            </div>
                            <div>
                                <img className="w-[240px]" src={figurine} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 flex w-full">
                        <form action="" className="w-full flex flex-col gap-10 items-center" onSubmit={handleLogin}>
                            <div className="w-full">
                                <h1 className="text-4xl font-semibold">Sign in</h1>
                            </div>
                            <input type="text" className={inputStyle} value={username} onChange={(e)=>setUsername(e.target.value)}  placeholder="Enter username or email" disabled={loading}/>
                            <input type="password" className={inputStyle} value={password} onChange={(e)=>setPassword(e.target.value)}   placeholder="Password" disabled={loading}/>
                            <div className="w-full flex justify-end cursor-pointer"><Link to="/forgot-password"><p className="text-gray-500 hover:font-bold">Forgot passsword?</p></Link></div>
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0px 0px 12px rgba(59,130,246,0.8)"}}
                                whileTap={{scale: 0.95}}
                                transition={{ease:'easeInOut'}}
                                className={btnStyle}
                                disabled={loading}>
                                    {loading ? "Logging in..." : "Login"}
                            </motion.button>
                            <p className="text-gray-500">or continue with</p>
                            <div className="w-[200px] justify-end items-center">
                                <GoogleLoginButton/>
                            </div>
                            <div className="w-full text-center sm:hidden">
                                <p>If you don't have an account</p>
                                <p>You can <span className="font-semibold text-primary cursor-pointer"><Link to="/register">Register here!</Link></span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login