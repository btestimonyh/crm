import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { FaEdit } from 'react-icons/fa';

export default function ProjectsAction({ row, onEdit, onDelete,onChangeBuyer }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClickEdit = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleCloseEdit = () => {
        setAnchorEl(null);
    };

    return <div className='flex items-center justify-center text-xl p-4' onClick={(e) => {
        e.stopPropagation();
    }}>
        <FaEdit onClick={handleClickEdit} />
        <Menu
            id={`menu-edit`}
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseEdit}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={() => {
                onEdit(row);
                handleCloseEdit();
            }}>
                Переименовать
            </MenuItem>
            <MenuItem onClick={() => {
                onChangeBuyer(row);
                handleCloseEdit();
            }}>
                {!row.buyerId ? 'Назначить баера' : 'Сменить баера'}
            </MenuItem>

            <MenuItem onClick={() => {
                onDelete(row);
                handleCloseEdit();
            }}>
                Удалить
            </MenuItem>


        </Menu>
    </div>
}