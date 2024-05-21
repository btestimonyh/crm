import { Button, Checkbox } from "@mui/material"
import LoginInput from "./Input";
import { useEffect, useRef, useState } from "react";
import { loginCheck } from "../../util/loginCheck";

const LoginForm = ({ changeType }) => {
    const loginInput = useRef(null);
    const passwordInput = useRef(null);
    const [loginError, setLoginError] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [errorAccount, setErrorAccount] = useState(false);

    
    useEffect(()=>{
        const isLogged = localStorage.getItem('isLogged');
        if(isLogged){
            window.location.href = '/'
        }
    },[])
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const loginValue = loginInput.current.value;
        const passwordValue = passwordInput.current.value;
        
        if(loginValue.length < 4 || !loginValue.includes('@')){
            return setLoginError(true);
        }else{
            setLoginError(false);
        }
        if(passwordValue.length < 4){
            return setPasswordError(true);
        }else{
            setPasswordError(false);
        }

        const accountExisting = await loginCheck(loginValue,passwordValue);
        if(accountExisting){
            localStorage.setItem('isLogged', true);
            localStorage.setItem('user-id', accountExisting);
            window.location.href = '/'
        }else{
            passwordInput.current.value = '';
            setErrorAccount(true);
        }
        
      
    }



    return <form
        onSubmit={submitHandler}
        className="bg-[#161c28] flex flex-col p-8 py-10 rounded-xl shadow-xl gap-4">
        <h1 className="text-xl w-full text-center">Вход</h1>
        <p className="text-sm text-gray-500">Пожалуйста, войдите в свою учетную запись</p>
        <LoginInput placeholder="Почта" ref={loginInput} error={loginError}/>
        <LoginInput placeholder="Пароль" type='password' ref={passwordInput} error={passwordError}/>
        {errorAccount && <div className="text-sm text-red-500 font-[400]">Вы ввели неверные данные, спробуйте еще раз</div>}
        <div className="flex items-center justify-between">
            <div className="text-gray-500 text-sm -m-3">
                <Checkbox color="secondary" />
                Запомнить меня
            </div>
            <div className="text-[#9c27b0] cursor-pointer hover:text-[#9c27b0]/70 text-sm">
                Забыли пароль?
            </div>
        </div>
        <Button type='submit' variant="contained" color="secondary"><span className="font-[700]">ВОЙТИ</span></Button>
        <div className="text-base font-[400] w-full text-center text-gray-500 text-[14px]">
            Нету аккаунта? <span onClick={changeType} className="text-[#9c27b0] cursor-pointer hover:text-[#9c27b0]/70">Создать аккаунт</span>
        </div>

    </form>
}

export default LoginForm;