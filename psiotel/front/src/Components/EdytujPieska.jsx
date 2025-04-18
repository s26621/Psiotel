import '../App.css';
import Stopka from './Stopka'
import NaglowekZalogowano from "./NaglowekZalogowano";
import {useNavigate} from "react-router-dom";
import FormularzPieska from "./FormularzPieska";
import {useEffect, useState} from "react";
import config from "../config";

/**
 * Tutaj rejestruje się pieska.
 * @returns {JSX.Element}
 * @constructor
 */
function EdytujPieska({jezyk, ustawJezyk, piesek}) {

    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, [jezyk]);


    const [czyMaAktywneRezerwacje, ustawCzyMaAktywneRezerwacje] = useState(false);
    const [ladowanie, ustawLadowanie] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const podajAktywneRezerwacjePieska = async () =>{
            // przygotowujemy opcje z id
            const opcje = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // wysyłamy geta
            const resGet = await fetch('http://localhost:8080/getAktywneRezerwacjePsa/'+piesek[0], opcje).then(res => res.json());

            // sprawdzamy, czy ma aktywne rezerwacje
            if (resGet.length > 0){
                ustawCzyMaAktywneRezerwacje(true);
            }

            // kończymy ładowanie
            ustawLadowanie(false)

        }

        podajAktywneRezerwacjePieska().then()

    }, []);

    // usuwamy pieska, kontroler zajmie się usuwaniem rezerwacji
    const przyUsunieciuPieska = async () =>{

        // twożymy opcje
        const opcje = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // wysyłamy delete i odbieramy odpowiedź
        const resDeletePieska = await fetch('http://localhost:8080/deletePieska/'+piesek[0], opcje);

        // sprawdzamy czy się udało
        if (!resDeletePieska.ok) {
            throw new Error('Ojojoj! Nie udało się usunąć pieska!');
        }else {
            // jeśli się udało, cofamy się do głównej
            navigate('/pieskiUzytkownika');
        }
    }

    // jeżeli rezerwacje się ładują
    if(ladowanie){
        return (<>
                <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
                <div id="glowna">
                    <h2>{jezyk.ladowanieRezerwacji}</h2>
                </div>
                <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
            </>
        )
    }

    return (<>
            <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
            <div id="glowna">
                <h1>{jezyk.edycjaDanychPieska} {piesek[1]}</h1>
                <FormularzPieska piesek={piesek} jezyk={jezyk}></FormularzPieska>
                <br></br>
                <h2>{jezyk.usunPieskaZBazy}</h2>
                <p>{jezyk.usunPieskaZBazyOpis}</p>
                <p className="error-wiadomosc">
                    {czyMaAktywneRezerwacje ? jezyk.bladUsunPieska : ""}
                </p>
                <button disabled={czyMaAktywneRezerwacje}
                        onClick={przyUsunieciuPieska}>{jezyk.przyciskUsunPieska}</button>
            </div>
            <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
        </>
    )
}

export default EdytujPieska;