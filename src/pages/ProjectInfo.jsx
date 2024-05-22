import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLoaderData, useParams } from "react-router-dom";

const ProjectInfo = () => {
    const projects = useLoaderData();
    const { id } = useParams();
    const project = projects.find(project => project.id == id);
    console.log(project)
    return <section className="w-full">
        <div className="relative w-max">
            {project.name}
            <div className="absolute top-[-100%] right-[-200%] max-md:right-0">
                <Link to='/main/projects' className="flex items-center gap-4 text-xl rounded-xl bg-[#151d28] p-4">
                    <IoMdArrowRoundBack />
                    Назад
                </Link>
            </div>
        </div>


    </section>
}

export default ProjectInfo;