import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getUser } from "../features/authenticateSlice";
import { useEffect } from 'react';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(getUser())
    }, [dispatch])
    const {username, email} = useSelector((state: RootState) => state.authentication.user)
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <h1 className="text-2xl font-sans ">
                Hello {username}! Welcome to Overload Plus. Your email: {email}. You are seeing this page because you are an authorized user.
            </h1>
        </div>
    )
}

export default Home;