import { Await, useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";

const UserInfo = () => {
    const users = useLoaderData();
    const { name } = useParams();

    const user = users.find(user => user.email == name);


    return (

        <Await>
            {user ? <section className="flex">
                <div className="bg-[#151d28] rounded-xl flex flex-col gap-1 h-max p-8">
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
                </div>
            </section> :
                <section>
                    Пользователь еще не добавлен в базу...
                </section>}

        </Await>

    )
}

export default UserInfo;