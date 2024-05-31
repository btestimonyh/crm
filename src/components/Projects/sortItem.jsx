import { CiCalendar } from "react-icons/ci";


 const  SortItem = ({ onClick,children }) => {
    return <div onClick={onClick} className="flex items-center gap-2 hover:text-gray-400 max-sm:border-[1px] max-sm:border-gray-400 max-sm:rounded-xl max-sm:p-2 w-full max-sm:text-[14px] max-sm:border-gray-600">
        <CiCalendar/>
        {children}
    </div>
}

export default SortItem;