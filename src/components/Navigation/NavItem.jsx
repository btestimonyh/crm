import { NavLink } from "react-router-dom"

const NavItem = ({ children, icon, to, background, onClick }) => {
    return <NavLink to={to} onClick={onClick} className={({ isActive }) =>
        `flex items-center w-full gap-4 rounded-md p-2 ${isActive ? 'bg-[#3e4aeb]' : 'hover:bg-[#3e4aeb]/20'}`
    }>
        <div className={`${background} rounded-md text-[#fff] p-1`}>
            {icon}
        </div>
        <div>
            {children}
        </div>
    </NavLink>
}

export default NavItem;