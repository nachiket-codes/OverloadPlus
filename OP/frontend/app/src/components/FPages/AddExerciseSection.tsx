import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { easeInOut, motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import BackDrop from '../Backdrop';
import AddExerciseModal from './AddExerciseModal';
// import { exercises } from '../../data/constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getExercises } from '../../features/exercisesSlice';

const AddExerciseSection = () => {
    const [addMode, setAddMode] = useState<boolean>(false);
    const {exercises, loading} = useSelector((state: RootState) => state.exercises)
    const [addedExerciseIds, setAddedExerciseIds] = useState<string[]>([""])
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        dispatch(getExercises())
    }, [dispatch])
    
    return (
        <div>
            <div className="shadow-md mb-2"></div>

            <div className="flex justify-end">
                <motion.button
                onClick={()=>setAddMode(true)}
                whileHover={{scale:1.05}}
                whileTap={{scale: 0.95}}
                transition={{duration:0.2, ease: easeInOut}}
                title = "Add your exercise"
                className="p-2 bg-primary flex justify-center items-center gap-2 border shadow-md border-primary text-white hover:bg-white hover:text-primary rounded-md cursor-pointer">
                    <p>Add exercise</p>
                    <FontAwesomeIcon icon={faPlus} />
                </motion.button>
            </div>
            
            {
                addedExerciseIds.map((eid)=> <div className="border">{eid}</div>)
            }
            {
                addMode && (
                    <>
                        <BackDrop unselectionFunc={()=>setAddMode(false)}/>
                        <AddExerciseModal closeFunc={()=>setAddMode(false)} setAddedExerciseIds={setAddedExerciseIds} exercises={exercises} excerciseLoading={loading}/>
                    </>
                )
            }
        </div>
    )
}

export default AddExerciseSection;