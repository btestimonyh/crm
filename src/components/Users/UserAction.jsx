import { HiDotsVertical } from "react-icons/hi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";


const UserAction = ({ params, onDeactive }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deactiveAccount = () => {
        console.log(params.row);
        handleClose();
        onDeactive();
        
    }

    return (
        <div className="flex items-center justify-center h-full text-xl cursor-pointer">
            <HiDotsVertical onClick={handleClick} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Профиль</MenuItem>
                <MenuItem onClick={deactiveAccount}>Деактивировать</MenuItem>
                <MenuItem onClick={handleClose}>Удалить</MenuItem>


            </Menu>
        </div>
    )

    // return <div className="relative flex items-center justify-center h-full text-xl cursor-pointer"
    //     onClick={(e) => {
    //         e.stopPropagation();

    //     }
    //     } >
    //     <HiDotsVertical />
    //     {/* <div className="absolute z-10 h-40 top-0 bg-white px-4 text-black rounded-xl shadow-xl border-1">Test</div> */}
    // </div >
}

export default UserAction;