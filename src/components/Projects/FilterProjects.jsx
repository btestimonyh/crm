import Select from 'react-select';
import { customStyles } from '../Users/CustomStylesSelect';
import { useEffect, useState } from 'react';
import { getUsers } from '../../util/getUsers';

const FilterProjects = ({ filterProjects }) => {
    const [options, setOptions] = useState([]);

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
            setOptions([{ value: 'all', label: 'Все'}, ...select]);
        }
        getData();
    }, [])

    // const options = [
    //     { value: 'owner', label: 'Владелец' },
    //     { value: 'buyer', label: 'Байер' },
    //     { value: 'admin', label: 'Админ' },
    //     { value: 'all', label: 'Все'}
    // ]

    const handleFilter = (option) => {
        filterProjects(option.value);
    }




    return <div className="w-full bg-[#151d28] rounded-xl flex">
        <div className='w-full p-6'>
            ФИЛЬТРЫ
            <div className='flex gap-4 max-md:flex-col items-center justify-between'>
                <div>
                    <div className='text-gray-500 text-sm mt-4 pl-2'>
                        Байер
                    </div>
                    <Select
                        onChange={handleFilter}
                        styles={customStyles}
                        options={options}
                        defaultValue={{ value: 'all', label: 'Все'}}
                        className='w-[500px] max-xl:w-[300px] max-lg:w-[260px] max-md:w-[90vw] relative'
                        placeholder='' />
                </div>


            </div>

        </div>
        <div>

        </div>
    </div>
}

export default FilterProjects;