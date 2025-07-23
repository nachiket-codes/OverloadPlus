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
        <div>Hello {username}! Welcome to this amazing app. I hope your email is {email} </div>
    )
}

export default Home;