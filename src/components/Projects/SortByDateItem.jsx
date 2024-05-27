const SortByDateItem = ({ children, className, onClick }) =>{
    return <div className={`border-[1px] rounded-xl p-2 cursor-pointer px-4 border-gray-500 ${className}`} onClick={onClick}>
        {children}
    </div>
}

export default SortByDateItem;