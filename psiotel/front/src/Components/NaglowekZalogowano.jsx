import '../App.css';
import {NavLink} from "react-router-dom";
import React, {useEffect} from "react";
import config from "../config";
import jezyki from "../jezyki";

function NaglowekZalogowano({jezyk, ustawJezyk}) {

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
                <NavLink to="/pieskiUzytkownika" className="nawigacja">{jezyk.psiaki}</NavLink>
                <NavLink to="/rezerwacjeUzytkownika" className="nawigacja">{jezyk.rezerwacje}</NavLink>
                <NavLink to="/kontoUzytkownika" className="nawigacja">{jezyk.konto}</NavLink>
                <NavLink to="/" className="nawigacja">{jezyk.wyloguj}</NavLink>
            </nav>
        </div>
    )
}

export default NaglowekZalogowano;