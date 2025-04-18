import '../App.css';
import config from "../config";
import {useEffect, useState} from "react";

function Stopka({jezyk, ustawJezyk}) {

    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, [jezyk]);

    return (
        <div id="stopka">
        <ul id='menu-na-stopce'>
            <li id="kontakt">
                <div>
                    <h2>{jezyk.kontakt}</h2>
                    <ul id='w-srodku-kontakt'>
                        <li>{jezyk.numerTelefonuKontakt}: 123 123 123</li>
                        <li>{jezyk.skrzynkaPocztowa}: psiotel-kontakt@gmail.com</li>
                        <li>{jezyk.adresKontaktowy}: Aleja Łapkowa 0, 00-000 Nienack</li>
                    </ul>
                </div>
            </li>

            <li id='partnerzy'>
                <div>
                    <h2>{jezyk.partnerzy}</h2>
                    <ul id="w-srodku-partnerzy">
                        <li><a href="https://psibufet.pl/">{jezyk.dostawcaKarmy}</a></li>
                        <li><a href="https://www.ikea.com/pl">{jezyk.dostawcaPoduszek}</a></li>
                        <li><a href="https://petcare.invoxia.com/">{jezyk.dostawcaObroz}</a></li>
                    </ul>
                </div>
            </li>
            <li>
                <div id="motto">{jezyk.cytat}</div>
            </li>
        </ul>
    </div>
    )
}

export default Stopka;