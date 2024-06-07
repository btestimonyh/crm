// import FilterProjects from "../components/Projects/FilterProjects";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";

import Modal from "../components/Modal/Modal";
import { projectsTitle } from "../components/Projects/projectsTitle";
import AddProjectForm from "../components/Projects/AddProjectForm";
import FilterProjects from "../components/Projects/FilterProjects";
import { role } from "../store/store";
import { TailSpin } from "react-loader-spinner";
import SortByDate from "../components/Projects/SortByDate";
import { getProjects } from "../util/getProjects";

import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { IoClose } from 'react-icons/io5';
import { deleteProject } from '../util/deleteProject';
import LoginInput from '../components/Login/Input';
import { renameProject } from '../util/renameProject';
import ProjectsAction from "../components/Users/ProjectsAction";
import BuyerChange from "../components/Projects/BuyerChange";
import { updateProject } from "../util/updateProject";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


const Projects = () => {
    // const projects = useLoaderData();
    const [activeProjects, setActiveProjects] = useState([]);
    const [addingProject, setAddingProject] = useState(false);
    const ROLE = useSelector(role);
    const [isLoading, setIsLoading] = useState();
    const [fullProjects, setFullProjects] = useState([]);
    const [timeZone, setTimeZone] = useState(0);
    const [projects, setProjects] = useState([]);
    const [sortedDate, setSortedDate] = useState('За всё время')
    const ADMIN = ROLE === 'admin' || ROLE === 'owner';
    const navigate = useNavigate();
    const [submittingDelete, setSubmittingDelete] = useState();
    const [submittingEdit, setSubmittingEdit] = useState();
    const [submittingBuyer, setSubmittingBuyer] = useState();
    const [activeBuyer, setActiveBuyer] = useState();

    const newProjectName = useRef(null);

    const getData = async () => {
        setIsLoading(true);
        const data = await getProjects(0);
        setProjects(data);
        setFullProjects(data);
        setIsLoading(false);
    }
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {

        const getDataZone = async () => {
            setIsLoading(true);
            const data = await getProjects(timeZone);
            setFullProjects(data);
            setIsLoading(false);
        }
        // setTimeout(() => setIsLoading(false), 1000)
        // if(timeZone !== 0){
        //     getDataZone();
        // }
        getDataZone();
    }, [timeZone])


    const handleRowClick = (params) => {
        navigate(`/main/projects/${params.row.id}`);
    };

    const filterHandler = useCallback((buyerId) => {
        if (buyerId === 'all') {
            setActiveProjects(projects);
        } else {
            const newActive = projects.filter(project => project.buyerId === buyerId);
            setActiveProjects(newActive);
        }
    }, [projects]);

    useEffect(() => {
        if (ROLE === 'buyer') {
            const id = localStorage.getItem('user-id');
            filterHandler(id);
        } else {
            setActiveProjects(projects);
        }
        // setIsLoading(false);
    }, [ROLE, projects, fullProjects, filterHandler]);

    const rows = activeProjects.map(el => {

        const totalIsFtd = el.leads && el.leads.length > 0 ? el.leads.reduce((total, lead) => {
            if (lead.isFtd == "true" || lead.isFtd == true) {
                return total + 1;
            }
            return total;
        }, 0) : 0;
        const totalrdCount = el.leads && el.leads.length > 0 ? el.leads.reduce((total, lead) => {
            return lead.rdCount ? total + parseInt(lead.rdCount) : total + 0;
        }, 0) : 0;

        const totalFtdAmount = el.leads && el.leads.length > 0 ? el.leads.reduce((total, lead) => {
            return lead.ftdAmount ? total + parseInt(lead.ftdAmount) : total + 0;
        }, 0) : 0;
        const totalRdAmount = el.leads && el.leads.length > 0 ? el.leads.reduce((total, lead) => {
            return lead.rdAmount ? total + parseInt(lead.rdAmount) : total + 0;
        }, 0) : 0;


        return {
            id: el.id,
            name: el.name,
            leads: el.leads && el.leads.length > 0 ? el.leads.filter(lead => lead.subscribed).length : 0,
            inactive: el.leads && el.leads.length > 0 ? el.leads.filter(lead => !lead.subscribed).length : 0,
            ftd: totalIsFtd,
            buyerId: el.buyerId,
            totalFtdAmount: totalFtdAmount,
            rd: totalrdCount,
            totalRdAmount: totalRdAmount,
            subsFtd: `${(el.leads && el.leads.filter(lead => lead.subscribed).length > 0) ? el.leads.filter(lead => lead.subscribed).length : 0} / ${totalIsFtd} (${(el.leads && el.leads.filter(lead => lead.subscribed).length > 0) && totalIsFtd > 0 ? ((totalIsFtd * 100) / el.leads.filter(lead => lead.subscribed).length).toFixed(2) : 0}%)`,
            ftdRd: `${totalIsFtd}/${totalrdCount} (${totalIsFtd > 0 && totalrdCount > 0 ? ((totalIsFtd * 100) / totalrdCount).toFixed(2) : 0}%)`,
        }
    })

    const timeZoneHandler = (time) => {
        setTimeZone(time);
        sortingProjects(sortedDate);
    }
    const sortingProjects = (time) => {
        setSortedDate(time);
        if (time == 'За всё время') {
            return setProjects(fullProjects);
        } else if (time.length == 7) {
            const filterdProjects = fullProjects.map(el => {
                let newLeads = el.leads ? el.leads.filter(el => el.regDate && el.regDate.includes(time)) : [];
                return {
                    ...el,
                    leads: newLeads
                }
            })
            setProjects(filterdProjects)
            return;
        }
        else if (Array.isArray(time) && time.length === 2) {

            const filterdProjects = fullProjects.map((el) => {
                const [startDate, endDate] = time.map(date => dayjs(date, 'DD.MM.YYYY'));
                const filteredList = el.leads ? el.leads.filter(lead => {
                    const regDate = dayjs(lead.regDate, 'DD.MM.YYYY');
                    return regDate.isSameOrAfter(startDate) && regDate.isSameOrBefore(endDate);
                }) : [];
                return {
                    ...el,
                    leads: filteredList
                }
            })

            setProjects(filterdProjects);
            return;
        }
        const filteredProjects = fullProjects.map((el) => {
            const filteredList = el.leads ? el.leads.filter(lead => lead.regDate == time) : [];
            return {
                ...el,
                leads: filteredList
            }
        })
        setProjects(filteredProjects);
    }

    const adminTitle = [...projectsTitle,
    {
        field: 'rename',
        headerName: 'Редактировать',
        minWidth: 120,
        disableColumnMenu: true,
        renderCell: (params) => <ProjectsAction row={params.row} onEdit={setSubmittingEdit} onDelete={setSubmittingDelete} onChangeBuyer={setSubmittingBuyer} />

    },
    ]

    adminTitle.splice(5, 0, {
        field: 'totalFtdAmount',
        headerName: 'Сумма FTD',
        minWidth: 120,
        disableColumnMenu: true,
        renderCell: (params) => params.value + ' $'
    })
    adminTitle.splice(7, 0, {
        field: 'totalRdAmount',
        headerName: 'Сумма RD',
        minWidth: 120,
        disableColumnMenu: true,
        renderCell: (params) => params.value + ' $'
    })

    const removeProject = async () => {
        const idProject = submittingDelete.id
        await deleteProject(idProject);
        setSubmittingDelete('');
        getData();
    }

    const changeProject = async () => {
        const idProject = submittingEdit.id;
        const newName = newProjectName.current.value;
        if (newName !== '') {
            await renameProject(idProject, newName);
            setSubmittingEdit('');
            getData();
        }

    }
    const handleChangeBuyerName = (option) => {
        setActiveBuyer(option);
    }
    const submitBuyerChange = async () => {
        if (activeBuyer) {
            await updateProject(submittingBuyer.id, activeBuyer.value)
        }
        getData();
        setSubmittingBuyer('');
    }
    const removeBuyer = async (id) => {
        await updateProject(id, null);
        getData();
        setSubmittingBuyer('');
    }

    return <section>
        {ADMIN && <div className="w-full bg-[#151d28] rounded-xl flex">
            <FilterProjects filterProjects={filterHandler} />
        </div>}
        <div className="w-full bg-[#151d28] rounded-xl flex flex-col mt-8 h-max">


            <div className='w-full p-6 flex items-center gap-4 justify-between'>
                <div>ПРОЕКТЫ</div>
                {ADMIN && <Button variant="contained" color="secondary" onClick={() => setAddingProject(true)}><span className="font-[700] max-sm:text-[12px]" >ДОБАВИТЬ ПРОЕКТ</span></Button>}
            </div>
            <SortByDate sortingTimeZone={timeZoneHandler} sortingStats={sortingProjects} />
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

                <Box className='px-6 w-full h-[60vh] max-sm:px-2 max-sm:gap-1'>
                    <DataGrid
                        sx={{
                            color: 'white',
                            border: 'none',
                            '@media (max-width: 600px)': {
                                fontSize: '12px',
                            },

                        }}
                        localeText={{
                            noRowsLabel: '',
                        }}
                        rows={rows}
                        columns={ADMIN ? adminTitle : projectsTitle}
                        initialState={{
                            pagination: {
                                style: { color: 'white' },
                                paginationModel: { page: 0, pageSize: 100 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 15, 20, 50, 100]}
                        onRowClick={handleRowClick}
                        className="cursor-pointer"
                    // checkboxSelection
                    // disableRowSelectionOnClick
                    />
                </Box>

            }
            {addingProject &&
                <Modal onClose={() => setAddingProject(false)} id='adding-project-form'>
                    <AddProjectForm onClose={() => setAddingProject(false)} projectsAmount={projects.length} onAdd={getData} />
                </Modal>}
            {
                submittingDelete && <Modal onClose={() => setSubmittingDelete('')} id='subbmiting-remove-project'>
                    <div className='bg-[#161c28] min-w-[360px] flex flex-col p-16 rounded-xl shadow-xl gap-4 max-sm:px-4 relative' onClick={(e) => e.stopPropagation()}>
                        <div className="absolute top-4 right-4 text-3xl cursor-pointer" onClick={() => setSubmittingDelete('')}>
                            <IoClose />
                        </div>
                        <div className='flex items-center flex-col'>
                            Вы действительно хотите удалить проект - {submittingDelete.name}?
                            <div className='flex gap-4 mt-6'>
                                <Button variant="contained" color="secondary" onClick={removeProject}>Удалить</Button>
                                <Button variant="outlined" color="secondary" onClick={() => setSubmittingDelete('')}>Отмена</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
            {
                submittingEdit && <Modal onClose={() => setSubmittingEdit('')} id='subbmiting-remove-project'>
                    <div className='bg-[#161c28] min-w-[360px] flex flex-col p-16 rounded-xl shadow-xl gap-4 max-sm:px-4 relative' onClick={(e) => e.stopPropagation()}>
                        <div className="absolute top-4 right-4 text-3xl cursor-pointer" onClick={() => setSubmittingEdit('')}>
                            <IoClose />
                        </div>
                        <div className='flex items-center flex-col'>
                            <div className='mb-4'>Введите новое название - {submittingEdit.name}</div>
                            <LoginInput placeholder="Название проекта" ref={newProjectName} />
                            <div className='flex gap-4 mt-6'>
                                <Button variant="contained" color="secondary" onClick={changeProject}>Сменить</Button>
                                <Button variant="outlined" color="secondary" onClick={() => setSubmittingEdit('')}>Отмена</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
            {
                submittingBuyer && <Modal onClose={() => setSubmittingBuyer('')} id='subbmiting-changing-buyer'>
                    <BuyerChange
                        onClose={() => setSubmittingBuyer(false)}
                        onChange={handleChangeBuyerName}
                        onRemove={removeBuyer}
                        onRechange={submitBuyerChange}
                        activeProject={submittingBuyer}
                    />
                </Modal>
            }
        </div>
    </section >


}

export default Projects;