import {useEffect, useState} from "react";
import config from "../config";
import "../App.css"
import {useNavigate} from "react-router-dom";

/**
 * formularz używany do rejestracji lub zmieniania danych użytkownika
 * @param uzytkownik użytkownik, którego dane zmieniamy. Jeśli dodajemy nowego, jest pusty.
 * @param jezyk aktualny język strony
 * @returns {JSX.Element} nasz formularz
 * @constructor
 */
export function FormularzUzytkownika({uzytkownik, jezyk}){

    const navigate = useNavigate();

    const [bledy, ustawBledy] = useState({
        imie: '', nazwisko: '', dataUrodzenia: '',
        ulicaNumerDomu: '', kodPocztowy: '', miasto: '',
        email: '', telefon: '', login: '', haslo: '', podsumowanie: ''
    });

    const [id, ustawId] = useState(uzytkownik.id);
    const [imie, ustawImie] = useState(uzytkownik.imie);
    const [nazwisko, ustawNazwisko] = useState(uzytkownik.nazwisko);
    const [dataUrodzenia, ustawDateUrodzenia] = useState(uzytkownik.dataUrodzenia);
    const [ulicaNumerDomu, ustawUliceNumerDomu] = useState(uzytkownik.ulicaNumerDomu);
    const [kodPocztowy, ustawKodPocztowy] = useState(uzytkownik.kodPocztowy);
    const [miasto, ustawMiasto] = useState(uzytkownik.miasto);
    const [email, ustawEmail] = useState(uzytkownik.email);
    const [telefon, ustawTelefon] = useState(uzytkownik.telefon);
    const [login, ustawLogin] = useState(uzytkownik.login);
    const [haslo, ustawHaslo] = useState(uzytkownik.haslo);

    const [czyZablokowanyPrzyciskWyslij, ustawZablokowaniePrzyciskuWyslij] = useState(true);

    // blokujemy wysyłanie jeśli jest to samo, co było lub puste
    useEffect(()=>{
        ustawZablokowaniePrzyciskuWyslij(
            (imie === uzytkownik.imie &&
            nazwisko === uzytkownik.nazwisko &&
            dataUrodzenia === uzytkownik.dataUrodzenia &&
            ulicaNumerDomu === uzytkownik.ulicaNumerDomu &&
            kodPocztowy === uzytkownik.kodPocztowy &&
            miasto === uzytkownik.miasto &&
            email === uzytkownik.email &&
            telefon === uzytkownik.telefon &&
            login === uzytkownik.login &&
            haslo === uzytkownik.haslo) ||
            // lub cokolwiek jest puste
            imie === '' || nazwisko === '' || dataUrodzenia === '' || ulicaNumerDomu === '' || kodPocztowy ==='' ||
            miasto === '' || email === '' || telefon === '' || login === '' || haslo === ''
        );
    },[
        uzytkownik.imie, uzytkownik.nazwisko, uzytkownik.dataUrodzenia, uzytkownik.ulicaNumerDomu, uzytkownik.kodPocztowy,
        uzytkownik.miasto, uzytkownik.email, uzytkownik.telefon, uzytkownik.login, uzytkownik.haslo,
        imie, nazwisko, dataUrodzenia, ulicaNumerDomu, kodPocztowy, miasto, email, telefon, telefon, login, haslo
    ])

    /**
     * To, co robimy przy wysyłaniu formularza. Czyli wysyłamy POST do bazy z danymi użytkownika.
     * @returns {Promise<void>}
     */
    const przyWyslaniu = async () =>{

        // przygotowujemy body
        const uzytkownik = {id: id, imie: imie, nazwisko: nazwisko, dataUrodzenia: dataUrodzenia, ulicaNumerDomu: ulicaNumerDomu, kodPocztowy: kodPocztowy,
            miasto: miasto, email: email, telefon: telefon, login: login, haslo: haslo
        }

        // twożymy opcje
        const opcje = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uzytkownik)
        };

        // wysyłamy posta
        const resPost = await fetch('http://localhost:8080/postUzytkownika', opcje).then(res => res.json());

        ustawBledy(resPost.bledy);

        if(resPost.czyPoprawny === true){
            // nie ma problemów, logujemy
            config.uzytkownik.login = login;
            config.uzytkownik.id = resPost.id;
            navigate('/rezerwacjeUzytkownika');
        }

    }


    return (
        <form id="form">
        <label htmlFor='imie'>{jezyk.imie}</label><br/>
        <input type="text" id="imie" name="imie" className={bledy.imie === '' ? "git-pole" : 'error-pole' }
            value = {imie} onChange={ (e) =>{
            ustawImie(e.target.value);
        }}/><br/>
        <span id="error-imie" className="error-wiadomosc">{bledy.imie}</span><br/>

        <label htmlFor='nazwisko'>{jezyk.nazwisko}</label><br/>
        <input type="text" id="nazwisko" name="nazwisko" className= {bledy.nazwisko === '' ? "git-pole" : 'error-pole'}
               value = {nazwisko} onChange={(e) =>{
            ustawNazwisko(e.target.value);
        }}/><br/>
        <span id="error-nazwisko" className="error-wiadomosc">{bledy.nazwisko}</span><br/>

        <label htmlFor="dataUrodzenia">{jezyk.dataUrodzeniaFormularzUzytkownika}</label><br/>
        <input type="date" id="dataUrodzenia" name="dataUrodzenia" className={bledy.dataUrodzenia === '' ? "git-pole" : 'error-pole'}
               value = {dataUrodzenia} onChange={(e) =>{
            ustawDateUrodzenia(e.target.value);
        }}/><br/>
        <span id="error-dataUrodzenia" className="error-wiadomosc">{bledy.dataUrodzenia}</span><br/>

        <label htmlFor='ulicaNumerDomu'>{jezyk.ulicaNumerDomu}</label><br/>
        <input type="text" id='ulicaNumerDomu' name='ulicaNumerDomu' className={bledy.ulicaNumerDomu === '' ? "git-pole" : 'error-pole'}
               value = {ulicaNumerDomu} onChange={(e) =>{
            ustawUliceNumerDomu(e.target.value);
        }}/><br/>
        <span id="error-ulicaNumerDomu" className="error-wiadomosc">{bledy.ulicaNumerDomu}</span><br/>

        <label htmlFor='kodPocztowy'>{jezyk.kodPocztowy}</label><br/>
        <input type="text" id='kodPocztowy' name='kodPocztowy' className={bledy.kodPocztowy === '' ? "git-pole" : 'error-pole'}
           value = {kodPocztowy} onChange={(e) =>{
        ustawKodPocztowy(e.target.value);
        }}/><br/>
        <span id="error-kodPocztowy" className="error-wiadomosc">{bledy.ulicaNumerDomu}</span><br/>

        <label htmlFor='miasto'>{jezyk.miasto}</label><br/>
        <input type="text" id='miasto' name="miasto" className={bledy.miasto === '' ? "git-pole" : 'error-pole'}
               value = {miasto} onChange={(e) =>{
            ustawMiasto(e.target.value);
        }}/><br/>
        <span id="error-miasto" className="error-wiadomosc">{bledy.miasto}</span><br/>

        <label htmlFor='email'>{jezyk.email}</label><br/>
        <input type="email" id='email' name='email' className={bledy.email === '' ? "git-pole" : 'error-pole'}
               value = {email} onChange={(e) =>{
            ustawEmail(e.target.value);
        }}/><br/>
        <span id="error-email" className="error-wiadomosc">{bledy.email}</span><br/>

        <label htmlFor="telefon">{jezyk.telefon}</label><br/>
        <input type="tel" id='telefon' name='telefon' className={bledy.telefon === '' ? "git-pole" : 'error-pole'}
               value = {telefon} onChange={(e) =>{
            ustawTelefon(e.target.value);
        }}/><br/>
        <span id="error-telefon" className="error-wiadomosc">{bledy.telefon}</span><br/>

        <br/>

        <label htmlFor="login">{jezyk.login}</label><br/>
        <input type="text" id="login" name="login" className={bledy.login === '' ? "git-pole" : 'error-pole'}
               value = {login} onChange={(e) =>{
            ustawLogin(e.target.value);
        }}/><br/>
        <span id="error-login" className="error-wiadomosc">{bledy.login}</span><br/>

        <label htmlFor="haslo">{jezyk.haslo}</label><br/>
        <input type="password" id="haslo" name="haslo" className={bledy.haslo === '' ? "git-pole" : 'error-pole'}
               value = {haslo} onChange={(e) =>{
            ustawHaslo(e.target.value);
        }}/><br/>
        <span id="error-haslo" className="error-wiadomosc">{bledy.haslo}</span><br/>

        <br/>

        <input type="button" value={jezyk.wyslij} onClick={przyWyslaniu} disabled={czyZablokowanyPrzyciskWyslij}/><br/>
        <span id="error-podsumowanie" className="error-wiadomosc">{bledy.podsumowanie}</span>
    </form>
    )
}

export default FormularzUzytkownika;