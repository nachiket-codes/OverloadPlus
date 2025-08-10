import { motion } from 'framer-motion'

interface Prop {
    unselectionFunc: (e: React.FormEvent) => void
}

const BackDrop: React.FC<Prop> = ({unselectionFunc}) => {
    return (
        <motion.div
        className="w-full h-screen fixed top-0 left-0"
        onClick={unselectionFunc}
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(8px)" }}
        exit={{ backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ backdropFilter: "blur(0px)" }} 
        />
    )
}

export default BackDrop