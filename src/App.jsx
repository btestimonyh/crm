import { Navigate, RouterProvider, createHashRouter } from "react-router-dom"
import RootLayout from "./pages/RootLayout"
import UsersPage from "./pages/Users"
import LoginPage from "./pages/Login"
import LeadsPage from "./pages/Leads";
import StatsPage from "./pages/Stats";
import { getUsers } from "./util/getUsers";
import UserInfo from "./pages/UserInfo";
import Projects from "./pages/Projects";

function App() {
  const isLogged = localStorage.getItem('isLogged');
  const routing = isLogged ? '/main/users' : '/login';

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
          element: <Projects />
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