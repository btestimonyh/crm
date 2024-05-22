import { useLoaderData } from "react-router-dom";
// import FilterProjects from "../components/Projects/FilterProjects";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { projectsTitle } from "../components/Projects/projectsTitle";
import Modal from "../components/Modal/Modal";
import AddProjectForm from "../components/Projects/AddProjectForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { role } from "../store/store";

const Projects = () => {
    const projects = useLoaderData();
    const [activeProjects, setActiveProjects] = useState(projects);
    const [addingProject, setAddingProject] = useState(false);

    const navigate = useNavigate();
    const addProject = (project) => {
        setActiveProjects([...activeProjects, project])
    }
    const handleRowClick = (params) => {
        navigate(`/main/projects/${params.row.id}`);
    }
    const ROLE = useSelector(role);
    const ADMIN = ROLE == 'admin' || ROLE == 'owner';
    return <section>
        {/* <div className="w-full bg-[#151d28] rounded-xl flex">
            <FilterProjects />
        </div> */}
        <div className="w-full bg-[#151d28] rounded-xl flex flex-col mt-8 h-max">
            <div className='w-full p-6 flex items-center gap-4 justify-between'>
                <div>ПРОЕКТЫ</div>
                {ADMIN && <Button variant="contained" color="secondary"><span className="font-[700] max-sm:text-[12px]" onClick={() => setAddingProject(true)} >ДОБАВИТЬ ПРОЕКТ</span></Button>}
            </div>
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
                        noRowsLabel: 'Пользователи не найдены',
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
            {addingProject &&
                <Modal onClose={() => setAddingProject(false)} id='adding-project-form'>
                    <AddProjectForm onClose={() => setAddingProject(false)} projectsAmount={projects.length} onAdd={addProject} />
                </Modal>}
        </div>
    </section >


}

export default Projects;