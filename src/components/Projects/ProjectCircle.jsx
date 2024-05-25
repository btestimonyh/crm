const ProjecCircle = ({ children, title, icon, bg}) => {
    return <div className={`${bg} rounded-xl flex gap-2 items-center justify-center h-[60px]`}>
        <div className="text-[200%] max-sm:text-[120%]">
            {icon}
        </div>
        <div className="text-center max-sm:text-[14px]">
            <div>
                {title}
            </div>
            <div>
                {children}
            </div>
        </div>


    </div>
}

export default ProjecCircle;