import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import StronaGlowna from "./Components/StronaGlowna";
import Error404 from "./Components/Error404";
import ONas from "./Components/ONas";
import RejestracjaUzytkownika from "./Components/RejestracjaUzytkownika";
import Logowanie from "./Components/Logowanie";
import RejestracjaPsiaka from "./Components/RejestracjaPsiaka";
import RejestracjaRezerwacji from "./Components/RejestracjaRezerwacji";
import RezerwacjeUzytkownika from "./Components/RezerwacjeUzytkownika";
import PieskiUzytkownika from "./Components/PieskiUzytkownika";
import KontoUzytkownika from "./Components/KontoUzytkownika";
import {useState} from "react";
import config from "./config";
import EdytujPieska from "./Components/EdytujPieska";
import EdytujRezerwacje from "./Components/EdytujRezerwacje";


function App() {

  // przekazujemy ustawianie języka i przy kliknięciu w nagłówku ustawia to tutaj, a wtedy to przekazuje język dalej
  const [jezyk, ustawJezyk] = useState(config.jezyk);

  // używam tego do przekazania pieska i rezerwacji do edycji przy przekierowaniu
  const [piesekDoEdycji, ustawPieskaDoEdycji] = useState('');
  const [rezerwacjadoEdycji, ustawRezerwacjedoEdycji] = useState('');
  const [napisPomyslnieZmienionoDane, ustawnapisPomyslnieZmienionoDane] = useState('');


  return (
      <div className="App">
        <BrowserRouter>
          <Routes>

            {/* zwykłe dla gościa */}
            <Route path="/" element={<StronaGlowna jezyk = {jezyk} ustawJezyk = {ustawJezyk}/>} />
            <Route path="/oNas" element={<ONas jezyk = {jezyk} ustawJezyk = {ustawJezyk}/>} />

            {/* rejestracje rzeczy */}
            <Route path="/rejestracjaUzytkownika" element={<RejestracjaUzytkownika jezyk = {jezyk} ustawJezyk = {ustawJezyk}/>}/>
            <Route path="/rejestracjaPsiaka" element={<RejestracjaPsiaka jezyk = {jezyk} ustawJezyk = {ustawJezyk}/>}/>
            <Route path="/rejestracjaRezerwacji" element={<RejestracjaRezerwacji jezyk = {jezyk} ustawJezyk = {ustawJezyk}/>}/>

            {/* edycja rzeczy */}
            <Route path="/edytujPieska" element={<EdytujPieska jezyk = {jezyk} ustawJezyk = {ustawJezyk} piesek={piesekDoEdycji}/>}/>
            <Route path="/edytujRezerwacje" element={<EdytujRezerwacje jezyk = {jezyk} ustawJezyk = {ustawJezyk} rezerwacja={rezerwacjadoEdycji}/>}/>
            {/* logowanie */}
            <Route path="/logowanie" element={<Logowanie jezyk = {jezyk} ustawJezyk = {ustawJezyk}/>}/>

            {/* dane użytkownika */}
            <Route path="/rezerwacjeUzytkownika" element={<RezerwacjeUzytkownika jezyk = {jezyk} ustawJezyk = {ustawJezyk} ustawRezerwacje = {ustawRezerwacjedoEdycji}/>}/>
            <Route path="/pieskiUzytkownika" element={<PieskiUzytkownika jezyk = {jezyk} ustawJezyk = {ustawJezyk} ustawPieska = {ustawPieskaDoEdycji}/>}/>
            <Route path="/kontoUzytkownika" element={<KontoUzytkownika jezyk = {jezyk} ustawJezyk = {ustawJezyk}/>}/>

            {/* błąd 404 */}
            <Route path="*" element={<Error404 text = {"404 not found"} jezyk = {jezyk} ustawJezyk = {ustawJezyk}/>} />

          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
