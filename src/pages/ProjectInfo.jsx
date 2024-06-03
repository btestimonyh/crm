import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Select from 'react-select';
import { DataGrid } from "@mui/x-data-grid";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { leadsTitle } from "../components/Projects/leadsTitle";
import { customStyles } from "../components/Users/CustomStylesSelect";
import { getProjectById } from "../util/getProjectById";
import SortByDate from "../components/Projects/SortByDate";
import CopyPixel from "../components/Projects/СopyPixel";
import { useSelector } from "react-redux";
import { role } from "../store/store";
import { statsTitle } from "../components/Projects/statsTitle";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { TailSpin } from "react-loader-spinner";
import { getUserById } from "../util/getUserById";
import { FaEdit } from "react-icons/fa";
import Modal from "../components/Modal/Modal";
import BuyerChange from "../components/Projects/BuyerChange";
import { updateProject } from "../util/updateProject";


dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);



const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
    }, {});
};


const ProjectInfo = () => {
    const [sortModel, setSortModel] = useState([]);
    const { id } = useParams();
    const [showRows, setShowRows] = useState([]);
    const [project, setProject] = useState({ leads: false });
    const [activeLeads, setActiveLeads] = useState();
    const [groupByField, setGroupByField] = useState("sub1");
    const [adminTable, setAdminTable] = useState(false);
    // const [isSorted,setIsSorted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [timeZone, setTimeZone] = useState(0);
    const [sortedDate, setSortedDate] = useState('За всё время');
    const [editBuyer, setEditBuyer] = useState(false);

    const ROLE = useSelector(role);
    const ADMIN = (ROLE == 'owner' || ROLE == 'admin');
    const [buyerName, setBuyerName] = useState('');
    const [activeBuyer, setActiveBuyer] = useState();

    useEffect(() => {
        const getData = async () => {
            const data = await getProjectById(id, timeZone);
            setProject(data);
            setActiveLeads(data.leads);
        }

        setTimeout(() => setIsLoading(false), 1000)
        getData();
    }, [id]);

    useEffect(() => {
        editBuyer ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto'
    }, [editBuyer])

    useEffect(() => {
        const getData = async () => {
            const user = await getUserById(project.buyerId);
            setBuyerName(user.name);
        }
        if (project.buyerId !== 'none') {
            getData();
        }
    }, [project])

    const updateData = async (zone = timeZone) => {
        const data = await getProjectById(id, zone);
        setTimeout(() => setIsLoading(false), 1000)
        setProject(data);
    }


    if (!project.leads || project.leads.length == 0) {
        return (
            <section className="bg-[#151d28] rounded-xl p-4 relative flex items-center justify-center text-2xl">
                В этом проекте нет лидов
                <div className="absolute top-4 right-4 max-md:right-0">
                    <Link to="/main/projects" className="flex items-center gap-4 text-xl rounded-xl bg-[#151d28] p-4">
                        <IoMdArrowRoundBack />
                        Назад
                    </Link>
                </div>
            </section>
        );
    }



    const leads = activeLeads.map((el, index) => ({
        id: index,
        ...el
    }));

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const groupedLeads = groupByField ? groupBy(leads, groupByField) : { All: leads };

    const rowsLeads = [];
    let rowsStats = [];
    let rowId = 0;

    for (const [group, items] of Object.entries(groupedLeads)) {

        const totalIsFtd = items.reduce((total, lead) => {
            if (lead.isFtd == "true" || lead.isFtd == true) {
                return total + 1;
            }
            return total;
        }, 0);
        const totalrdCount = items.reduce((total, lead) => {
            return lead.rdCount ? total + parseInt(lead.rdCount) : total + 0;
        }, 0);
        const totalrdAmount = items.reduce((total, lead) => {
            return lead.rdAmount ? total + parseInt(lead.rdAmount) : total + 0;
        }, 0);
        const totalftdAmount = items.reduce((total, lead) => {
            return lead.ftdAmount ? total + parseInt(lead.ftdAmount) : total + 0;
        }, 0);


        const nameHeader = (!group || group == undefined || group == 'undefined') ? 'Отсутствует' : group == 'true' ? 'Да' : group == 'false' ? 'Нет' : group;


        if (groupByField) {
            rowsLeads.push({
                id: `${groupByField}-${group}`,
                isGroupHeader: true,
                groupName: `${nameHeader} (${items.length})`,
                isFtd: totalIsFtd,
                ftdAmount: totalftdAmount,
                rdCount: totalrdCount,
                rdAmount: totalrdAmount,
            });
            if (activeLeads.length > 0 && activeLeads) {
                rowsStats.push({
                    id: `${groupByField}-${group}`,
                    isGroupHeader: true,
                    groupName: `${nameHeader}`,
                    leads: items.filter(lead => lead.subscribed).length,
                    inactive: items.filter(lead => !lead.subscribed).length,
                    ftdAmount: totalftdAmount + ' $',
                    ftd: totalIsFtd,
                    rd: totalrdCount,
                    rdAmount: totalrdAmount + ' $',
                    subsFtd: `${items.filter(lead => lead.subscribed).length} / ${totalIsFtd} (${items.filter(lead => lead.subscribed).length > 0 && totalIsFtd > 0 ? ((totalIsFtd * 100) / items.filter(lead => lead.subscribed).length).toFixed(2) : 0}%)`,
                    // ftdRd: rdAmount > 0 ? (ftdAmount/rdAmount).toFixed(2) : 0,
                    ftdRd: `${totalIsFtd}/${totalrdCount} (${totalIsFtd > 0 && totalrdCount > 0 ? ((totalIsFtd * 100) / totalrdCount).toFixed(2) : 0}%)`,
                    // name: project.name
                })
            }

        }

        if (!groupByField || showRows.includes(`${groupByField}-${group}`)) {
            items.forEach(item => {
                rowsLeads.push({
                    id: `item-${rowId++}`,
                    ...item,
                    isGroupHeader: false,
                });
            });
        }
        const rdAmount = project.leads.reduce((total, lead) => {
            return lead.rdAmount ? total + parseInt(lead.rdAmount) : total + 0;
        }, 0);
        const ftdAmount = activeLeads.reduce((total, lead) => {
            return lead.ftdAmount ? total + parseInt(lead.ftdAmount) : total + 0;
        }, 0);
        const ftdCount = activeLeads.reduce((total, lead) => {
            if (lead.isFtd == "true" || lead.isFtd == true) {
                return total + 1;
            }
            return total;
        }, 0);
        const rdCount = activeLeads.reduce((total, lead) => {
            return lead.rdCount ? total + parseInt(lead.rdCount) : total + 0;
        }, 0);

        if (!groupByField && activeLeads.length > 0) {
            rowsStats = [{
                id: project.id,
                name: project.name,
                subs: project.subs,
                leads: leads ? leads.filter(lead => lead.subscribed).length : 0,
                inactive: leads ? leads.filter(lead => !lead.subscribed).length : 0,
                ftd: ftdCount,
                ftdAmount: ftdAmount + " $",
                rd: rdCount,
                rdAmount: rdAmount + " $",
                // subsFtd: ftdAmount > 0 ? project.subs/ftdAmount : 0,
                subsFtd: `${leads.filter(lead => lead.subscribed).length} / ${ftdCount} (${leads.filter(lead => lead.subscribed).length > 0 && ftdAmount > 0 ? ((ftdCount * 100) / (leads.filter(lead => lead.subscribed).length)).toFixed(2) : 0}%)`,
                // ftdRd: rdAmount > 0 ? (ftdAmount/rdAmount).toFixed(2) : 0,
                ftdRd: `${ftdCount}/${rdCount} (${ftdCount > 0 && rdCount > 0 ? ((ftdCount * 100) / rdCount).toFixed(2) : 0}%)`,
            }]
        }

    }

    const filteredLeadTitle = leadsTitle
        .filter(column => column.field !== 'id')
        .map(column => ({
            ...column,
            sortable: !groupByField
        }));



    const headerNameGroup = groupByField == 'regDate' ? 'Дата' : groupByField == 'isFtd' ? 'FTD' : groupByField == 'rdCount' ? "RD" : groupByField == 'sub1' ? 'link' : groupByField == 'sub6' ? 'adset name' : groupByField;

    const columnsLeads = [
        ...(groupByField ? [{
            field: 'groupName',
            headerName: headerNameGroup,
            sortable: false,
            disableColumnMenu: true,
            // flex: 1,
            minWidth: 200,
            renderCell: (params) => params.row.isGroupHeader ? <div className="px-2">{params.value}</div> : null
        }] : []),
        ...filteredLeadTitle,
    ];
    const columnsStats = [
        ...(groupByField ? [{
            field: 'groupName',
            headerName: headerNameGroup,
            sortable: true,
            disableColumnMenu: true,
            // flex: 1,
            minWidth: 200,
            renderCell: (params) => params.row.isGroupHeader ? <div className="px-2">{params.value}</div> : null
        }] : [{
            field: "name",
            headerName: "Название проекта",
            minWidth: 220,
            disableColumnMenu: true,
        },
        ]),
        ...statsTitle,
    ];

    const uniqueFields = Object.keys(project.leads[0]);
    const options = uniqueFields.flatMap(field => {
        // const uniqueValues = getUniqueValues(leads, field);
        const label = field == 'isFtd' ? 'FTD' : field == 'rdCount' ? 'RD' : field == 'sub1' ? 'link' : field == 'sub6' ? "adset name" : field;
        // return uniqueValues.length > 1 && (field !== 'id' && field !== 'firstName' && field !== 'lastName') ? [{ value: field, label: field }] : [];
        return (field == 'sub1' || field == 'sub2' || field == 'sub3' || field == 'sub4' || field == 'sub5' || field == 'sub6' || field == 'sub7' || field == 'sub8' || field == 'isFtd' || field == 'rdCount') ? [{ value: field, label: label }] : [];
    });

    options.unshift({ value: 'regDate', label: 'Дата' });
    options.unshift({ value: '', label: 'Сбросить' });


    const handleFilter = (option) => {
        setGroupByField(option.value);
        setSortModel([]);
    };


    const sortingStats = (time) => {
        setSortedDate(time);
        updateData();
        setIsLoading(true);
        if (time == 'За всё время') {
            return setActiveLeads(project.leads)
        } else if (time.length == 7) {
            const filteredList = project.leads.filter(el => el.regDate && el.regDate.includes(time));
            return setActiveLeads(filteredList)
        }
        else if (Array.isArray(time) && time.length === 2) {
            const [startDate, endDate] = time.map(date => dayjs(date, 'DD.MM.YYYY'));
            const filteredList = project.leads.filter(el => {
                const regDate = dayjs(el.regDate, 'DD.MM.YYYY');
                return regDate.isSameOrAfter(startDate) && regDate.isSameOrBefore(endDate);
            });
            return setActiveLeads(filteredList);
        }

        const filteredList = project.leads.filter(el => el.regDate == time);
        setActiveLeads(filteredList);

    }

    const timeZoneHandler = async (time) => {
        setIsLoading(true);
        setTimeZone(time);
        await updateData(time);
        sortingStats(sortedDate);
    }

    const handleChange = (option) => {
        setActiveBuyer(option);
    }

    const submitBuyerChange = () => {
        if (activeBuyer) {
            updateProject(project.id, activeBuyer.value);
            setEditBuyer(false);
            updateData();
            activeBuyer.value !== 'none' ? setBuyerName(activeBuyer.label) : setBuyerName('Отсутствует');
        } else {
            setEditBuyer(false);
        }

    }
    return (
        <section className="mb-10">
            {leads ? <div className="relative w-full bg-[#151d28] rounded-xl z-[0] pt-24 max-sm:pt-22">
                <SortByDate sortingStats={sortingStats} sortingTimeZone={timeZoneHandler} />
                <div className="flex gap-6 max-md:flex-col-reverse max-md:items-start max-md:px-2 max-md:gap-1 w-full">
                    <div>
                        <div className='text-gray-500 text-sm mt-4 pl-2 ml-8 mb-2'>
                            Группирование
                        </div>
                        <Select
                            onChange={handleFilter}
                            styles={customStyles}
                            options={options}
                            className='w-[500px] max-xl:w-[300px] max-lg:w-[260px] max-md:w-[90vw] ml-8 mb-8 max-md:ml-1'
                            placeholder='link'
                        />
                    </div>
                    <div className="flex gap-4 justify-center">
                        <CopyPixel text={project.pixelId} />
                        {ADMIN && <div className="cursor-pointer" onClick={() => setEditBuyer(true)}>
                            <div className='text-gray-500 text-sm mt-4 pl-2 mb-2'>
                                Баер
                            </div>
                            <div className="flex items-center gap-2">
                                {buyerName ? buyerName : 'Отсутствует'}
                                <FaEdit className="text-[130%]" />
                            </div>
                        </div>}

                    </div>


                </div>
                <div className="w-full flex justify-between items-center px-8 gap-2">
                    <div className="text-[20px] text-gray-400 max-sm:text-[14px]">{project.name}</div>
                    {ADMIN && <Button variant="contained" color="secondary" onClick={() => setAdminTable(!adminTable)}><span className="font-[700]">{!adminTable ? "Таблица лидов" : "Таблица статистики"}</span></Button>}
                </div>



                {isLoading ? <div className="w-full h-[60vh] flex items-center justify-center"> <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="gray"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                /> </div> : (
                    !adminTable ?
                        // STATS TABLE
                        <Box className="px-6 w-full h-[65vh] max-sm:px-4 max-sm:gap-1">
                            <DataGrid
                                sx={{
                                    color: "white",
                                    border: "none",
                                    "@media (max-width: 600px)": {
                                        fontSize: "12px",
                                    },
                                }}
                                localeText={{
                                    noRowsLabel: "Пользователи не найдены",
                                }}
                                sortModel={sortModel}
                                onSortModelChange={(newModel) => setSortModel(newModel)}
                                rows={rowsStats}
                                columns={columnsStats}
                                initialState={{
                                    pagination: {
                                        style: { color: 'white' },
                                        paginationModel: { page: 0, pageSize: 15 },
                                    },
                                }}
                                // eslint-disable-next-line no-unused-vars
                                onRowClick={(params, event) => {
                                    if (params.row.isGroupHeader) {
                                        console.log('HEADER ROW');
                                        const groupId = params.row.id;
                                        if (showRows.includes(groupId)) {
                                            setShowRows(showRows.filter(id => id !== groupId));
                                        } else {
                                            setShowRows([...showRows, groupId]);
                                        }
                                    }
                                }}

                                getRowClassName={(params) => (params.row.isGroupHeader ? 'group-header' : '')}
                                pageSizeOptions={[5, 10, 15, 20]}
                                className="cursor-pointer"

                            />
                        </Box>

                        :
                        // LEADS TABLE
                        <Box className="px-6 w-full h-[65vh] max-sm:px-4 max-sm:gap-1">
                            <DataGrid
                                sx={{
                                    color: "white",
                                    border: "none",
                                    "@media (max-width: 600px)": {
                                        fontSize: "12px",
                                    },
                                }}
                                localeText={{
                                    noRowsLabel: "Пользователи не найдены",
                                }}
                                sortModel={sortModel}
                                onSortModelChange={(newModel) => setSortModel(newModel)}
                                rows={rowsLeads}
                                initialState={{
                                    pagination: {
                                        style: { color: 'white' },
                                        paginationModel: { page: 0, pageSize: 15 },
                                    },
                                }}
                                // eslint-disable-next-line no-unused-vars
                                onRowClick={(params, event) => {
                                    if (params.row.isGroupHeader) {
                                        console.log('HEADER ROW');
                                        const groupId = params.row.id;
                                        if (showRows.includes(groupId)) {
                                            setShowRows(showRows.filter(id => id !== groupId));
                                        } else {
                                            setShowRows([...showRows, groupId]);
                                        }
                                    }
                                }}
                                columns={columnsLeads}
                                getRowClassName={(params) => (params.row.isGroupHeader ? 'group-header' : '')}
                                pageSizeOptions={[5, 10, 15, 20]}
                                className="cursor-pointer"

                            />
                        </Box>


                )}



                <div className="absolute top-4 right-4 max-md:right-0">
                    <Link to="/main/projects" className="flex items-center gap-4 text-xl rounded-xl bg-[#151d28] p-4">
                        <IoMdArrowRoundBack />
                        Назад
                    </Link>
                </div>
            </div> :
                <section>Пока еще нет лидов</section>}
            {editBuyer && <Modal onClose={() => setEditBuyer(false)} id='buyer-change'>
                <BuyerChange onClose={() => setEditBuyer(false)} onChange={handleChange} onSubmit={submitBuyerChange} />
            </Modal>}
        </section>
    );
};

export default ProjectInfo;