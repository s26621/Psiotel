const weryfikacja = require("../public/javascripts/weryfikacja");
const model = require("../Models/piesekModel");
const modelRezerwacji = require("../Models/rezerwacjaModel");



exports.getPieski = async (req, res) => {
    res.json(await model.podajPieski());
}

// jeżeli to admin, podajemy wszystkie
exports.getPieskiUzytkownika = async (req, res) => {
    let id = req.params.id
    if (id === "0" || id === 0)
        res.json(await model.podajPieski());
    else res.json(await model.podajPieskiUzytkownika(id));
}

exports.postPieska = async (req, res) => {


    const dane = zrobTabliceDoWeryfikacji(req.body);


    let bledy = weryfikacja.sprawdzanko(dane, "rejestracja-psiaka");

    let tempRes = {czyPoprawny: bledy.czyPoprawny, bledy: bledy};


    if(tempRes.czyPoprawny){
        // jak przeszło przez weryfikację, to wysyłamy
        await model.dodajLubZmienPieska(req.body.id, req.body.idWlasciciela, req.body.imie, req.body.plec,
            req.body.dataUrodzenia, req.body.rasa, req.body.waga);
    }

    res.json(tempRes);
}

exports.getPieska = async (req, res) => {
    res.json(await model.podajPieska(req.params.id));
}

exports.getWlasnieDodanegoPieska = async (req, res) => {
    res.json(await model.podajNajnowszegoPieskaUzytkownika(req.params.id));
}

exports.deletePieska = async (req, res) => {
    let id = req.params.id;
    // najpierw usuwamy wszystkie rezerwacje psa
    await modelRezerwacji.usunWszystkieRezerwacjePsa(id);
    // potem usuwamy pieska
    res.json(await model.usunPieska(id));
}

/**
 * przygotowujemy dane dla funkcji weryfikacji
 * @param syf dane
 * @returns {*[]} tablica dwuwymiarowa z parami nazwa i wartość
 */
function zrobTabliceDoWeryfikacji(syf){
    let tablica = [];
    tablica.push(["imie", syf.imie]);
    tablica.push(["dataUrodzenia", syf.dataUrodzenia]);
    tablica.push(["rasa", syf.rasa]);
    tablica.push(["waga", syf.waga]);
    return tablica;
}