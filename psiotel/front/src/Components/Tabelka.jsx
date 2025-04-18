import "../App.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";


function Tabelka({lista, jezyk, ustawWartosc, typ}){

    const [aktualnaStrona, ustawAktualnaStrone] = useState(0);
    const navigate = useNavigate();

    const przyKliknieciuEdytuj = (e) => {
        ustawWartosc(lista[aktualnaStrona][e.target.id]);
        if(typ === 'aktualne-rezerwacje') navigate('/edytujRezerwacje');
        if(typ === 'pieski') navigate('/edytujPieska');
    }



    // jak jest pusta lista to jest pusta tabelka
    if (lista.length === 0) {
        return (<>
            <p style={{fontFamily: "Comic Sans MS"}}>
                {jezyk.pustaTabelka}
            </p>
        </>);
    }

    let przyciski = <>
        {/* strona 1 z 5 itp */}
        <p>{jezyk.ktoraStrona1}{aktualnaStrona + 1}{jezyk.ktoraStrona2}{lista.length}</p>

        {/* przycisk poprzedniej strony */}
        <button disabled={aktualnaStrona === 0}
                onClick={ () => { ustawAktualnaStrone(aktualnaStrona - 1) } }
        >{jezyk.poprzedniaStrona}</button>

        {/* przycisk następnej strony */}
        <button disabled={aktualnaStrona === lista.length - 1}
                onClick={ () => { ustawAktualnaStrone(aktualnaStrona + 1) } }
        >{jezyk.nastepnaStrona}</button>
    </>

    if (typ === 'aktualne-rezerwacje') {
        return (<>
            <table>
                <tbody>
                <tr>
                    <th>{jezyk.imiePsa}</th>
                    <th>{jezyk.dataRozpoczecia}</th>
                    <th>{jezyk.dataZakonczenia}</th>
                    <th>{jezyk.pakiet}</th>
                </tr>
                {lista[aktualnaStrona].map((wartosc, indeks) => (
                    <tr>
                        <td>{wartosc[1]}</td>
                        <td>{wartosc[2]}</td>
                        <td>{wartosc[3]}</td>
                        <td>{wartosc[4]}</td>
                        <td>
                            <button id = {indeks} disabled={zrobDate(wartosc[2]) < Date.now()} onClick={przyKliknieciuEdytuj}>{jezyk.edytuj}</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {przyciski}
        </>)
    }

    if(typ === 'pieski'){
        return (<>
            <table>
                <tbody>
                <tr>
                    <th>{jezyk.imie}</th>
                    <th>{jezyk.dataUrodzenia}</th>
                    <th>{jezyk.plec}</th>
                    <th>{jezyk.rasa}</th>
                    <th>{jezyk.waga}</th>
                    <th></th>
                </tr>
                {lista[aktualnaStrona].map((wartosc, indeks) => (
                    <tr>
                        <td>{wartosc[1]}</td>
                        <td>{wartosc[2]}</td>
                        <td>{wartosc[3]}</td>
                        <td>{wartosc[4]}</td>
                        <td>{wartosc[5]}</td>
                        <td>
                            <button id={indeks} onClick={przyKliknieciuEdytuj}>{jezyk.edytuj}</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {przyciski}
        </>)
    }

    // jeśli to wszystkie rezerwacje
    return (<>
        <table>
            <tbody>
            <tr>
                <th>{jezyk.imiePsa}</th>
                <th>{jezyk.dataRozpoczecia}</th>
                <th>{jezyk.dataZakonczenia}</th>
                <th>{jezyk.pakiet}</th>
            </tr>
            {lista[aktualnaStrona].map((wartosc) => (
                <tr>
                    <td>{wartosc[1]}</td>
                    <td>{wartosc[2]}</td>
                    <td>{wartosc[3]}</td>
                    <td>{wartosc[4]}</td>
                </tr>
            ))}
            </tbody>
        </table>
        {przyciski}
    </>)
}

/**
 * robi datę ze stringa
 * @param data string z datą
 * @returns {Date} data w potrzebnym typie
 */
function zrobDate(data){
    let dzien   = parseInt(data.substring(8,12));
    let miesiac  = parseInt(data.substring(5,8));
    let rok   = parseInt(data.substring(0,4));
    return new Date(rok, miesiac - 1, dzien);
}


export default Tabelka;