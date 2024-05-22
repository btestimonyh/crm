import FilterProjects from "../components/Projects/FilterProjects";
// import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";

const Projects = () => {




    return <section>
        <div className="w-full bg-[#151d28] rounded-xl flex">
            <FilterProjects />
        </div>
        <div className="w-full bg-[#151d28] rounded-xl flex flex-col mt-8 h-max">
        <div className='w-full p-6 flex items-center gap-4 justify-between'>
            <div>ПРОЕКТЫ</div>
            <Button variant="contained" color="secondary"><span className="font-[700] max-sm:text-[12px]" >ДОБАВИТЬ ПРОЕКТ</span></Button>
        </div>
        <Box className='px-6 w-full h-[60vh] max-sm:px-2 max-sm:gap-1'>
            {/* <DataGrid
                sx={{
                    color: 'white',
                    border: 'none',
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
                columns={modifiedTable}
                initialState={{
                    pagination: {
                        style: { color: 'white' },
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 15, 20]}
            // checkboxSelection
            // disableRowSelectionOnClick
            /> */}
        </Box>

    </div>
    </section >


}

export default Projects;