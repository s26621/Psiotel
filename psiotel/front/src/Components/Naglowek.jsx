import '../App.css';
import {Link, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import config from "../config";
import jezyki from "../jezyki"
import React from "react";

function Naglowek({jezyk, ustawJezyk}) {

    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, []);

    function zmienJezykNaPolski(){
        config.jezyk = jezyki.pl;
        ustawJezyk(config.jezyk);
    }

    function zmienJezykNaAngielski(){
        config.jezyk = jezyki.en;
        ustawJezyk(config.jezyk);
    }

    return (
        <div className="menu" id="menu">
            <img src="/logo.png" alt="logo" style={{width: 90}}/>
            <span style={{fontSize: 90}}>Psiotel</span>
            <nav id="menu-na-pasku">
                <ul>
                    <li><img src="/pl.png" onClick={zmienJezykNaPolski} alt="pl" className="jezyk-przycisk"/></li>
                    <li><img src="/en.png" onClick={zmienJezykNaAngielski} alt="en" className="jezyk-przycisk"/></li>
                </ul>
                <NavLink to="/" className="nawigacja">{jezyk.stronaGlowna}</NavLink>
                <NavLink to='/oNas' className="nawigacja">{jezyk.oNas}</NavLink>
                <NavLink to="/rejestracjaUzytkownika" className="nawigacja">{jezyk.zarejestruj}</NavLink>
                <NavLink to="/logowanie" className="nawigacja">{jezyk.zaloguj}</NavLink>
            </nav>
        </div>
    )
}

export default Naglowek;