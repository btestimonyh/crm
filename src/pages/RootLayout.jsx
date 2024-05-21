import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from '../components/Navigation/Navigation';

const RootLayout = () => {
    useEffect(() => {
        const isLogged = localStorage.getItem('isLogged');
        if (!isLogged) {
            window.location.href = '/'
        }
    }, [])
    return <div className='flex w-full'>
        <Navigation/>
        <Outlet />
    </div>
}

export default RootLayout;