import { faCheck, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inputStyle } from "../../data/constants";
import {easeInOut, motion} from 'framer-motion'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSplit, getSplits } from "../../features/splitSlice";
import { AppDispatch, RootState } from "../../store";
import { toast } from "react-toastify";
import { addAWorkout, deleteWorkout, editWorkout, getWorkouts } from "../../features/WorkoutSlice";
import LoadingSpinner from "../LoadingSpinner";


interface Split {
    name: string
    description: string
}

interface WorkoutObj {
    id: string
    name: string
}
const SplitModal: React.FC<{id:string, closeFunc: ()=> void}> = ({id,  closeFunc}) => {
    const dispatch = useDispatch<AppDispatch>()
    const {splits} = useSelector((state: RootState) => state.splits)
    const {workouts, error, loading} = useSelector((state: RootState) => state.workouts)
    const [split, setSplit] = useState<Split>({name:'', description: ""})
    const [newWorkouts, setNewWorkouts] = useState<WorkoutObj[]>([])
    const [workoutDayName, setWorkoutDayName] = useState<string>("")
    const [editWorkoutId, setEditWorkoutId] = useState<string>('0')
    const [editWorkoutDayName, setEditWorkoutDayName] = useState<string>("")

    useEffect(()=> {
        setSplit(splits.filter((item) => item.id == id)[0])
    }, [id])

    useEffect(()=> {
        dispatch(getWorkouts(id))
    }, [dispatch])
    
    const deleteWorkoutDay = async (e: React.FormEvent, workoutId: string) => {
        e.preventDefault();
        await dispatch(deleteWorkout({splitId: id, workoutId}))
        dispatch(getWorkouts(id))
    }

    const addWorkoutDayName = async (e: React.FormEvent) => {
        e.preventDefault();
        const workoutData = {
            name: workoutDayName
        }
        if (workoutDayName){
            await dispatch(addAWorkout({splitId: id, workoutData}))
            dispatch(getWorkouts(id))
            setWorkoutDayName("")
        }
        else{
            toast.error("Please enter the workout day first!")
        }
        
    }

    const editWorkoutName = async (e: React.FormEvent, workoutId: string) => {
        e.preventDefault();
        const workoutData = {
            name: editWorkoutDayName
        }
        await dispatch(editWorkout({splitId: id, workoutId, workoutData}))
        dispatch(getWorkouts(id))
        setEditWorkoutId('0')
    }

    return (
        <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center"  onClick={closeFunc} >
            <motion.div className="w-[80%] bg-white shadow-md p-4 rounded-md border" onClick={(e) => e.stopPropagation()}
                initial={{scale:0}}
                animate={{scale:[0.8, 1.1, 1]}}
                exit={{scale:[1, 1.1, 0]}}
                transition={{duration:0.4, ease: [0.25, 0.8, 0.25, 1]}}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-primary text-2xl font-semibold ">{split.name}</h1>
                    <FontAwesomeIcon icon={faXmark} className="text-primary hover:text-red-500 font-semibold cursor-pointer text-xl" onClick={closeFunc}/>
                </div>
                <p className="text-gray-500 text-[14px]">
                    {split.description}
                </p>
                <div className="mt-4 group w-full">
                    <h1 className="text-[16px] text-black mb-2">Your workout days for this split</h1>
                     <div className="flex flex-col gap-4 mb-4">
                        {
                            loading ? 
                            (<LoadingSpinner/>) :
                            (
                                
                                    workouts.map((workout, idx) => {
                                        return (
                                            <div className="w-full flex items-center gap-1">
                                                <motion.div
                                                    whileHover={{scale:1.05}}
                                                    whileTap={{scale: 0.95}}
                                                    transition={{duration:0.2, ease: easeInOut}}>
                                                    <FontAwesomeIcon onClick={(e)=>deleteWorkoutDay(e, workout.id)} icon={faTrash} className="bg-white text-primary hover:text-red-500 cursor-pointer"/>
                                                </motion.div>
                                                {
                                                    (editWorkoutId === workout.id) ?
                                                    (<form onSubmit={(e)=> editWorkoutName(e, workout.id)} className="w-full flex">
                                                        <input className="bg-[#f0efff] h-[42px] p-4 outline-none w-full rounded-md" value={editWorkoutDayName} onClick={(e)=>{e.stopPropagation()}} onChange={(e)=>setEditWorkoutDayName(e.target.value)}/>
                                                        {
                                                            (editWorkoutDayName !== workout.name) && 
                                                            (
                                                                <div className="flex items-center p-2">
                                                                    <motion.button
                                                                        whileHover = {{scale:1.05}}
                                                                        whileTap={{scale:0.95, color:'red'}}
                                                                        transition={{ease:easeInOut, duration:0.2}}
                                                                        onClick={(e)=>setEditWorkoutDayName(workout.name)}
                                                                        type="button"
                                                                        >
                                                                        <FontAwesomeIcon icon={faXmark} className="hover:text-red-500"/>
                                                                    </motion.button>
                                                                    <motion.button
                                                                        whileHover = {{scale:1.05}}
                                                                        whileTap={{scale:0.95, color:'blue'}}
                                                                        transition={{ease:easeInOut, duration:0.2}}
                                                                        type="submit"
                                                                        >
                                                                        <FontAwesomeIcon icon={faCheck} className="hover:text-blue-500"/>
                                                                    </motion.button>
                                                                </div>
                                                            )
                                                        }
                                                    </form>):
                                                    (<h1 className="shadow-md cursor-pointer h-[42px] p-4 outline-none w-full rounded-md flex items-center font-semibold cursor-pointer" onClick={(e)=>{e.stopPropagation(); setEditWorkoutId(workout.id); setEditWorkoutDayName(workout.name)}} >{workout.name} </h1>)
                                                }
                                            </div>
                                        )
                                    })
                                
                            )
                        }
                        
                        <div className="w-full flex items-center gap-1">
                        <form className="w-full flex items-center gap-2" onSubmit={addWorkoutDayName} >
                            <input className="bg-[#f0efff] h-[42px] p-4 outline-none w-full rounded-md" value={workoutDayName} onChange={(e)=>setWorkoutDayName(e.target.value)} placeholder="New workout day name"/>
                            <motion.button
                                whileHover={{scale:1.05}}
                                whileTap={{scale: 0.95}}
                                transition={{duration:0.2, ease: easeInOut}}
                                type = "submit">
                                <FontAwesomeIcon icon={faPlus} className="p-2 bg-primary border shadow-md border-primary text-white hover:bg-white hover:text-primary rounded-md cursor-pointer" />
                            </motion.button>
                        </form>
                        </div>
                    </div>                     
                </div>
            </motion.div>

        </div>
    )
}

export default SplitModal;