const weryfikacja = require("../public/javascripts/weryfikacja");
const model = require("../Models/rezerwacjaModel");



// get
exports.getWszystkieRezerwacje = async (req, res) => {
    res.json(await model.podajWszystkieRezerwacje());
}

// jeżeli to admin, podajemy wszystkie
exports.getWszystkieRezerwacjeUzytkownika = async (req, res) =>{
    let id = req.params.id;
    if(id === "0" || id === 0)
        res.json(await model.podajWszystkieRezerwacje());
    else res.json(await model.podajWszystkieRezerwacjeUzytkownika(id));
}

exports.getAktywneRezerwacjeUzytkownika = async (req, res) => {
    let id = req.params.id;
    if(id === "0" || id === 0)
        res.json(await model.podajAktywneRezerwacje());
    else res.json(await model.podajAktywneRezerwacjeUzytkownika(id));
}

exports.getAktywneRezerwacjePsa = async (req, res) => {
    res.json(await model.podajAktywneRezerwacjePsa(req.params.id));
}

exports.getJednaRezerwacje = async (req, res) => {
    res.json(await model.podajJednaRezerwacje(req.params.id));
}



// post
exports.postRezerwacje = async (req, res) => {

    const dane = zrobTabliceDoWeryfikacji(req.body);

    let bledy = weryfikacja.sprawdzanko(dane, "rejestracja-rezerwacji");

    // jeżeli przeszło przez pierwszą weryfikację
    if (bledy.czyPoprawny === true){
        // weryfikujemy jeszcze, czy daty nie kolidują z inną rezerwacją
        if(await czyKolidujeZInnaRezerwacja(req.body.id, req.body.idPsa, req.body.dataRozpoczecia, req.body.dataZakonczenia)){
            bledy.podsumowanie = 'Rezerwacja koliduje z inną aktywną rezerwacją'
            bledy.czyPoprawny = false;
        }else{
            // jak przeszło przez całą weryfikację, to wysyłamy
            await model.dodajLubZmienRezerwacje(req.body.id, req.body.idPsa,
                req.body.dataRozpoczecia, req.body.dataZakonczenia, req.body.pakiet);
        }
    }

    let tempRes = {czyPoprawny: bledy.czyPoprawny, bledy: bledy};
    res.json(tempRes);
}



//delete
exports.deleteRezerwacje = async (req, res) => {
    res.json(await model.usunRezerwacje(req.params.id));
}

exports.deleteWszystkieRezerwacjePsa = async (req, res) => {
    res.json(await model.usunWszystkieRezerwacjePsa(req.params.id));
}



/**
 * przechodzimy przez wszystkie aktywne rezerwacje i sprawdzamy, czy nowa rezerwacja koliduje z którąś
 * @param idDodawanej id aktualnie dodawanej rezerwacji
 * @param idPsa id psa którego dotyczą rezerwacje
 * @param dataRozpoczecia data rozpoczęcia nowej rezerwacji
 * @param dataZakonczenia data zakończenia nowej rezerwacji
 * @returns {Promise<boolean>} "true" jeśli koliduje, "false" jeśli nie
 */
async function czyKolidujeZInnaRezerwacja(idDodawanej, idPsa, dataRozpoczecia, dataZakonczenia){
    dataRozpoczecia = zrobDate(dataRozpoczecia);
    dataZakonczenia = zrobDate(dataZakonczenia)
    let rezerwacje = await model.podajAktywneRezerwacjePsa(idPsa);
    let czyKoliduje = false;
    for (let i = 0; i < rezerwacje.length; i++){
        let rezerwacja = rezerwacje[i];
        // nie sprawdzamy obecnej rezerwacji przy edycji
        if(idDodawanej === rezerwacja[0]) continue;
        let dataRozpoczeciaInnej = zrobDate(rezerwacja[2]);
        let dataZakonczeniaInnej = zrobDate(rezerwacja[3]);
        czyKoliduje =
            (dataRozpoczecia >= dataRozpoczeciaInnej && dataRozpoczecia <= dataZakonczeniaInnej) || // zaczyna się w trakcie którejś
            (dataZakonczenia >= dataRozpoczeciaInnej && dataZakonczenia <= dataZakonczeniaInnej) || // kończy się w trakcie którejś
            (dataRozpoczecia <= dataRozpoczeciaInnej && dataZakonczenia >= dataZakonczeniaInnej) // zawiera w sobie inną rezerwację (zaczyna przed i kończy po)
        if (czyKoliduje) break;
    }
    return czyKoliduje;
}

/**
 * robi tablicę z danych z formatki aby pasowały do weryfikacji
 * @param syf dane z formatki
 * @returns {*[]} tablica dwuwymiarowa z mniejszymi tablicami zawierającymi parę nazwa i wartość
 */
function zrobTabliceDoWeryfikacji(syf){
    let tablica = [];
    tablica.push(['dataRozpoczecia', syf.dataRozpoczecia]);
    tablica.push(['dataZakonczenia', syf.dataZakonczenia]);
    return tablica;
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