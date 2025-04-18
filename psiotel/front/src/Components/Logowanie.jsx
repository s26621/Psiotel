import '../App.css';
import Naglowek from './Naglowek'
import Stopka from './Stopka'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import config from "../config";

/**
 * strona, na której użytkownik się loguje
 * @param jezyk
 * @param ustawJezyk
 * @returns {JSX.Element}
 * @constructor
 */
function Logowanie({jezyk, ustawJezyk}) {


    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, [jezyk]);

    // czyścimy użytkownika przy wejściu na stronę główną symulując wylogowanie
    useEffect(() => {
        config.uzytkownik.id = '';
        config.uzytkownik.login = '';
        config.uzytkownik.token ='';
    }, []);

    const navigate = useNavigate();

    const [login, ustawLogin] = useState('')
    const [haslo, ustawHaslo] = useState('')
    const [bledy, ustawBledy] = useState({login: '', haslo: '', podsumowanie: ''})

    const przyZmianieLoginu = (e) =>{
        ustawLogin(e.target.value);
    }
    const przyZmianieHasla = (e) =>{
        ustawHaslo(e.target.value);
    }

    const przyWyslaniu = async () => {

        const daneLogowania = {login: login, haslo:haslo}
        const opcje = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(daneLogowania)
        };

        // wysyłamy geta
        const res = await fetch('http://localhost:8080/zaloguj', opcje).then(res => res.json());

        if(res.bledy.podsumowanie === ''){
            // nie ma problemów, logujemy
            config.uzytkownik.login = login;
            config.uzytkownik.id = res.id.id;
            navigate('/rezerwacjeUzytkownika');
        }else{
            ustawBledy(res.bledy);
        }
        
    }

    return (<>
            <Naglowek jezyk={jezyk} ustawJezyk={ustawJezyk}></Naglowek>
            <div id="glowna">
                <h1>{jezyk.zalogujSie}</h1>
                <form id="form">
                    <label htmlFor="login">{jezyk.login}</label><br/>
                    <input type="text" id="login" name="login" onChange={przyZmianieLoginu}/><br/>
                    <span id="error-login" className="error-wiadomosc">{bledy.login}</span><br/>
                    <label htmlFor="haslo">{jezyk.haslo}</label><br/>
                    <input type="password" id="haslo" name="haslo" onChange={przyZmianieHasla}/><br/>
                    <span id="error-haslo" className="error-wiadomosc">{bledy.haslo}</span><br/>
                    <br/>
                    <input type="button" value={jezyk.zaloguj} disabled = {haslo === '' || login === ''} onClick = {przyWyslaniu}/><br/>
                    <span id="error-podsumowanie" className="error-wiadomosc">{bledy.podsumowanie}</span>
                </form>
            </div>
            <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
        </>
    )
}

export default Logowanie;