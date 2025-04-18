import '../App.css';
import Naglowek from './Naglowek'
import Stopka from './Stopka'
import FormularzUzytkownika from "./FormularzUzytkownika";
import {useEffect, useState} from "react";
import config from "../config";

/**
 * Tutaj użytkownik się rejestruje.
 * @returns {JSX.Element}
 * @constructor
 */
function RejestracjaUzytkownika({jezyk, ustawJezyk}) {

    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, [jezyk]);

    // czyścimy użytkownika przy wejściu na stronę główną symulując wylogowanie
    useEffect(() => {
        config.uzytkownik.id = '';
        config.uzytkownik.login = '';
        config.uzytkownik.token ='';
    }, []);

    return (<>
            <Naglowek jezyk={jezyk} ustawJezyk={ustawJezyk}></Naglowek>
            <div id="glowna">
                <h1>{jezyk.zarejestrujSie}</h1>
                <FormularzUzytkownika uzytkownik =
                                          {{
                                              id: '', imie: '', nazwisko: '', dataUrodzenia: '',
                                              ulicaNumerDomu: '', kodPocztowy: '', miasto: '',
                                              email: '', telefon: '', login: '', haslo: ''
                }} jezyk= {jezyk}></FormularzUzytkownika>
            </div>
            <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
        </>
    )
}

export default RejestracjaUzytkownika;