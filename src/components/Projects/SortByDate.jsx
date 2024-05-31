
import { useEffect, useState } from "react";
// import SortByDateItem from "./SortByDateItem";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { Button } from "@mui/material";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Select from 'react-select';
import { customStyles } from "../Users/CustomStylesSelect";
import SortItem from "./sortItem";
import { optionsTimeZone } from "../../util/front/constants";
import { IoMdClose } from "react-icons/io";

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

const SortByDate = ({ sortingStats, sortingTimeZone }) => {
    const [value, setValue] = useState([dayjs().format('DD.MM.YYYY'), dayjs().format('DD.MM.YYYY')]);
    const [showTitle, setShowTitle] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const sortHandler = (time) => {
        setIsOpen(false);
        if (Array.isArray(time)) {
            const formattedDates = time.map(dateString => dateString ? dayjs(dateString, 'DD.MM.YYYY').format('DD.MM') : '');
            setShowTitle(formattedDates.join(' - '))
        } else {
            setShowTitle(time)
        }

        sortingStats(time);
    }

    const submitHandler = () => {
        sortHandler(value);
        setIsOpen(false);
    }
    const sortData = (data) => {
        if (data[1] === null) {
            setValue(dayjs(data[0].$d).format('DD.MM.YYYY'));
        } else {
            const result = data.map(item => dayjs(item.$d).format('DD.MM.YYYY'));
            setValue(result);
        }

    }


    const handleFilter = (option) => {
        sortingTimeZone(option.value)
    }
    useEffect(() => {
        document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
    }, [isOpen])

    return (
        <div className="w-full flex items-center justify-start px-8 max-sm:px-2 gap-4 mb-4 max-sm:justify-between">
            {/* <SortByDateItem className={`${activeSection == 0 && 'bg-[#3e4aeb]'}`} onClick={() => sortHandler(0, 'all')}>ВСЁ ВРЕМЯ</SortByDateItem>
            <SortByDateItem className={`${activeSection == 1 && 'bg-[#3e4aeb]'}`} onClick={() => sortHandler(1, dayjs().format('DD.MM.YYYY'))}>СЕГОДНЯ</SortByDateItem>
            <SortByDateItem className={`${activeSection == 2 && 'bg-[#3e4aeb]'}`} onClick={() => sortHandler(2, dayjs().format('MM.YYYY'))}>МЕСЯЦ</SortByDateItem> */}

            <Select
                styles={customStyles}
                options={optionsTimeZone}
                defaultValue={optionsTimeZone[12]}
                onChange={handleFilter}
                className='w-[140px] relative'
                placeholder='' />
            <div className={`relative border-[1px] border-gray-500 rounded-xl p-2 cursor-pointer px-4`} onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center gap-2">
                    {showTitle ? showTitle : 'Выбрать дату'}
                    <MdOutlineKeyboardArrowDown />
                </div>

                {isOpen && <div className="absolute max-sm:top-0 max-sm:flex-col max-sm:h-screen max-sm:fixed max-sm:w-full max-lg:left-[-100px] max-sm:left-0 flex gap-2 left-0 bg-[#121921] border-gray-500 z-10 rounded-xl flex max-sm:pt-2  items-center justify-center max-sm:justify-start shadow-xl" onClick={(e) => e.stopPropagation()}>
                    <div className="absolute top-4 right-4 text-[30px] sm:hidden" onClick={() => setIsOpen(false)}><IoMdClose /></div>
                    <div className="flex max-sm:flex-col gap-2 max-h-[80vh] overflow-auto">
                        <div className="text-center border-r-2 px-4 flex flex-col gap-2 w-max self-start max-sm:self-center mt-8 max-sm:border-r-[0px]  ">
                            <h3 className="border-b-[1px] pb-2 border-gray-600 max-sm:border-b-[0px]">Выберите опции</h3>
                            <div className="flex flex-col gap-4 max-sm:grid max-sm:grid-cols-2 max-sm:gap-2 max-sm:px-2">
                                <SortItem onClick={() => sortHandler(dayjs().format('DD.MM.YYYY'))}>За сегодня</SortItem>
                                <SortItem onClick={() => sortHandler(dayjs().subtract(1, 'day').format('DD.MM.YYYY'))}>За вчера</SortItem>
                                <SortItem onClick={() => {
                                    let today = dayjs();
                                    let startDate = today.subtract(6, 'day');
                                    sortHandler([startDate.format('DD.MM.YYYY'), today.format('DD.MM.YYYY')])
                                }
                                }>За последние 7 дней</SortItem>
                                <SortItem onClick={() => sortHandler(dayjs().format('MM.YYYY'))}>За этот месяц</SortItem>
                                <SortItem onClick={() => sortHandler('За всё время')}>За всё время</SortItem>

                            </div>
                        </div>

                        <div className="flex items-center flex-col">
                            <LocalizationProvider dateAdapter={AdapterDayjs} locale="ru">
                                <DateRangeCalendar
                                    // controlled={true}
                                    calendars={1}
                                    // defaultValue={[dayjs(), dayjs()]}
                                    onChange={(e) => sortData(e)}
                                />



                            </LocalizationProvider>
                            <div className="py-4 max-sm:mt-[-40px]">
                                {Array.isArray(value) ? value.join(' - ') : value}
                            </div>
                            <div className="flex gap-2 pb-4">
                                <Button variant="contained"><span className="font-[700]" onClick={submitHandler}>Применить</span></Button>
                                <Button variant="outlined"><span className="font-[700]" onClick={() => setIsOpen(false)}>Отменить</span></Button>
                            </div>

                        </div>
                    </div>

                </div>}


            </div>

            {/* <TestCalendar/> */}
        </div>
    );
}

export default SortByDate;