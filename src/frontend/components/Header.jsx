import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutRequest } from '../actions';
import gravatar from '../utils/gravatar';
import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';

const Header = (props) => {
  const { user } = props;
  const hasUser = Object.keys(user).length > 0;
  const handleLogout = () => {
    document.cookie = 'email=';
    document.cookie = 'name=';
    document.cookie = 'id=';
    document.cookie = 'token=';
    props.logoutRequest({});
    window.location.href = '/login';
  };
  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__img' src={logo} alt='Platzi Video' />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          {hasUser ?
            <img src={gravatar(user.email)} alt={user.email} /> :
            <img src={userIcon} alt='user_icon' />}

          <p>Perfil</p>
        </div>
        <ul>
          {hasUser ?
            <li><a href='/'>{user.name}</a></li> :
            null}
          {hasUser ?
            <li><a href='/' onClick={handleLogout}>Cerrar Sesión</a></li> :
            <li><Link to='/login'>Iniciar Sesión</Link></li>}
        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = () => {
  return {
    logoutRequest,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

