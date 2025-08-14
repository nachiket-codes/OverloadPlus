import { faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inputStyle } from "../../data/constants";
import {easeInOut, motion} from 'framer-motion'
import { useState , useEffect} from "react";
import { useDispatch } from "react-redux";
import { addSplit, getSplits } from "../../features/splitSlice";
import { AppDispatch } from "../../store";
import { toast } from "react-toastify";

interface propType {
    closeFunc: () => void
}

interface SplitObj {
    id: number
    name: string
}

const AddSplitModal: React.FC<propType> = ({closeFunc}) => {
    const dispatch = useDispatch<AppDispatch>()
    const [splitName, setSplitName] = useState<string>("")
    const [splitDesc, setSplitDesc] = useState<string>("")
    const [newWorkouts, setNewWorkouts] = useState<SplitObj[]>([])
    const [workoutDayName, setWorkoutDayName] = useState<string>("")
    const [editSplitId, setEditSplitId] = useState<number>(0)
    const [editWorkoutDayName, setEditWorkoutDayName] = useState<string>("")

    const postSplit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (splitName.length <= 0){
            return
        }
        else {
            const workoutDaysObjs = newWorkouts.map((item) => {
                return {name: item.name}
            })

            await dispatch(addSplit({name:splitName, description:splitDesc, workouts: workoutDaysObjs}))
            await dispatch(getSplits())
            closeFunc()
        }
             
        
    }

    const addWorkoutDayName = (e: React.FormEvent) => {
        e.preventDefault();
        if (workoutDayName){
            setNewWorkouts([...newWorkouts, {id: newWorkouts.length + 1, name: workoutDayName}])
            setWorkoutDayName("")
        }
        else{
            toast.error("Please enter the workout day first!")
        }
        
    }

    const removeWorkoutDay = (e: React.FormEvent, id: number) => {
        setNewWorkouts(newWorkouts.filter((item) => item.id !== id))
    }

    useEffect(()=>{
        const updatedWorkouts = newWorkouts.map((item) => {
            return (item.id === editSplitId) ? {...item, name: editWorkoutDayName} : item
        })
        setNewWorkouts(updatedWorkouts)
    }, [editWorkoutDayName])

    return (
        <div className="z-[100] w-full h-screen fixed top-0 left-0 flex justify-center items-center" onClick={closeFunc}>
            <motion.div className="w-[80%] bg-white shadow-md p-4 rounded-md border" onClick={(e) => e.stopPropagation()}
                initial={{scale:0}}
                animate={{scale:[0.8, 1.1, 1]}}
                exit={{scale:[1, 1.1, 0]}}
                transition={{duration:0.4, ease: [0.25, 0.8, 0.25, 1]}}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-primary text-2xl font-semibold ">Add your split</h1>
                    <FontAwesomeIcon icon={faXmark} className="text-primary hover:text-red-500 font-semibold cursor-pointer text-xl" onClick={closeFunc}/>
                </div>
                
                <form action="" className="flex flex-col gap-2" onSubmit={postSplit} onClick={(e)=>setEditSplitId(0)}>
                    <input type="text" className={inputStyle} value={splitName} onChange={(e)=>setSplitName(e.target.value)} placeholder="Split name" required />
                    <textarea className={inputStyle} value={splitDesc} onChange={(e)=>setSplitDesc(e.target.value)} placeholder="Write details about your split."></textarea>
                    {
                        splitName && 
                        (
                            <div className="mt-4 group w-full">
                                <h1 className="text-[16px] text-gray-500 mb-1">Add your workout days for the split</h1>
                                <div className="flex flex-col gap-2">
                                    {
                                        newWorkouts.map((item, idx) => {
                                            return (
                                                <div className="w-full flex items-center gap-1">
                                                    <motion.div
                                                        whileHover={{scale:1.05}}
                                                        whileTap={{scale: 0.95}}
                                                        transition={{duration:0.2, ease: easeInOut}}>
                                                        <FontAwesomeIcon icon={faTrash} onClick={(e)=>removeWorkoutDay(e, item.id)} className="bg-white text-primary hover:text-red-500 cursor-pointer"/>
                                                    </motion.div>
                                                    {
                                                        (editSplitId === item.id) ?
                                                        (<input className="bg-[#f0efff] h-[42px] p-4 outline-none w-full rounded-md" value={editWorkoutDayName} onClick={(e)=>{e.stopPropagation()}} onChange={(e)=>setEditWorkoutDayName(e.target.value)}/>):
                                                        (<h1 className="truncate border shadow-md cursor-pointer h-[42px] p-4 outline-none w-full rounded-md flex items-center font-semibold cursor-pointer" onClick={(e)=>{e.stopPropagation(); setEditSplitId(item.id); setEditWorkoutDayName(item.name)}} >{item.name} </h1>)
                                                    }
                                                    
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="w-full flex items-center gap-1">
                                            <input className="bg-[#f0efff] h-[42px] p-4 outline-none w-full rounded-md" value={workoutDayName} onChange={(e)=>setWorkoutDayName(e.target.value)} placeholder="Workout day name"/>
                                            <motion.button
                                                whileHover={{scale:1.05}}
                                                whileTap={{scale: 0.95}}
                                                transition={{duration:0.2, ease: easeInOut}}
                                                type="submit">
                                                <FontAwesomeIcon icon={faPlus} onClick={addWorkoutDayName} className="p-2 bg-primary border shadow-md border-primary text-white hover:bg-white hover:text-primary rounded-md cursor-pointer"/>
                                            </motion.button>
                                    </div>
                                </div>
                                
                            </div>
                        )
                    }
                    
                    <div className="w-full flex justify-end">
                        <motion.button
                            whileHover={{scale:1.02}}
                            whileTap={{scale:0.95}}
                            transition={{ease:easeInOut}}
                            onClick={postSplit}
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
