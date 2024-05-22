import { HiDotsVertical } from "react-icons/hi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { accountActive } from "../../util/accountActive";
import { deleteAccount as deleteAccountBack } from "../../util/deleteAccount";
import { Link } from "react-router-dom";


const UserAction = ({ account, onDeactive, onDelete }) => {
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
        handleClose();
        accountActive(account);
        onDeactive(account);
    }

    const deleteAccount = () => {
        handleClose();
        deleteAccountBack(account);
        onDelete(account);
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
                <MenuItem onClick={handleClose}>
                    <Link to={`/main/users/${account.email}`}>
                        Профиль
                    </Link>

                </MenuItem>
                <MenuItem onClick={deactiveAccount}>{account.status == 'active' ? 'Деактивировать' : 'Активировать'}</MenuItem>
                <MenuItem onClick={deleteAccount}>Удалить</MenuItem>


            </Menu>
        </div>
    )

}

export default UserAction;