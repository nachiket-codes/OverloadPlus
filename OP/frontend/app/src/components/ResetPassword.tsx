import Header from "./Header"
import figurineConfused from '../assets/images/figurine-confused.png'
import { btnStyle, inputStyle } from "../data/constants"
import { motion } from "framer-motion"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { resetPassword } from "../features/authenticateSlice";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState<string>("");
    const [confPassword, setConfPassword] = useState<string>("");
    const [compError, setCompError] = useState<string>("")
    const [token, setToken] = useState<string>("")
    const { loading, error } = useSelector((state: RootState) => state.authentication)
    const dispatch = useDispatch<AppDispatch>()

    const handleForgetPwd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password || !confPassword) {
            toast.error("Fields are required!")
            return
        }
        const res = await dispatch(resetPassword({password, token}))
        if (resetPassword.fulfilled.match(res)) {
            toast.success("Password successfully reset");
          } else if (resetPassword.rejected.match(res)) {
            toast.error(error || "Failed to reset the password");
        }
    }

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        if (tokenParam) {
          setToken(tokenParam);
        } else {
            console.log('Invalid or missing token.');
        }
      }, [searchParams]);


    useEffect(()=>{
        if (confPassword !== password) {
            setCompError("Passwords not matching!")
        }
        else{
            setCompError("")
        }

    }, [confPassword, password])
      
    return (
        <div className="w-full h-screen flex flex-col">
            <Header/>
            <div className="p-4 flex-1 flex justify-center">
                <div className="w-[80%] py-10 font-sans flex">
                    <div className="p-6 min-w-[55%] hidden sm:block">
                        <div className="flex p-6 gap-6 flex-col">
                            <h1 className="text-6xl font-bold">TSet a new password</h1>
                        </div>
                        <div className="flex p-6">
                            <div className="text-xl w-[50%]">
                                <p>Enter a new password to access your account.</p>
                            </div>
                            <div>
                                <img className="w-[240px]" src={figurineConfused} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 flex w-full">
                        <form action="" className="w-full flex flex-col gap-10 items-center" onSubmit={handleForgetPwd}>
                            <div className="w-full">
                                <h1 className="text-4xl font-semibold">Reset password</h1>
                            </div>
                            <input type="password" className={inputStyle} value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password" disabled={loading || false}/>
                            <input type="password" className={inputStyle} value={confPassword} onChange={(e)=>setConfPassword(e.target.value)}  placeholder="Confirm password" disabled={loading || false}/>
                            {compError && <p className="text-red-500 font-semibold">{compError}</p>}
                            {error && <p className="text-red-500 font-semibold">{error}</p>}
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0px 0px 12px rgba(59,130,246,0.8)"}}
                                whileTap={{scale: 0.95}}
                                transition={{ease:'easeInOut'}}
                                className={btnStyle}
                                disabled={loading || false}>
                                    {loading ? "Resetting your password.." : "Reset password"}
                            </motion.button>
                            <p className="text-gray-500">or</p>
                            <div className="w-full text-center">
                                <p><span className="font-semibold text-primary cursor-pointer"> <Link to='/login'>Login here!</Link> </span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword