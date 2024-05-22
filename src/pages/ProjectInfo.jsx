import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLoaderData, useParams } from "react-router-dom";
import FilterProjects from "../components/Projects/FilterProjects";

const ProjectInfo = () => {
    const projects = useLoaderData();
    const { id } = useParams();
    const project = projects.find(project => project.id == id);
    console.log(project)
    return <section className="w-full">
        <div className="relative w-full">
            <div className="w-full bg-[#151d28] rounded-xl flex">
                <FilterProjects />
            </div>
            <div className="absolute top-4 right-4 max-md:right-0">
                <Link to='/main/projects' className="flex items-center gap-4 text-xl rounded-xl bg-[#151d28] p-4">
                    <IoMdArrowRoundBack />
                    Назад
                </Link>
            </div>
        </div>


    </section>
}

export default ProjectInfo;