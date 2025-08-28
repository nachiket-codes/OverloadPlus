import { faArrowLeft, faArrowRight, faCaretLeft, faCaretRight, faFilter, faFilterCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {AnimatePresence, easeInOut, motion} from 'framer-motion'
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
const AnyStr: string = "Any"

const AddExerciseModal: React.FC<propType> = ({closeFunc, setAddedExerciseIds, exercises, excerciseLoading}) => {
    const [searchTxt, setSearchTxt] = useState<string>("")
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [exercisesToDisplay, setExercisesToDisplay] = useState<Exercise[]>([])
    const [maxPages, setMaxPages] = useState<number>(1)
    const [pageNos, setPageNos] = useState<number[]>([])
    const [categoryFilter, setCategoryFilter] = useState<string[]>([])
    const [category, setCategory] = useState<string>(AnyStr)
    const [muscleGroupFilter, setMuscleGroupFilter] = useState<string[]>([])
    const [muscleGroup, setMuscleGroup] = useState<string>(AnyStr)
    const [equipementFilter, setEquipementFilter] = useState<string[]>([])
    const [equipement, setEquipement] = useState<string>(AnyStr)
    const [showFilter, setShowFilter] = useState<boolean>(false)

    useEffect(()=> {
        const pageNums = []
        for (let i = 1; i <= maxPages; i++) {
            pageNums.push(i)
        }
        setPageNos(pageNums)
    }, [maxPages])

    useEffect(()=>{
        let exers = exercises.filter((exercise) => exercise.name.toLowerCase().includes(searchTxt.toLowerCase()));

        if (category != AnyStr) {
            exers = exers.filter((exercise) => exercise.category == category)
        }
        if (muscleGroup != AnyStr) {
            exers = exers.filter((exercise) => exercise.muscle_group == muscleGroup)
        }
        if (equipement != AnyStr) {
            exers = exers.filter((exercise) => exercise.equipment == equipement)
        }
        setFilteredExercises(exers)
        
        setMaxPages(Math.floor((exers.length + itemsOnOnePage - 1) / itemsOnOnePage))
        setCurrentPage(1)
    }, [searchTxt, category, muscleGroup, equipement])

    useEffect(()=> {
        setCategoryFilter([AnyStr, ...Array.from(new Set(exercises.map((exData) => exData.category)))])
        setMuscleGroupFilter([AnyStr, ...Array.from(new Set(exercises.map((exData) => exData.muscle_group)))])
        setEquipementFilter([AnyStr, ...Array.from(new Set(exercises.map((exData) => exData.equipment)))])
    }, [exercises])

    useEffect(()=>{
        setExercisesToDisplay(filteredExercises.slice((itemsOnOnePage * currentPage) - itemsOnOnePage, itemsOnOnePage * currentPage))
    }, [filteredExercises, currentPage])

    const addExercise = (e: React.FormEvent, eid: string) => {
        setAddedExerciseIds((prev)=> [...prev, eid])
        setSearchTxt('')
        closeFunc()
    }

    const clearFilter = (e: React.FormEvent) => {
        setCategory(AnyStr)
        setMuscleGroup(AnyStr)
        setEquipement(AnyStr)
        setShowFilter(false)
    }

    return (
        <div className="z-[100] w-full max-h-screen fixed top-0 left-0 flex justify-center overflow-auto" onClick={closeFunc}>
            <motion.div className="w-[90%] bg-white shadow-md p-4 rounded-md border mt-4 h-max mb-[130px] overflow-scroll" onClick={(e) => e.stopPropagation()}
                initial={{scale:0}}
                animate={{scale:[0.8, 1.1, 1]}}
                exit={{scale:[1, 1.1, 0]}}
                transition={{duration:0.4, ease: [0.25, 0.8, 0.25, 1]}}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-primary text-2xl font-semibold ">Add Exercise</h1>
                    <FontAwesomeIcon icon={faXmark} className="text-primary hover:text-red-500 font-semibold cursor-pointer text-xl" onClick={closeFunc}/>
                </div>
                <form action="">
                    <input type="text" placeholder="Search exercise" value={searchTxt} onChange={(e)=>setSearchTxt(e.target.value)} className="bg-[#f0efff] h-[40px] p-4 outline-none w-full rounded-md" />

                </form>
                <div className={`${!showFilter && 'border-b'}`}>
                <div className="p-2 text-xl font-semibold flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer"  onClick={(e)=>setShowFilter(!showFilter)}>
                        <h1>{`${showFilter ? 'Close filter' : 'Show filter'}`}</h1>
                            {
                                showFilter ?
                                <FontAwesomeIcon icon={faFilterCircleXmark}/> :
                                <FontAwesomeIcon icon={faFilter} />
                            }
                    </div>
                    {
                        (category !== AnyStr || muscleGroup !== AnyStr || equipement != AnyStr) && 
                        <h1 className="text-[14px] text-primary cursor-pointer hover:text-primary-500" onClick={clearFilter}>
                            Clear filter <FontAwesomeIcon icon={faXmark}/>
                        </h1>
                    }
                    
                    
                </div>
                <AnimatePresence>
                    {
                        showFilter && 
                            <motion.div
                                initial={{ scaleY: 0, opacity: 0 }}
                                animate={{ scaleY: [0.8, 1.1, 1], opacity: 1 }}
                                exit={{ scaleY: [1, 1.1, 0.8], opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                className="overflow-hidden bg-gray-100 p-2 rounded-xl flex flex-col gap-2">

                            <div className="flex gap-2 items-center justify-between">
                                <h1>Category: </h1>
                                    <select className=' w-[50%] rounded-md border cursor-pointer border-primary outline-none border-1' name="" id="" value={category} onChange={(e)=>setCategory(e.target.value)}>
                                    {
                                        categoryFilter.map((item, idx) => {
                                        return <option value={item} > {item}</option>
                                        })
                                    }
                                    </select>
                            </div>

                            <div className="flex gap-2 items-center justify-between">
                                <h1>Muscle group: </h1>
                                    <select className=' rounded-md border cursor-pointer border-primary outline-none border-1 w-[50%] ' name="" id="" value={muscleGroup} onChange={(e)=>setMuscleGroup(e.target.value)}>
                                    {
                                        muscleGroupFilter.map((item, idx) => {
                                        return <option value={item} > {item}</option>
                                        })
                                    }
                                    </select>
                            </div>

                            <div className="flex gap-2 items-center justify-between">
                                <h1>Equipement: </h1>
                                    <select className=' rounded-md border cursor-pointer border-primary outline-none border-1 w-[50%] ' name="" id="" value={equipement} onChange={(e)=>setEquipement(e.target.value)}>
                                    {
                                        equipementFilter.map((item, idx) => {
                                        return <option value={item} > {item}</option>
                                        })
                                    }
                                    </select>
                            </div>
                        </motion.div>
                    }
                
                </AnimatePresence>
                </div>
                
                <div className="">
                {
                    exercisesToDisplay.map((exercise)=>{
                        return (
                            <div className="border-b p-2 cursor-pointer hover:shadow-md hover:text-primary" onClick={(e)=>addExercise(e, exercise.id)}>
                                <h1 className="text-[16px] font-bold mb-1">{exercise.name}</h1>
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
                    <button onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage<=1}  className={`border text-white rounded-md p-1 ${currentPage <= 1 ? 'bg-gray-600' : 'bg-primary'}`}>
                        Previous <FontAwesomeIcon icon={faCaretLeft}/>
                    </button>
                
                <select className=' rounded-md  outline-none p-1 border cursor-pointer border-primary border-1' name="" id="" value={currentPage} onChange={(e)=>setCurrentPage(Number(e.target.value))}>
                    {
                        pageNos.map((item, idx) => {
                            return <option value={item} >Page: {item}</option>
                        })
                    }
                </select>
                <button onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage==maxPages} className={`border text-white rounded-md p-1 ${currentPage === maxPages ? 'bg-gray-600' : 'bg-primary'}`}>
                    Next <FontAwesomeIcon icon={faCaretRight} />
                </button>
                
                </div>
                
            </div>
                
            </motion.div>

        </div>
    )
}

export default AddExerciseModal
