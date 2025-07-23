import logo from '../assets/images/logo.png'
import { motion } from 'framer-motion'

const SplashScreen = ({ onComplete }: {onComplete: () => void}) => {
    return (
        <motion.div
            className="absolute inset-0 z-50 bg-white flex items-center justify-center border border-b-black"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            onAnimationComplete={() => {
                if (onComplete) onComplete();
            }}
            >
                <motion.img 
                    animate = {{scale: [1, 1.2, 1]}}
                    transition={{ duration:1.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-20" src={logo} alt="" />
        </motion.div>
    )
}

export default SplashScreen;