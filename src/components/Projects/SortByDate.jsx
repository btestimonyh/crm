
import { useState } from "react";
import SortByDateItem from "./SortByDateItem";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { Button } from "@mui/material";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Select from 'react-select';
import { customStyles } from "../Users/CustomStylesSelect";

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

const SortByDate = ({ sortingStats, sortingTimeZone }) => {
    const [activeSection, setActiveSection] = useState(0);
    const [value, setValue] = useState([dayjs().format('DD.MM.YYYY'), dayjs().format('DD.MM.YYYY')]);
    const [showTitle, setShowTitle] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const sortHandler = (index, time) => {
        setActiveSection(index);
        sortingStats(time);
        if (index !== 3) {
            setShowTitle('Выбрать')
        }
    }

    const submitHandler = () => {
        if (Array.isArray(value)) {
            const formattedDates = value.map(dateString => dateString ? dayjs(dateString, 'DD.MM.YYYY').format('DD.MM') : '');
            setShowTitle(formattedDates.join(' - '))
        } else {
            setShowTitle(value)
        }

        sortHandler(3, value);
        setIsOpen(false);
    }
    const sortData = (data) => {
        if (data[1] == null) {
            setValue(dayjs(data.$d).format('DD.MM.YYYY'))
        } else {
            const result = data.map(item => dayjs(item.$d).format('DD.MM.YYYY'));
            setValue(result);
        }

    }
    const options = [
        { value: -12, label: 'GMT-12' },
        { value: -11, label: 'GMT-11' },
        { value: -10, label: 'GMT-10' },
        { value: -9, label: 'GMT-9' },
        { value: -8, label: 'GMT-8' },
        { value: -7, label: 'GMT-7' },
        { value: -6, label: 'GMT-6' },
        { value: -5, label: 'GMT-5' },
        { value: -4, label: 'GMT-4' },
        { value: -3, label: 'GMT-3' },
        { value: -2, label: 'GMT-2' },
        { value: -1, label: 'GMT-1' },
        { value: 0, label: 'GMT+0' },
        { value: 1, label: 'GMT+1' },
        { value: 2, label: 'GMT+2' },
        { value: 3, label: 'GMT+3' },
        { value: 4, label: 'GMT+4' },
        { value: 5, label: 'GMT+5' },
        { value: 6, label: 'GMT+6' },
        { value: 7, label: 'GMT+7' },
        { value: 8, label: 'GMT+8' },
        { value: 9, label: 'GMT+9' },
        { value: 10, label: 'GMT+10' },
        { value: 11, label: 'GMT+11' },
        { value: 12, label: 'GMT+12' },
    ]

    const handleFilter = (option) =>{
        sortingTimeZone(option.value)
    }

    return (
        <div className="w-full flex items-center justify-center gap-4 mb-4 max-sm:grid max-sm:grid-cols-2">
            <SortByDateItem className={`${activeSection == 0 && 'bg-[#3e4aeb]'}`} onClick={() => sortHandler(0, 'all')}>ВСЁ ВРЕМЯ</SortByDateItem>
            <SortByDateItem className={`${activeSection == 1 && 'bg-[#3e4aeb]'}`} onClick={() => sortHandler(1, dayjs().format('DD.MM.YYYY'))}>СЕГОДНЯ</SortByDateItem>
            <SortByDateItem className={`${activeSection == 2 && 'bg-[#3e4aeb]'}`} onClick={() => sortHandler(2, dayjs().format('MM.YYYY'))}>МЕСЯЦ</SortByDateItem>
            
            <div className={`relative border-[1px] border-gray-500 rounded-xl p-2 cursor-pointer px-4  ${activeSection == 3 && 'bg-[#3e4aeb]'}`} onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center gap-2">
                    {showTitle ? showTitle : 'Выбрать'}
                    <MdOutlineKeyboardArrowDown />

                </div>
                {isOpen && <div className="absolute right-0 bg-[#121921] border-gray-500 z-10 rounded-xl flex items-center justify-center flex-col shadow-xl" onClick={(e) => e.stopPropagation()}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru">
                        <DateRangeCalendar
                            // controlled={true}
                            calendars={1}
                            // defaultValue={[dayjs(), dayjs()]}
                            onChange={(e) => sortData(e)}
                        />



                    </LocalizationProvider>
                    <div className="py-4">
                        {Array.isArray(value) ? value.join(' - ') : value}
                    </div>
                    <div className="flex gap-2 pb-4">
                        <Button variant="contained"><span className="font-[700]" onClick={submitHandler}>Применить</span></Button>
                        <Button variant="outlined"><span className="font-[700]" onClick={() => setIsOpen(false)}>Отменить</span></Button>
                    </div>

                </div>}


            </div>
            <Select
                styles={customStyles}
                options={options}
                defaultValue={options[12]}
                onChange={handleFilter}
                className='w-[140px] relative'
                placeholder='' />
            {/* <TestCalendar/> */}
        </div>
    );
}

export default SortByDate;