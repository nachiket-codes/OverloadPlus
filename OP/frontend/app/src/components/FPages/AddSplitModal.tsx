import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inputStyle } from "../../data/constants";
import {easeInOut, motion} from 'framer-motion'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSplit, getSplits } from "../../features/splitSlice";
import { AppDispatch } from "../../store";

interface propType {
    closeFunc: () => void
}

const AddSplitModal: React.FC<propType> = ({closeFunc}) => {
    const dispatch = useDispatch<AppDispatch>()
    const [splitName, setSplitName] = useState<string>("")
    const [splitDesc, setSplitDesc] = useState<string>("")

    const postSplit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (splitName.length <= 0){
            return
        }
        else {
            await dispatch(addSplit({name:splitName, description:splitDesc}))
            await dispatch(getSplits())
            closeFunc()
        }
             
        
    }

    return (
        <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center" onClick={closeFunc}>
            <motion.div className="w-[80%] bg-white shadow p-4 rounded-md" onClick={(e) => e.stopPropagation()}
                initial={{scale:0}}
                animate={{scale:[0.8, 1.1, 1]}}
                exit={{scale:[1, 1.1, 0]}}
                transition={{duration:0.4, ease: [0.25, 0.8, 0.25, 1]}}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-primary text-2xl font-semibold ">Add you split</h1>
                    <FontAwesomeIcon icon={faXmark} className="text-primary hover:text-red-500 font-semibold cursor-pointer text-xl" onClick={closeFunc}/>
                </div>
                
                <form action="" className="flex flex-col gap-2" onSubmit={postSplit}>
                    <input type="text" className={inputStyle} value={splitName} onChange={(e)=>setSplitName(e.target.value)} placeholder="Split name" required />
                    <textarea className={inputStyle} value={splitDesc} onChange={(e)=>setSplitDesc(e.target.value)} placeholder="Write details about your split."></textarea>
                    <div className="w-full flex justify-end">
                        <motion.button
                            whileHover={{scale:1.02}}
                            whileTap={{scale:0.95}}
                            transition={{ease:easeInOut}}
                            className="rounded-md bg-primary text-white p-2 mt-4 cursor-pointer border border-1-primary hover:text-primary hover:shadow hover:bg-white">
                            Done
                        </motion.button>
                    </div>
                </form>
            </motion.div>

        </div>
    )
}

export default AddSplitModal;