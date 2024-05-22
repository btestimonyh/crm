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
    return <div className='flex w-full gap-8 p-10 max-md:p-2 max-md:py-20'>
        <Navigation/>
        <Outlet />
    </div>
}

export default RootLayout;