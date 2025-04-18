var express = require('express');
var router = express.Router();
const uzytkownikControler = require('../Controllers/uzytkownikKontroler');
const piesekControler = require('../Controllers/piesekKontroler');
const rezerwacjaControler = require('../Controllers/rezerwacjaKontroler');


// użytkownik
router.post('/postUzytkownika', uzytkownikControler.postUzytkownika);
router.get('/getUzytkownikow', uzytkownikControler.getUzytkownikow);
router.post('/zaloguj', uzytkownikControler.sprawdzDaneLogowania)
router.get('/getUzytkownika/:id', uzytkownikControler.getUzytkownika);
router.delete('/deleteUzytkownika/:id', uzytkownikControler.deleteUzytkownika);



// piesek
router.get('/getPieska/:id', piesekControler.getPieska);
router.get('/getPieski', piesekControler.getPieski);
router.get('/getPieskiUzytkownika/:id', piesekControler.getPieskiUzytkownika);
router.get('/getWlasnieDodanegoPieska/:id', piesekControler.getWlasnieDodanegoPieska);

router.post('/postPieska', piesekControler.postPieska);

router.delete('/deletePieska/:id', piesekControler.deletePieska);




//rezerwacje

router.get('/getWszsystkieRezeracje', rezerwacjaControler.getWszystkieRezerwacje);
router.get('/getWszystkieRezerwacjeUzytkownika/:id', rezerwacjaControler.getWszystkieRezerwacjeUzytkownika);
router.get('/getAktywneRezerwacjeUzytkownika/:id', rezerwacjaControler.getAktywneRezerwacjeUzytkownika);
router.get('/getAktywneRezerwacjePsa/:id', rezerwacjaControler.getAktywneRezerwacjePsa);
router.get('/getJednaRezeracje/:id', rezerwacjaControler.getJednaRezerwacje);

router.post('/postRezerwacje', rezerwacjaControler.postRezerwacje);

router.delete('/deleteRezerwacje/:id', rezerwacjaControler.deleteRezerwacje);


module.exports = router;
