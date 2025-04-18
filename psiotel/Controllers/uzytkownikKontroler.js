const weryfikacja = require("../public/javascripts/weryfikacja");
const model = require("../Models/uzytkownikModel");
const modelPieska = require("../Models/piesekModel");
const modelRezerwacji = require("../Models/rezerwacjaModel");

exports.getUzytkownikow = async (req, res) => {
    res.json(await model.podajUzytkownikow());
}

exports.postUzytkownika = async (req, res) => {

    const dane = zrobTabliceDoWeryfikacji(req.body);

    let bledy = weryfikacja.sprawdzanko(dane, "forma-rejestracja");

    let tempRes = {czyPoprawny: bledy.czyPoprawny, bledy: bledy, id: ''};


    if(tempRes.czyPoprawny){
        // jak przeszło przez weryfikację, to wysyłamy
        tempRes.id = await model.dodajUzytkownika(req.body.id, req.body.imie, req.body.nazwisko, req.body.dataUrodzenia, req.body.ulicaNumerDomu,
            req.body.kodPocztowy, req.body.miasto, req.body.email, req.body.telefon, req.body.login, req.body.haslo);
    }

    res.json(tempRes);
}

exports.sprawdzDaneLogowania = async (req, res) => {

    // tutaj są dwie wartości, więc może być tutaj

    let bledy = {podsumowanie: '', login: '', haslo: ''}


    let login = req.body.login;
    let haslo = req.body.haslo;
    let resId;

    if (login === '') {
        bledy.login = "To pole nie może być puste";
        bledy.podsumowanie = "Proszę wypełnić puste pola";
    }
    if (haslo === '') {
        bledy.haslo = "To pole nie może być puste";
        bledy.podsumowanie = "Proszę wypełnić puste pola";
    }

    // jeżeli formularz jest wypełniony poprawnie
    if(bledy.podsumowanie === '') {
        resId = await model.sprawdzDaneZwrocId(login, haslo);
        // jeżeli nie znalzał pasującego id, to dane są niepoprawne
        if (resId.length === 0) {
            bledy.podsumowanie = "Nieprawidłowe dane";
        }
    }

    res.json({bledy: bledy, id: resId[0]})
}

exports.getUzytkownika = async (req, res) => {
    let uzytkownik = await model.podajUzytkownika(req.params.id)
    uzytkownik = uzytkownik[0];
    uzytkownik.dataUrodzenia = uzytkownik.dataUrodzenia.toLocaleDateString("sv");
    res.json(uzytkownik);
}

exports.deleteUzytkownika = async (req, res) => {
    // usuwamy wszystkie jego rezerwacje
    await modelRezerwacji.usunWszystkieRezerwacjeUzytkownika(req.params.id)
    // usuwamy wszystkie jego pieski
    await modelPieska.usunWszystkiePieskiUzytkownika(req.params.id)
    // usuwamy użytkownika
    res.json(await model.usunUzytkownika(req.params.id));
}

/**
 * robi tablicę z danych z formatki aby pasowały do weryfikacji
 * @param syf dane z formatki
 * @returns {*[]} tablica dwuwymiarowa z mniejszymi tablicami zawierającymi parę nazwa i wartość
 */
function zrobTabliceDoWeryfikacji(syf){
    let tablica = [];
    tablica.push(["imie", syf.imie]);
    tablica.push(["nazwisko", syf.nazwisko]);
    tablica.push(["dataUrodzenia", syf.dataUrodzenia]);
    tablica.push(["ulicaNumerDomu", syf.ulicaNumerDomu]);
    tablica.push(["kodPocztowy",syf.kodPocztowy]);
    tablica.push(["miasto", syf.miasto]);
    tablica.push(["email", syf.email]);
    tablica.push(["telefon", syf.telefon]);
    tablica.push(["login", syf.login]);
    tablica.push(["haslo", syf.haslo]);
    return tablica;
}