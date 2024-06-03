import { useEffect, useState } from "react";
import Select from 'react-select';
import { customStyles } from "../Users/CustomStylesSelect";
import { getUsers } from "../../util/getUsers";


export default function BuyersSelect({ onChange, change }) {
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await getUsers();
            const buyers = data.filter(user => user.job == 'buyer');
            const select = buyers.map(user => {
                return {
                    value: user.userId,
                    label: user.name
                }
            })
            change ? setOptions([{ value: 'none', label: 'Удалить баера' }, ...select]) : setOptions(select);
          
            // setOptions(select);
        }
        getData();
    }, [])

    return <Select
        // defaultValue={options[0]}
        placeholder="Отвественный баер"
        options={options}
        styles={customStyles}
        className='w-full'
        onChange={onChange}
    />
}