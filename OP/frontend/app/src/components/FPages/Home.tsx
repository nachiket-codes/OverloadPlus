import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getUser } from "../../features/authenticateSlice";
import { useEffect } from 'react';
import Header from "../Header";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(getUser())
    }, [dispatch])
    const {username, email} = useSelector((state: RootState) => state.authentication.user)
    return (
        <div className="h-screen w-full flex flex-col">
            <Header activePage="dashboard"/>
            <div className="w-full flex-1 p-6">
                <h1 className="text-2xl font-sans ">
                    Hello {username}! Welcome to Overload Plus. Your email: {email}. You are seeing this page because you are an authorized user.
                </h1>
            </div>
            
        </div>
    )
}

export default Home;