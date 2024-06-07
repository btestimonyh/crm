import { Button } from "@mui/material";
import BuyersSelect from "./BuyersSelect";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getUserById } from "../../util/getUserById";

export default function BuyerChange({ onRechange, onChange, onClose, activeProject, onRemove }) {
    const [buyerName, setBuyerName] = useState();

    const getData = async () => {
        const user = await getUserById(activeProject.buyerId);
        setBuyerName(user.name);
    }

    useEffect(() => {
        if (activeProject.buyerId) {
            getData();
        }
    }, []);

    const changeBuyer = async () => {
        await onRechange();
        getData();
    }

    return <form
        onClick={(e) => e.stopPropagation()}
        // onSubmit={onSubmit}
        className="bg-[#161c28] min-w-[360px] flex flex-col p-16 rounded-xl shadow-xl gap-4 max-sm:px-4 relative">
        <h1 className="w-full text-center text-gray-400">Отвественный баер</h1>

        <div className="text-center text-xl">{buyerName ? buyerName : 'Отсутсвует'}</div>
        {!buyerName && <BuyersSelect onChange={onChange} />}
        {!buyerName ? <Button type='button' variant="contained" color="secondary" onClick={changeBuyer}><span className="font-[700]">Назначить</span></Button> :
            <Button type='button' variant="contained" color="secondary"><span className="font-[700]" onClick={() => { onRemove(activeProject.id) }}>Удалить</span></Button>}
        <Button type='button' variant="outlined" color="secondary" onClick={onClose}><span className="font-[700]">Отмена</span></Button>
        <div className="absolute top-4 right-4 text-3xl cursor-pointer" onClick={onClose}>
            <IoClose />
        </div>

    </form>
}