import '../App.css';
import Stopka from './Stopka'
import FormularzPieska from "./FormularzPieska";
import NaglowekZalogowano from "./NaglowekZalogowano";
import {useEffect, useState} from "react";
import config from "../config";

/**
 * Tutaj rejestruje się psiaka.
 * @returns {JSX.Element}
 * @constructor
 */
function RejestracjaPsiaka({jezyk, ustawJezyk}) {

    const [liczbaPieskow, ustawLiczbePieskow] = useState(0);


    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, [jezyk]);

    useEffect( () => {

        const podajPieskiUzytkownika = async () => {

            // przygotowujemy opcje
            const opcje = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // wysyłamy geta
            const resGet = await fetch('http://localhost:8080/getPieskiUzytkownika/'+config.uzytkownik.id, opcje).then(res => res.json());


            ustawLiczbePieskow(resGet.length);
        }

        podajPieskiUzytkownika().then();



    }, [liczbaPieskow]);


    if(liczbaPieskow > config.maksymalnaLiczbaPieskowUzytkownika){
        return (<>
            <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
            <div id="glowna">
                <h1>{jezyk.maksymalnaLiczbaPieskow}</h1>
                <p>{jezyk.maksymalnaLiczbaPieskowOpis1} {config.maksymalnaLiczbaPieskowUzytkownika} {jezyk.maksymalnaLiczbaPieskowOpis2}</p>
            </div>
            <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
        </>)
    }

    return (<>
            <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
            <div id="glowna">
                <h1>{jezyk.zarejestrujNowegoPsiaka}</h1>
                <FormularzPieska
                    // id, imie, data urodzenia, płeć, rasa, waga
                    piesek={['', '', '','', '', '']}
                    jezyk = {jezyk}
                ></FormularzPieska>
            </div>
            <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
        </>
    )
}

export default RejestracjaPsiaka;