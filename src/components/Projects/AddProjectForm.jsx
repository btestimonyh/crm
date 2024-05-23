import { IoClose } from "react-icons/io5"
import LoginInput from "../Login/Input"
import { Button } from "@mui/material"
import Select from 'react-select';
import { customStyles } from "../Users/CustomStylesSelect";
import { useRef, useState } from "react";
import { addNewProject } from "../../util/addNewProject";

const AddProjectForm = ({ onClose, projectsAmount, onAdd }) => {
    const nameInput = useRef(null);
    const options = [
        { value: 'buyer-id1', label: 'Байер1' },
        { value: 'buyer-id2', label: 'Байер2' },
        { value: 'buyer-id3', label: 'Байер3' },

    ]

    const [buyer, setBuyer] = useState(options[0]);

    const [nameError, setNameError] = useState(false);

    const submitHandler = (e) => {
        const nameValue = nameInput.current.value;
        e.preventDefault();
        if (nameValue.length < 1) {
            return setNameError(true);
        }
        const data = {
            id: projectsAmount + 1,
            name: nameValue,
            subs: 0,
            ftd: 0,
            rd: 0,
            leads: [],
            buyerId: buyer.value
        }

        addNewProject(data);
        onAdd(data);
        onClose();


    }
    const handleChange = (option) => {
        setBuyer(option);
    }



    return <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitHandler}
        className="bg-[#161c28] min-w-[360px] flex flex-col p-16 rounded-xl shadow-xl gap-4 max-sm:px-4 relative">
        <h1 className="text-xl w-full text-center">Добавить проект</h1>
        {/* <p className="text-sm text-gray-500">Пожалуйста, введите свои данные</p> */}

        <LoginInput placeholder="Название проекта" ref={nameInput} error={nameError} />
        <div className="text-gray-500 mt-2 text-sm">Отвественный байер</div>
        <Select
            defaultValue={options[0]}
            options={options}
            styles={customStyles}
            className='w-full'
            onChange={handleChange}
        />
        <Button type='submit' variant="contained" color="secondary"><span className="font-[700]">ДОБАВИТЬ</span></Button>
        <div className="absolute top-4 right-4 text-3xl cursor-pointer" onClick={onClose}>
            <IoClose />
        </div>

    </form>
}

export default AddProjectForm;