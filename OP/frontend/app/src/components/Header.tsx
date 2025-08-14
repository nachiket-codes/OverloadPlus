import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faDumbbell, faXmark } from '@fortawesome/free-solid-svg-icons';
import logoText from '../assets/images/logo-text.png';
import logo from '../assets/images/logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../data/constants';

interface HeaderProps {
  activePage?: string;
  hideNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ activePage = 'a', hideNav = false }) => {
  const [showNav, setShowNav] = useState<boolean>(false);

  return (
    <>
      <div className="w-full h-16 p-6 flex items-center justify-between shadow-md">
        <img className="h-10 hidden sm:block" src={logoText} alt="Logo Text" />
        <FontAwesomeIcon icon={faDumbbell} className="sm:hidden text-2xl text-white bg-primary p-2 rounded-full rotate-45 shadow-md hover:rotate-180 transition-transform duration-300" />
        {/* <img className="h-10 sm:hidden" src={logo} alt="Logo" /> */}
        
        {
            !hideNav && (
                <FontAwesomeIcon
                icon={faBars}
                className="text-2xl text-primary hidden sm:block cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setShowNav(true)}
                />
            )
        }
        
      </div>

      <div
        className={`h-screen fixed top-0 bg-primary w-[400px] transition-all duration-300 ease-in-out transform z-50 shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.3)] ${
          showNav ? 'right-0' : 'right-[-100%]'
        }`}
      >
        
        <div className="h-16 p-6 flex justify-end">
          <FontAwesomeIcon
            icon={faXmark}
            className="text-2xl text-white cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setShowNav(false)}
          />
        </div>

        <ul className="pt-6 text-white text-2xl font-semibold flex flex-col gap-2">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`w-full text-center cursor-pointer p-2 transition-all duration-200 ${
                activePage === item.id
                  ? 'bg-yellow-400 text-primary hidden'
                  : 'hover:bg-white hover:text-primary'
              }`}
            >
                <Link to={`/${item.id}`}>{item.label}</Link>
              
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;
