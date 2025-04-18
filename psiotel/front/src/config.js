module.exports = global.config = {
    uzytkownik: {
        login: '',
        id: '',
    },
    // startowo jest język polski
    jezyk: {
        // formularz pieska
        imie: 'Imię',
        plec: 'Płeć',
        samiec: 'Samiec',
        samica: 'Samica',
        dataUrodzeniaFormularzPieska: 'Data urodzenia (min. wiek to 1 rok)',
        rasa: 'Rasa',
        waga: 'Waga',
        wyslij: 'Wyślij',
        // rezerwacje użytkownika
        witamy1: 'Witamy użytkowniku ',
        witamy2: ' na portalu Psiotel!',
        aktualneRezerwacje: 'Aktualne rezerwacje',
        otoAktualneRezerwacje: 'Oto twoje trwające i przyszłe rezerwacje. Te drugie możesz edytować.',
        historiaRezerwacji: 'Historia rezerwacji',
        otoHistoriaRezerwacji: 'Oto historia wszystkich Twoich rezerwacji',
        dodajRezerwacje: 'Dodaj rezerwację',
        dodajRezerwacjeOpis: 'Kliknij ponizszy przycisk, aby przejść do formularza rejestracji rezerwacji',
        // formularz rezerwacji
        ladowaniePieskow: 'Ładowanie piesków, proszę czekać. Jeśli długo się nie ładuje, może to oznaczać brak piesków.',
        ladowanieRezerwacji: 'Trwa ładowanie rezerwacji. Jeżeli długo się nie ładuje, może to oznaczać brak rezerwacji',
        wybierzPieska: 'Wybierz pieska:',
        dataRozpoczecia: 'Data rozpoczęcia',
        dataZakonczenia: 'Data zakonczenia',
        pakiet: 'Pakiet',
        zwyklyPakiet: 'Zwykły',
        // edytuj pieska
        edycjaDanychPieska: 'Edycja danych pieska',
        usunPieskaZBazy: 'Usuń pieska z bazy',
        usunPieskaZBazyOpis: 'Kliknij ponoższy przycisk, aby usunąć pieska z bazy, wraz z historią jego rezerwacji.',
        przyciskUsunPieska: 'Usuń pieska',
        bladUsunPieska: 'Nie można usunąć pieska, który ma aktywne rezerwacje. Przed usunięciem anuluj jego wszystkie aktywne rezerwacje',
        // edytuj rezerwację
        aktualniePrzypisanyPiesTo: 'Aktualnie przypisany pies to: ',
        edycjaRezerwacji: 'Edycja rezerwacji',
        anulujRezerwacje: 'Anuluj rezerwację',
        anulujRezerwacjeOpis: 'Kliknij ponoższy przycisk, aby anulować rezerwację. Jeżeli aktualnie trwa i piesek nie ' +
            'został jeszcze odebrany, będą doliczane dodatkowe koszty, jak w przypadku nie odebrania pupila po zakończeniu rezerwacji.',
        // error 404
        error404tekst: 'Ojojoj! Taka strona nie istnieje!',
        // formularz użytkownika
        nazwisko: 'Nazwisko',
        dataUrodzeniaFormularzUzytkownika: 'Data urodzenia (wiek 18+)',
        ulicaNumerDomu: 'Ulica i numer domu',
        kodPocztowy: 'Kod pocztowy',
        miasto: 'Miasto',
        email: 'Adres email',
        telefon: 'Numer telefonu',
        login: 'Login (musi mieć od 2 do 30 znaków)',
        haslo: 'Hasło (musi mieć małą i dużą literę, cyfrę, znak specjalny i conajmniej 8 znaków)',
        zarejestruj: 'Zarejestruj',
        // konto użytkownika
        ladowanieDanychKonta: 'Ładowanie danych konta, proszę czekać...',
        daneKonta: 'Dane konta',
        otoDaneKonta: 'Oto dane Twojego konta. Prześlij formularz ze zmienionymi danymi, aby je zapisać.',
        pomyslnieZmienionoDane: 'Pomyślnie zmieniono dane konta!',
        usunKonto: 'Usuń konto',
        usunKontoOpis: 'Usuń swoje konto na portalu Psiotel, wraz z zarejestrowanymi psami i ich rezerwacjami',
        tejOperacjiNieDaSieCofnac: 'Tej operacji nie da się cofnąć.',
        // logowanie
        zalogujSie: 'Zaloguj się!',
        zaloguj: 'Zaloguj',
        // nagłówek
        oNas: 'O nas',
        stronaGlowna: 'Strona główna',
        // nagłówek zalogowano
        wyloguj: 'Wyloguj',
        konto: 'Konto',
        psiaki: 'Psiaki',
        rezerwacje: 'Rezerwacje',
        // o nas
        oNaszymHotelu: 'O naszym hotelu',
        oNaszymHoteluOpis: 'Nasza rodzina prowadzi Psiotel od prawie trzydziestu lat. Zaczęło się od małego zakładu, ale dziś możemy' +
            'pochwalić się opiekowaniem w sumie ponad 10 000 róznymi pupilami, które w sumie spędziły u nas prawie milion' +
            'godzin! Aktualnie nasz hotel zatrudnia ponad 100 pracowników i ma miejsce na 300 gości naraz. ' +
            'Jesteśmy dumni z tego, co robimy i mamy nadzieję, że będziemy przyjmować naszych czworonożnych ' +
            'przyjaciół jeszcze przez wiele dekad.',
        opinie: 'Opinie',
        otoOpinie: 'Oto opinie gości o naszym hotelu.',
        opiniaGosc1: 'gość z Krakowa',
        opiniaGosc2: 'gość z Berlina',
        opiniaGosc3: 'gość z Paryża',
        opiniaGosc4: 'gość z Tokio',
        // rejestracja psiaka
        ladowanieDanych: 'Ładowanie danych, proszę czekać...',
        maksymalnaLiczbaPieskow: 'Osiągnięto maksymalną liczbę piesków',
        maksymalnaLiczbaPieskowOpis1: 'Przykro nam, ale maksymalna liczba piesków jednego użytkownika aktualnie wynosi ',
        maksymalnaLiczbaPieskowOpis2:'. Nie można dodać więcej piesków',
        zarejestrujNowegoPsiaka: 'Zarejestruj nowego psiaka!',
        // pieski użytkownika
        mojePieski: 'Moje pieski',
        otoMojePieski: 'Oto twoje pieski, które zostały zarejestrowane w naszym systemie.',
        edytuj: 'Edytuj',
        nieZnalezionoPieskow: 'Nie masz jeszcze żadnych zarejestrowanych piesków.',
        dodajPieskaOpis: "Kliknij poniższy przycisk aby przejść do formularza rejestracji psiaka",
        dodajPieska: 'Dodaj pieska',
        szczegoly: 'Szczegóły',
        // rejestracja rezerwacji
        wykonajNowaRezerwacje: 'Wykonaj nową rezerwację!',
        //rejestracja użytkownika
        zarejestrujSie: 'Zarejestruj się!',
        // stopka
        kontakt: 'Kontakt',
        numerTelefonuKontakt: 'Nr telefonu',
        skrzynkaPocztowa: 'Skrzynka pocztowa',
        adresKontaktowy: 'Adres',
        partnerzy: 'Partnerzy',
        dostawcaKarmy: 'Dostawca karmy',
        dostawcaPoduszek: 'Dostawca poduszek',
        dostawcaObroz: 'Dostawca intelignetnych obróż',
        cytat: 'Pieskie życie może być piękne!',
        // strona główna
        witamyWPsiotelu: 'Witamy w Psiotelu, najlepszym hotelu dla psów w Nienacku!',
        witamyWPsioteluOpis: 'Zostaw pod naszą opieką swojego czworonożnego PSIAciela, ' +
            'gdy nie możesz zabrać go ze sobą w trakcie wyjazdu. Zadbamy o niego ' +
            'według najwyższych standardów i będzie zadowolony czekał na Twój powrót!',
        oferowanePrzezNasUslugi: 'Oferowane przez nas usługi to',
        usluga1: 'Całodobowa opieka weterynaryjna',
        usluga2: 'Wygodne i przytulne kojce, w których psy zostają tylko na noc.',
        usluga3: 'Wielki plac zabaw, na którym socjalizują sie z innymi pieskami pod stałym okiem doświadczonych opiekunów.',
        usluga4: 'Obroże wykrywające nastrój na podstawie odczytów biometrycznych, pozwalające reagować natychmiast na lęk i dyskomfort.',
        usluga5: 'Inteligentne zabawki stymulujące pieski m. in. dźwiękami, światłami, wibracjami i zapachami.',
        usluga6: 'Najwyższej jakości karma z uwzględnieniem preferencji, nietolerancji i alergii pokarmowej.',
        usluga7: 'Psie spa z m. in. myciem, czesaniem, strzyżeniem i masażami.',
        naszePakiety: 'Nasze pakety',
        naszePakietyOpis: 'Usługi różnią się od wybranego pakietu, ale każdy z nich zapewnia, że Twój czworonożny przyjaciel ' +
            'będzie pod profesjonalną opieką. Poniżej znajduje się rozpiska pakietów i oferowanych przez nie usług.',
        tabelkaUsluga: 'Usługa',
        tabelkaPakietZwykly: 'Pakiet zwykły',
        tabelkaPakietVIP: 'Pakiet VIP',
        tabelkaOpieka: 'Opieka weterynaryjna',
        takCaps: 'TAK',
        nieCaps: 'NIE',
        tabelkaKojce: 'Kojce',
        tabelkaKojceOpis1: 'Wygodne z posłaniem i lampkami',
        tabelkaKojceOpis2: 'Luksusowe z dodatkowymi poduszkami i izolacją dźwięku',
        placZabaw: 'Plac zabaw',
        placZabawOpis1: 'Duży, bezpieczny, na zewnątrz i wewnątrz',
        placZabawOpis2: 'Dodatkowy dostęp do basenu',
        tabelkaObroze: 'Obroże wykrywające nastrój',
        tabelkaZabawki: 'Inteligentne zabawki',
        tabelkaJakoscKarmy: 'Jakosc karmy',
        tabelkaJakoscKarmyWysoka: 'Wysoka',
        tabelkaJakoscKarmyNajwyzsza: 'Najwyższa',
        tabelkaPsieSpa: 'Psie spa',
        // tabelka rezerwacji
        idRezerwacji: 'Id Rezerwacji',
        imiePsa: 'Imię psa',
        statusRezerwacji: 'Status rezerwacji',
        ktoraStrona1: 'Strona ',
        ktoraStrona2: ' z ',
        poprzedniaStrona: 'Poprzednia strona',
        nastepnaStrona: 'Następna strona',
        // tabelki
        pustaTabelka: 'Pusta tabelka :(',
        dataUrodzenia: 'Data urodzenia',
    },
    maksymalnaLiczbaPieskowUzytkownika: 20
};