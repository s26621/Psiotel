import '../App.css';
import Naglowek from './Naglowek'
import Stopka from './Stopka'
import config from "../config";
import {useEffect, useState} from "react";

/**
 * Strona główna psiotelu
 * @returns {JSX.Element}
 * @constructor
 */
function StronaGlowna({jezyk, ustawJezyk}) {

    // czyścimy użytkownika przy wejściu na stronę główną symulując wylogowanie
    useEffect(() => {
        config.uzytkownik.id = '';
        config.uzytkownik.login = '';
        config.uzytkownik.token ='';
    }, []);


    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, [jezyk]);

    return (<>
            <Naglowek jezyk = {jezyk} ustawJezyk = {ustawJezyk}></Naglowek>
        <div id="glowna">
            <h1>{jezyk.witamyWPsiotelu}</h1>
            <img
                src="https://www.veryimportantpaws.com/wp-content/uploads/2023/11/Innovative-Tech-Features-in-Modern-Dog-Hotels.webp"
                alt="zdjęcie piesków w hotelu"/>
            <p>{jezyk.witamyWPsioteluOpis}</p>
            <h2>{jezyk.oferowanePrzezNasUslugi}:</h2>
            <ul id='uslugi'>
                <li>{jezyk.usluga1}</li>
                <li>{jezyk.usluga2}</li>
                <li>{jezyk.usluga3}</li>
                <li>{jezyk.usluga4}</li>
                <li>{jezyk.usluga5}</li>
                <li>{jezyk.usluga6}</li>
                <li>{jezyk.usluga7}</li>
            </ul>
            <h2>{jezyk.naszePakiety}</h2>
            <p>{jezyk.naszePakietyOpis}</p>
            <table>
                <tbody>
                <tr>
                    <th>{jezyk.tabelkaUsluga}</th>
                    <th>{jezyk.tabelkaPakietZwykly}</th>
                    <th>{jezyk.tabelkaPakietVIP}</th>
                </tr>
                <tr>
                    <td className="tabela-oferta">{jezyk.tabelkaOpieka}</td>
                    <td className="tabela-srodek">{jezyk.takCaps}</td>
                    <td>{jezyk.nieCaps}</td>
                </tr>
                <tr>
                    <td className="tabela-oferta">{jezyk.tabelkaKojce}</td>
                    <td className="tabela-srodek">{jezyk.tabelkaKojceOpis1}</td>
                    <td>{jezyk.tabelkaKojceOpis2}</td>
                </tr>
                <tr>
                    <td className="tabela-oferta">{jezyk.placZabaw}</td>
                    <td className="tabela-srodek">{jezyk.placZabawOpis1}</td>
                    <td>{jezyk.placZabawOpis2}</td>
                </tr>
                <tr>
                    <td className="tabela-oferta">{jezyk.tabelkaObroze}</td>
                    <td className="tabela-srodek">{jezyk.takCaps}</td>
                    <td>{jezyk.takCaps}</td>
                </tr>
                <tr>
                    <td className="tabela-oferta">{jezyk.tabelkaZabawki}</td>
                    <td className="tabela-srodek">{jezyk.nieCaps}</td>
                    <td>{jezyk.takCaps}</td>
                </tr>
                <tr>
                    <td className="tabela-oferta">{jezyk.tabelkaJakoscKarmy}</td>
                    <td className="tabela-srodek">{jezyk.tabelkaJakoscKarmyWysoka}</td>
                    <td>{jezyk.tabelkaJakoscKarmyNajwyzsza}</td>
                </tr>
                <tr>
                    <td className="tabela-oferta">{jezyk.tabelkaPsieSpa}</td>
                    <td className="tabela-srodek">{jezyk.nieCaps}</td>
                    <td>{jezyk.takCaps}</td>
                </tr>
                </tbody>
            </table>
        </div>
            <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
        </>
    )
}

export default StronaGlowna;