export const loginCheck = async (login, password) => {
    console.log(login,password)
    
    // приймає логін і пароль, якщо аккаунт існує має повернути токен чи айді юзера, якщо дані не правильні(аккаунт не зареганий) має повернути false;
    localStorage.setItem('token', 'сюда токен');
    return 'user-id';

    // return false;
}