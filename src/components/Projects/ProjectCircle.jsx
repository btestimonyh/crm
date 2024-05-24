const ProjecCircle = ({ children, title, icon, bg}) => {
    return <div className={`${bg} rounded-xl flex gap-2 items-center justify-center h-[60px]`}>
        <div className="text-[200%]">
            {icon}
        </div>
        <div className="text-center">
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