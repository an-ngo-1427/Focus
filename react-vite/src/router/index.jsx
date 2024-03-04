import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import GroupPage from '../components/GroupPage';
import GroupDetail from '../components/GroupDetail/GroupDetail';
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element:<HomePage/>,
      },
      {
        path:'/groups',
        element:<GroupPage/>
      },
      {
        path:'/groups/:groupId/edit',
        element:<GroupDetail/>
      }
    ],
  },
  {
    path: "login",
    element: <LoginFormPage />,
  },
  {
    path: "signup",
    element: <SignupFormPage />,
  },
]);
