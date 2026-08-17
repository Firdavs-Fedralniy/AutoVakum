import React from 'react'
import "./Header.css"
import ThemeToggle from '../ThemeToggle/ThemeToggle';

function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="/" className="header__logo">
          AUTO<span>VAKUM</span>
        </a>

        <nav className="header__nav">
          <a href="#services">Xizmatlar</a>
          <a href="#before-after">Oldin / Keyin</a>
          <a href="#gallery">Galereya</a>
          <a href="#reviews">Mijozlar fikri</a>
          <a href="#contacts">Bog‘lanish</a>
        </nav>

        <div className="header__actions">

          <ThemeToggle/>  
          <a
            href="tel:+998000000000"
            className="header__phone"
          >
            +998 00 000 00 00
          </a>

          <a
            href="#contacts"
            className="header__button"
          >
            Buyurtma berish
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;