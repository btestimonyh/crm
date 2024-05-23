import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import Select from 'react-select';
import { DataGrid } from "@mui/x-data-grid";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { leadsTitle } from "../components/Projects/leadsTitle";
import { customStyles } from "../components/Users/CustomStylesSelect";

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
    const projects = useLoaderData();
    const { id } = useParams();
    const project = projects.find(project => project.id == id);

    const [groupByField, setGroupByField] = useState("");

    const leads = project.leads.map((el, index) => ({
        id: index,
        ...el
    }));

    const groupedLeads = useMemo(() => groupByField ? groupBy(leads, groupByField) : { All: leads }, [leads, groupByField]);

    const rows = [];
    let rowId = 0;

    for (const [group, items] of Object.entries(groupedLeads)) {
        if (groupByField) {
            rows.push({
                id: `${groupByField}-${group}`,
                isGroupHeader: true,
                groupName: group,
            });
        }
        items.forEach(item => {
            rows.push({
                id: `item-${rowId++}`,
                ...item,
                isGroupHeader: false,
            });
        });
    }

    // const columns = [
    //     ...leadsTitle,
    //     // ...(groupByField ? [{
    //     //     field: 'groupName',
    //     //     headerName: groupByField,
    //     //     flex: 1,
    //     //     renderCell: (params) => params.row.isGroupHeader ? <strong>{params.value}</strong> : null
    //     // }] : [])
    // ];

    const columns = leadsTitle.map(column => ({
        ...column,
        sortable: !groupByField // встановлюємо sortable у false, якщо groupByField дорівнює true
    }));

    const uniqueFields = Object.keys(leads[0]);
    const options = uniqueFields.flatMap(field => {
        const uniqueValues = getUniqueValues(leads, field);
        // Включаємо в опції тільки ті поля, у яких більше одного унікального значення і які не є "id"
        return uniqueValues.length > 1 && (field !== 'id' && field !== 'firstName' && field !== 'lastName') ? [{ value: field, label: field }] : [];
    });

    options.unshift({ value: '', label: 'Сбросить' });

    const handleFilter = (option) => {
        setGroupByField(option.value);
        setSortModel([]);
    };

    return (
        <section className="w-full">
            <div className="relative w-full bg-[#151d28] rounded-xl pt-24 max-sm:mt-[-46px]">
                <div className='text-gray-500 text-sm mt-4 pl-2 ml-8 mb-2'>
                    Группирование
                </div>
                <Select
                    onChange={handleFilter}
                    styles={customStyles}
                    options={options}
                    className='w-[500px] max-xl:w-[300px] max-lg:w-[260px] max-md:w-full ml-8 mb-8 max-md:ml-1'
                    placeholder=''
                />
                <Box className="px-6 w-full h-[60vh] max-sm:px-2 max-sm:gap-1">
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
                        columns={columns}
                        getRowClassName={(params) => (params.row.isGroupHeader ? 'group-header' : '')}
                        pageSizeOptions={[5, 10, 15, 20]}
                        className="cursor-pointer"
                        onColumnHeaderClick={() => { }}

                    />
                </Box>
                <div className="absolute top-4 right-4 max-md:right-0">
                    <Link to="/main/projects" className="flex items-center gap-4 text-xl rounded-xl bg-[#151d28] p-4">
                        <IoMdArrowRoundBack />
                        Назад
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProjectInfo;