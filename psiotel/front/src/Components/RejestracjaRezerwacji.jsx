import '../App.css';
import Stopka from './Stopka'
import FormularzRezerwacji from "./FormularzRezerwacji";
import NaglowekZalogowano from "./NaglowekZalogowano";
import {useEffect, useState} from "react";
import config from "../config";

/**
 * Tutaj rejestruje się rezerwacje.
 * @returns {JSX.Element}
 * @constructor
 */
function RejestracjaRezerwacji({jezyk, ustawJezyk}) {

    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, [jezyk]);

    return (<>
            <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
            <div id="glowna">
                <h1>{jezyk.wykonajNowaRezerwacje}</h1>
                {/* id rezerwacji, imie psa, data rozpoczęcia, data zakończenia, pakiet, idPsa */}
                <FormularzRezerwacji rezerwacja = {['', '', '', '', '', '']} jezyk={jezyk}></FormularzRezerwacji>
            </div>
            <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
        </>
    )
}

export default RejestracjaRezerwacji;