import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Header";
import { faCheck, faEllipsisVertical, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion"
import BackDrop from "../Backdrop";
import AddSplitModal from "./AddSplitModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getSplits } from "../../features/splitSlice";

const Splits = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {splits, error, loading} = useSelector((state: RootState) => state.splits)
    const maxDescLen = 50
    const [optionOpenId, setOptionOpenId] = useState<string>('')
    const [addMode, setAddMode] = useState<boolean>(false)
    const ttData = [
        {id: "12", name: "Session 1", description: "Abcd of the xyz and the qwerty keys Abcd of the xyz and the qwerty keys"},
        {id: "13", name: "Session 2", description: "sfafdf of the gew and the asdfg keys"}
    ]
    // const ttData: any[] = []

    const unSelect = (e: React.FormEvent) => {
        e.preventDefault();
        setOptionOpenId("")
    }

    const clickAddBtn = (e: React.FormEvent) => {
        e.preventDefault();
        setAddMode(true)
    }

    useEffect(()=>{
        dispatch(getSplits())
    }, [dispatch])

    return (
        <div className="w-full h-screen">
            <Header activePage="split"/>
            <div className="p-6 pb-[150px] flex flex-col">
                <div className="flex justify-between">
                    <h1 className="text-3xl mb-2 font-semibold">Splits</h1>
                    {
                        splits.length >= 1 && <div> <AddSplitBtn targetFunc={clickAddBtn}/> </div>
                    }
                    
                </div>
                
                <div className="flex-1 p-2">
                    { splits.length >= 1 ?
                        (<ul className="flex flex-col gap-2">
                            {
                                splits.map((item, idx) => {
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
                                            optionOpenId === item.id && (
                                                <div className="shadow-xl absolute right-0 top-2 p-2 rounded-md bg-white flex  z-50">
                                                    <ul className="p-2 flex flex-col gap-2">
                                                        <li className="m-1 hover:text-red-500 cursor-pointer"> <FontAwesomeIcon icon={faTrash}/> Delete</li>
                                                        <li className="m-1 hover:text-blue-500 cursor-pointer"><FontAwesomeIcon icon={faCheck}/> Set as active</li>
                                                    </ul>
                                                    <div className="flex pt-2 cursor-pointer hover:text-red-500 hover:font-bold">
                                                        <FontAwesomeIcon icon={faXmark} onClick={unSelect}/>
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
                            <AddSplitBtn targetFunc={clickAddBtn}/>
                        </div>
                        )
                    }
                </div>
                <div>
                    {optionOpenId.length >= 1 && (
                        <BackDrop unselectionFunc={unSelect}/>
                    )}

                </div>
                <div>
                    <AnimatePresence>
                        {addMode && (
                            <div>
                            <BackDrop unselectionFunc={()=>setAddMode(false)}/>
                            <AddSplitModal closeFunc={()=>setAddMode(false)}/>
                            </div>
                        )}
                </AnimatePresence>
                </div>
                
            </div>

        </div>
    )
}

export default Splits;


interface propType {
    targetFunc: (e: React.FormEvent) => void;
}
const AddSplitBtn: React.FC<propType> = ({targetFunc}) => {
    return (
        <motion.button
        whileHover={{scale:1.02, boxShadow: "0px 0px 12px rgba(59,130,246,0.8)"}}
        whileTap={{scale:0.95}}
        transition={{ease: easeInOut}}
        onClick={targetFunc}
        className="bg-primary text-white p-2 rounded-md hover:font-bold hover:bg-white hover:text-primary"
        >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            Add Split
        </motion.button>
    )
}