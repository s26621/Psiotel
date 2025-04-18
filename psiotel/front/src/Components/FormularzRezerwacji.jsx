import {useEffect, useState} from "react";
import config from "../config";
import {useNavigate} from "react-router-dom";
import "../App.css"


/**
 * formularz używany do rejestracji i edycji danych użytkownika
 * @param rezerwacja rezerwacja do edycji, jest pusta jeśli to dodawanie nowej
 * @param jezyk język strony
 * @returns {JSX.Element}
 * @constructor
 */
function FormularzRezerwacji({rezerwacja, jezyk}){

    const [bledy, ustawBledy] = useState({dataRozpoczecia: '', dataZakonczenia: '', podsumowanie: ''});

    // to jest tylko do trzymania
    const [id, ustawId] = useState(rezerwacja[0]);
    const [idPsa, ustawIdPsa] = useState(rezerwacja[5]);
    const [dataRozpoczecia, ustawDateRozpoczecia] = useState(rezerwacja[2]);
    const [dataZakonczenia, ustawDateZakonczenia] = useState(rezerwacja[3]);
    const [pakiet, ustawPakiet] = useState(rezerwacja[4] === '' ? 'zwykly' : rezerwacja[4]);

    const [listaPieskow, ustawListePieskow] = useState([]);

    const [czyZablokowanyPrzyciskWyslij, ustawZablokowaniePrzyciskuWyslij] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {


        // przygotowujemy listę piesków
        const podajPieski = async () =>{
            // przygotowujemy opcje z id użytkownika
            const opcje = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // wysyłamy geta
            const resGet = await fetch('http://localhost:8080/getPieskiUzytkownika/'+config.uzytkownik.id, opcje).then(res => res.json());


            // wstawiamy pieski do listy
            for (let i = 0; i < resGet.length; i++) {
                let piesek = resGet[i];
                ustawListePieskow((poprzedniaLista) => [...poprzedniaLista, {id: piesek[0], imie: piesek[1]}]);
                // na początku ustawiamy id psa na pierwszego psa na liście, aby się zgadzało z selectem
                if(i === 0) ustawIdPsa(piesek[0]);
            }
        }
        ustawListePieskow([]);
        podajPieski().then()
    },[])



    // zdecydowałam się w tym formularzu spróbować zrobić większość bez dodatkowych zmiennych, ale jak przenoszę to nie widzi value
    const przyZmianiePakietu = (e) =>{
        ustawPakiet(e.target.value);
    }


    /**
     * To, co robimy przy wysyłaniu formularza. Czyli wysyłamy POST do bazy z danymi użytkownika.
     * @returns {Promise<void>}
     */
    const przyWyslaniu = async () =>{

        // przygotowujemy body
        const rezerwacja = {id: id, idPsa: idPsa, dataRozpoczecia: dataRozpoczecia, dataZakonczenia: dataZakonczenia, pakiet: pakiet}

        // twożymy opcje
        const opcje = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rezerwacja)
        };

        // wysyłamy posta i odbieramy odpowiedź
        const resPost = await fetch('http://localhost:8080/postRezerwacje', opcje).then(res => res.json());

        ustawBledy(resPost.bledy);

        // sprawdzamy czy się udało
        if(resPost.czyPoprawny === true){
            navigate('/rezerwacjeUzytkownika');
        }

    }

    useEffect(() => {
        ustawZablokowaniePrzyciskuWyslij(
            // jak zmieniało się z powrotem to nagle nie było równe
            (idPsa == rezerwacja[5] &&
            dataRozpoczecia === rezerwacja[2] &&
            dataZakonczenia === rezerwacja[3] &&
            // to nie jest nowa rezerwacja i ma ten sam pakiet co wcześniej
            (pakiet === rezerwacja[4] && rezerwacja.id !== ''))||
            // lub cokolwiek jest puste
        dataRozpoczecia === '' || dataZakonczenia === '')
    }, [
        rezerwacja[5], rezerwacja[2], rezerwacja[3], rezerwacja[4],
        idPsa, dataRozpoczecia, dataZakonczenia, pakiet
    ]);

    if(listaPieskow.length === 0){
        return (<h2>{jezyk.nieZnalezionoPieskow}</h2>)
    }

    return (<form id="form" name="rejestracja-psiaka">
        <label>
            {jezyk.wybierzPieska} <br></br>
        <select onChange={(e) => {
            ustawIdPsa(e.target.value)
        }}>
            {listaPieskow.map((piesek) => (
                // tutaj może być id i imię bo ustawiłam to przy wkładaniu do listy tej strony
                <option value={piesek.id}>{piesek.imie}</option>
            ))}
        </select><br></br>
        </label>

        <label htmlFor="dataRozpoczecia">{jezyk.dataRozpoczecia}</label><br/>
        <input type="date" id="dataRozpoczecia" name="dataRozpoczecia" value = {dataRozpoczecia} onChange={(e) =>ustawDateRozpoczecia(e.target.value)}
        /><br/>
        <span id="error-dataRozpoczecia" className="error-wiadomosc">{bledy.dataRozpoczecia}</span><br/>

        <label htmlFor="dataZakonczenia">{jezyk.dataZakonczenia}</label><br/>
        <input type="date" id="dataZakonczenia" name="dataZakonczenia" value = {dataZakonczenia} onChange={(e) =>ustawDateZakonczenia(e.target.value)}/><br/>
        <span id="error-dataZakonczenia" className="error-wiadomosc">{bledy.dataZakonczenia}</span><br/>

        {jezyk.pakiet} <br/>
        <label htmlFor="pakiet-zwykly">{jezyk.zwyklyPakiet}</label>
        <input type="radio" id="pakiet-zwykly" name="pakiet" value="zwykly" defaultChecked={pakiet === "zwykly"} onClick={przyZmianiePakietu}/>
        <label htmlFor="pakiet-vip">VIP</label>
        <input type="radio" id="pakiet-vip" name="pakiet" value="VIP" defaultChecked={pakiet === "VIP"} onClick={przyZmianiePakietu}/><br/>

        <br/>
        <input type="button" value={jezyk.wyslij} onClick={przyWyslaniu} disabled={czyZablokowanyPrzyciskWyslij}/><br/>
        <span id="error-podsumowanie" className="error-wiadomosc">{bledy.podsumowanie}</span>
    </form>)
}

export default FormularzRezerwacji;