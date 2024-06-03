import { Button } from "@mui/material";
import BuyersSelect from "./BuyersSelect";
import { IoClose } from "react-icons/io5";

export default function BuyerChange({ onSubmit, onChange, onClose }) {
    return <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
        className="bg-[#161c28] min-w-[360px] flex flex-col p-16 rounded-xl shadow-xl gap-4 max-sm:px-4 relative">
        <h1 className="text-xl w-full text-center">Изменить баера</h1>
        {/* <p className="text-sm text-gray-500">Пожалуйста, введите свои данные</p> */}

        {/* <div className="text-gray-500 mt-2 text-sm">Изменить баера</div> */}

        <BuyersSelect onChange={onChange} change />
        <Button type='submit' variant="contained" color="secondary"><span className="font-[700]">Изменить</span></Button>
        <div className="absolute top-4 right-4 text-3xl cursor-pointer" onClick={onClose}>
            <IoClose />
        </div>

    </form>
}