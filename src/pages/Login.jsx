import { useState } from "react";
import LoginForm from "../components/Login/LoginForm";
import RegisterForm from "../components/Login/RegisterForm";

const LoginPage = () => {
    const [formType, setFormType] = useState('login');

    return <div className="w-screen h-screen flex items-center justify-center">
        {formType == 'login' ?
            <LoginForm changeType={() => setFormType('register')} />
            :
            <RegisterForm changeType={() => setFormType('login')}/>
        }
    </div>
}

export default LoginPage;