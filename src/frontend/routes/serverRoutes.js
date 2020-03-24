import Home from '../containers/Home';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Player from '../containers/Player';
import NotFound from '../containers/NotFound';

const serverRoutes = (isLogged) => {
  return [
    {
      exact: true,
      path: '/',
      component: isLogged ? Home : Login,
    },
    {
      exact: true,
      path: '/login',
      component: Login,
    },
    {
      exact: true,
      path: '/register',
      component: Register,
    },
    {
      exact: true,
      path: '/player/:movieId',
      component: isLogged ? Player : Login,
    },
    {
      name: 'NotFound',
      component: NotFound,
    },
  ];

};

export default serverRoutes;
