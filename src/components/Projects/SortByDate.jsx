
import { useState } from "react";
import SortByDateItem from "./SortByDateItem";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { Button } from "@mui/material";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

const SortByDate = ({ sortingStats }) => {
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
        }else{
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
            {/* <TestCalendar/> */}
        </div>
    );
}

export default SortByDate;