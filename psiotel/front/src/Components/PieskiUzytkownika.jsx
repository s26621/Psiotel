import '../App.css';
import Stopka from './Stopka'
import NaglowekZalogowano from "./NaglowekZalogowano";
import {useEffect, useState} from "react";
import config from "../config";
import {useNavigate} from "react-router-dom";
import Tabelka from "./Tabelka";



function PieskiUzytkownika({jezyk, ustawJezyk, ustawPieska}) {

    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, [jezyk]);

    // pieski użytkownika ułożone w małe tablice po pięć
    const [listaPieskow, ustawListePieskow] = useState([]);

    const navigate = useNavigate();

    const przerobNaListe = (resGet) => {
        let tempListaPieskow = [];
        let tempMalaListaPieskow = [];

        // przechodzimy przez wszystkie otrzymane pieski
        for (let i = 0; i < resGet.length; i++) {
            let piesek = resGet[i];

            // ładujemy pieski po pięć do małej listy
            tempMalaListaPieskow.push(piesek);

            // jak lista ma już pięć piesków to wsadzamy do głównej i czyścimy małą
            if(tempMalaListaPieskow.length === 5){
                tempListaPieskow.push(tempMalaListaPieskow);
                tempMalaListaPieskow = [];
            }
        }
        // dodajemy to, co zostało
        if(tempMalaListaPieskow.length > 0){
            tempListaPieskow.push(tempMalaListaPieskow);
        }
        return tempListaPieskow;
    }

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


            ustawListePieskow((poprzedniaLista)=> [...poprzedniaLista, ...przerobNaListe(resGet)]);

        }

        podajPieskiUzytkownika().then();

    }, []);


    if (listaPieskow.length === 0) {
        return (<>
            <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
            <div id="glowna">
                <h1>{jezyk.mojePieski}</h1>
                <h2>{jezyk.ladowaniePieskow}</h2>
                <br></br>
                <h1>{jezyk.dodajPieska}</h1>
                <p>{jezyk.dodajPieskaOpis}</p><br></br>
                <button onClick={() => navigate('/rejestracjaPsiaka')}>{jezyk.dodajPieska}</button>
            </div>
            <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
        </>)
    }

    return (<>
        <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
        <div id="glowna">
            <h1>{jezyk.mojePieski}</h1>
            <p>{jezyk.otoMojePieski}</p>
            <Tabelka lista={listaPieskow} jezyk={jezyk} ustawWartosc={ustawPieska} typ={'pieski'}></Tabelka>
            <br></br>
            <h1>{jezyk.dodajPieska}</h1>
            <p>{jezyk.dodajPieskaOpis}</p><br></br>
            <button onClick={() => navigate('/rejestracjaPsiaka')}>{jezyk.dodajPieska}</button>
        </div>
        <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
    </>)
}

export default PieskiUzytkownika;



