import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import nav_dropdown from '../Assets/nav_dropdown.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  // helper: close menu on link click (mobile UX)
  const handleMenuClick = (menuName) => {
    setMenu(menuName);
    if (window.innerWidth <= 800) {
      menuRef.current.classList.remove('nav-menu-visible');
      document.querySelector('.nav-dropdown')?.classList.remove('open');
    }
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>

      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="dropdown" />

      <ul ref={menuRef} className='nav-menu'>
        <li onClick={() => handleMenuClick("shop")}>
          <Link to='/' style={{ textDecoration: 'none' }}>Shop</Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => handleMenuClick("mens")}>
          <Link to='/mens' style={{ textDecoration: 'none' }}>Men</Link>
          {menu === "mens" && <hr />}
        </li>
        <li onClick={() => handleMenuClick("womens")}>
          <Link to='/womens' style={{ textDecoration: 'none' }}>Women</Link>
          {menu === "womens" && <hr />}
        </li>
        <li onClick={() => handleMenuClick("kids")}>
          <Link to='/kids' style={{ textDecoration: 'none' }}>Kids</Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
