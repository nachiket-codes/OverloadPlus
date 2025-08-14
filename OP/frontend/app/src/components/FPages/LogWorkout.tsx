import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import DateSection from "./DateSection";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { getSplits } from "../../features/splitSlice";
import { Link } from "react-router-dom";
import { getWorkouts } from "../../features/WorkoutSlice";

const LogWorkout = () => {
    const [curDate, setCurDate] = useState<Date | undefined>(new Date())
    const {splits} = useSelector((state: RootState) => state.splits)
    const {workouts} = useSelector((state: RootState) => state.workouts)
    const [selectedSplitId, setSelectedSplitId] = useState<string>("")
    const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>("")
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        dispatch(getSplits())
    }, [dispatch])

    useEffect(()=>{
        if (splits.length > 0){
            setSelectedSplitId(splits[0].id)
        }
    }, [splits])

    useEffect(()=>{
        if (selectedSplitId) {
            dispatch(getWorkouts(selectedSplitId))
        }
    }, [selectedSplitId])

    return (
        <div className="w-full h-screen">
            <Header activePage="log"/>
            <div className="p-6 flex flex-col gap-2">
                <DateSection curDate={curDate} setCurDate={setCurDate}/>
                
                <div className="flex gap-3 flex-col">
                    {
                        (splits.length>0) ? 
                        (
                            <div className="w-full flex flex-col gap-1">
                                <h1 className="font-semibold">Select the split</h1>
                                <div className="bg-[#f0efff] rounded-md p-1 pl-2 pr-2">
                                    <select
                                        className = "bg-[#f0efff] outline-none w-full"
                                        name="split-sel" id="split-sel" value={selectedSplitId} onChange={(e)=>setSelectedSplitId(e.target.value)}>
                                        {
                                            splits.map((split) => {
                                                return <option value={split.id}>{split.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        ) : 
                        (
                            <h1>You haven't added any split. <span className="font-semibold text-primary cursor-pointer"><Link to="/split">Add your splits here</Link></span></h1>
                        )
                    }
                    {
                        (workouts.length > 0) && (
                             <div className="w-full flex flex-col gap-1">
                                <h1 className="font-semibold">Select the workout</h1>
                                <div className="bg-[#f0efff] rounded-md p-1 pl-2 pr-2">
                                    <select
                                        className = "bg-[#f0efff] outline-none w-full"
                                        name="workout-sel" id="workout-sel" value={selectedWorkoutId} onChange={(e)=>setSelectedWorkoutId(e.target.value)}>
                                        {
                                            workouts.map((workout) => {
                                                return <option value={workout.id}>{workout.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        )
                    }
                    
                   
                    
                </div>
            </div>
        </div>
    )
}
export default LogWorkout;
