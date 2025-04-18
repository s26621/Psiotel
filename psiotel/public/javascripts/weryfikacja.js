/**
 * Przechodzimy przez cały formularz i spawdzamy! Jak coś się nie zgadza, pokazujemy mu błąd i blokujemy wysłanie
 * @param dane dane z formularza
 * @param nazwaFormularza czy to rejestracja użytkownika, psiaka czy rezerwacji
 * @returns {{}} błędy wraz z dodatkową informacją "czyPoprawne", aby nie sprawdzać wszystkiego po kolei
 */
export function sprawdzanko(dane, nazwaFormularza){
    let czyPoprawny = true;
    let bledyPodsumowanie = "";
    let czySaPustePola = false;
    let bledy = {}
    for (const pole of dane) {
        let nazwa = pole[0]
        let wartosc = pole[1];
        if(nazwa !== 'waga') wartosc.trim();

        //zprawdzamy, czy to puste lub same spacje
        if(wartosc === '' || wartosc == null || sprawdzCzySpacje(wartosc)){
            bledy[nazwa] = "To pole nie może byc puste";
            czySaPustePola = true;
            czyPoprawny = false;
            // jak pole jest puste, to nie ma sensu sprawdzać dalej
            continue;
        }else {
            bledy[nazwa] = "";
        }

        // sprawdzamy email
        if (nazwa === "email"){
            if (sprawdzEmail(wartosc)){
                bledy[nazwa] = "";
            }
            else {
                bledy[nazwa] = "Proszę wprowadzić poprawny email";
                bledyPodsumowanie+= ", prawidłowy email"
                czyPoprawny = false;
            }
        }
        // sprawdzamy login
        if (nazwa === "login" && nazwaFormularza === "forma-rejestracja"){
            if(wartosc.length > 2 && wartosc.length < 30){
                bledy[nazwa] = "";
            }
            else {
                bledy[nazwa] = "Login musi mieć od 2 do 30 znaków";
                bledyPodsumowanie+= ", prawidłowy login"
                czyPoprawny = false;
            }
        }
        // sprawdzamy haslo
        if(nazwa === "haslo" && nazwaFormularza === "forma-rejestracja"){
            if(sprawdzHaslo(wartosc)){
                bledy[nazwa] = "";
            }
            else {
                bledy[nazwa] = "Nieprawidłowe hasło";
                bledyPodsumowanie+= ", prawidłowe hasło"
                czyPoprawny = false;
            }
        }
        // sprawdzamy datę rozpoczecia
        if(nazwa === "dataRozpoczecia"){
            let dataRozpoczecia = zrobDate(wartosc)
            // dane [1] to para nazwa wartość dla daty zakończenia, bierzemy z tego wartość
            let dataZakonczenia = zrobDate(dane[1][1]);
            let dzisiaj = new Date();
            let maksymalnaDataRozpoczecia = new Date(dzisiaj.getFullYear() + 3, dzisiaj.getMonth(), dzisiaj.getDate());

            // data rozpoczęcia musi być przed datą zakończenia
            if(dataRozpoczecia < dataZakonczenia){
                bledy[nazwa] = "";
            }else{
                bledy[nazwa] = "Data rozpoczęcia musi być przed datą zakończnia";
                bledyPodsumowanie+= ", prawidłową datę rozpoczęcia"
                czyPoprawny = false;
                continue;
            }
            // rezerwacja od dzisiaj, nie w przeszłości
            if(dataRozpoczecia > dzisiaj){
                bledy[nazwa] = "";
            }
            else {
                bledy[nazwa] = "Nie można robić rezeracji w przeszłości";
                bledyPodsumowanie+= ", prawidłową datę rozpoczęcia"
                czyPoprawny = false;
                continue;
            }
            // robimy rezerwacje na maks 3 lata wprzód
            if (dataRozpoczecia < maksymalnaDataRozpoczecia){
                bledy[nazwa] = "";
            }else {
                bledy[nazwa] = "Robimy rezerwacje na maks 3 lata wprzód"
                bledyPodsumowanie+= ", prawidłową datę rozpoczęcia"
                czyPoprawny = false;
            }
        }
        // sprawdzamy datę zakończenia
        if (nazwa === "dataZakonczenia"){
            let dataZakonczenia = zrobDate(wartosc);
            // dane [0] to para nazwa i wartość daty rozpoczęcia, bierzemy 1 czyli wartość
            let dataRozpoczecia = zrobDate(dane[0][1]);
            let maksymalnaDataZakonczenia = new Date(dataRozpoczecia.getFullYear(), dataRozpoczecia.getMonth()+3, dataRozpoczecia.getDate());

            // maksymalny czas rezerwacji to 3 miesiące
            if(dataZakonczenia < maksymalnaDataZakonczenia){
                bledy[nazwa] = "";
            }else {
                bledy[nazwa] = "Maksymalny czas rezerwacji to 3 miesiące"
                bledyPodsumowanie+= ", prawidłową datę zakończenia"
                czyPoprawny = false;
            }
        }
        // sprawdzamy date urodzenia użytkownika, aby nie wpuszczać dzieci, szczeniąt, wampirów i psów-wampirów
        if(nazwa === "dataUrodzenia"){
            let dataUrodzenia = zrobDate(wartosc);
            let dzisiaj = new Date();
            // graniczna data dla ludzi jest inna niż dla psa
            let granicznaDataDolna = nazwaFormularza ==="rejestracja-psiaka" ? new Date(1980,0,1) : new Date(1930, 0, 1);
            let granicznaDataGorna = nazwaFormularza ==="rejestracja-psiaka" ? new Date(dzisiaj.getFullYear()-1,dzisiaj.getMonth(),dzisiaj.getDay()) : new Date(dzisiaj.getFullYear()-18,dzisiaj.getMonth(),dzisiaj.getDay());

            if(dataUrodzenia < granicznaDataDolna){
                bledy[nazwa] = "Nieprawidłowa data";
                bledyPodsumowanie+= ", prawidłową datę urodzenia"
                czyPoprawny = false;
            }else if(dataUrodzenia > granicznaDataGorna){
                bledy[nazwa] = "Nie spełniono minimalnego wieku";
                bledyPodsumowanie+= ", prawidłową datę urodzenia"
                czyPoprawny = false;
            }else{
                bledy[nazwa] = "";
            }
        }
        // sprawdzamy numer telefonu
        if(nazwa === "telefon"){
            if(sprawdzNumerTelefonu(wartosc)){
                bledy[nazwa] = "";
            }else {
                bledy[nazwa] = "Nieprawidłowy numer telefonu";
                bledyPodsumowanie+= ", prawidłowy numer telefonu"
                czyPoprawny = false;
            }
        }
        if(nazwa === "kodPocztowy"){
            if(sprawdzKodPocztowy(wartosc)){
                bledy[nazwa] = "";
            }else{
                bledy[nazwa] = "Nieprawidłowy kod pocztowy"
                bledyPodsumowanie+= ", prawidłowy kot pocztowy"
            }
        }
        if(nazwa === "waga"){
            // same cyferki proszę
            if(czyToCyfraNieujemna(wartosc)){
                bledy[nazwa] = "";
            }else {
                bledy[nazwa] = "Proszę podać wagę za pomocą liczby dodatniej"
                bledyPodsumowanie+= ", prawidłową wagę"
                czyPoprawny = false;
                continue;
            }
            let maksWaga = 150;
            if(wartosc < maksWaga && wartosc > 0){
                bledy[nazwa] = "";
            }else{
                bledy[nazwa] = "Nieprawidłowa waga";
                bledyPodsumowanie+= ", prawidłową wagę"
                czyPoprawny = false;
            }
        }
    }
    // to !#@$ podsumowanie
    bledy.podsumowanie = ''
    if (czySaPustePola || bledyPodsumowanie !== ""){
        if (czySaPustePola){
            bledy.podsumowanie = "Proszę wypełnić puste pola"
            if (bledyPodsumowanie !== ""){
                bledy.podsumowanie += " oraz wprowadzić" + bledyPodsumowanie.slice(1,)
            }
        }else{
            bledy.podsumowanie = "Proszę wprowadzić" + bledyPodsumowanie.slice(1,)
        }
    }else {
        bledy.podsumowanie = ""
    }
    bledy.czyPoprawny = czyPoprawny;
    return bledy;
}


