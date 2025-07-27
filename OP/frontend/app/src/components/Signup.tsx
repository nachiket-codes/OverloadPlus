import Header from "./Header"
import figurine from '../assets/images/figurine.png'
import { btnStyle, inputStyle } from "../data/constants"
import { motion } from "framer-motion"
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { registerUser } from "../features/authenticateSlice";
import { toast } from "react-toastify";

const GoogleIcon = FcGoogle as any;

const Signup = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confPassword, setConfPassword] = useState<string>("");
    const [compError, setCompError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (!username || !email || !password || !confPassword) {
            setIsLoading(false);
            setCompError("All fields are required!")
            return
        }

        if (!email.includes('@')){
            setIsLoading(false);
            setCompError("Invalid email!")
            return
        }
        setCompError('')
        setUsername('')
        setEmail('')
        setPassword('')
        setConfPassword('')
        
        try {
            await dispatch(registerUser({ username, email, password })).unwrap();
            // Optionally reset form fields here
        } catch (error) {
            console.log(error)
            toast.error("Registration failed!");
        } finally {
            setIsLoading(false);
        }

    }

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
                        <div className="flex p-6 gap-3 flex-col">
                            <h1 className="text-6xl font-bold">Register to </h1>
                            <h1 className="text-4xl font-semibold">Overload Plus </h1>
                        </div>
                        <div className="flex p-6">
                            <div className="text-xl w-[50%]">
                                <p>If you already have an account</p>
                                <p>You can <span className="font-semibold text-primary cursor-pointer"> <Link to='/login'>Login here!</Link> </span></p>
                            </div>
                            <div>
                                <img className="w-[240px]" src={figurine} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6 flex w-full">
                        <form action="" className="w-full flex flex-col gap-10 items-center" onSubmit={handleSubmit}>
                            <div className="w-full">
                                <h1 className="text-4xl font-semibold">Sign up</h1>
                            </div>
                            <input type="text" className={inputStyle} value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter username" disabled={isLoading}/>
                            <input type="text" className={inputStyle} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" disabled={isLoading}/>
                            <input type="password" className={inputStyle} value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password" disabled={isLoading}/>
                            <input type="password" className={inputStyle} value={confPassword} onChange={(e)=>setConfPassword(e.target.value)}  placeholder="Confirm password" disabled={isLoading}/>
                            {compError && <p className="text-red-500 font-semibold">{compError}</p>}
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0px 0px 12px rgba(59,130,246,0.8)"}}
                                whileTap={{scale: 0.95}}
                                transition={{ease:'easeInOut'}}
                                className={btnStyle}
                                disabled={isLoading}>
                                    {isLoading ? 'Adding you...' : 'Register'}
                            </motion.button>
                            <p className="text-gray-500">or continue with</p>
                            <div>
                                <GoogleIcon className="text-5xl cursor-pointer shadow-md p-2 rounded-lg"/>
                            </div>
                            
                            <div className="w-full text-center sm:hidden">
                                <p>If you already have an account</p>
                                <p>You can <span className="font-semibold text-primary cursor-pointer"> <Link to='/login'>Login here!</Link> </span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup