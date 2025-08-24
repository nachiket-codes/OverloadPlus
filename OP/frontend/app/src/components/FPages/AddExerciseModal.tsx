import { faArrowLeft, faArrowRight, faCaretLeft, faCaretRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {motion} from 'framer-motion'
import { inputStyle } from '../../data/constants'
import { useEffect, useState } from 'react'


interface Exercise {
    id: string
    name: string
    category: string
    muscle_group: string
    equipment: string
    instructions: string
}
interface propType {
    closeFunc: () => void
    setAddedExerciseIds: React.Dispatch<React.SetStateAction<string[]>>
    exercises: Exercise[]
    excerciseLoading: boolean
}

const itemsOnOnePage = 7;

const AddExerciseModal: React.FC<propType> = ({closeFunc, setAddedExerciseIds, exercises, excerciseLoading}) => {
    const [searchTxt, setSearchTxt] = useState<string>("")
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [exercisesToDisplay, setExercisesToDisplay] = useState<Exercise[]>([])
    const [maxPages, setMaxPages] = useState<number>(1)
    const [pageNos, setPageNos] = useState<number[]>([])

    useEffect(()=> {
        const pageNums = []
        for (let i = 1; i <= maxPages; i++) {
            pageNums.push(i)
        }
        setPageNos(pageNums)
    }, [maxPages])

    useEffect(()=>{
        const exers = exercises.filter((exercise) => exercise.name.toLowerCase().includes(searchTxt.toLowerCase()));
        setFilteredExercises(exers)
        setMaxPages(Math.floor((exers.length + itemsOnOnePage - 1) / itemsOnOnePage))
        setCurrentPage(1)
    }, [searchTxt])

    useEffect(()=>{
        setExercisesToDisplay(filteredExercises.slice((itemsOnOnePage * currentPage) - itemsOnOnePage, itemsOnOnePage * currentPage))
    }, [filteredExercises, currentPage])

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
                    exercisesToDisplay.map((exercise)=>{
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

            <div className="flex w-full justify-center text-primary text-[16px]">
                <div className='flex items-center p-1 gap-2'>
                    <button onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage<=1}  className={`border bg-primary text-white rounded-md p-1 ${currentPage <= 1 ? 'bg-gray-600' : ' hover:text-primary hover:bg-white'}`}>
                        Previous <FontAwesomeIcon icon={faCaretLeft}/>
                    </button>
                
                <select className=' rounded-md p-1 border cursor-pointer border-primary border-1' name="" id="" value={currentPage} onChange={(e)=>setCurrentPage(Number(e.target.value))}>
                    {
                        pageNos.map((item, idx) => {
                            return <option value={item} >Page: {item}</option>
                        })
                    }
                </select>
                <button onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage==maxPages} className={`border bg-primary text-white rounded-md p-1 ${currentPage == maxPages ? 'bg-gray-600' : ' hover:text-primary hover:bg-white'}`}>
                    Next <FontAwesomeIcon icon={faCaretRight} />
                </button>
                
                </div>
                
            </div>
                
            </motion.div>

        </div>
    )
}

export default AddExerciseModal