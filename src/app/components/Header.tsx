"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import style from "./Header.module.scss";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);

  
  const toggleBurger = () => {
    setBurgerOpen((prev) => !prev);
  };

  return (
    <header className={style.header}>
      <Link href="/" className={style.header_logo} onClick={() => setBurgerOpen(false)}>
        <Image src="/images/logo.svg" alt="Logo" width={40} height={40} />
      </Link>

      <Link href="/" className={style.header_category} onClick={() => setBurgerOpen(false)}>
        <Image src="/images/grid_category.svg" alt="Home" width={20} height={20} />
        <span className={style.category_text}>All categories</span>
      </Link>

      <div className={style.input_wrapper}>
        <FiSearch className={style.search_icon} />
        <input
          type="text"
          placeholder="Search in Tentai"
          className={style.header_input}
        />
      </div>

     
      <button
        className={`${style.burger_button} ${burgerOpen ? style.open : ""}`}
        onClick={toggleBurger}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

     
      <nav className={style.nav_group}>
        <Link href="/notifications" className={style.header_prizes}>
          <Image src="/images/prizes.png" alt="Icon 1" width={20} height={20} />
          <span className={style.prizes_text}>Give prizes</span>
        </Link>
        <Link href="/notifications">
          <Image src="/images/Header icons1.png" alt="Icon 1" width={40} height={30} />
        </Link>
        <Link href="/notifications">
          <Image src="/images/Header icons.png" alt="Icon 1" width={40} height={30} />
        </Link>
        <Link href="/notifications">
          <Image src="/images/Avatar.png" alt="Icon 1" width={45} height={45} />
        </Link>

        <Button text="+ Add offer" />
      </nav>

    
      <nav className={`${style.mobile_nav} ${burgerOpen ? style.mobile_nav_open : ""}`}>
        <Link href="/notifications" className={style.header_prizes} onClick={() => setBurgerOpen(false)}>
          <Image src="/images/prizes.png" alt="Icon 1" width={20} height={20} />
          <span className={style.prizes_text}>Give prizes</span>
        </Link>
        <Link href="/notifications" onClick={() => setBurgerOpen(false)}>
          <Image src="/images/Header icons1.png" alt="Icon 1" width={40} height={30} />
        </Link>
        <Link href="/notifications" onClick={() => setBurgerOpen(false)}>
          <Image src="/images/Header icons.png" alt="Icon 1" width={40} height={30} />
        </Link>
        <Link href="/notifications" onClick={() => setBurgerOpen(false)}>
          <Image src="/images/Avatar.png" alt="Icon 1" width={45} height={45} />
        </Link>
        <Button text="+ Add offer" onClick={() => setBurgerOpen(false)} />
      </nav>
    </header>
  );
};

export default Header;
