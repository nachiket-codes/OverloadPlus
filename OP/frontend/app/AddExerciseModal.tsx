import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {motion} from 'framer-motion'
import { exercises, inputStyle } from '../../data/constants'
import { useEffect, useState } from 'react'

interface propType {
    closeFunc: () => void
    setAddedExerciseIds: React.Dispatch<React.SetStateAction<string[]>>
}

interface Exercise {
    id: string
    name: string
    category: string
    muscle_group: string
    equipment: string
    instructions: string
}

const AddExerciseModal: React.FC<propType> = ({closeFunc, setAddedExerciseIds}) => {
    const [searchTxt, setSearchTxt] = useState<string>("")
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([])

    useEffect(()=>{
        const exers = exercises.filter((exercise) => exercise.name.toLowerCase().includes(searchTxt.toLowerCase()));
        setFilteredExercises(exers)
    }, [searchTxt])

    const addExercise = (e: React.FormEvent, eid: string) => {
        setAddedExerciseIds((prev)=> [...prev, eid])
        setSearchTxt('')
        closeFunc()
    }

    return (
        <div className="z-[100] w-full h-screen fixed top-0 left-0 flex justify-center overflow-auto" onClick={closeFunc}>
            <motion.div className="w-[90%] bg-white shadow-md p-4 rounded-md border mt-4 h-max" onClick={(e) => e.stopPropagation()}
                initial={{scale:0}}
                animate={{scale:[0.8, 1.1, 1]}}
                exit={{scale:[1, 1.1, 0]}}
                transition={{duration:0.4, ease: [0.25, 0.8, 0.25, 1]}}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-primary text-2xl font-semibold ">Add Exercise</h1>
                    <FontAwesomeIcon icon={faXmark} className="text-primary hover:text-red-500 font-semibold cursor-pointer text-xl" onClick={closeFunc}/>
                </div>
                <form action="">
                    <input type="text" placeholder="Search exercise" value={searchTxt} onChange={(e)=>setSearchTxt(e.target.value)} className={inputStyle}/>

                </form>
                <div className="mt-4">
                {
                    filteredExercises.map((exercise)=>{
                        return (
                            <div className="border-b p-2 cursor-pointer hover:shadow-md hover:text-primary" onClick={(e)=>addExercise(e, exercise.id)}>
                                <h1 className="text-xl font-bold mb-1">{exercise.name}</h1>
                                <div className="text-[14px] text-gray-800 flex flex-col gap-1">
                                    <span className='flex gap-1'>
                                        <p className="font-semibold">
                                            Target muscle:
                                        </p>
                                        <p>{exercise.muscle_group}</p>
                                    </span>
                                    <span className='flex gap-1'>
                                        <p className="font-semibold">
                                            Equipment:
                                        </p>
                                        <p>{exercise.equipment}</p>
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                
            </motion.div>

        </div>
    )
}

export default AddExerciseModal