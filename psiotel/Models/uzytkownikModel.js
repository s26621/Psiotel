const baza = require('../db');


class Uzytkownik{
    // nie jest mi chyba do niczego potrzebne, ale dzięki temu webstorm podpowiada
    constructor(id, imie, nazwisko, dataUrodzenia, ulicaNumerDomu, kodPocztowy, miasto, email, telefon, login, haslo){
        this.id = id;
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.dataUrodzenia = dataUrodzenia;
        this.ulicaNumerDomu = ulicaNumerDomu;
        this.kodPocztowy = kodPocztowy;
        this.miasto = miasto;
        this.email = email;
        this.telefon = telefon;
        this.login = login;
        this.haslo = haslo;
    }



    static async dodajUzytkownika(id, imie, nazwisko, dataUrodzenia, ulicaNumerDomu, kodPocztowy, miasto, email, telefon, login, haslo){
        // jeżeli to dodawanie, podajemy następny indeks
        if(id === '') id = await this.nastepnyIndeks();
        const sql = "INSERT INTO Uzytkownik " +
            "(id, imie, nazwisko, dataUrodzenia, ulicaNumerDomu, kodPocztowy, miasto, email, telefon, login, haslo) " +
            "VALUES" +
            "(" + id + ", '"+ imie + "', '" + nazwisko + "', '" + dataUrodzenia + "', '" + ulicaNumerDomu + "', '" +
            kodPocztowy + "', '" + miasto + "', '" + email + "', '" + telefon + "', '" + login + "', '" + haslo + "') " +
            "ON DUPLICATE KEY UPDATE imie = '"+ imie + "', nazwisko = '" + nazwisko + "', dataUrodzenia = '" + dataUrodzenia + "', " +
            "ulicaNumerDomu = '" + ulicaNumerDomu + "', kodPocztowy = '" + kodPocztowy + "', miasto = '" + miasto + "', " +
            "email = '" + email + "', telefon = '" + telefon + "', login = '" + login + "', haslo = '" + haslo + "';"
        await baza.query(sql);
        return id;
    }


    static async podajUzytkownikow(){
        const [wiersze] = await baza.query("SELECT * FROM Uzytkownik;");
        return wiersze;
    }

    static async podajUzytkownika(id){
        const sql = "SELECT * FROM Uzytkownik WHERE id = " + id + ";";
        const [result] = await baza.query(sql);
        return result;
    }

    static async usunUzytkownika(id){
        const sql = "DELETE FROM Uzytkownik WHERE id = " + id + ";";
        const [result] = await baza.query(sql);
        return result;
    }

    static async sprawdzDaneZwrocId(login, haslo){
        const sql = "SELECT id FROM Uzytkownik WHERE login = '" + login + "' AND HASLO = '" + haslo + "';";
        const [result] = await baza.query(sql);
        return result;
    }

    static async nastepnyIndeks(){
        const sql = "SELECT Max(id)+1 as id FROM Uzytkownik";
        const [result] = await baza.query(sql);
        return result[0].id;
    }
}


module.exports = Uzytkownik;