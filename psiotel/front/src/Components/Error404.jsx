import '../App.css';
import Naglowek from './Naglowek'
import Stopka from './Stopka'
import {useEffect, useState} from "react";
import config from "../config";
import NaglowekZalogowano from "./NaglowekZalogowano";


function Error404({text,jezyk, ustawJezyk}){


    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, [jezyk]);

    return (<>
        {config.uzytkownik.id ==='' ? <Naglowek jezyk={jezyk} ustawJezyk={ustawJezyk}></Naglowek> : <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>}
        <div id="glowna">
            <h1>{jezyk.error404tekst}</h1><br/>
            <h2>{text}</h2>
        </div>
        <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
    </>)
}

export default Error404;