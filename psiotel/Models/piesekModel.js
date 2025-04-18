const baza = require('../db');

class Piesek{
    // nie jest mi chyba do niczego potrzebne, ale dzięki temu webstorm podpowiada
    constructor(id, idWlasciciela, imie, plec, dataUrodzenia, rasa, waga){
        this.id = id;
        this.idWlasciciela = idWlasciciela;
        this.imie = imie;
        this.plec = plec;
        this.dataUrodzenia = dataUrodzenia;
        this.rasa = rasa;
        this.waga = waga;
    }


    static async dodajLubZmienPieska(id, idWlasciciela, imie, plec, dataUrodzenia, rasa, waga){
        // jeżeli to nowy piesek to generujemy indeks
        if (id === undefined || id === '') id = await this.nastepnyIndeks();

        const sql = "INSERT INTO Pies" +
            "(id, idWlasciciela, imie, plec, dataUrodzenia, rasa, waga) " +
            "VALUES" +
            "(" + id + ", " + idWlasciciela + ", '" + imie + "', '" + plec + "', '" + dataUrodzenia + "', '" + rasa + "', " + waga + ") " +
            "ON DUPLICATE KEY UPDATE imie = '" + imie + "', plec = '" + plec + "', dataUrodzenia = '" + dataUrodzenia +
            "', rasa = '" + rasa + "', waga = " + waga +";"
        const [result] = await baza.query(sql);
        return result;
    }

    static async podajPieska(id){
        const sql = "SELECT * FROM Pies WHERE id = " + id + ";";
        const [result] = await baza.query(sql);
        return result;
    }

    static async podajNajnowszegoPieskaUzytkownika(idWlaciciela){
        const sql = "SELECT * FROM Pies WHERE id = (SELECT Max(id) FROM Pies WHERE idWlasciciela = " + idWlaciciela + ");";
        const [result] = await baza.query(sql);
        return result;
    }

    static async podajPieski(){
        const sql = "SELECT id, imie, plec, dataUrodzenia, rasa, waga FROM Pies;";
        const [result] = await baza.query(sql);
        return this.przerobNaListe(result);
    }

    static async podajPieskiUzytkownika(idWlasciciela){
        const sql = "SELECT id, imie, plec, dataUrodzenia, rasa, waga FROM Pies WHERE idWlasciciela = " + idWlasciciela + ";";
        const [result] = await baza.query(sql);
        return this.przerobNaListe(result);
    }


    static async usunPieska(id){
        const sql = "DELETE FROM Pies WHERE id = " + id + ";";
        const [result] = await baza.query(sql);
        return result;
    }

    static async usunWszystkiePieskiUzytkownika(id){
        const sql = "DELETE FROM Pies WHERE id = " + id + ";";
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
        for(let piesek of wiersze){
            let tempMiniLista = [];
            tempMiniLista.push(piesek.id);
            tempMiniLista.push(piesek.imie);
            tempMiniLista.push(piesek.dataUrodzenia.toLocaleDateString("sv"));
            tempMiniLista.push(piesek.plec);
            tempMiniLista.push(piesek.rasa);
            tempMiniLista.push(piesek.waga);
            tempLista.push(tempMiniLista);
        }
        return tempLista;
    }

    /**
     * podaje następny indeks z bazy danych
     * @returns {Promise<*>} indeks o 1 większy od najwyższego
     */
    static async nastepnyIndeks(){
        const sql = "SELECT Max(id)+1 as id FROM Pies";
        const [result] = await baza.query(sql);
        return result[0].id;
    }
}

module.exports = Piesek;