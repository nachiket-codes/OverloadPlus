import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Header";
import { faCheck, faEllipsisVertical, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Splits = () => {
    const maxDescLen = 50
    const [optionOpenId, setOptionOpenId] = useState<string>('')
    const tData = [
        {id: "12", name: "Session 1", description: "Abcd of the xyz and the qwerty keys Abcd of the xyz and the qwerty keys"},
        {id: "13", name: "Session 2", description: "sfafdf of the gew and the asdfg keys"}
    ]
    return (
        <div className="w-full h-screen">
            <Header activePage="split"/>
            <div className="p-6 pb-[150px] flex flex-col">
                <div>
                    <h1 className="text-3xl mb-2 font-semibold">Splits</h1>
                </div>
                
                <div className="flex-1 p-2">
                    <ul className="flex flex-col gap-2">
                        {
                            tData.map((item, idx) => {
                                return (
                                <li className="border-b border-primary p-2 pl-4 hover:border-b-2 flex relative">
                                    <div className="flex-1 cursor-pointer hover:text-primary ">
                                        <h1 className="text-xl mb-2">{item.name}</h1>
                                        <p className="text-[12px] text-gray-400">{item.description.length > maxDescLen ? item.description.slice(0, maxDescLen) + '...' : item.description}</p>
                                    </div>
                                    <div className="flex items-center text-xl cursor-pointer transition-all hover:scale-[1.05] ease-in-out">
                                        <FontAwesomeIcon icon={faEllipsisVertical} onClick={()=>setOptionOpenId(item.id)}/>
                                    </div>
                                    {
                                        optionOpenId == item.id && (
                                            <div className="shadow-xl absolute right-0 top-2 p-2 rounded-md bg-white flex  z-50">
                                                <ul className="p-2 flex flex-col gap-2">
                                                    <li className="m-1 hover:text-red-500 cursor-pointer"> <FontAwesomeIcon icon={faTrash}/> Delete</li>
                                                    <li className="m-1 hover:text-blue-500 cursor-pointer"><FontAwesomeIcon icon={faCheck}/> Set as active</li>
                                                </ul>
                                                <div className="flex pt-2 cursor-pointer hover:text-red-500 hover:font-bold">
                                                    <FontAwesomeIcon icon={faXmark} onClick={()=>setOptionOpenId("")}/>
                                                </div>
                                            </div>
                                        )
                                    }
                                    
                                    
                                </li>)
                            })
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Splits;
