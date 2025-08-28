import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {AnimatePresence, easeIn, easeInOut, motion} from "framer-motion"
import DatePicker from "./DatePicker";
import BackDrop from "../Backdrop";

interface Prop {
    curDate: Date | undefined
    setCurDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}
const DateSection: React.FC<Prop> = ({curDate, setCurDate}) => {
    const [showCalendar, setShowCalendar] = useState<boolean>(false)
    
    useEffect(()=>{
        setShowCalendar(false)
    }, [curDate])

    return (
        <div className="flex flex-col">
            <div className="flex justify-end ">
                <motion.button className="border rounded-md w-max p-1 pl-2 pr-2 flex justify-center items-center gap-2 cursor-pointer hover:border-primary hover:text-primary"
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                    transition={{duration:0.3, ease: easeInOut}}
                    onClick={()=>setShowCalendar(true)}
                >
                    {
                        (curDate && curDate.toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric"}) === new Date().toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric"})) ?
                        "Today" :
                        curDate?.toLocaleDateString("en-GB", {day: "numeric", month: "long"})
                    }
                    <FontAwesomeIcon icon={faAngleDown}/>
                </motion.button>
            </div>
            <AnimatePresence>
                {
                    showCalendar && (
                        <>
                            <BackDrop unselectionFunc={()=>setShowCalendar(false)}/>
                            <motion.div
                            initial={{y:400}}
                            animate={{y:[400, -50, 0]}}
                            exit={{y: [0, -50, 400]}}
                            transition={{duration:0.3, ease: easeIn}}
                            className="fixed bottom-0 left-0 w-full z-[100]">
                             <DatePicker selected={curDate} setSelected={setCurDate}/>
                            </motion.div>
                        </>
                    )
                }
                
            </AnimatePresence>
            
        </div>
    )
}


export default DateSection;
