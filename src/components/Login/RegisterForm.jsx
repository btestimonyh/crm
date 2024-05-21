import { useRef, useState } from "react";
import LoginInput from "./Input";
import { Button } from "@mui/material";
import { registerUser } from "../../util/registerUser";
import { v4 as uuidv4 } from 'uuid';

const RegisterForm = ({ changeType }) => {
    const loginInput = useRef(null);
    const passwordInput = useRef(null);
    const nameInput = useRef(null);
    const subNameInput = useRef(null);
    const tagInput = useRef(null);
    const telegramInput = useRef(null);

    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [nameError,setNameError] = useState(false);
    const [subNameError,setSubNameError] = useState(false);
    const [tagError,setTagError] = useState(false);
    const [telegramErorr,setTelegramError] = useState(false);



    const submitHandler = async (e) => {
        const loginValue = loginInput.current.value;
        const passwordValue = passwordInput.current.value;
        const nameValue = nameInput.current.value;
        const subNameValue = subNameInput.current.value;
        const tagValue = tagInput.current.value;
        const telegramValue = telegramInput.current.value;
        
        
        e.preventDefault();
        if (loginValue.length < 4 || !loginValue.includes('@')) {
            return setLoginError(true);
        } else {
            setLoginError(false);
        }
        if (passwordValue.length < 4) {
            return setPasswordError(true);
        } else {
            setPasswordError(false);
        }
        if (nameValue.length < 3) {
            return setNameError(true);
        } else {
            setNameError(false);
        }
        if (subNameValue.length < 3) {
            return setSubNameError(true);
        } else {
            setSubNameError(false);
        }
        if (tagValue.length < 1) {
            return setTagError(true);
        } else {
            setTagError(false);
        }
        if (telegramValue.length < 3) {
            return setTelegramError(true);
        } else {
            setTelegramError(false);
        }

        const id = uuidv4();
        const data = {
            id: id,
            login: loginValue,
            password: passwordValue,
            name: nameValue,
            subName: subNameValue,
            tag: tagValue,
            telegram: telegramValue,
        }
        
        registerUser(data);
        localStorage.setItem('user-id',id);
        localStorage.setItem('isLogged', true);
        window.location.href = '/'

    }

    return <form
        onSubmit={submitHandler}
        className="bg-[#161c28] min-w-[360px] flex flex-col p-8 py-10 rounded-xl shadow-xl gap-4 max-sm:px-4">
        <h1 className="text-xl w-full text-center">Регистрация</h1>
        <p className="text-sm text-gray-500">Пожалуйста, введите свои данные</p>
        <LoginInput placeholder="Почта" ref={loginInput} error={loginError}/>
        <LoginInput placeholder="Пароль" type='password' ref={passwordInput} error={passwordError}/>
        <div className="flex gap-2">
            <LoginInput placeholder="Имя" ref={nameInput} error={nameError} />
            <LoginInput placeholder='Фамилия' ref={subNameInput} error={subNameError}/>
        </div>
        <LoginInput placeholder='Тэг' ref={tagInput} error={tagError}/>
        <LoginInput placeholder='Telegram без @' ref={telegramInput} error={telegramErorr} />
        <Button type='submit' variant="contained" color="secondary"><span className="font-[700]">ЗАРЕГИСТРИРОВАТЬСЯ</span></Button>
        <div className="text-base font-[400] w-full text-center text-gray-500 text-[14px]">
            Уже есть аккаунт? <span onClick={changeType} className="text-[#9c27b0] cursor-pointer hover:text-[#9c27b0]/70">Войти</span>
        </div>

    </form>
}

export default RegisterForm;