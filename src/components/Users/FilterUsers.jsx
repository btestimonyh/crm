import Select from 'react-select';
import { customStyles } from './CustomStylesSelect';

const FilterUsers = ({ filterUsers, filterStatus }) => {

    const options = [
        { value: 'owner', label: 'Владелец' },
        { value: 'buyer', label: 'Байер' },
        { value: 'admin', label: 'Админ' },
        { value: 'all', label: 'Все'}
    ]

    const options2 = [
        { value: 'all', label: 'Все' },
        { value: 'active', label: 'Активный' },
        { value: 'inactive', label: 'Неактивный' }
    ]
    const handleFilter = (option) => {
        filterUsers(option.value);
    }

    const handleFilter2 = (option) => {
        filterStatus(option.value);
    }


    return <div className="w-full bg-[#151d28] rounded-xl flex">
        <div className='w-full p-6'>
            ФИЛЬТРЫ
            <div className='flex gap-4'>
                <div>
                    <div className='text-gray-500 text-sm mt-4 pl-2'>
                        Должность
                    </div>
                    <Select
                        onChange={handleFilter}
                        styles={customStyles}
                        options={options}
                        className='w-[500px]'
                        placeholder='' />
                </div>
                <div>
                    <div className='text-gray-500 text-sm mt-4 pl-2'>
                        Статус
                    </div>
                    <Select
                        defaultValue={options2[0]}
                        onChange={handleFilter2}
                        styles={customStyles}
                        options={options2}
                        className='w-[500px]'
                        placeholder='' />
                </div>
            </div>

        </div>
        <div>

        </div>
    </div>
}

export default FilterUsers;