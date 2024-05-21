import { Await, useLoaderData } from "react-router-dom";
import FilterUsers from "../components/Users/FilterUsers";
import { usersTitle } from "../components/Users/userTitle";
import { DataGrid } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import UserAction from "../components/Users/UserAction";


const UsersPage = () => {
    const fullData = useLoaderData();
    const [activeData, setActiveData] = useState(fullData);
    const [activeFilter, setActiveFilter] = useState(false);
    const [activeStatus, setActiveStatus] = useState(false);


    const filterUsers = (value) => {
        if (value == 'all') {
            setActiveData(activeStatus ? fullData.filter(el => el.status == activeStatus) : fullData)
            setActiveFilter(false);
        } else {
            setActiveData(activeStatus ?
                fullData.filter(el => el.status == activeStatus && el.job == value) :
                fullData.filter(el => el.job == value)
            )
            setActiveFilter(value);
        }

    }


    const filterStatus = (value) => {
        if (value == 'all') {
            setActiveData(activeFilter ? fullData.filter(el => el.job == activeFilter) : fullData)
            setActiveStatus(false);
        } else {
            setActiveData(activeFilter ?
                fullData.filter(el => el.status == value && el.job == activeFilter) :
                fullData.filter(el => el.status == value)
            )
            setActiveStatus(value);
        }

    }

    const deactiveHandler = (account) =>{

    }

    const modifiedTable = usersTitle.map((el) => {
        if (el.field === 'name') {
            return {
                ...el,
                renderCell: (params) => (
                    <div className="flex items-center gap-2">
                        <div className="text-purple-600 bg-purple-400/20 w-min p-2 rounded-[50%] flex items-center gap-4">
                            <FaUser />
                        </div>

                        <div>
                            {params.value}
                        </div>
                    </div>
                )
            };
        } else if (el.field === 'job') {
            return {
                ...el,
                renderCell: (params) => (<div>
                    {params.value == 'owner' && <div>Владелец</div>}
                    {params.value == 'buyer' && <div>Байер</div>}
                    {params.value == 'admin' && <div>Админ</div>}
                </div>

                )
            }
        } else if (el.field === 'status') {
            return {
                ...el,
                renderCell: (params) => (<div className="flex">
                    {params.value == 'active' && <div className="border-2 shadow-xl rounded-xl px-2 border-green-800 text-green-800 font-bold">Активный</div>}
                    {params.value == 'inactive' && <div className="border-2 shadow-xl rounded-xl px-2 border-red-800 font-bold text-red-800">Неактивный</div>}
                </div>

                )
            }
        }
        else if (el.field === 'action') {
            return {
                ...el,
                renderCell: (params) => (
                    <UserAction
                        onDeactive={deactiveHandler}
                        params={params} />
                )
            }
        }
        else {
            return el;
        }

    })




    return <section>
        <FilterUsers filterUsers={filterUsers} filterStatus={filterStatus} />
        <Await resolve={fullData}>
            <div className="w-full bg-[#151d28] rounded-xl flex flex-col mt-8 h-max">
                <div className='w-full p-6'>
                    ПОЛЬЗОВАТЕЛИ
                </div>
                <Box className='px-6 w-full h-[60vh]'>
                    <DataGrid
                        sx={{
                            color: 'white',
                            border: 'none',
                            // marginRight: '200px',
                        }}
                        // className="text-[#fff]"
                        localeText={{
                            noRowsLabel: 'Пользователи не найдены', // Тут ви можете вказати свій власний текст
                        }}
                        rows={activeData}
                        columns={modifiedTable}
                        initialState={{
                            pagination: {
                                style: { color: 'white' },
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 15, 20]}
                        checkboxSelection
                    // disableRowSelectionOnClick
                    />
                </Box>

            </div>
        </Await>

    </section>
}

export default UsersPage;