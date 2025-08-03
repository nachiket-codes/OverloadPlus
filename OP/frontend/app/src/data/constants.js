
import { faHouse, faPenToSquare, faUser } from '@fortawesome/free-regular-svg-icons';
import { faClipboardList, faCubesStacked, faDumbbell } from '@fortawesome/free-solid-svg-icons';

export const inputStyle = "bg-[#f0efff] h-[62px] p-4 outline-none w-full rounded-md"
export const btnStyle = "bg-primary text-white text-xl w-full rounded-md h-[62px] shadow-lg"
export const navItems = [
    { label: 'Dashboard', id: 'dashboard', logo: faHouse},
    { label: 'Splits', id: 'split', logo: faDumbbell},
    { label: 'Log', id: 'log', logo: faClipboardList},
    { label: 'Profile', id: 'profile', logo: faUser},
  ];