import '../App.css';
import Stopka from './Stopka'
import FormularzRezerwacji from "./FormularzRezerwacji";
import NaglowekZalogowano from "./NaglowekZalogowano";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import config from "../config";

/**
 * Tutaj rejestruje się rezerwacje.
 * @returns {JSX.Element}
 * @constructor
 */
function EdytujRezerwacje({rezerwacja}) {

    const [jezyk, ustawJezyk] = useState(config.jezyk);

    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, []);

    const navigate = useNavigate();

    const przyAnulowaniuRezerwacji = async () =>{

        // twożymy opcje
        const opcje = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // wysyłamy delete i odbieramy odpowiedź
        const resDelete = await fetch('http://localhost:8080/deleteRezerwacje/'+rezerwacja[0], opcje);

        // sprawdzamy czy się udało
        if (!resDelete.ok) {
            throw new Error('Ojojoj! Nie udało się anulować rezerwacji!');
        }else {
            // jeśli się udało, cofamy się o jedną stronę do tyłu
            navigate('/rezerwacjeUzytkownika');
        }

    }

    // jeżeli rezerwacja jeszcze się nie załadowała
    if(rezerwacja === ''){
        return (<>
            <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
            <div id="glowna">
                <h1>{jezyk.edycjaRezerwacji}</h1>
                <h2>{jezyk.ladowanieRezerwacji}</h2>
                <br></br>
                <h2>{jezyk.anulujRezerwacje}</h2>
                <p>{jezyk.anulujRezerwacjeOpis}</p>
                <button onClick={przyAnulowaniuRezerwacji}>{jezyk.anulujRezerwacje}</button>
            </div>
            <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
        </>);
    }

    return (<>
            <NaglowekZalogowano jezyk={jezyk} ustawJezyk={ustawJezyk}></NaglowekZalogowano>
            <div id="glowna">
                <h1>{jezyk.edycjaRezerwacji}</h1>
                <h2>{jezyk.aktualniePrzypisanyPiesTo} {rezerwacja[1]}</h2>
                <FormularzRezerwacji rezerwacja = {rezerwacja} jezyk={jezyk}></FormularzRezerwacji>
                <br></br>
                <h2>{jezyk.anulujRezerwacje}</h2>
                <p>{jezyk.anulujRezerwacjeOpis}</p>
                <button onClick={przyAnulowaniuRezerwacji}>{jezyk.anulujRezerwacje}</button>
            </div>
            <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
        </>
    )
}

export default EdytujRezerwacje;