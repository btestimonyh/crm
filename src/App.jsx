import { Navigate, RouterProvider, createHashRouter } from "react-router-dom"
import RootLayout from "./pages/RootLayout"
import UsersPage from "./pages/Users"
import LoginPage from "./pages/Login"
import LeadsPage from "./pages/Leads";
import StatsPage from "./pages/Stats";
import { getUsers } from "./util/getUsers";
import { getProjects } from "./util/getProjects";
import UserInfo from "./pages/UserInfo";
import Projects from "./pages/Projects";
import ProjectInfo from "./pages/ProjectInfo";
import { useDispatch } from "react-redux";
import { setAdmin, setOwner } from "./store/store";
import { useEffect } from "react";
import { roleCheck } from "./util/roleCheck";
import { loginCheck } from "./util/loginCheck";

function App() {
  const isLogged = localStorage.getItem('isLogged');
  const routing = isLogged ? '/main/projects' : '/login';

  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem('user-id')
    const getRole = async () => {
      const role = await roleCheck(userId);
      if (role == 'admin') {
        dispatch(setAdmin());
      } else if (role == 'owner') {
        dispatch(setOwner());
      } else if (role == 'buyer') {
        return;
      }
      else {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('user-id');
      }
    }
    getRole();
  }, [dispatch]);

  useEffect(() => {
    const userLogin = localStorage.getItem('userLogin');
    const userPassword = localStorage.getItem('userPassword');

    loginCheck(userLogin,userPassword);

  }, []);


  const router = createHashRouter([
    {
      path: '/',
      element: <Navigate to={routing} />,
    },
    {
      path: '/main',
      element: <RootLayout />,
      children: [
        {
          path: 'users',
          element: <UsersPage />,
          loader: getUsers,
        },
        {
          path: 'users/:name',
          element: <UserInfo />,
          loader: getUsers,
        },
        {
          path: 'leads',
          element: <LeadsPage />
        },
        {
          path: 'stats',
          element: <StatsPage />
        },
        {
          path: 'projects',
          element: <Projects />,
          loader: getProjects,
        },
        {
          path: 'projects/:id',
          element: <ProjectInfo />,
          loader: getProjects,
        }
      ]
    },
    {
      path: '/login',
      element: <LoginPage />
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;