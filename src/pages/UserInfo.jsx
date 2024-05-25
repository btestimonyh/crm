import { FaUser } from "react-icons/fa";
import { Await, Link, } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { getUserById } from "../util/getUserById";


const UserInfo = () => {
    // const users = useLoaderData();
    const { userId } = useParams();
    const [user, setUser] = useState();

    // const user = users.find(user => user.email == name);

    useEffect(() => {
        const getData = async () => {
            const data = await getUserById(userId);
            setUser(data);
        }
        getData();
    }, [userId])


    return (

        <Await>
            {user ? <section className="flex items-center justify-center w-full">
                <div className="relative bg-[#151d28] rounded-xl flex flex-col gap-1 h-max p-20 items-center min-w-[700px] max-md:min-w-[90vw]">
                    <div className="text-purple-600 bg-purple-400/20 w-min p-6 rounded-xl mb-6 flex items-center gap-4 cursor-pointer text-[500%]">
                        <FaUser />
                    </div>
                    <div>
                        {user.name}
                    </div>
                    <div>
                        {user.job === 'owner' ?
                            <div className="border-2 p-2 rounded-xl text-red-600 border-red-600">Владелец</div>
                            : user.job == 'buyer' ?
                                <div className="border-2 p-2 rounded-xl text-green-600 border-green-600">Байер</div> :
                                <div className="border-2 p-2 rounded-xl text-yellow-600 border-yellow-600">Админ</div>}
                    </div>
                    <div className="mt-4 p-2 border-b-[1px] w-full text-center border-gray-500">
                        ИНФОРМАЦИЯ
                    </div>
                    <div>
                        Имя: {user.name}
                    </div>
                    <div>
                        Тег: {user.tag}
                    </div>
                    <div>
                        Telegram: {user.telegram}
                    </div>
                    <div>
                        Почта: {user.email}
                    </div>
                    <div>
                        Дата регистрации: {user.date}
                    </div>
                    <div className="absolute top-[-15%] right-[-15%] max-md:right-0">
                        <Link to='/main/users' className="flex items-center gap-4 text-xl rounded-xl bg-[#151d28] p-4">
                            <IoMdArrowRoundBack />
                            Назад
                        </Link>
                    </div>
                </div>
            </section> :
                <section>
                    <div className="relative bg-[#151d28] rounded-xl flex flex-col gap-1 h-max p-20 items-center min-w-[700px] max-md:min-w-[90vw]">
                        Пользователь еще не добавлен в базу...
                        <div className="absolute top-0 right-0 max-md:right-0">
                            <Link to='/main/users' className="flex items-center gap-4 text-xl rounded-xl bg-[#151d28] p-4">
                                <IoMdArrowRoundBack />
                                Назад
                            </Link>
                        </div>
                    </div>
                </section>}

        </Await>

    )
}

export default UserInfo;