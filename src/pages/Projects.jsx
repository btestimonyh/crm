// import FilterProjects from "../components/Projects/FilterProjects";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { projectsTitle } from "../components/Projects/projectsTitle";
import Modal from "../components/Modal/Modal";
import AddProjectForm from "../components/Projects/AddProjectForm";
import { useNavigate } from "react-router-dom";
import FilterProjects from "../components/Projects/FilterProjects";
import { useSelector } from "react-redux";
import { role } from "../store/store";
import { TailSpin } from "react-loader-spinner";
import SortByDate from "../components/Projects/SortByDate";
import { getProjects } from "../util/getProjects";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { MdDeleteForever } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { deleteProject } from '../util/deleteProject';
import { FaEdit } from 'react-icons/fa';
import LoginInput from '../components/Login/Input';
import { renameProject } from '../util/renameProject';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


const Projects = () => {
    // const projects = useLoaderData();
    const [activeProjects, setActiveProjects] = useState([]);
    const [addingProject, setAddingProject] = useState(false);
    const ROLE = useSelector(role);
    const [isLoading, setIsLoading] = useState(false);
    const [fullProjects, setFullProjects] = useState([]);
    const [timeZone, setTimeZone] = useState(0);
    const [projects, setProjects] = useState([]);
    const [sortedDate, setSortedDate] = useState('За всё время')
    const ADMIN = ROLE === 'admin' || ROLE === 'owner';
    const navigate = useNavigate();
    const [submittingDelete, setSubmittingDelete] = useState();
    const [submittingEdit, setSubmittingEdit] = useState();

    const newProjectName = useRef(null);

    const getData = async () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000)
        const data = await getProjects(0);
        setProjects(data);
        setFullProjects(data);
    }
    useEffect(() => {
        
        getData();
    }, []);

    useEffect(() => {
        const getData = async () => {
            const data = await getProjects(timeZone);
            setFullProjects(data);
        }
        setTimeout(() => setIsLoading(false), 1000)
        getData();
    }, [timeZone])

    const addProject = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            getData();
        }, 2000)
        
        // setActiveProjects([...activeProjects, project]);
    };

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


        return {
            id: el.id,
            name: el.name,
            leads: el.leads && el.leads.length > 0 ? el.leads.filter(lead => lead.subscribed).length : 0,
            inactive: el.leads && el.leads.length > 0 ? el.leads.filter(lead => !lead.subscribed).length : 0,
            ftd: totalIsFtd,
            rd: totalrdCount,
            subsFtd: `${(el.leads && el.leads.filter(lead => lead.subscribed).length > 0) ? el.leads.filter(lead => lead.subscribed).length : 0} / ${totalIsFtd} (${(el.leads && el.leads.filter(lead => lead.subscribed).length > 0) && totalIsFtd > 0 ? ((totalIsFtd * 100) / el.leads.filter(lead => lead.subscribed).length).toFixed(2) : 0}%)`,
            ftdRd: `${totalIsFtd}/${totalrdCount} (${totalIsFtd > 0 && totalrdCount > 0 ? ((totalIsFtd * 100) / totalrdCount).toFixed(2) : 0}%)`,
        }
    })

    const timeZoneHandler = (time) => {
        setIsLoading(true);
        setTimeZone(time);
        sortingProjects(sortedDate);
    }
    const sortingProjects = (time) => {
        setSortedDate(time);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
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
        renderCell: (params) => <div className='flex items-center justify-center text-3xl p-2' onClick={(e) => {
            e.stopPropagation();
            setSubmittingEdit(params.row);
        }}><FaEdit />
        </div>

    },
    {
        field: 'action',
        headerName: 'Удалить проект',
        minWidth: 140,
        disableColumnMenu: true,
        renderCell: (params) => <div className='flex items-center justify-center text-4xl p-2 text-red-400' onClick={(e) => {
            e.stopPropagation();
            // console.log(params.row)
            setSubmittingDelete(params.row);
        }}><MdDeleteForever /></div>

    }
    ]

    const removeProject = () => {
        const idProject = submittingDelete.id
        deleteProject(idProject);
        setSubmittingDelete('');
        addProject();
    }

    const changeProject = () => {
        const idProject = submittingEdit.id;
        const newName = newProjectName.current.value;
        if (newName !== '') {
            setSubmittingEdit('');
            renameProject(idProject, newName);
            addProject();
        }

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
                        pageSizeOptions={[5, 10, 15, 20,50,100]}
                        onRowClick={handleRowClick}
                        className="cursor-pointer"
                    // checkboxSelection
                    // disableRowSelectionOnClick
                    />
                </Box>

            }
            {addingProject &&
                <Modal onClose={() => setAddingProject(false)} id='adding-project-form'>
                    <AddProjectForm onClose={() => setAddingProject(false)} projectsAmount={projects.length} onAdd={addProject} />
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
        </div>
    </section >


}

export default Projects;