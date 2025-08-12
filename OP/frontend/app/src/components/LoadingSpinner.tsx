import { faDumbbell } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LoadingSpinner = () => {
    return (
        <div className="fixed top-0 left-0">
            <FontAwesomeIcon icon={faDumbbell}  className="animate-spin "/>
        </div>
    )
}

export default LoadingSpinner;