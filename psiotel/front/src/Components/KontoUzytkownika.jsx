import '../App.css';
import Stopka from './Stopka'
import NaglowekZalogowano from "./NaglowekZalogowano";
import config from "../config";
import FormularzUzytkownika from "./FormularzUzytkownika";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


/**
 * strona, na której użytkownik edytuje swoje dane oraz moze usunąć konto
 * @param jezyk język strony
 * @param ustawJezyk umożliwia zmianę języka w nagłówku
 * @returns {JSX.Element}
 * @constructor
 */
function KontoUzytkownika({jezyk, ustawJezyk}) {


    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, [jezyk]);

    const [uzytkownik, ustawUzytkownika] = useState('');
    const [czyJestNapisNadFormatka, ustawCzyJestNapisNadFormatka] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

        const podajUzytkownika = async () =>{
            // przygotowujemy opcje z id użytkownika
            const opcje = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // wysyłamy geta
            let resGet = await fetch('http://localhost:8080/getUzytkownika/'+config.uzytkownik.id, opcje).then(res => res.json())

            ustawUzytkownika(resGet)

        }

        podajUzytkownika().then()

    }, []);

    // usuwamy użytkownika, kontroler zajmie się usuwaniem piesków i rezerwacji
    const przyKliknieciuUsun = async () => {

        // twożymy opcje
        const opcje = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        };


        // wysyłamy delete i odbieramy odpowiedź
        const resDelete = await fetch('http://localhost:8080/deleteUzytkownika/'+uzytkownik.id, opcje);

        // sprawdzamy czy się udało
        if (!resDelete.ok) {
            throw new Error('Ojojoj! Nie udało się usunąć użytkownika!');
        }else {
            // jeśli się udało, wylogowujemy się
            ustawCzyJestNapisNadFormatka(true)
            navigate('/');
        }
    }


    if (uzytkownik.imie === undefined) {
        return (<>
            <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
            <h2>{jezyk.ladowanieDanychKonta}</h2>
            <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
        </>)
    }

    return (<>
            <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
            <div id="glowna">
                <h1>{jezyk.daneKonta}</h1>
                <p>{jezyk.otoDaneKonta}</p>
                <p style={{color: "darkblue"}}>{czyJestNapisNadFormatka ? jezyk.pomyslnieZmienionoDane : ''}</p>
                <FormularzUzytkownika uzytkownik={uzytkownik} jezyk={jezyk}></FormularzUzytkownika>
                <br></br>
                <h1>{jezyk.usunKonto}</h1>
                <p>{jezyk.usunKontoOpis}</p>
                <p style = {{color: "red"}}>{jezyk.tejOperacjiNieDaSieCofnac}</p>
                <button onClick={przyKliknieciuUsun} disabled={config.uzytkownik.id === 0}>{jezyk.usunKonto}</button>
            </div>
            <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
        </>
    )
}

export default KontoUzytkownika;



