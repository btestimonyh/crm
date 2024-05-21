import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosStats } from "react-icons/io";




import NavItem from "./NavItem";
import UserInfo from "./UserInfo";




const Navigation = () =>{
    
    return <nav className="w-[320px] ml-4 mt-10 max-md:fixed max-md:left-0 max-md:top-0">
        <UserInfo/>
        <NavItem to='/main/users' icon={<FaRegUser/>} background='bg-red-600'>Пользователи</NavItem>
        <NavItem to='/main/leads' icon={<FiShoppingCart/>} background='bg-yellow-600'>Лиды</NavItem>
        <NavItem to='/main/stats' icon={<IoIosStats/>} background='bg-blue-600'>Статистика</NavItem>
    </nav>
}

export default Navigation;