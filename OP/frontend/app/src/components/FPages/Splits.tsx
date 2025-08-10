import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Header";
import { faCheck, faEllipsisVertical, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { easeInOut, motion } from "framer-motion"

const Splits = () => {
    const maxDescLen = 50
    const [optionOpenId, setOptionOpenId] = useState<string>('')
    const ttData = [
        {id: "12", name: "Session 1", description: "Abcd of the xyz and the qwerty keys Abcd of the xyz and the qwerty keys"},
        {id: "13", name: "Session 2", description: "sfafdf of the gew and the asdfg keys"}
    ]
    // const ttData: any[] = []
    return (
        <div className="w-full h-screen">
            <Header activePage="split"/>
            <div className="p-6 pb-[150px] flex flex-col">
                <div className="flex justify-between">
                    <h1 className="text-3xl mb-2 font-semibold">Splits</h1>
                    {
                        ttData.length > 1 && <div> <AddSplitBtn/> </div>
                    }
                    
                </div>
                
                <div className="flex-1 p-2">
                    { ttData.length >= 1 ?
                        (<ul className="flex flex-col gap-2">
                            {
                                ttData.map((item, idx) => {
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
                        </ul>)
                        :
                        (
                        <div className="w-full flex flex-col justify-center gap-2">
                            <p className=" text-black">You don't have any Split added! Start by adding a split...</p>
                            <AddSplitBtn/>
                        </div>
                        )
                    }
                </div>
                {optionOpenId.length >= 1 && (
                    <motion.div
                    className="w-full h-screen fixed top-0 left-0"
                    onClick={() => setOptionOpenId("")}
                    initial={{ backdropFilter: "blur(0px)" }}
                    animate={{ backdropFilter: "blur(8px)" }}
                    exit={{ backdropFilter: "blur(0px)" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ backdropFilter: "blur(0px)" }} 
                    />
                )}
            </div>

        </div>
    )
}

export default Splits;

const AddSplitBtn = () => {
    return (
        <motion.button
        whileHover={{scale:1.02, boxShadow: "0px 0px 12px rgba(59,130,246,0.8)"}}
        whileTap={{scale:0.95}}
        transition={{ease: easeInOut}}
        className="bg-primary text-white p-2 rounded-md hover:font-bold hover:bg-white hover:text-primary"
        >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            Add Split
        </motion.button>
    )
}