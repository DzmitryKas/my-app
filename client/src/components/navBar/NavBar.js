import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { NavLink } from "react-router-dom";
import {logout} from '../../redux/reducers/userReducer';

import "./navBar.scss";

const Navbar = () => {
const isAuth = useSelector(state => state.user.isAuth);
const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__inner">
          <div className="navbar__header">Безье</div>
            {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
            {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
            {isAuth && <div className="navbar__logout" onClick={() => dispatch(logout())}>Выйти</div>}         
          </div>
      </div>
    </div>
  );
};

export default Navbar;
