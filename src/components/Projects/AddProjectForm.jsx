import { IoClose } from "react-icons/io5"
import LoginInput from "../Login/Input"
import { Button } from "@mui/material"
import Select from 'react-select';
import { customStyles } from "../Users/CustomStylesSelect";
import { useEffect, useRef, useState } from "react";
import { addNewProject } from "../../util/addNewProject";
import { getUsers } from "../../util/getUsers";

const AddProjectForm = ({ onClose, projectsAmount, onAdd }) => {
    const [options, setOptions] = useState([]);
    const nameInput = useRef(null);
    const pixelInput = useRef(null);

    useEffect(() => {
        const getData = async () => {
            const data = await getUsers();
            const buyers = data.filter(user => user.job == 'buyer');
            const select = buyers.map(user => {
                return {
                    value: user.id,
                    label: user.name
                }
            })
            setOptions(select);
        }
        getData();
    }, [])

    const [buyer, setBuyer] = useState(options[0]);

    const [nameError, setNameError] = useState(false);

    const submitHandler = (e) => {
        const nameValue = nameInput.current.value;
        const pixelValue = pixelInput.current.value;
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
            buyerId: buyer.value,
            pixelId: pixelValue,
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
        <LoginInput placeholder='Pixel ID' className='my-2' ref={pixelInput} />
        <div className="text-gray-500 mt-2 text-sm">Отвественный байер</div>
        <Select
            defaultValue={options[0]}
            placeholder="Отвественный баер"
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