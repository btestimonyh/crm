import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Select from 'react-select';
import { DataGrid } from "@mui/x-data-grid";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { leadsTitle } from "../components/Projects/leadsTitle";
import { customStyles } from "../components/Users/CustomStylesSelect";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import ProjecCircle from "../components/Projects/ProjectCircle";
// import { CiFacebook } from "react-icons/ci";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { PiUsersThreeFill } from "react-icons/pi";
import { getProjectById } from "../util/getProjectById";
// import { TailSpin } from "react-loader-spinner";



const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
    }, {});
};

const getUniqueValues = (array, key) => {
    const uniqueValues = new Set();
    array.forEach(item => {
        if (item[key]) {
            uniqueValues.add(item[key]);
        }
    });
    return Array.from(uniqueValues);
};

const ProjectInfo = () => {
    const [sortModel, setSortModel] = useState([]);
    // const projects = useLoaderData();
    const { id } = useParams();
    // const project = projects.find(project => project.id == id);

    const [showRows, setShowRows] = useState([]);
    const [isCopy, setIsCopy] = useState(false);
    const [project, setProject] = useState({ leads: false });
    const [groupByField, setGroupByField] = useState("");

    useEffect(() => {
        const getData = async () => {
            console.log(id);
            const data = await getProjectById(id);
            setProject(data);
        }
        getData();
    }, [id])


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
    const IsFtdAmount = project.leads.reduce((total, lead) => {
        if (lead.isFtd === "true") {
            return total + 1;
        }
        return total;
    }, 0);
    const rdCountAmount = project.leads.reduce((total, lead) => {
        return lead.rdCount ? total + parseInt(lead.rdCount) : total + 0;
    }, 0);
    const rdAmount = project.leads.reduce((total, lead) => {
        return lead.rdAmount ? total + parseInt(lead.rdAmount) : total + 0;
    }, 0);
    const ftdAmount = project.leads.reduce((total, lead) => {
        return lead.ftdAmount ? total + parseInt(lead.ftdAmount) : total + 0;
    }, 0);


    // const fbStatusAmount = project.leads.reduce((total, lead) => {
    //     if (lead.fbStatus === "good") {
    //         return total + 1;
    //     }
    //     return total;
    // }, 0);


    const leads = project.leads.map((el, index) => ({
        id: index,
        ...el
    }));

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const groupedLeads = groupByField ? groupBy(leads, groupByField) : { All: leads };

    const rows = [];
    let rowId = 0;

    for (const [group, items] of Object.entries(groupedLeads)) {
        const totalIsFtd = items.reduce((total, lead) => {
            if (lead.isFtd === "true") {
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


        const nameHeader = (!group || group == undefined || group == 'undefined' )? 'Отсутствует' : group;
       
        
        if (groupByField) {
            rows.push({
                id: `${groupByField}-${group}`,
                isGroupHeader: true,
                groupName: `${nameHeader} (${items.length})`,
                isFtd: totalIsFtd,
                ftdAmount: totalftdAmount,
                rdCount: totalrdCount,
                rdAmount: totalrdAmount,
            });
        }

        if (!groupByField || showRows.includes(`${groupByField}-${group}`)) {
            items.forEach(item => {
                rows.push({
                    id: `item-${rowId++}`,
                    ...item,
                    isGroupHeader: false,
                });
            });
        }
    }

    const filteredLeadTitle = leadsTitle
        .filter(column => column.field !== 'id')
        .map(column => ({
            ...column,
            sortable: !groupByField
        }));


    const columns = [
        ...(groupByField ? [{
            field: 'groupName',
            headerName: groupByField,
            sortable: false,
            disableColumnMenu: true,
            // flex: 1,
            minWidth: 200,
            renderCell: (params) => params.row.isGroupHeader ? <div className="px-2">{params.value}</div> : null
        }] : []),
        ...filteredLeadTitle,
    ];

    const uniqueFields = Object.keys(leads[0]);
    const options = uniqueFields.flatMap(field => {
        // const uniqueValues = getUniqueValues(leads, field);
        const label = field == 'isFtd' ? 'FTD' : field == 'rdCount' ? 'Кол-во RD' : field;
        // return uniqueValues.length > 1 && (field !== 'id' && field !== 'firstName' && field !== 'lastName') ? [{ value: field, label: field }] : [];
         return (field == 'sub1' || field == 'sub2' || field == 'sub3' || field == 'sub4' || field == 'sub5' || field == 'sub6' || field == 'sub7' || field == 'sub8' || field == 'isFtd' || field == 'rdCount') ? [{ value: field, label: label }] : [];
    });

    options.unshift({ value: '', label: 'Сбросить' });

    const handleFilter = (option) => {
        setGroupByField(option.value);
        setSortModel([]);
    };

    return (
        <section className=" mb-10">
            {leads ? <div className="relative w-full bg-[#151d28] rounded-xl z-[0] pt-24 max-sm:pt-10">
                <div className="w-full grid grid-cols-6 max-md:grid-cols-3 mt-10 px-4 gap-4 max-[1400px]:grid-cols-5 max-[1200px]:grid-cols-4">
                    <ProjecCircle title='Лиды' bg='bg-green-700/70' icon={<PiUsersThreeFill />}>{project.leads.length}</ProjecCircle>
                    <ProjecCircle title='FTD' bg='bg-red-600/70' icon={<GiReceiveMoney />}>{IsFtdAmount}</ProjecCircle>
                    <ProjecCircle title='Сумма FTD' bg='bg-blue-500/70' icon={<RiMoneyDollarCircleFill />}>{ftdAmount}</ProjecCircle>
                    <ProjecCircle title='Кол-во RD' bg='bg-red-400/70' icon={<GiReceiveMoney />}>{rdCountAmount}</ProjecCircle>
                    <ProjecCircle title='Сумма RD' bg='bg-blue-800/70' icon={<RiMoneyDollarCircleFill />}>{rdAmount}</ProjecCircle>
                </div>

                <div className="flex gap-6 max-md:flex-col-reverse max-md:items-start max-md:px-2 max-md:gap-1">
                    <div>
                        <div className='text-gray-500 text-sm mt-4 pl-2 ml-8 mb-2'>
                            Группирование
                        </div>
                        <Select
                            onChange={handleFilter}
                            styles={customStyles}
                            options={options}
                            className='w-[500px] max-xl:w-[300px] max-lg:w-[260px] max-md:w-[90vw] ml-8 mb-8 max-md:ml-1'
                            placeholder=''
                        />
                    </div>
                    <div>
                        <div className='text-gray-500 text-sm mt-4 pl-2 mb-2'>
                            Pixel ID
                        </div>

                        <CopyToClipboard text={project.pixelId}>
                            <div onClick={() => {
                                setIsCopy(true)
                                setTimeout(() => setIsCopy(false), 1000)
                            }}

                                className="relative flex items-center gap-4 max-md:ml-4 border-[1px] border-gray-600 rounded-xl p-2 cursor-pointer">
                                <div>{project.pixelId}</div>
                                <div><FaCopy /></div>
                                {isCopy && <div className="absolute top-full left-1/2 text-[10px]">Скопировано!</div>}
                            </div>
                        </CopyToClipboard>
                    </div>

                </div>

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
                        rows={rows}
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
                        columns={columns}
                        getRowClassName={(params) => (params.row.isGroupHeader ? 'group-header' : '')}
                        pageSizeOptions={[5, 10, 15, 20]}
                        className="cursor-pointer"

                    />
                </Box>
                <div className="absolute top-4 right-4 max-md:right-0">
                    <Link to="/main/projects" className="flex items-center gap-4 text-xl rounded-xl bg-[#151d28] p-4">
                        <IoMdArrowRoundBack />
                        Назад
                    </Link>
                </div>
            </div> :
                <section>Пока еще нет лидов</section>}

        </section>
    );
};

export default ProjectInfo;