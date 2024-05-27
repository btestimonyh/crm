import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";

const CopyPixel = ({ text }) => {
    const [isCopy, setIsCopy] = useState(false);
    return (
        <div>
            <div className='text-gray-500 text-sm mt-4 pl-2 mb-2'>
                Pixel ID
            </div>
            <CopyToClipboard text={text}>
                <div onClick={() => {
                    setIsCopy(true)
                    setTimeout(() => setIsCopy(false), 1000)
                }}

                    className="relative flex items-center gap-4 max-md:ml-4 border-[1px] border-gray-600 rounded-xl p-2 cursor-pointer">
                    <div>{text}</div>
                    <div><FaCopy /></div>
                    {isCopy && <div className="absolute top-full left-1/2 text-[10px]">Скопировано!</div>}
                </div>
            </CopyToClipboard>
        </div>

    )


}

export default CopyPixel;