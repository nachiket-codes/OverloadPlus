import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { easeInOut, motion } from 'framer-motion'
import { useState } from 'react';
import BackDrop from '../Backdrop';
import AddExerciseModal from './AddExerciseModal';
import { exercises } from '../../data/constants';

const AddExerciseSection = () => {
    const [addMode, setAddMode] = useState<boolean>(false);
    const [addedExerciseIds, setAddedExerciseIds] = useState<string[]>(["g7k8l9m0-n1o2-3456-gh78-ij90kl12mn34"])
    return (
        <div>
            <div className="shadow-md mb-2"></div>
            <motion.button
            onClick={()=>setAddMode(true)}
            whileHover={{scale:1.05}}
            whileTap={{scale: 0.95}}
            transition={{duration:0.2, ease: easeInOut}}
            title = "Add your exercise"
            className="p-2 bg-primary flex justify-center items-center gap-2 border shadow-md border-primary text-white hover:bg-white hover:text-primary rounded-md cursor-pointer">
                {/* <p>Add an exercise</p> */}
                <FontAwesomeIcon icon={faPlus} />
            </motion.button>
            {
                addedExerciseIds.map((eid)=> <div className="border">{eid}</div>)
            }
            {
                addMode && (
                    <>
                        <BackDrop unselectionFunc={()=>setAddMode(false)}/>
                        <AddExerciseModal closeFunc={()=>setAddMode(false)} setAddedExerciseIds={setAddedExerciseIds}/>
                    </>
                )
            }
        </div>
    )
}

export default AddExerciseSection;