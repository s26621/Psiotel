import '../App.css';
import Stopka from './Stopka'
import NaglowekZalogowano from "./NaglowekZalogowano";
import config from "../config";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Tabelka from "./Tabelka";
import {log} from "debug";



function RezerwacjeUzytkownika({jezyk, ustawJezyk, ustawRezerwacje}) {

    const navigate = useNavigate()
    const [listaWszystkichRezerwacji, ustawListeWszystkichRezerwacji] = useState([]);
    const [listaAktywnychRezerwacji, ustawListeAktywnychRezerwacji] = useState([]);

    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, [jezyk]);

    useEffect(() => {
        // najpierw pobieramy aktywne, a potem pobieramy wszystkie
        async function przygotowanie() {

            // czyścimy
            ustawListeAktywnychRezerwacji([]);
            ustawListeWszystkichRezerwacji([]);

            // pobieramy aktywne rezerwacje
            await pobierzAktywneRezerwacje().then();

            // pobieramy wszystkie rezerwacje
            await pobierzWszystkieRezerwacje().then();
        }

        przygotowanie().then();
    }, []);


    // przerabiamy to co otrzymaliśmy na listę po pięć wartości
    const przerobNaListe = (resGet) => {
        let tempLista = [];
        let tempMalaLista = [];

        // przechodzimy przez wszystkie otrzymane pieski
        for (let i = 0; i < resGet.length; i++) {
            let rezerwacja = resGet[i];

            // ładujemy rezerwacje po pięć do małej listy
            tempMalaLista.push(rezerwacja);

            // jak lista ma już pięć to wsadzamy do głównej i czyścimy małą
            if (tempMalaLista.length === 5) {
                tempLista.push(tempMalaLista);
                tempMalaLista = [];
            }
        }
        // dodajemy to, co zostało
        if(tempMalaLista.length > 0){
            tempLista.push(tempMalaLista);
        }
        return tempLista;
    }

    // pobieramy aktywne rezerwacje i wstawiamy je do use state
    const pobierzAktywneRezerwacje = async () => {

        // przygotowujemy opcje z id użytkownika
        const opcje = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // wysyłamy geta po aktywne
        const resGet = await fetch('http://localhost:8080/getAktywneRezerwacjeUzytkownika/'+config.uzytkownik.id, opcje).then(res => res.json());


        // ustawiamy rezerwacje na listę
        ustawListeAktywnychRezerwacji((poprzedniaLista) => [...poprzedniaLista, ...przerobNaListe(resGet)]);

    }


    // pobieramy wszystkie rezerwacje i wstawiamy je do use state
    const pobierzWszystkieRezerwacje = async () => {

        const opcje = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // wysyłamy geta po aktywne
        const resGet = await fetch('http://localhost:8080/getWszystkieRezerwacjeUzytkownika/'+config.uzytkownik.id, opcje).then(res => res.json());


        // ustawiamy rezerwacje na listę
        ustawListeWszystkichRezerwacji((poprzedniaLista) => [...poprzedniaLista, ...przerobNaListe(resGet)]);
    }

    // jeżeli oba się ładują
    if(listaAktywnychRezerwacji.length === 0 && listaWszystkichRezerwacji.length === 0){

        return (<>
            <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
                <div id="glowna">
                    <h1>{jezyk.witamy1}{config.uzytkownik.login}{jezyk.witamy2}</h1>

                    <br></br>

                    <h2>{jezyk.aktualneRezerwacje}</h2>
                    <p>{jezyk.ladowanieRezerwacji}</p>
                    <br></br>

                    <h2>{jezyk.historiaRezerwacji}</h2>
                    <p>{jezyk.ladowanieRezerwacji}</p>

                    <br></br>

                    <h1>{jezyk.dodajRezerwacje}</h1>
                    <p>{jezyk.dodajRezerwacjeOpis}</p>
                    <button onClick={() => navigate('/rejestracjaRezerwacji')}>{jezyk.dodajRezerwacje}</button>
                </div>
            </>
        );
    }


    // jeżeli tylko tablica wszystkich weryfikacji się ładuje
    if(listaAktywnychRezerwacji.length === 0 && !(listaWszystkichRezerwacji.length === 0)){
        return (<>
                <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
                <div id="glowna">
                    <h1>{jezyk.witamy1}{config.uzytkownik.login}{jezyk.witamy2}</h1>

                    <br></br>

                    <h2>{jezyk.aktualneRezerwacje}</h2>
                    <p>{jezyk.otoAktualneRezerwacje}</p>
                    {/* tabelka z aktualnymi rezerwacjami */}
                    <Tabelka jezyk={jezyk} lista={listaAktywnychRezerwacji} ustawWartosc={ustawRezerwacje} typ={'aktualne-rezerwacje'}></Tabelka>
                    <br></br>
                    {/* tabelka ze wszystkimi rezerwacjami */}
                    <h2>{jezyk.historiaRezerwacji}</h2>
                    <p>{jezyk.ladowanieRezerwacji}</p>
                    <br></br>

                    <h1>{jezyk.dodajRezerwacje}</h1>
                    <p>{jezyk.dodajRezerwacjeOpis}</p>
                    <button onClick={() => navigate('/rejestracjaRezerwacji')}>{jezyk.dodajRezerwacje}</button>
                </div>
            </>
        );
    }


    return (<>
        <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
        <div id="glowna">

            <h1>{jezyk.witamy1}{config.uzytkownik.login}{jezyk.witamy2}</h1>

            <br></br>

            <h2>{jezyk.aktualneRezerwacje}</h2>
            <p>{jezyk.otoAktualneRezerwacje}</p>
            {/* tabelka z aktualnymi rezerwacjami */}
            <Tabelka jezyk={jezyk} lista={listaAktywnychRezerwacji} ustawWartosc={ustawRezerwacje} typ={'aktualne-rezerwacje'}></Tabelka>

            <br></br>

            <h2>{jezyk.historiaRezerwacji}</h2>
            <p>{jezyk.otoHistoriaRezerwacji}</p>

            {/* tabelka ze wszystkimi rezerwacjami */}
            <Tabelka jezyk={jezyk} lista ={listaWszystkichRezerwacji} ustawWartosc={ustawRezerwacje} typ={'wszystkie-rezerwacje'}></Tabelka>

            <br></br>

            <h1>{jezyk.dodajRezerwacje}</h1>
            <p>{jezyk.dodajRezerwacjeOpis}</p>
            <button onClick={() => navigate('/rejestracjaRezerwacji')}>{jezyk.dodajRezerwacje}</button>

        </div>
        <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
    </>)
}

export default RezerwacjeUzytkownika;