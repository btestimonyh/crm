import { Await, useLoaderData } from "react-router-dom";
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
import {TailSpin } from "react-loader-spinner";

const Projects = () => {
    const projects = useLoaderData();
    const [activeProjects, setActiveProjects] = useState([]);
    const [addingProject, setAddingProject] = useState(false);
    const ROLE = useSelector(role);
    const [isLoading, setIsLoading] = useState(true);
    const ADMIN = ROLE === 'admin' || ROLE === 'owner';
    const navigate = useNavigate();

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
        setIsLoading(false);
    }, [ROLE, projects, filterHandler]);

    return <section>
        {ADMIN && <div className="w-full bg-[#151d28] rounded-xl flex">
            <FilterProjects filterProjects={filterHandler} />
        </div>}
        <div className="w-full bg-[#151d28] rounded-xl flex flex-col mt-8 h-max">


            <div className='w-full p-6 flex items-center gap-4 justify-between'>
                <div>ПРОЕКТЫ</div>
                {ADMIN && <Button variant="contained" color="secondary" onClick={() => setAddingProject(true)}><span className="font-[700] max-sm:text-[12px]" >ДОБАВИТЬ ПРОЕКТ</span></Button>}
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
                <Await resolve={projects}>
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
                            rows={activeProjects}
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
                </Await>
            }
            {addingProject &&
                <Modal onClose={() => setAddingProject(false)} id='adding-project-form'>
                    <AddProjectForm onClose={() => setAddingProject(false)} projectsAmount={projects.length} onAdd={addProject} />
                </Modal>}
        </div>
    </section >


}

export default Projects;