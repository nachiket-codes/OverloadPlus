import { faDumbbell } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LoadingSpinner = () => {
    return (
        <div className="w-full h-full p-6 flex items-center justify-center">
            <FontAwesomeIcon icon={faDumbbell}  className="animate-spin "/>
        </div>
    )
}

export default LoadingSpinner;