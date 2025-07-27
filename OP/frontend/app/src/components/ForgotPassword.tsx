import Header from "./Header"
import figurineConfused from '../assets/images/figurine-confused.png'
import { btnStyle, inputStyle } from "../data/constants"
import { motion } from "framer-motion"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { sendLoginLink } from "../features/authenticateSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [username, setUsername] = useState<string>("")
    const { loading, error } = useSelector((state: RootState) => state.authentication)
    const dispatch = useDispatch<AppDispatch>()

    const handleForgetPwd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username){
            toast.error("Fields cannot be empty!")
            return
        }
        const res = await dispatch(sendLoginLink({username}))
        toast.success("Link sent!")
        if (sendLoginLink.fulfilled.match(res)) {
            toast.success("Link sent!");
          } else if (sendLoginLink.rejected.match(res)) {
            toast.error(error || "Failed to send the link");
        }
    }
      
    return (
        <div className="w-full h-screen flex flex-col">
            <Header/>
            <div className="p-4 flex-1 flex justify-center">
                <div className="w-[80%] py-10 font-sans flex">
                    <div className="p-6 min-w-[55%] hidden sm:block">
                        <div className="flex p-6 gap-6 flex-col">
                            <h1 className="text-6xl font-bold">Trouble logging in?</h1>
                        </div>
                        <div className="flex p-6">
                            <div className="text-xl w-[50%]">
                                <p>Enter your email, or username and we'll send you a link to get back into your account.</p>
                            </div>
                            <div>
                                <img className="w-[240px]" src={figurineConfused} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 flex w-full">
                        <form action="" className="w-full flex flex-col gap-10 items-center" onSubmit={handleForgetPwd}>
                            <div className="w-full">
                                <h1 className="text-4xl font-semibold">Forgot password</h1>
                            </div>
                            <input type="text" className={inputStyle} value={username} onChange={(e)=>setUsername(e.target.value)}  placeholder="Enter username or email" disabled={loading || false}/>
                            {error && <p className="text-red-500 font-semibold">{error}</p>}
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0px 0px 12px rgba(59,130,246,0.8)"}}
                                whileTap={{scale: 0.95}}
                                transition={{ease:'easeInOut'}}
                                className={btnStyle}
                                disabled={loading || false}>
                                    {loading ? "Sending login link..." : "Send login link"}
                            </motion.button>
                            
                            <p className="text-gray-500">or</p>
                            <div className="w-full text-center">
                                <p><span className="font-semibold text-primary cursor-pointer"> <Link to='/register'>Register here!</Link> </span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword