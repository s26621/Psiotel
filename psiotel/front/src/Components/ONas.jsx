import '../App.css';
import Naglowek from './Naglowek'
import Stopka from './Stopka'
import config from "../config";
import {useEffect, useState} from "react";

function ONas({jezyk, ustawJezyk}) {

    useEffect(() => {
        ustawJezyk(config.jezyk);
    }, [jezyk]);

    // czyścimy użytkownika przy wejściu na stronę główną symulując wylogowanie
    useEffect(() => {
        config.uzytkownik.id = '';
        config.uzytkownik.login = '';
        config.uzytkownik.token ='';
    }, []);
    
    return (<>
            <Naglowek jezyk={jezyk} ustawJezyk={ustawJezyk}></Naglowek>
            <div id="glowna">
                <h1>{jezyk.oNaszymHotelu}</h1>
                <p>{jezyk.oNaszymHoteluOpis}</p>
                <img
                    src="https://www.franchisewire.com/wp-content/uploads/2022/09/K-9-Resorts-Luxury-Pet-Hotel-1536x1022.jpeg"
                    alt='recepcja' id= "recepcja-img"/>
                <h2>{jezyk.opinie}</h2>
                <p>{jezyk.otoOpinie}</p>
                <div id="opinia">
                    <p>"Hau hau hau! Hau, hauhauhau hau. Hau hau hauuuuuuuuu!" - Bodzio, {jezyk.opiniaGosc1}</p>
                    <p>Wuff! Wuff wuff wuuuuf. - Nudeln, {jezyk.opiniaGosc2}</p>
                    <p>Ouah ouah, ouah oooouah ouuuuuah. Ouah ouah ouah! - Baguette, {jezyk.opiniaGosc3}</p>
                    <p>Waaaan wan! Wan wan! - Inu, {jezyk.opiniaGosc4}</p>
                </div>
            </div>
            <Stopka jezyk={jezyk} ustawJezyk={ustawJezyk}></Stopka>
        </>
    )
}

export default ONas;