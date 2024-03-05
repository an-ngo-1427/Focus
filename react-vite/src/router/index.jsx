import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';

import GroupDetail from '../components/GroupDetail/GroupDetail';
import GroupNav from '../components/GroupNav/GroupNav';
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element:<HomePage/>,
      },
      {
        element:<GroupNav/>,
        children:[
          {
            path:'/groups',
            element:null
          },
          {
            path:'/groups/:groupId/edit',
            element:<GroupDetail/>
          }
        ]
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
