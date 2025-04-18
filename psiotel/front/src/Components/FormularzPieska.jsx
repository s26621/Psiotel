import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import config from "../config";
import "../App.css"

/**
 * formularz używany do rejestracji lub zmieniania danych psiaka
 * @param uzytkownik psiak, którego dane zmieniamy. Jeśli dodajemy nowego, jest pusty.
 * @returns {JSX.Element} nasz formularz
 * @constructor
 */
function FormularzPieska({piesek, jezyk}){


    const [bledy, ustawBledy] = useState({
        imie: '', plec: '', dataUrodzenia: '', rasa: '', waga: '', podsumowanie: ''
    });

    // jak chciałam brać w wysyłaniu z pieska to mi mówiło że mogło nie być zainicjalizowane
    const [id, ustawId] = useState(piesek[0])
    const [imie, ustawImie] = useState(piesek[1]);
    const [dataUrodzenia, ustawDateUrodzenia] = useState(piesek[2]);
    const [plec, ustawPlec] = useState(piesek[3] === '' ? 'samiec' : piesek[3]);
    const [rasa, ustawRase] = useState(piesek[4]);
    const [waga, ustawWage] = useState(piesek[5]);

    const [czyZablokowanyPrzyciskWyslij, ustawZablokowaniePrzyciskuWyslij] = useState(true);

    const navigate = useNavigate();


    const przyZmianiePlci = (e) =>{
        ustawPlec(e.target.value);
    }


    // blokujemy wysyłanie jeśli jest to samo, co było lub puste
    useEffect(()=>{
        ustawZablokowaniePrzyciskuWyslij(
            (imie === piesek[1] &&
            // jeżeli to nie jest nowy pies i ma taką samą płeć jak wcześniej
            (plec === piesek[3] && piesek.id !== '') &&
            dataUrodzenia === piesek[2] &&
            rasa === piesek[4] &&
            waga === piesek[5])||
            // lub cokolwiek jest puste
            imie === '' || dataUrodzenia === '' || rasa === '' || waga === ''
        );
    },[
        piesek[1], piesek[2], piesek[3], piesek[4], piesek[5],
        imie, plec, dataUrodzenia, rasa, waga
    ]);


    /**
     * To, co robimy przy wysyłaniu formularza. Czyli wysyłamy POST do bazy z danymi pieska.
     */
    const przyWyslaniu = async () =>{

        // przygotowujemy body
        const piesek = {id: id, idWlasciciela: config.uzytkownik.id, imie: imie, plec: plec, dataUrodzenia: dataUrodzenia, rasa: rasa, waga: waga}

        // twożymy opcje
        const opcje = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(piesek)
        };

        // wysyłamy posta
        const resPost = await fetch('http://localhost:8080/postPieska', opcje).then(res => res.json());

        ustawBledy(resPost.bledy);

        // sprawdzamy czy się udało
        if(resPost.czyPoprawny === true){
            navigate('/pieskiUzytkownika');
        }

    }

    return (<form id="form" name="rejestracja-psiaka">

        <label htmlFor="imie">{jezyk.imie}</label><br/>
        <input type="text" id="imie" name="imie " value={imie} onChange={(e) =>{
            ustawImie(e.target.value);
        }}/><br/>
        <span id="error-imie" className="error-wiadomosc">{bledy.imie}</span><br/>

        {jezyk.plec} <br/>
        <label htmlFor="plec-samiec">{jezyk.samiec}</label>
        <input type="radio" id="plec-samiec" name="plec" value="samiec" defaultChecked={plec === 'samiec'} onClick={przyZmianiePlci}/>
        <label htmlFor="plec-samica">{jezyk.samica}</label>
        <input type="radio" id="plec-samica" name="plec" value="samica" onClick={przyZmianiePlci} defaultChecked={plec === 'samica'}/><br/>

        <label htmlFor="dataUrodzenia">{jezyk.dataUrodzeniaFormularzPieska}</label><br/>
        <input type="date" id="dataUrodzenia" name="dataUrodzenia" value={dataUrodzenia} onChange={(e) =>{
            ustawDateUrodzenia(e.target.value);
        }}/><br/>
        <span id="error-dataUrodzenia" className="error-wiadomosc">{bledy.dataUrodzenia}</span><br/>

        <label htmlFor="rasa">{jezyk.rasa}</label><br/>
        <input type="text" id="rasa" name="rasa" value={rasa} onChange={(e) =>{
            ustawRase(e.target.value);
        }}/><br/>
        <span id="error-rasa" className="error-wiadomosc">{bledy.rasa}</span><br/>

        <label htmlFor="waga">{jezyk.waga}</label><br/>
        <input type="number" id="waga" name="waga" value={waga} onChange={(e) =>{
            ustawWage(e.target.value);
        }}/><br/>
        <span id="error-waga" className="error-wiadomosc">{bledy.waga}</span><br/>

        <br/>
        <input type="button" value={jezyk.wyslij} onClick={przyWyslaniu} disabled={czyZablokowanyPrzyciskWyslij}/><br/>
        <span id="error-podsumowanie" className="error-wiadomosc">{bledy.podsumowanie}</span><br/>
    </form>)
}

export default FormularzPieska;