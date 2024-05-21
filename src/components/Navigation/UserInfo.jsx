import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";


const UserInfo = () => {
    const [showInfo, setShowInfo] = useState(false);

    return <div className="text-purple-600 h-[40px] bg-purple-400/20 w-min p-2 rounded-md mb-6 flex items-center gap-4 cursor-pointer" onMouseOver={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>
        <FaUser />
        {showInfo &&
            <div className="flex items-center gap-2" onClick={() => {
                localStorage.removeItem('isLogged');
                localStorage.removeItem('user-id');
                window.location.href = '/'
            }} >
                <div>User</div>
                <IoExitOutline />
            </div>
        }
    </div>
}

export default UserInfo;