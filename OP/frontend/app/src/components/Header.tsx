import logoText from '../assets/images/logo-text.png'
import logo from '../assets/images/logo.png'

const Header = () => {
    return (
        <div className="w-full h-16 p-6 flex items-center">
            <img className="h-10 hidden sm:block" src={logoText} alt="" />
            <img className="h-10 black sm:hidden" src={logo} alt="" />
        </div>
    )
}

export default Header