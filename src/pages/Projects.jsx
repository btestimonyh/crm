// import FilterProjects from "../components/Projects/FilterProjects";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
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

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


const Projects = () => {
    // const projects = useLoaderData();
    const [activeProjects, setActiveProjects] = useState([]);
    const [addingProject, setAddingProject] = useState(false);
    const ROLE = useSelector(role);
    const [isLoading, setIsLoading] = useState(true);
    const [fullProjects, setFullProjects] = useState([]);
    const [timeZone, setTimeZone] = useState(0);
    const [projects, setProjects] = useState([]);
    const [sortedDate,setSortedDate] = useState('За всё время')
    const ADMIN = ROLE === 'admin' || ROLE === 'owner';
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const data = await getProjects(timeZone);
            setProjects(data);
            setFullProjects(data);
        }
        setTimeout(() => setIsLoading(false), 1000)
        getData();
    }, []);

    useEffect(()=>{
        const getData = async () =>{
            const data = await getProjects(timeZone);
            setFullProjects(data);
        }
        setTimeout(() => setIsLoading(false), 1000)
        getData();
    },[timeZone])

    const addProject = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            window.location.reload();
        }, 1000)
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
    }, [ROLE, projects,fullProjects, filterHandler]);

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
            leads: el.leads && el.leads.length > 0 ? el.leads.length : 0,
            inactive: el.leads && el.leads.length > 0 ? el.leads.filter(el => el.status == 'INACTIVE').length : 0,
            ftd: totalIsFtd,
            rd: totalrdCount,
            subsFtd: `${(el.leads && el.leads.length > 0) ? el.leads.length : 0} / ${totalIsFtd} (${(el.leads && el.leads.length > 0) && totalIsFtd > 0 ? ((totalIsFtd * 100) / el.leads.length).toFixed(2) : 0}%)`,
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
            console.log(filterdProjects)
            setProjects(filterdProjects)
            return;
        }
        else if (Array.isArray(time) && time.length === 2) {
            
            const filterdProjects = fullProjects.map((el)=> {
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
        const filteredProjects = fullProjects.map((el) =>{
            const filteredList = el.leads ? el.leads.filter(lead => lead.regDate == time): [];
            return {
                ...el,
                leads: filteredList
            }
        })
        setProjects(filteredProjects);
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
                            columns={projectsTitle}
                            initialState={{
                                pagination: {
                                    style: { color: 'white' },
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 15, 20]}
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
        </div>
    </section >


}

export default Projects;