/**
 * Sprawdza, czy email jest poprawny
 * @param email email do sprawdzenia
 * @returns {boolean} true jeśli poprawny, false jeśli nie
 */
function sprawdzEmail(email){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // funkcja test sprawdza regex
    return re.test(email);
}

/**
 * spradza, czy hasło jest poprawne
 * @param haslo hasło do sprawdzenia
 * @returns {boolean} true jeśli poprawne, false w przeciwnym wypadku
 */
function sprawdzHaslo(haslo){
    // jeden mały znak, jeden duży znak, jedna cyfra, jeden znak specjalny, conajmniej 8 znaków
    let re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    return re.test(haslo);
}

function sprawdzNumerTelefonu(numer){
    // dziewięć cyfr albo po trzy rozdzielane myślnikiem lub spacją
    let re = new RegExp("^([0-9]{9})$|^[0-9]{3}-[0-9]{3}-[0-9]{3}|^[0-9]{3} [0-9]{3} [0-9]{3}$");
    return re.test(numer);
}

function sprawdzKodPocztowy(kod){
    // dwie cyfry, myślnik, trzy cyfry
    let re = new RegExp("^[0-9]{2}-[0-9]{3}$");
    return re.test(kod);
}

function sprawdzCzySpacje(tekst){
    let re = new RegExp("^[\\s]+$");
    return re.test(tekst);
}

function czyToCyfraNieujemna(waga){
    let re = new RegExp("^[0123456789.,]+$")
    return re.test(waga);
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

