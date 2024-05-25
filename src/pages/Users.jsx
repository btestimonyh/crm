import { Await, useLoaderData, useNavigate } from "react-router-dom";
import FilterUsers from "../components/Users/FilterUsers";
import { usersTitle } from "../components/Users/userTitle";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import UserAction from "../components/Users/UserAction";
import Modal from "../components/Modal/Modal";
import RegisterForm from "../components/Login/RegisterForm";
import { useSelector } from "react-redux";
import { role } from "../store/store";
import { TailSpin } from "react-loader-spinner";


const UsersPage = () => {
    const fullData = useLoaderData();
    const [activeData, setActiveData] = useState(fullData);
    const [activeFilter, setActiveFilter] = useState(false);
    const [activeStatus, setActiveStatus] = useState(false);
    const [addingUser, setAddingUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const ROLE = useSelector(role);
    const navigate = useNavigate();
    useEffect(() => {
        if (ROLE == 'buyer') {
            navigate('/main/projects');
        }
    }, [ROLE, navigate]);


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

    const deactiveHandler = (account) => {
        const index = activeData.findIndex(element => element.userId === account.userId);

        const newAccount = { ...account, status: account.status == 'active' ? 'inactive' : 'active' };
        const updatedData = [...activeData];
        updatedData.splice(index, 1, newAccount);
        setActiveData(updatedData);
    }

    const deleteHandler = (account) => {
        const updatedData = [...activeData].filter(el => el.userId !== account.userId);
        setActiveData(updatedData);
    }

    useEffect(() => {
        setActiveData(fullData);
    }, [fullData]);

    const addHandler = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            //s
            window.location.reload();
        }, 1000)
    };

    const modifiedTable = usersTitle.map((el) => {
        if (el.field === 'name') {
            return {
                ...el,
                renderCell: (params) => (
                    <div className="flex items-center gap-2">
                        <div className="text-purple-600 bg-purple-400/20 w-min p-2 rounded-[50%] flex items-center gap-4 max-sm:hidden">
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
                renderCell: (params) => (<div className="flex h-full">
                    {params.value == 'active' && <div className="border-2 h-1/2 flex mt-3 items-center justify-center shadow-xl rounded-xl px-2 border-green-800 text-green-800 font-bold"><span className="max-sm:hidden">Активный</span><span className="sm:hidden">A</span></div>}
                    {params.value == 'inactive' && <div className="border-2 h-1/2 flex mt-3 items-center justify-center shadow-xl rounded-xl px-2 border-red-800 font-bold text-red-800"><span className="max-sm:hidden">Неактивный</span><span className="sm:hidden">Н/A</span></div>}
                </div>

                )
            }
        }
        else if (el.field === 'action') {
            return {
                ...el,
                renderCell: (params) => (
                    <UserAction
                        onDelete={deleteHandler}
                        onDeactive={deactiveHandler}
                        account={params.row} />
                )
            }
        }
        else {
            return el;
        }

    })

    const filterdTitle = modifiedTable.filter(column => column.field !== 'userId');


    return <section>
        <FilterUsers filterUsers={filterUsers} filterStatus={filterStatus} />
        <Await resolve={fullData}>
            <div className="w-full bg-[#151d28] rounded-xl flex flex-col mt-8 h-max">
                <div className='w-full p-6 flex items-center gap-4 justify-between'>
                    ПОЛЬЗОВАТЕЛИ
                    <Button variant="contained" color="secondary" onClick={() => setAddingUser(true)}><span className="font-[700] max-sm:text-[12px]" >ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ</span></Button>
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
                /> </div> :
                    <Box className='px-6 w-full h-[60vh] max-sm:px-4 max-sm:gap-1' sx={{ overflowX: 'auto' }}>

                        <DataGrid
                            sx={{
                                color: 'white',
                                border: 'none',
                                width: 850,
                                '@media (max-width: 600px)': { // Тут ви вказуєте медіа-запит для мобільних пристроїв (менше 600px)
                                    fontSize: '12px',
                                    // marginRight: '-20px' // Встановлюємо розмір шрифту для мобільних пристроїв
                                },
                                // marginRight: '200px',
                            }}
                            // className="text-[#fff]"
                            localeText={{
                                noRowsLabel: 'Пользователи не найдены', // Тут ви можете вказати свій власний текст
                            }}
                            rows={activeData}
                            columns={filterdTitle}
                            initialState={{
                                pagination: {
                                    style: { color: 'white' },
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 15, 20]}
                        // checkboxSelection
                        // disableRowSelectionOnClick
                        />
                    </Box>
                }


            </div>
            {addingUser &&
                <Modal onClose={() => setAddingUser(false)} id='register-form'>
                    <RegisterForm onClose={() => setAddingUser(false)} onAdd={addHandler} />
                </Modal>
            }
        </Await>

    </section>
}

export default UsersPage;