import { FaRegUser } from "react-icons/fa";
// import { FiShoppingCart } from "react-icons/fi";
// import { IoIosStats } from "react-icons/io";
import { GrProjects } from "react-icons/gr";


import NavItem from "./NavItem";
import UserInfo from "./UserInfo";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useSelector } from "react-redux";
import { role } from "../../store/store";






const Navigation = () => {
    const [showNavigation, setShowNavigation] = useState(false);
    useEffect(() => {


        if (showNavigation) {
            gsap.fromTo('#mobile-nav', { x: '-100vw' }, { x: 0, duration: .5 })
        }

    }, [showNavigation])

    const closeNavigation = () => {
        gsap.fromTo('#mobile-nav', { x: '0' }, { x: '-100vw', duration: .5, onComplete: () => setShowNavigation(false) })
    }

    const ROLE = useSelector(role);
    const ADMIN = (ROLE == 'owner' || ROLE == 'admin') ;
    return (
        <>
            {/* DESKTOP */}
            <nav className="w-[320px] max-md:hidden">
                <UserInfo />
                {ADMIN && <NavItem to='/main/users' icon={<FaRegUser />} background='bg-red-600'>Пользователи</NavItem>}
                {/* <NavItem to='/main/leads' icon={<FiShoppingCart />} background='bg-yellow-600'>Лиды</NavItem> */}
                {/* <NavItem to='/main/stats' icon={<IoIosStats />} background='bg-blue-600'>Статистика</NavItem> */}
                <NavItem to='/main/projects' icon={<GrProjects />} background='bg-green-600'>Проекты</NavItem>
            </nav>
            {/* MOBILE */}

            {showNavigation && <nav id='mobile-nav' className="relative w-[320px] md:hidden max-md:fixed max-md:left-0 max-md:top-0 max-md:w-screen max-md:bg-[#151d28] max-md:z-10 max-md:h-screen max-md:p-2 max-md:py-10">
                <UserInfo />
                {ADMIN && <NavItem to='/main/users' icon={<FaRegUser />} background='bg-red-600' onClick={() => setShowNavigation(false)}>Пользователи</NavItem>}
                {/* <NavItem to='/main/leads' icon={<FiShoppingCart />} background='bg-yellow-600' onClick={() => setShowNavigation(false)}>Лиды</NavItem> */}
                {/* <NavItem to='/main/stats' icon={<IoIosStats />} background='bg-blue-600' onClick={() => setShowNavigation(false)}>Статистика</NavItem> */}
                <NavItem to='/main/projects' icon={<GrProjects />} background='bg-green-600' onClick={() => setShowNavigation(false)}>Проекты</NavItem>
                <div className="absolute top-4 right-4 text-3xl" onClick={closeNavigation}>
                    <AiOutlineCloseSquare />
                </div>
            </nav>}
            <div className="fixed top-4 left-4 text-3xl z-8 bg-gray-600/50 p-2 rounded-[50%] md:hidden" onClick={() => setShowNavigation(true)}>
                <RxHamburgerMenu />
            </div>

        </>
    )


}

export default Navigation;