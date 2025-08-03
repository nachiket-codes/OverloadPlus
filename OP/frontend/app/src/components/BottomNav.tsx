import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { navItems } from "../data/constants"
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
    
    const location = useLocation();
    const currentPath = location.pathname.split('/')[1]; // get 'dashboard' from '/dashboard'
    return (
        <div className="w-full h-[150px] fixed bottom-0 p-4 flex sm:hidden">
            <div className='w-full bg-white flex-1 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)] flex'>
                {
                navItems.map((item) => {
                    const isActive = currentPath === item.id;
                    return (<div className="text-[10px] w-[25%] flex justify-center">
                    <div
                        className={`
                        w-[60%] text-3xl cursor-pointer flex justify-center items-center
                        transition-all duration-200 ease-in-out
                        active:scale-95 hover:scale-105
                        ${isActive ? ' font-bold border-b-[10px] border-primary text-primary ' : 'border-b-[10px] border-transparent text-gray-600'}
                        `}
                    >
                        <Link to={item.id} >
                            <div className="flex items-center justify-end flex-col">
                                <FontAwesomeIcon icon={item.logo} />
                                <p className="text-[10px]">{item.label}</p>
                            </div>
                        </Link>
                </div>
                    </div>)
                })
                }
            </div>
        </div>
    )
}

export default BottomNav;