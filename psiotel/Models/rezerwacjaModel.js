const baza = require('../db');

class Rezerwacja {
    // nie jest mi chyba do niczego potrzebne, ale dzięki temu webstorm podpowiada
    constructor(id, idPsa, dataRozpoczecia, dataZakonczenia, pakiet) {
        this.id = id;
        this.idPsa = idPsa;
        this.dataRozpoczecia = dataRozpoczecia;
        this.dataZakonczenia = dataZakonczenia;
        this.pakiet = pakiet;
    }

    static async podajWszystkieRezerwacje(){
        const sql = "SELECT rezerwacja.id, idPsa, imie, dataRozpoczecia, dataZakonczenia, pakiet FROM Rezerwacja " +
            "INNER JOIN Pies ON rezerwacja.idPsa = Pies.id;"
        const [result] = await baza.query(sql);
        return this.przerobNaListe(result);
    }

    static async podajWszystkieRezerwacjeUzytkownika(idUzytkownika){
        const sql = "SELECT rezerwacja.id, idPsa, imie, dataRozpoczecia, dataZakonczenia, pakiet FROM Rezerwacja " +
            "INNER JOIN Pies ON rezerwacja.idPsa = Pies.id WHERE idPsa IN (SELECT id FROM Pies WHERE idWlasciciela = " + idUzytkownika + ");"
        const [result] = await baza.query(sql);
        return this.przerobNaListe(result);
    }

    static async podajAktywneRezerwacjeUzytkownika(idUzytkownika){
        const sql = "SELECT rezerwacja.id, idPsa, imie, dataRozpoczecia, dataZakonczenia, pakiet FROM Rezerwacja " +
            "INNER JOIN Pies ON rezerwacja.idPsa = Pies.id " +
            "WHERE idPsa IN " +
            "(SELECT id FROM Pies WHERE idWlasciciela = " + idUzytkownika + ") AND dataZakonczenia >= CURDATE();"
        const [result] = await baza.query(sql);
        return this.przerobNaListe(result);
    }

    static async podajAktywneRezerwacje(){
        const sql = "SELECT rezerwacja.id, idPsa, imie, dataRozpoczecia, dataZakonczenia, pakiet FROM Rezerwacja " +
            "INNER JOIN Pies ON rezerwacja.idPsa = Pies.id " +
            "WHERE dataZakonczenia >= CURDATE();"
        const [result] = await baza.query(sql);
        return this.przerobNaListe(result);
    }

    static async podajAktywneRezerwacjePsa(idPsa){
        const sql = "SELECT rezerwacja.id, imie, dataRozpoczecia, dataZakonczenia, pakiet FROM Rezerwacja " +
            "INNER JOIN Pies ON rezerwacja.idPsa = Pies.id " +
            "WHERE idPsa = " + idPsa + ";"
        const [result] = await baza.query(sql);
        return this.przerobNaListe(result);
    }

    static async podajJednaRezerwacje(id){
        const sql = "SELECT rezerwacja.id, imie, dataRozpoczecia, dataZakonczenia, pakiet FROM Rezerwacja " +
            "INNER JOIN Pies ON rezerwacja.idPsa = Pies.id " +
            "WHERE id = " + id + ";";
        const [result] = await baza.query(sql);
        return result;
    }

    static async dodajLubZmienRezerwacje(id, idPsa, dataRozpoczecia, dataZakonczenia, pakiet){
        // jak to nowe, generujemy następny indeks
        if (id === undefined || id === '') id = await this.nastepnyIndeks();

        const sql = "INSERT INTO Rezerwacja" +
            "(id, idPsa, dataRozpoczecia, dataZakonczenia, pakiet) " +
            "VALUES" +
            "(" + id + ", '" + idPsa + "', '" + dataRozpoczecia + "', '" + dataZakonczenia + "', '" + pakiet + "') " +
            "ON DUPLICATE KEY UPDATE idPsa = " + idPsa + ", dataRozpoczecia = '" + dataRozpoczecia + "', dataZakonczenia = '" + dataZakonczenia + "', pakiet = '" + pakiet + "';"
        const [result] = await baza.query(sql);
        return result;
    }

    static async usunRezerwacje(id){
        const sql = "DELETE FROM Rezerwacja WHERE id = " + id + ";";
        const [result] = await baza.query(sql);
        return result;
    }

    static async usunWszystkieRezerwacjePsa(idPsa){
        const sql = "DELETE FROM Rezerwacja WHERE idPsa = " + idPsa + ";";
        const [result] = await baza.query(sql);
        return result;
    }
    static async usunWszystkieRezerwacjeUzytkownika(idUzytkownika){
        const sql = "DELETE rezerwacja FROM Rezerwacja " +
            "INNER JOIN Pies ON rezerwacja.idPsa = Pies.id " +
            "WHERE idWlasciciela = " + idUzytkownika + ";";
        const [result] = await baza.query(sql);
        return result;
    }

    /**
     * przerabiamy dane od bazy danych na listę, na której będziemy potem operować
     * @param wiersze dane od bazy danych
     * @returns {*[]} przygotowana lista
     */
    static przerobNaListe(wiersze){
        let tempLista = [];
        for(let rezerwacja of wiersze){
            let tempMiniLista = [];
            tempMiniLista.push(rezerwacja.id);
            tempMiniLista.push(rezerwacja.imie);
            tempMiniLista.push(rezerwacja.dataRozpoczecia.toLocaleDateString("sv"));
            tempMiniLista.push(rezerwacja.dataZakonczenia.toLocaleDateString("sv"));
            tempMiniLista.push(rezerwacja.pakiet);
            tempMiniLista.push(rezerwacja.idPsa)
            tempLista.push(tempMiniLista);
        }
        return tempLista;
    }

    /**
     * podaje następny indeks z bazy danych
     * @returns {Promise<*>} indeks o 1 większy od najwyższego
     */
    static async nastepnyIndeks(){
        const sql = "SELECT Max(id)+1 as id FROM Rezerwacja";
        const [result] = await baza.query(sql);
        return result[0].id;
    }
}

module.exports = Rezerwacja;